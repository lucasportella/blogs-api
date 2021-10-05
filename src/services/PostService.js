const { BlogPost } = require('../sequelize/models');

const postBlogPost = async (payload) => {
    const { title, content, userId } = payload;
    const result = await BlogPost.create({ title, content, userId });
    return result;
};

module.exports = {
    postBlogPost,
};
