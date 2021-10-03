const express = require('express');

const loginController = require('../controllers/loginController');
const generateToken = require('../middlewares/jwt/generateToken');
const validatePostLogin = require('../middlewares/validations/validatePostLogin');

const router = express.Router();

router.post('/', validatePostLogin, generateToken, loginController);

module.exports = router;
