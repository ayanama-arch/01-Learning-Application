const mongoose = require("mongoose");

const emailVerifySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: [true, "Please provide userId"],
  },
  otp: {
    type: String, // use String to preserve leading zeros
    required: [true, "Please provide otp"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 120, // 2 minutes in seconds
  },
});

const EmailVerifyModel =
  mongoose.models.EmailVerifyModel ||
  mongoose.model("EmailVerifyModel", emailVerifySchema);

module.exports = EmailVerifyModel;
