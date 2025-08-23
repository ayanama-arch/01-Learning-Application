const { z } = require("zod");

const TryCatch = require("../templates/trycatch");
const { ErrorCodes, ErrorHandler } = require("../templates/errorHandler");
const ApiResponse = require("../templates/apiResponse");
const CourseModel = require("../models/Course");
const { createCourseSchema } = require("../utils/Courses");

const createCourse = TryCatch(async (req, res, next) => {
  const parseResult = createCourseSchema.safeParse(req.body);

  if (!parseResult.success)
    return next(
      new ErrorHandler(ErrorCodes.BAD_REQUEST, "please provide valid info")
    );

  const value = parseResult.data;

  const existingCourse = await CourseModel.findOne({ slug: value.slug });

  if (existingCourse)
    return next(
      new ErrorHandler(
        ErrorCodes.CONFLICT,
        "course with slug already present, please provide unique slug"
      )
    );

  const course = await CourseModel.create({
    ...value,
    instructor: req.user._id,
  });

  return ApiResponse.success(res, course, "course created successfully");
});

const updateCourseDetails = TryCatch(async (req, res, next) => {});

module.exports = { createCourse };
