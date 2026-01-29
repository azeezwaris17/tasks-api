module.exports = (err, req, res, next) => {
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // Mongoose validation errors
  if (err && err.name === 'ValidationError') {
    statusCode = 400;
  }

  // Mongoose bad ObjectId, etc.
  if (err && err.name === 'CastError') {
    statusCode = 400;
  }

  const payload = {
    message: err && err.message ? err.message : 'Server Error',
  };

  if (process.env.NODE_ENV === 'development' && err && err.stack) {
    payload.stack = err.stack;
  }

  res.status(statusCode).json(payload);
};
