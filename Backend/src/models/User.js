const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please provide email"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "please provide valid mail"],
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: [8, "Password must be at least 6 characters long"],
    validate: {
      validator: function (value) {
        // at least one uppercase, one lowercase, one digit
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value);
      },
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    },
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/dksgrqazo/image/upload/v1754118560/user-icon_qthvuz.png",
    },
    publicId: String, // For cloudinary
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    default: "student",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});

const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

module.exports = UserModel;
