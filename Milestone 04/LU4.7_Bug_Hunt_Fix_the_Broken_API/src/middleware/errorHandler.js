const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Prisma Duplicate Key Error
  if (err.code === 'P2002') {
    const message = 'A record with that value already exists';
    error = new AppError(message, 409);
  }

  // Prisma Record Not Found Error
  if (err.code === 'P2025') {
    const message = 'Record not found';
    error = new AppError(message, 404);
  }

  res.status(error.statusCode || 500).json({
    error: true,
    message: error.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;