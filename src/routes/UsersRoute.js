const express = require('express');
const UserController = require('../controllers/UserController');
const validatePostNewUser = require('../middlewares/validations/validatePostNewUser');

const router = express.Router();

router.post('/', validatePostNewUser, UserController.postNewUser);

module.exports = router;