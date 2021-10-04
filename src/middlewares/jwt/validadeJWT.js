const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();

const validateJWT = async (req, res, next) => {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET;
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        console.log(req.body.email);
        console.log(decoded.email);
        if (req.body.email !== decoded.email) {
            return res.status(StatusCodes.UNAUTHORIZED)
            .json({ message: 'Expired or invalid token' });
        }
    } catch (e) {
        console.log('erro no validateJWT middleware');
        console.log(e);
    }
    next();
};

module.exports = validateJWT;
