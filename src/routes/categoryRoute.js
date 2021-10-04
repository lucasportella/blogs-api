const express = require('express');

const categoryController = require('../controllers/categoryController');
const validatePostCategory = require('../middlewares/validations/validadePostCategory');
const validateJWT = require('../middlewares/jwt/validadeJWT');

const router = express.Router();

router.post('/', validatePostCategory, validateJWT, categoryController.postCategory);

module.exports = router;
