const express = require('express');
const bodyParser = require('body-parser');
const { userRoute, loginRoute } = require('../routes');
const validationError = require('../middlewares/validations/validationError');

const app = express();
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoute);
app.use('/login', loginRoute);

app.use(validationError);

module.exports = app;