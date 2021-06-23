const express = require("express");

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const journalRouter = require("./routes/journalRoutes");
const userRouter = require("./routes/userRoutes");
const dailyPromptRouter = require("./routes/dailyPromptRoute");

// Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

/* Route Handler */
app.use("/api/v1/journals", journalRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/dailyPrompt", dailyPromptRouter);

/* Unhandled Route Handler */
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

/* Error Handler */
app.use(globalErrorHandler);

module.exports = app;
