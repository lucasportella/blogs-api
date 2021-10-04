const express = require('express');
const userController = require('../controllers/userController');
const validatePostNewUser = require('../middlewares/validations/validatePostNewUser');
const generateToken = require('../middlewares/jwt/generateToken');

const router = express.Router();

router.post('/', validatePostNewUser, generateToken, userController.postNewUser);

router.get('/', userController.getAllUsers);

module.exports = router;