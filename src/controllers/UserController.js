const { StatusCodes } = require('http-status-codes');
const UserService = require('../services/UserService');

const postNewUser = async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
        const { token } = req;
        const payload = { displayName, email, password, image };

        const newUser = await UserService.postNewUser(payload);

        if (newUser.error) {
            return res.status(StatusCodes.CONFLICT).json({ message: newUser.error.message });
        }

        res.status(StatusCodes.CREATED).json({ token });
    } catch (e) {
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Algo deu errado, verifique o seu terminal' });
    }
};

module.exports = {
    postNewUser,
};
