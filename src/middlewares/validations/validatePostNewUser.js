const Joi = require('joi');

// joi https://www.npmjs.com/package/joi/v/14.0.4
// contornei a depreciação do projeto com o joi através do .messages que peguei do colega Tiago Yoneda https://github1s.com/tryber/sd-09-project-blogs-api/pull/1

const validatePostNewUser = async (req, res, next) => {
const { error } = Joi.object().keys({
    displayName: Joi.string().min(8).max(50)
.required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(80).required()
.messages({ 'string.min': '"password" length must be 6 characters long' }),
    image: Joi.string(),
}).validate(req.body);
    if (error) {
        return next(error);
    }
    next();
};

module.exports = validatePostNewUser;