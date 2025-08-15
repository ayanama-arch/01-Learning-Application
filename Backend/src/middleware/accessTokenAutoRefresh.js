const jwt = require("jsonwebtoken");
const TryCatch = require("../templates/trycatch");
const { ErrorHandler, ErrorCodes } = require("../templates/errorHandler");

const accessTokenAutoRefresh = TryCatch(async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return next(
      new ErrorHandler(ErrorCodes.UNAUTHORIZED, "Please login to continue")
    );
  }

  // Check if Token is Expired
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return next(new ErrorHandler(ErrorCodes.UNAUTHORIZED, "TokenExpired"));
      }

      return next(
        new ErrorHandler(ErrorCodes.UNAUTHORIZED, "Token is not valid")
      );
    }
    req.user = decoded;
    // Set Authorization header so passport-jwt can authenticate
    req.headers.authorization = `Bearer ${accessToken}`;
    next();
  });
});

module.exports = accessTokenAutoRefresh;
