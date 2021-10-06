const express = require('express');

const blogPostController = require('../controllers/blogPostController');
const validateJWT = require('../middlewares/jwt/validadeJWT');
const validatePostBlogPost = require('../middlewares/validations/validadePostBlogPost');
const validatePutBlogPost = require('../middlewares/validations/validatePutBlogPost');

const router = express.Router();

router.post('/', validateJWT, validatePostBlogPost, blogPostController.postBlogPost);

router.get('/', validateJWT, blogPostController.getAllBlogPosts);

router.get('/:id', validateJWT, blogPostController.getBlogPost);

router.put('/:id', validatePutBlogPost, validateJWT, blogPostController.putBlogPost);

router.delete('/:id', validateJWT, blogPostController.deleteBlogPost);

module.exports = router;
