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

module.exports = {
    postBlogPost,
    getAllBlogPosts,
};
