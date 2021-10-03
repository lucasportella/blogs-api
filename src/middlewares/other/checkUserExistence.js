const { User } = require('../../sequelize/models');

const checkUserExistence = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ where: { email, password } });
        if (!userExists) {
            return { 
                errorType: 'not_registered', 
                error: { message: 'Invalid fields' }, 
            };
        }
        next();
    } catch (e) {
        console.log('erro no middleware checkUserExistence');
        console.log(e);
    }
};

module.exports = checkUserExistence;
