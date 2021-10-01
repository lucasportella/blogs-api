const express = require('express');

const app = express();

const { UsersRoute } = require('../routes');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', UsersRoute);

module.exports = app;