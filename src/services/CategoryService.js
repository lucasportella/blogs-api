const { Category } = require('../sequelize/models');

const postCategory = async (name) => {
    const result = await Category.create({ name });
    return result.dataValues;
};

const getAllCategories = async () => {
    const result = await Category.findAll();
    return result;
};

module.exports = {
    postCategory,
    getAllCategories,
};
