const Sequelize = require('sequelize');
const { BlogPost, Category, User, PostsCategory } = require('../sequelize/models');
const config = require('../sequelize/config/config');

const sequelize = new Sequelize(config.development);

const checkCategoryExistence = async (categoryIds) => {
    const resultArray = await Promise.all(categoryIds.map((id) =>
        Category.findOne({ where: { id } })));

    const checkCategoryIds = resultArray.every((result) => result !== null);

    if (!checkCategoryIds) {
        return { errorType: 'not_found', error: { message: '"categoryIds" not found' } };
    }
    return 'all categories exists';
};

// postBlogPost uses atomic operation
const postBlogPost = async (payload) => {
    const t = await sequelize.transaction();
    try {
        const { title, content, categoryIds, userId } = payload;
        const checkCategories = await checkCategoryExistence(categoryIds);

        if (checkCategories.error) {
            return checkCategories;
        }
        const result = await BlogPost.create({ title, content, userId }, { transaction: t });

        await Promise.all(categoryIds.map((id) =>
            PostsCategory.create({ postId: result.id, categoryId: id }, { transaction: t })));
        // fixing foreach mistake --> cant use it with await
        // https://github.com/sequelize/sequelize/issues/7525
        // https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop

        await t.commit();
        return result;
    } catch (e) {
        await t.rollback();
        console.log('ERROR ON ATOMIC OPERATION at postBlogPost service', e);
        return e;
    }
};

const getAllBlogPosts = async () => {
    const result = await BlogPost.findAll({
        include: [{ model: User, as: 'user' },
        { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    return result;
};

const getBlogPost = async (id) => {
    const result = await BlogPost.findOne({
        where: { id },
        include: [{ model: User, as: 'user' },
        { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    if (!result) {
        return { errorType: 'not_found', error: { message: 'Post does not exist' } };
    }
    return result;
};

const verifyOwnership = async (blogPostId, userId) => {
    let userOwnership = await getBlogPost(blogPostId);
    if (userOwnership.error) {
        return userOwnership;
    }
    if (userOwnership.user.id !== userId) {
        userOwnership = { errorType: 'unauthorized', error: { message: 'Unauthorized user' } };
    }
    return userOwnership;
};

const putBlogPost = async (payload) => {
    const { userId, title, content, blogPostId } = payload;
    const userOwnership = await verifyOwnership(blogPostId, userId);
    if (userOwnership.error) {
        return userOwnership;
    }
    let result = await BlogPost.update({ title, content }, { where: { id: blogPostId } });
    if (result[0] === 1) {
        result = { title, content, userId, categories: userOwnership.categories };
    }
    return result;
};

const deleteBlogPost = async (payload) => {
    const { userId, blogPostId } = payload;
    const userOwnership = await verifyOwnership(blogPostId, userId);
    if (userOwnership.error) {
        return userOwnership;
    }
    const result = await BlogPost.destroy({ where: { id: blogPostId } });
    return result;
};

const emptyQuerySearch = async () =>
    BlogPost.findAll({
        include: [
            { model: User, as: 'user' },
            {
                model: Category,
                as: 'categories',
                through: { attributes: [] },
            }],
    });

const querySearch = async (query) =>
    BlogPost.findAll({
        where: {
            [Sequelize.Op.or]: [
                { title: query },
                { content: query },
            ],
        },
        include:
            [
                { model: User, as: 'user' },
                {
                    model: Category,
                    as: 'categories',
                    through: { attributes: [] },
                }],
    });

const postSearchQuery = async (query) => {
    if (query === '') {
        const result = await emptyQuerySearch();
        return result;
    }
    const result = await querySearch(query);
    return result;
};

module.exports = {
    postBlogPost,
    getAllBlogPosts,
    getBlogPost,
    putBlogPost,
    deleteBlogPost,
    postSearchQuery,
};
