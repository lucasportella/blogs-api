const { StatusCodes } = require('http-status-codes');

const validationError = (err, req, res, _next) =>
  res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });

module.exports = validationError;
