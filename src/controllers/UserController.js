const UserService = require('../services/UserService');

const postNewUser = async (req, res) => {
    try {
        console.log('oi');
        const { displayName, email, password, image } = req.body;
        const payload = { displayName, email, password, image };
        console.log(UserService);
        const newUser = await UserService.postNewUser(payload);
        res.status(201).json('usuário criado com sucesso!');
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Algo deu errado, verifique o seu terminal' });
    }
};

module.exports = {
    postNewUser,
};
