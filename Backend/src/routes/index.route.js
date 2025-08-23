const express = require("express");
const router = express.Router();

const authRoutes = require("./users/auth.route");
const uploadRoutes = require("./users/upload.route");
const userRoutes = require("./users/user.route");

const adminUserRoutes = require("./admin/user.route");
const adminCourseRoutes = require("./admin/course.route");

router.use("/auth", authRoutes);
router.use("/upload", uploadRoutes);
router.use("/user", userRoutes);

router.use("/admin/user", adminUserRoutes);
router.use("/admin/course", adminCourseRoutes);

module.exports = router;
