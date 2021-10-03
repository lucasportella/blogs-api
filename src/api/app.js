const express = require('express');
const bodyParser = require('body-parser');
const { UsersRoute } = require('../routes');
const validationError = require('../middlewares/validations/validationError');

const app = express();
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', UsersRoute);

app.use(validationError);

module.exports = app;