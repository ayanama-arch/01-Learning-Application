const TryCatch = require("../templates/trycatch");
const { ErrorCodes, ErrorHandler } = require("../templates/errorHandler");
const ApiResponse = require("../templates/apiResponse");
const CourseModel = require("../models/Course");
const {
  createCourseSchema,
  courseUpdateSchema,
  addCourseSectionSchema,
} = require("../utils/Courses");

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

const updateCourseDetails = TryCatch(async (req, res, next) => {
  const { courseId } = req.params;
  const courseParsedData = courseUpdateSchema.safeParse(req.body);

  if (!courseParsedData.success)
    return next(
      new ErrorHandler(ErrorCodes.BAD_REQUEST, "please send valid data.")
    );

  const values = courseParsedData.data;

  const existingCourse = await CourseModel.findById(courseId);
  if (!existingCourse)
    return next(
      new ErrorHandler(
        ErrorCodes.UNAUTHORIZED,
        "you are not eligible to edit the course content."
      )
    );

  if (
    existingCourse.instructor.toString() !== req.user._id.toString() &&
    !existingCourse.coInstructor.includes(req.user._id)
  ) {
    return next(
      new ErrorHandler(
        ErrorCodes.FORBIDDEN,
        "You don't have permission to update this course."
      )
    );
  }

  const updateFields = {};

  // Basic fields
  if (values.title) updateFields.title = values.title;
  if (values.category) updateFields.category = values.category;
  if (values.description) updateFields.description = values.description;
  if (values.level) updateFields.level = values.level;
  if (values.subCategory) updateFields.subCategory = values.subCategory;
  if (values.status) updateFields.status = values.status;

  // Media fields
  if (values.thumbnail) updateFields.thumbnail = values.thumbnail;
  if (values.previewVideo) updateFields.previewVideo = values.previewVideo;

  // Array fields
  if (values.tags) updateFields.tags = values.tags;
  if (values.requirements) updateFields.requirements = values.requirements;
  if (values.whatYouWillLearn)
    updateFields.whatYouWillLearn = values.whatYouWillLearn;
  if (values.targetAudience)
    updateFields.targetAudience = values.targetAudience;

  if (values.pricing) {
    // If pricing exists in the update, merge with existing pricing
    updateFields.pricing = {
      ...existingCourse.pricing.toObject(),
      ...values.pricing,
    };

    // Handle discount expiry date conversion if provided as string
    if (values.pricing.discountValidUntil) {
      updateFields.pricing.discountValidUntil = new Date(
        values.pricing.discountValidUntil
      );
    }
  }

  const options = {
    new: true, // Return updated document
    runValidators: true, // Run mongoose schema validators
    populate: [
      { path: "instructor", select: "name email avatar" },
      { path: "coInstructor", select: "name email avatar" },
    ],
  };

  const updatedCourse = await CourseModel.findByIdAndUpdate(
    courseId,
    { $set: updateFields },
    options
  );

  return ApiResponse.success(res, updatedCourse);
});

const addCoInstructor = TryCatch(async (req, res, next) => {});

const addCourseSection = TryCatch(async (req, res, next) => {
  const { courseId } = req.params;

  const parsedData = addCourseSectionSchema.safeParse(req.body);

  if (!parsedData.success)
    return next(
      new ErrorHandler(ErrorCodes.BAD_REQUEST, "please send valid data.")
    );

  const values = parsedData.data;

  const existingCourse = await CourseModel.findById(courseId);
  if (!existingCourse)
    return next(
      new ErrorHandler(
        ErrorCodes.UNAUTHORIZED,
        "you are not eligible to edit the course content."
      )
    );

  if (
    existingCourse.instructor.toString() !== req.user._id.toString() &&
    !existingCourse.coInstructor.includes(req.user._id)
  ) {
    return next(
      new ErrorHandler(
        ErrorCodes.FORBIDDEN,
        "You don't have permission to update this course."
      )
    );
  }

  console.log("HERE ", ...values.sections);

  existingCourse.sections.push(...values.sections);
  const updatedSectionData = await existingCourse.save();

  return ApiResponse.success(res, updatedSectionData);
});

module.exports = {
  createCourse,
  updateCourseDetails,
  addCoInstructor,
  addCourseSection,
};
