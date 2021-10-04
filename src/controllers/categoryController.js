const { StatusCodes } = require('http-status-codes');
const categoryService = require('../services/CategoryService');

const postCategory = async (req, res) => {
    const { name } = req.body;
    const newCategory = await categoryService.postCategory(name);
    return res.status(StatusCodes.CREATED).json(newCategory);
};

module.exports = {
    postCategory,
};
