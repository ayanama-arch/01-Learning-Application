const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    thumbnail: {
      url: String,
      publicId: String,
    },
    previewVideo: {
      url: String,
      publicId: String,
      duration: Number,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    coInstructor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
      },
    ],
    category: {
      type: String,
      required: true,
      enum: ["frontend", "backend", "devops", "programming language", "ui/ux"],
    },
    subCategory: String,
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    tags: [String],
    sections: [
      {
        title: { type: String, required: true },
        description: String,
        order: {
          type: Number,
          required: true,
        },
        lessons: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LessonModel",
          },
        ],
      },
    ],
    pricing: {
      type: {
        type: String,
        enum: ["free", "paid", "subscription"],
        required: true,
      },
      amount: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        default: "USD",
      },
      discountPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      discountValidUntil: Date,
    },
    requirements: [String],
    whatYouWillLearn: [String],
    targetAudience: [String],

    status: {
      type: String,
      enum: ["draft", "pending_review", "published", "archived"],
      default: "draft",
    },
    enrollmentCount: {
      type: Number,
      default: 0,
    },
    totalDuration: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    ratingsCount: {
      type: Number,
      default: 0,
    },
    totalRevenue: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const CourseModel =
  mongoose.models.CourseModel || mongoose.model("CourseModel", courseSchema);

module.exports = CourseModel;
