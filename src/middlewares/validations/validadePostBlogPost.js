const Joi = require('joi');

const validatePostBlogPost = async (req, res, next) => {
const { error } = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),

}).validate(req.body);
    if (error) {
        return next(error);
    }
    next();
};

module.exports = validatePostBlogPost;