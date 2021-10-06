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

    const putBlogPost = async (req, res) => {
        try {
            const userId = req.user.id;
            const blogPostId = req.params.id;
            const { title, content } = req.body;
            const payload = { userId, blogPostId, title, content };
            const updatedBlogPost = await PostService.putBlogPost(payload);
            if (updatedBlogPost.error) {
                return res.status(StatusCodes.UNAUTHORIZED)
                .json({ message: updatedBlogPost.error.message });
            }
            return res.status(StatusCodes.OK).json(updatedBlogPost);
        } catch (e) {
            console.log('erro no controller putBlogPost', e);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e); 
        }
    };

    const deleteBlogPost = async (req, res) => {
        const userId = req.user.id;
        const blogPostId = req.params.id;
        const payload = { userId, blogPostId };
        const confirmation = await PostService.deleteBlogPost(payload);
        if (confirmation.errorType === 'unauthorized') {
            return res.status(StatusCodes.UNAUTHORIZED).json(
                { message: confirmation.error.message },
);
        } if (confirmation.errorType === 'not_found') {
            return res.status(StatusCodes.NOT_FOUND).json({ message: confirmation.error.message });
        }
        return res.status(StatusCodes.NO_CONTENT).json();
    };

module.exports = {
    postBlogPost,
    getAllBlogPosts,
    getBlogPost,
    putBlogPost,
    deleteBlogPost,
};
