const { BlogPost, Category, User, PostsCategory } = require('../sequelize/models');

const postBlogPost = async (payload) => {
    // REFACTOR WITH SOLID AND ATOMICITY
    const { title, content, categoryIds, userId } = payload;
    const resultArray = await Promise.all(categoryIds.map((id) =>
    Category.findOne({ where: { id } })));

    const checkCategoryIds = resultArray.every((result) => result !== null);
    
    if (!checkCategoryIds) {
        return { errorType: 'not_found', error: { message: '"categoryIds" not found' } };
    }
    const result = await BlogPost.create({ title, content, userId });

        await categoryIds.forEach((id) =>
         PostsCategory.create({ postId: result.id, categoryId: id }));

    return result;
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
    if (userOwnership.error || userOwnership.user.id !== userId) {
        userOwnership = { errorType: 'unauthorized', error: { message: 'Unauthorized user' } };
    }
    return userOwnership;
};

const putBlogPost = async (payload) => {
    const { userId, title, content, blogPostId } = payload;
    const userOwnership = await verifyOwnership(blogPostId, userId);
    console.log(userOwnership);
    if (userOwnership.error) {
        return userOwnership;
    }
    let result = await BlogPost.update({ title, content }, { where: { id: blogPostId } });
    if (result[0] === 1) {
        result = { title, content, userId, categories: userOwnership.categories };
    }
    return result;
};

module.exports = {
    postBlogPost,
    getAllBlogPosts,
    getBlogPost,
    putBlogPost,
};
