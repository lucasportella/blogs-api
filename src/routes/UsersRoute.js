const express = require('express');
const UserController = require('../controllers/UserController');
const validatePostNewUser = require('../middlewares/validations/validatePostNewUser');
const generateToken = require('../middlewares/jwt/genererateToken');

const router = express.Router();

router.post('/', validatePostNewUser, generateToken, UserController.postNewUser);

module.exports = router;