const validator = require("validator");
const ApiResponse = require("../templates/apiResponse");
const TryCatch = require("../templates/trycatch");
const { ErrorHandler, ErrorCodes } = require("../templates/errorHandler");
const validateName = require("../utils/nameValidator");
const UserModel = require("../models/User");

const getProfile = TryCatch(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(
      new ErrorHandler(ErrorCodes.UNAUTHORIZED, "please login to continue")
    );
  }
  return ApiResponse.success(res, user);
});

// Update profile
const updateProfile = TryCatch(async (req, res, next) => {
  const { firstName, lastName, bio, avatar } = req.body;

  // Build updates object step by step
  const updates = {};

  if (firstName !== undefined) {
    if (!validateName(firstName)) {
      return next(
        new ErrorHandler(ErrorCodes.BAD_REQUEST, "Invalid first name")
      );
    }
    updates.firstName = firstName.trim();
  }

  if (lastName !== undefined) {
    if (!validateName(lastName)) {
      return next(
        new ErrorHandler(ErrorCodes.BAD_REQUEST, "Invalid last name")
      );
    }
    updates.lastName = lastName.trim();
  }

  if (bio !== undefined) {
    if (String(bio).trim().length > 300) {
      return next(new ErrorHandler(ErrorCodes.BAD_REQUEST, "Bio too long"));
    }
    updates.bio = bio;
  }

  if (avatar !== undefined) {
    if (!avatar.url || !avatar.publicId || !validator.isURL(avatar.url)) {
      return next(new ErrorHandler(ErrorCodes.BAD_REQUEST, "Invalid avatar"));
    }
    updates.avatar = {
      url: avatar.url,
      publicId: avatar.publicId,
    };
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id, // <- fixed reference
    { $set: updates },
    { new: true, runValidators: true }
  ).select("-password");

  if (!updatedUser) {
    return next(new ErrorHandler(ErrorCodes.NOT_FOUND, "User not found"));
  }

  return ApiResponse.success(res, updatedUser, "Profile updated successfully");
});

const getAllUsers = TryCatch(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [users, totalUsers] = await Promise.all([
    UserModel.find({ role: { $ne: "admin" } })
      .select("-password")
      .skip(skip)
      .limit(limit),
    UserModel.countDocuments({ role: { $ne: "admin" } }),
  ]);

  if (!users || users.length === 0) {
    return next(new ErrorHandler(ErrorCodes.NOT_FOUND, "no users found"));
  }

  return ApiResponse.success(res, {
    users,
    pagination: {
      total: totalUsers,
      page,
      limit,
      totalPages: Math.ceil(totalUsers / limit),
    },
  });
});

const getAllInstructors = TryCatch(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const instructors = await UserModel.find({ role: "instructor" })
    .select("-password")
    .skip(skip)
    .limit(limit);

  const totalInstructors = await UserModel.countDocuments({
    role: "instructor",
  });

  if (!instructors || instructors.length === 0) {
    return next(new ErrorHandler(ErrorCodes.NOT_FOUND, "no instructors found"));
  }

  return ApiResponse.success(res, {
    instructors,
    pagination: {
      total: totalInstructors,
      page,
      pages: Math.ceil(totalInstructors / limit),
    },
  });
});

const getAllStudents = TryCatch(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // default page = 1
  const limit = parseInt(req.query.limit) || 10; // default limit = 10
  const skip = (page - 1) * limit;

  const [students, total] = await Promise.all([
    UserModel.find({ role: "student" })
      .select("-password")
      .skip(skip)
      .limit(limit),
    UserModel.countDocuments({ role: "student" }),
  ]);

  if (!students || students.length === 0) {
    return next(new ErrorHandler(ErrorCodes.NOT_FOUND, "No students found"));
  }

  return ApiResponse.success(res, {
    students,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  });
});

module.exports = {
  getProfile,
  updateProfile,
  getAllUsers,
  getAllInstructors,
  getAllStudents,
};
