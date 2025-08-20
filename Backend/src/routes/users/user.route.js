const express = require("express");
const passport = require("../../middleware/passport");
const accessTokenAutoRefresh = require("../../middleware/accessTokenAutoRefresh");
const UserController = require("../../controllers/user.controller");

const router = express.Router();

router.get(
  "/profile",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  UserController.getProfile
);

router.patch(
  "/update-profile",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  UserController.updateProfile
);

module.exports = router;
