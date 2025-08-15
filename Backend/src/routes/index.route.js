const express = require("express");
const router = express.Router();

const authRouter = require("./auth/user.route");

router.use("/user", authRouter);

module.exports = router;
