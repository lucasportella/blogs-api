const Joi = require('joi');

const validatePostLogin = async (req, res, next) => {
const { error } = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(80).required()
.messages({ 'string.min': '"password" length must be 6 characters long' }),
}).validate(req.body);
    if (error) {
        return next(error);
    }
    next();
};

module.exports = validatePostLogin;