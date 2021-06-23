const AppError = require("./../utils/appError");
/* Error Handling Middleware */

// Duplicate Field
const handleDuplicateFieldsDB = () => {
  const message = "Duplicate value. Please use a different value.";
  return new AppError(message, 400);
};
// Invalid database IDs
const handleCastErrorDB = () => {
  const message = `Invalid $(err.path): $(err.value).`;
  return new AppError(message, 400);
};

// JWT invalid token
const handleJWTError = () => {
  return new AppError("Invalid token. Please log in again.", 401);
};
// Operational, trusted error
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// Programming or other unknown error
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "Error",
      message: "Something went very wrong!",
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") sendErrorDev(err, res);
  else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB();
    if (error.code === 11000) error = handleDuplicateFieldsDB();
    if (error.name == "JsonWebTokenError") error = handleJWTError();
    sendErrorProd(err, res);
  }
};
