const { BlogPost } = require('../sequelize/models');

const postBlogPost = async (payload) => {
    const result = await BlogPost.create(payload);
    return result;
};

module.exports = {
    postBlogPost,
};
