const express = require('express');

const blogPostController = require('../controllers/blogPostController');

const router = express.Router();

router.post('/', blogPostController.postBlogPost);

module.exports = router;
