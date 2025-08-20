const express = require("express");
const { uploadCloudinary } = require("../../config/cloudinary.config");
const UploadController = require("../../controllers/upload.controller");
const accessTokenAutoRefresh = require("../../middleware/accessTokenAutoRefresh");
const passport = require("../../middleware/passport");

const router = express.Router();

router.post(
  "/image/single",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  uploadCloudinary.single("file"),
  UploadController.uploadSingleFile
);

router.post(
  "/image/multiple",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  uploadCloudinary.array("files", 5),
  UploadController.uploadMultipleFiles
);

router.delete(
  "/image/:public_id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  UploadController.deleteFile
);

module.exports = router;
