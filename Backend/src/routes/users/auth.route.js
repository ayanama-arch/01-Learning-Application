const express = require("express");
const passport = require("../../middleware/passport");
const AuthController = require("../../controllers/auth.controller");
const accessTokenAutoRefresh = require("../../middleware/accessTokenAutoRefresh");
const router = express.Router();

router.post("/register", AuthController.createUser);
router.post("/verify", AuthController.verifyEmail);
router.post("/resend-otp", AuthController.resendOtp);
router.post("/login", AuthController.loginUser);
router.get("/refresh-token", AuthController.refreshToken);

router.post("/reset-password-email", AuthController.sendUserPasswordResetEmail);
router.post(
  "/verify-reset-password/:token",
  AuthController.verifyUserResetPassword
);

router.get(
  "/logout",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  AuthController.logoutUser
);
router.get(
  "/change-password",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  AuthController.changePassword
);

router.post(
  "/logout",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  AuthController.logoutUser
);

module.exports = router;
