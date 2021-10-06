const express = require('express');
const userController = require('../controllers/userController');
const validatePostNewUser = require('../middlewares/validations/validatePostNewUser');
const generateToken = require('../middlewares/jwt/generateToken');
const validateJWT = require('../middlewares/jwt/validadeJWT');

const router = express.Router();

router.post('/', validatePostNewUser, generateToken, userController.postNewUser);

router.get('/', validateJWT, userController.getAllUsers);

router.get('/:id', validateJWT, userController.getUser);

router.delete('/me', validateJWT, userController.deleteUser);

module.exports = router;