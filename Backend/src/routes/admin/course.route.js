const express = require("express");
const isAdmin = require("../../middleware/isAdmin");
const passport = require("../../middleware/passport");
const CourseController = require("../../controllers/course.controller");
const accessTokenAutoRefresh = require("../../middleware/accessTokenAutoRefresh");

const router = express.Router();

const authMiddlewares = [
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
];

router.post("/create", authMiddlewares, CourseController.createCourse);
router.patch(
  "/update/:courseId",
  authMiddlewares,
  CourseController.updateCourseDetails
);
router.patch(
  "/add/section/:courseId",
  authMiddlewares,
  CourseController.addCourseSection
);
module.exports = router;
