const { promisify } = require("util");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  // Create token
  const token = signToken(user._id);
  // Configure Cookie
  const cookieOptions = {
    expires: new Date(
      // current time add 90 days, converted to milliseconds
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  res.cookie("jwt", token, cookieOptions);

  // Remove the password from the output 141
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  await User.findOne({ email: req.body.email }, function (err, user) {
    if (user) {
      return next(
        new AppError("Email already registerd! Please signin instead", 500)
      );
    }
  });

  await User.create(
    {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      joinDate: req.body.joinDate,
    },
    function (err, newUser) {
      if (newUser) {
        createSendToken(newUser, 201, res);
      } else if (err) {
        return next(new AppError(err.message, 500));
      }
    }
  );
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1) check if email and password exists
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  //2) check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("Incorrect email or passowrd", 401));
  }
  // 3) if everything is good, send the token to the client
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    // If no token in header, check cookies
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      AppError("You are not logged in. Please log in to get access", 401)
    );
  }

  // 2) Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if the user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("Can't find the user.", 401));
  }

  //4) If all passed, set the user to the found user
  req.user = currentUser;
  next();
});

// Middelware for checking login status for rendering pages
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  // 1) check if token
  if (req.cookies.jwt) {
    // 2) if in cookie, verify token
    jwt.verfiy(req.cookies.jwt, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new AppError("Authentication failed.", 401));
      } else {
        const currentUser = User.findById(decoded.id);
        if (!currentUser) {
          return next(new AppError("Can't find the user.", 401));
        }
        req.user = currentUser;
        next();
      }
    });
  } else {
    next();
  }
});
