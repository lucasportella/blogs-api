const { BlogPost, Category } = require('../sequelize/models');

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

module.exports = {
    postBlogPost,
};
