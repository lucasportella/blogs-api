const { User } = require('../sequelize/models');

const postNewUser = async (payload) => {
    const newUser = await User.create(payload);
    return newUser;
};

module.exports = {
    postNewUser,
};