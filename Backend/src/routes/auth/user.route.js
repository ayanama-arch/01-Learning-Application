const express = require("express");
const passport = require("../../middleware/passport");
const UserController = require("../../controllers/user.controller");
const accessTokenAutoRefresh = require("../../middleware/accessTokenAutoRefresh");
const router = express.Router();

router.post("/register", UserController.createUser);
router.post("/verify", UserController.verifyEmail);
router.post("/resend-otp", UserController.resendOtp);
router.post("/login", UserController.loginUser);
router.get("/refresh-token", UserController.refreshToken);

router.post("/reset-password-email", UserController.sendUserPasswordResetEmail);
router.post(
  "/verify-reset-password/:token",
  UserController.verifyUserResetPassword
);

router.get(
  "/profile",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  UserController.getProfile
);
router.get(
  "/logout",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  UserController.logoutUser
);
router.get(
  "/change-password",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  UserController.changePassword
);

router.post(
  "/logout",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  UserController.logoutUser
);
router.post(
  "/change-password",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  UserController.changePassword
);

module.exports = router;
