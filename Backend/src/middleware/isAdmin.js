const { ErrorHandler, ErrorCodes } = require("../templates/errorHandler");
const TryCatch = require("../templates/trycatch");

const isAdmin = TryCatch((req, res, next) => {
  if (!req.user)
    return next(
      new ErrorHandler(ErrorCodes.UNAUTHORIZED, "please login to continue")
    );

  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(ErrorCodes.FORBIDDEN, "Access denied: Admins only")
    );

  next();
});

module.exports = isAdmin;
