const mongoose = require("mongoose");

const tokenModelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: [true, "please provide userId"],
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      index: true,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
      expires: 0, // TTL index - expire immediately when expiresAt is reached
    },
  },
  { timestamps: true }
);

const UserRefreshTokenModel =
  mongoose.models.UserRefreshTokenModel ||
  mongoose.model("UserRefreshTokenModel", tokenModelSchema);

module.exports = UserRefreshTokenModel;
