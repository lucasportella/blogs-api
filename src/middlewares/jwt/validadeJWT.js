const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();

const { User } = require('../../sequelize/models');

const validateJWT = async (req, res, next) => {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET;
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        console.log(decoded);
        // DEBUGGAR A PARTIR DAQUI
    } catch (e) {
        console.log('erro no validateJWT middleware');
        console.log(e);
    }
    next();
};

module.exports = validateJWT;
