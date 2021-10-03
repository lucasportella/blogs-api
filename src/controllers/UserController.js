const { StatusCodes } = require('http-status-codes');
const UserService = require('../services/UserService');

const postNewUser = async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
        const payload = { displayName, email, password, image };

        const newUser = await UserService.postNewUser(payload);

        if (newUser.error) {
            return res.status(StatusCodes.CONFLICT).json({ message: newUser.error.message });
        }

        res.status(201).json('usuário criado com sucesso!');
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Algo deu errado, verifique o seu terminal' });
    }
};

module.exports = {
    postNewUser,
};
