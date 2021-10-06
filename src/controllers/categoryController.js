const { StatusCodes } = require('http-status-codes');
const categoryService = require('../services/CategoryService');

const postCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = await categoryService.postCategory(name);
        return res.status(StatusCodes.CREATED).json(newCategory);
    } catch (e) {
        console.log('erro no controller postCategory', e);
    }
};

const getAllCategories = async (req, res) => {
    try {
        const allCategories = await categoryService.getAllCategories();
        return res.status(StatusCodes.OK).json(allCategories);
    } catch (e) {
        console.log('erro no controller getAllCategories', e);
    }
};

module.exports = {
    postCategory,
    getAllCategories,
};
