const { StatusCodes } = require('http-status-codes');
const PostService = require('../services/PostService');

const postBlogPost = async (req, res) => {
   try {
       const { title, content, categoryIds } = req.body;
       const userId = req.user.id;
       const payload = { title, content, categoryIds, userId };
       const newBlogPost = await PostService.postBlogPost(payload);
       if (newBlogPost.error) {
           return res.status(StatusCodes.BAD_REQUEST).json({ message: newBlogPost.error.message });
       }
       return res.status(StatusCodes.CREATED).json(newBlogPost);
   } catch (e) {
       console.log(e);
   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e); 
}
};

module.exports = {
    postBlogPost,
};
