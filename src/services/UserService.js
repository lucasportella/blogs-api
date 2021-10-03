const { User } = require('../sequelize/models');

const postNewUser = async (payload) => {
    const { email } = payload;
    const registeredEmail = await User.findOne({ where: { email } });
    if (!registeredEmail) {
        const newUser = await User.create(payload);
        return newUser;
    }
    return { 
        errorType: 'already_registered', 
        error: { message: 'User already registered' }, 
    };
};

module.exports = {
    postNewUser,
};