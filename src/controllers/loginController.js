const { StatusCodes } = require('http-status-codes');
const loginService = require('../services/LoginService');

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const { token } = req;
    const payload = { email, password };
    const result = await loginService.postLogin(payload);
    console.log(result);
    if (result.error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: result.error.message });
    }
    return res.status(StatusCodes.OK).json({ token });
};

module.exports = loginController;
