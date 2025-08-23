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
  // optional stuff
  subCategory: z.string().optional(),
  tags: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
  whatYouWillLearn: z.array(z.string()).optional(),
  targetAudience: z.array(z.string()).optional(),
});

const slugify = (text) => {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with dashes
    .replace(/^-+|-+$/g, ""); // remove leading/trailing dashes
};

module.exports = { createCourseSchema, slugify };
