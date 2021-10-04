const Joi = require('joi');

const validatePostCategory = async (req, res, next) => {
const { error } = Joi.object().keys({
    name: Joi.string().min(3).max(80)
.required(),
}).validate(req.body);
    if (error) {
        return next(error);
    }
    next();
};

module.exports = validatePostCategory;