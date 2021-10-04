const { Category } = require('../sequelize/models');

const postCategory = async (name) => {
    const result = await Category.create({ name });
    return result.dataValues;
};

module.exports = {
    postCategory,
};
