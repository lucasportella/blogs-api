const express = require('express');
const { User } = require('../sequelize/models');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const { displayName, email, password, image } = req.body;
        const payload = { displayName, email, password, image };
        const newUser = await User.create(payload);
        res.status(201).json('usuário criado com sucesso!');
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Algo deu errado, verifique o seu terminal' });
    }
});

module.exports = router;