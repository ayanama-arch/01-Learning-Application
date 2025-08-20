const express = require("express");
const passport = require("../../middleware/passport");
const UserController = require("../../controllers/user.controller");
const accessTokenAutoRefresh = require("../../middleware/accessTokenAutoRefresh");
const isAdmin = require("../../middleware/isAdmin");

const router = express.Router();

const authMiddlewares = [
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
];

router.get("/all-users", authMiddlewares, UserController.getAllUsers);
router.get("/all-students", authMiddlewares, UserController.getAllStudents);
router.get(
  "/all-instructors",
  authMiddlewares,
  UserController.getAllInstructors
);

module.exports = router;
