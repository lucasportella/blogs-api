const { StatusCodes } = require('http-status-codes');
const PostService = require('../services/PostService');

const postBlogPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const payload = { title, content, categoryIds };
    const newBlogPost = await PostService.postBlogPost(payload);
    return res.status(StatusCodes.CREATED).json(newBlogPost);
};

module.exports = {
    postBlogPost,
};
