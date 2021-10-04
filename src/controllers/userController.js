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

        return res.status(StatusCodes.CREATED).json({ token });
    } catch (e) {
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Algo deu errado, verifique o seu terminal' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await UserService.getAllUsers();
        return res.status(StatusCodes.OK).json(allUsers);
    } catch (e) {
        console.log('erro no controller getAllUsers');
        console.log(e);
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserService.getUser(id);
        if (user.error) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: user.error.message });
        }
        return res.status(StatusCodes.OK).json(user);
    } catch (e) {
        console.log('erro no getUser controller');
        console.log(e);
    }
};

module.exports = {
    postNewUser,
    getAllUsers,
    getUser,
};
