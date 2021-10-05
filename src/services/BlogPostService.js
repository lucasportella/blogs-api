const { BlogPost, Category, User } = require('../sequelize/models');

const postBlogPost = async (payload) => {
    const { title, content, categoryIds, userId } = payload;

    const resultArray = await Promise.all(categoryIds.map((id) =>
    Category.findOne({ where: { id } })));

    const checkCategoryIds = resultArray.every((result) => result !== null);
    
    if (!checkCategoryIds) {
        return { errorType: 'not_found', error: { message: '"categoryIds" not found' } };
    }
    const result = await BlogPost.create({ title, content, userId });
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

const putBlogPost = async (payload) => {
    const { userId, title, content, blogPostId } = payload;
    const userOwnership = await getBlogPost(blogPostId);
    console.log(userOwnership);
    if (userOwnership.error || userOwnership.user.id !== userId) {
        return { errorType: 'unauthorized', error: { message: 'Unauthorized user' } };
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
