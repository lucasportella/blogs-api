const Joi = require('joi');

const validatePutBlogPost = async (req, res, next) => {
const { error } = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.forbidden().messages({ 'any.unknown': 'Categories cannot be edited' }),
}).validate(req.body);
    if (error) {
        return next(error);
    }
    next();
};

module.exports = validatePutBlogPost;
