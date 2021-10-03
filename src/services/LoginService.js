const { User } = require('../sequelize/models');

const postLogin = async (payload) => {
    const { email, password } = payload;
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
        return { 
            errorType: 'not_registered', 
            error: { message: 'Invalid fields' }, 
        };
    }
    return user;
};

module.exports = {
    postLogin,
};
