const { StatusCodes } = require('http-status-codes');
const PostService = require('../services/BlogPostService');

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
       console.log('erro no controller postBlogPost', e);
   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e); 
}
};

    const getAllBlogPosts = async (req, res) => {
        try {
            const allBlogPosts = await PostService.getAllBlogPosts();
            return res.status(StatusCodes.OK).json(allBlogPosts);
        } catch (e) {
            console.log('erro no controller getAllBlogPosts', e);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e); 
        }
    };

    const getBlogPost = async (req, res) => {
        try {
            const { id } = req.params;
            const blogPost = await PostService.getBlogPost(id);
            if (blogPost.error) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: blogPost.error.message });
            }
            return res.status(StatusCodes.OK).json(blogPost);
        } catch (e) {
            console.log('erro no controller getBlogPost', e);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e); 
        }
    };

module.exports = {
    postBlogPost,
    getAllBlogPosts,
    getBlogPost,
};
