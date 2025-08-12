// ===================================
// USER SCHEMA
// ===================================
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Authentication
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  
  // Profile Information
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    url: String,
    publicId: String // For cloudinary
  },
  bio: {
    type: String,
    maxlength: 500
  },
  
  // User Role & Status
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  
  // Learning Progress
  enrolledCourses: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0 // Percentage
    },
    lastAccessedAt: Date,
    completedAt: Date,
    certificateIssued: {
      type: Boolean,
      default: false
    }
  }],
  
  // Wishlist & Favorites
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  
  // Instructor Specific Fields
  expertise: [String], // Programming languages, skills
  experience: String,
  socialLinks: {
    linkedin: String,
    twitter: String,
    github: String,
    website: String
  },
  
  // Payment & Subscription
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled'],
      default: 'active'
    },
    startDate: Date,
    endDate: Date,
    stripeCustomerId: String
  },
  
  // Security
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  refreshTokens: [String], // For JWT refresh tokens
  
  // Analytics
  lastLogin: Date,
  loginCount: {
    type: Number,
    default: 0
  },
  totalLearningTime: {
    type: Number,
    default: 0 // in minutes
  }
}, {
  timestamps: true
});

// ===================================
// COURSE SCHEMA
// ===================================
const courseSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  shortDescription: {
    type: String,
    maxlength: 200
  },
  
  // Course Media
  thumbnail: {
    url: String,
    publicId: String
  },
  previewVideo: {
    url: String,
    publicId: String,
    duration: Number // in seconds
  },
  
  // Instructor Information
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coInstructors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // Course Structure
  category: {
    type: String,
    required: true,
    enum: ['programming', 'design', 'business', 'marketing', 'photography', 'music', 'other']
  },
  subCategory: String,
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  tags: [String],
  
  // Course Content Structure
  sections: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    order: {
      type: Number,
      required: true
    },
    lessons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    }]
  }],
  
  // Pricing & Access
  pricing: {
    type: {
      type: String,
      enum: ['free', 'paid', 'subscription'],
      required: true
    },
    amount: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    discountValidUntil: Date
  },
  
  // Course Requirements & Outcomes
  requirements: [String],
  whatYouWillLearn: [String],
  targetAudience: [String],
  
  // Status & Publication
  status: {
    type: String,
    enum: ['draft', 'pending_review', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: Date,
  
  // Analytics & Metrics
  enrollmentCount: {
    type: Number,
    default: 0
  },
  totalDuration: {
    type: Number,
    default: 0 // in minutes
  },
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  ratingsCount: {
    type: Number,
    default: 0
  },
  totalRevenue: {
    type: Number,
    default: 0
  },
  
  // SEO & Marketing
  metaDescription: String,
  metaKeywords: [String],
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  // Course Settings
  settings: {
    allowDownloads: {
      type: Boolean,
      default: false
    },
    enableCertificate: {
      type: Boolean,
      default: true
    },
    enableDiscussions: {
      type: Boolean,
      default: true
    },
    drip: {
      enabled: {
        type: Boolean,
        default: false
      },
      scheduleType: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        default: 'weekly'
      }
    }
  }
}, {
  timestamps: true
});

// ===================================
// LESSON SCHEMA
// ===================================
const lessonSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  order: {
    type: Number,
    required: true
  },
  
  // Lesson Content
  type: {
    type: String,
    enum: ['video', 'text', 'quiz', 'assignment', 'live'],
    required: true
  },
  
  // Video Content
  video: {
    url: String,
    publicId: String,
    duration: Number, // in seconds
    quality: [{
      resolution: String, // 720p, 1080p
      url: String
    }],
    subtitles: [{
      language: String,
      url: String
    }],
    thumbnail: String
  },
  
  // Text Content
  content: String, // Rich text/HTML content
  
  // Attachments & Resources
  attachments: [{
    name: String,
    url: String,
    type: String, // pdf, zip, etc.
    size: Number
  }],
  
  // Course Relationship
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  section: String, // Section title/id
  
  // Access Control
  isFree: {
    type: Boolean,
    default: false
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  
  // Quiz/Assignment Specific
  quiz: {
    questions: [{
      question: String,
      type: {
        type: String,
        enum: ['multiple_choice', 'true_false', 'short_answer']
      },
      options: [String], // For multiple choice
      correctAnswer: String,
      explanation: String,
      points: {
        type: Number,
        default: 1
      }
    }],
    passingScore: {
      type: Number,
      default: 70 // percentage
    },
    timeLimit: Number, // in minutes
    attempts: {
      type: Number,
      default: 3
    }
  },
  
  // Analytics
  viewCount: {
    type: Number,
    default: 0
  },
  averageWatchTime: {
    type: Number,
    default: 0 // percentage of video watched
  },
  
  // Status
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// ===================================
// PROGRESS SCHEMA
// ===================================
const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  
  // Overall Progress
  completionPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed'],
    default: 'not_started'
  },
  
  // Lesson Progress
  lessonsProgress: [{
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true
    },
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started'
    },
    watchTime: {
      type: Number,
      default: 0 // seconds watched
    },
    watchPercentage: {
      type: Number,
      default: 0 // percentage of video watched
    },
    lastWatchedAt: Date,
    completedAt: Date,
    
    // Quiz/Assignment Progress
    quizAttempts: [{
      attemptNumber: Number,
      score: Number,
      totalQuestions: Number,
      correctAnswers: Number,
      timeSpent: Number, // in seconds
      answers: [{
        questionId: String,
        selectedAnswer: String,
        isCorrect: Boolean
      }],
      attemptedAt: {
        type: Date,
        default: Date.now
      }
    }],
    bestQuizScore: {
      type: Number,
      default: 0
    },
    
    // Notes & Bookmarks
    notes: [{
      text: String,
      timestamp: Number, // for video notes
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],
    bookmarks: [{
      timestamp: Number,
      label: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }]
  }],
  
  // Learning Analytics
  totalTimeSpent: {
    type: Number,
    default: 0 // in minutes
  },
  averageSessionTime: {
    type: Number,
    default: 0 // in minutes
  },
  streakDays: {
    type: Number,
    default: 0
  },
  lastActivityDate: Date,
  
  // Milestones & Achievements
  milestonesReached: [{
    milestone: String, // '25% completed', 'first quiz passed'
    reachedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Certificate
  certificate: {
    issued: {
      type: Boolean,
      default: false
    },
    issuedAt: Date,
    certificateUrl: String,
    verificationCode: String
  },
  
  // Timestamps
  startedAt: Date,
  completedAt: Date
}, {
  timestamps: true
});

