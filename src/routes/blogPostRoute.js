const express = require('express');

const blogPostController = require('../controllers/blogPostController');
const validateJWT = require('../middlewares/jwt/validadeJWT');

const router = express.Router();

router.post('/', validateJWT, blogPostController.postBlogPost);

module.exports = router;
