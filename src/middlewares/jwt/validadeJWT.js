const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();

const validateJWT = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
    }
};
