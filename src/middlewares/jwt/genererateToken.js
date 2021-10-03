require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const generateToken = async (req, res, next) => {
    try {
        const { email } = req.body;
        const jwtConfig = {
            expiresIn: '7d',
            algorithm: 'HS256',
        };
        const token = jwt.sign({ email }, secret, jwtConfig);
        req.token = token;
        next();
    } catch (e) {
        console.log('erro no generateToken middleware');
        console.log(e);
    }
};

module.exports = generateToken;
