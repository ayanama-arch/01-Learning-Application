const { z } = require("zod");

const createCourseSchema = z.object({
  title: z.string().min(3).max(100),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug"),
  description: z.string().min(10).max(1000),
  category: z.enum([
    "frontend",
    "backend",
    "devops",
    "programming language",
    "ui/ux",
  ]),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  pricing: z.object({
    type: z.enum(["free", "paid", "subscription"]),
    amount: z.number().min(0).default(0).optional(),
    currency: z.string().length(3).default("USD").optional(),
    discountPercentage: z.number().min(0).max(100).default(0).optional(),
    discountValidUntil: z.date().optional(),
  }),
});

const courseUpdateSchema = z.object({
  // Basic Information (can be updated anytime)
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters")
    .trim()
    .optional(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),

  // Media files
  thumbnail: z
    .object({
      url: z.url("Invalid thumbnail URL").optional(),
      publicId: z.string().optional(),
    })
    .optional(),

  previewVideo: z
    .object({
      url: z.url("Invalid preview video URL").optional(),
      publicId: z.string().optional(),
      duration: z.number().positive("Duration must be positive").optional(),
    })
    .optional(),

  // Course metadata
  category: z
    .enum(["frontend", "backend", "devops", "programming language", "ui/ux"])
    .optional(),
  subCategory: z
    .string()
    .min(2, "Sub-category must be at least 2 characters")
    .optional(),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  tags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .max(10, "Maximum 10 tags")
    .optional(),

  // Pricing (complete replacement or partial update)
  pricing: z
    .object({
      type: z.enum(["free", "paid", "subscription"]).optional(),
      amount: z.number().min(0, "Amount cannot be negative").optional(),
      currency: z
        .string()
        .length(3, "Currency must be 3 characters")
        .toUpperCase()
        .optional(),
      discountPercentage: z.number().min(0).max(100).optional(),
      discountValidUntil: z.string().datetime().optional(),
    })
    .optional(),

  // Arrays that can be completely replaced or updated
  requirements: z
    .array(z.string().min(5, "Requirement must be at least 5 characters"))
    .max(20)
    .optional(),

  whatYouWillLearn: z
    .array(z.string().min(5, "Learning outcome must be at least 5 characters"))
    .max(30)
    .optional(),

  targetAudience: z
    .array(z.string().min(5, "Target audience must be at least 5 characters"))
    .max(15)
    .optional(),

  // Status updates
  status: z.enum(["draft", "published", "archived"]).optional(),
});

const sectionSchema = z.object({
  _id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid section ID")
    .optional(), // For updating existing sections
  title: z.string().min(1, "Section title is required"),
  description: z.string().optional(),
  order: z.number().int().positive("Order must be positive"),
  lessons: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid lesson ID"))
    .optional(),
});

const addCourseSectionSchema = z.object({
  sections: z.array(sectionSchema),
});

module.exports = {
  createCourseSchema,
  courseUpdateSchema,
  addCourseSectionSchema,
};

// Instructors
// coInstructor: z
//   .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid co-instructor ID"))
//   .optional(),

// // Course structure
// sections: z
//   .array(
//     z.object({
//       _id: z
//         .string()
//         .regex(/^[0-9a-fA-F]{24}$/)
//         .optional(), // For updating existing sections
//       title: z.string().min(1, "Section title is required"),
//       description: z.string().optional(),
//       order: z.number().int().positive("Order must be positive"),
//       lessons: z
//         .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid lesson ID"))
//         .optional(),
//     })
//   )
//   .optional(),
