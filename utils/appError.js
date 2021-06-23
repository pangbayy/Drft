class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}.startsWith('4)? 'fail': 'error`;
    this.isOperational = true; // send back message to client only when it's operational error
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