// ===================================
// REVIEW SCHEMA
// ===================================
const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  
  // Review Content
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    maxlength: 100
  },
  comment: {
    type: String,
    maxlength: 1000
  },
  
  // Review Breakdown
  ratingBreakdown: {
    contentQuality: Number,
    instructorDelivery: Number,
    courseValue: Number,
    courseStructure: Number
  },
  
  // Review Status
  isPublished: {
    type: Boolean,
    default: true
  },
  isVerifiedPurchase: {
    type: Boolean,
    default: false
  },
  
  // Interaction
  helpfulCount: {
    type: Number,
    default: 0
  },
  reportCount: {
    type: Number,
    default: 0
  },
  
  // Instructor Response
  instructorResponse: {
    message: String,
    respondedAt: Date
  }
}, {
  timestamps: true
});

// ===================================
// PAYMENT SCHEMA
// ===================================
const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Transaction Details
  transactionId: {
    type: String,
    unique: true,
    required: true
  },
  stripePaymentIntentId: String,
  paypalOrderId: String,
  
  // Purchase Information
  items: [{
    type: {
      type: String,
      enum: ['course', 'subscription'],
      required: true
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'items.type'
    },
    name: String,
    price: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    finalPrice: {
      type: Number,
      required: true
    }
  }],
  
  // Payment Details
  subtotal: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  
  // Payment Method
  paymentMethod: {
    type: String,
    enum: ['stripe', 'paypal', 'razorpay'],
    required: true
  },
  paymentMethodDetails: {
    last4: String,
    brand: String, // visa, mastercard
    country: String
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded', 'partially_refunded'],
    default: 'pending'
  },
  
  // Refund Information
  refund: {
    amount: Number,
    reason: String,
    refundedAt: Date,
    refundId: String
  },
  
  // Coupon/Discount
  couponUsed: {
    code: String,
    discountAmount: Number,
    discountType: {
      type: String,
      enum: ['percentage', 'fixed']
    }
  },
  
  // Revenue Sharing (for instructors)
  revenueShare: {
    instructorAmount: Number,
    platformAmount: Number,
    affiliateAmount: Number
  },
  
  // Metadata
  ipAddress: String,
  userAgent: String,
  
  // Timestamps
  paidAt: Date
}, {
  timestamps: true
});

// ===================================
// CATEGORY SCHEMA
// ===================================
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  icon: String,
  image: {
    url: String,
    publicId: String
  },
  
  // Hierarchy
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  
  // SEO
  metaDescription: String,
  metaKeywords: [String],
  
  // Analytics
  courseCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// ===================================
// COUPON SCHEMA
// ===================================
const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  description: String,
  
  // Discount Details
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true
  },
  maxDiscountAmount: Number, // for percentage discounts
  minPurchaseAmount: Number,
  
  // Usage Limits
  usageLimit: Number, // total times can be used
  usageCount: {
    type: Number,
    default: 0
  },
  perUserLimit: {
    type: Number,
    default: 1
  },
  
  // Validity
  validFrom: {
    type: Date,
    required: true
  },
  validTo: {
    type: Date,
    required: true
  },
  
  // Applicability
  applicableTo: {
    type: String,
    enum: ['all', 'specific_courses', 'category'],
    default: 'all'
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  categories: [String],
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Creator
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Create indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'enrolledCourses.courseId': 1 });

courseSchema.index({ instructor: 1 });
courseSchema.index({ category: 1 });
courseSchema.index({ status: 1 });
courseSchema.index({ title: 'text', description: 'text' }); // Text search

lessonSchema.index({ course: 1, order: 1 });

progressSchema.index({ user: 1, course: 1 });
progressSchema.index({ user: 1 });
progressSchema.index({ course: 1 });

reviewSchema.index({ course: 1 });
reviewSchema.index({ user: 1 });

paymentSchema.index({ user: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ transactionId: 1 });

// Export schemas
module.exports = {
  User: mongoose.model('User', userSchema),
  Course: mongoose.model('Course', courseSchema),
  Lesson: mongoose.model('Lesson', lessonSchema),
  Progress: mongoose.model('Progress', progressSchema),
  Review: mongoose.model('Review', reviewSchema),
  Payment: mongoose.model('Payment', paymentSchema),
  Category: mongoose.model('Category', categorySchema),
  Coupon: mongoose.model('Coupon', couponSchema)
};