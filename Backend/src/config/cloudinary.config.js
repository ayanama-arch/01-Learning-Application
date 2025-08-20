const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "AlphaUploads",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [
      { width: 512, height: 512, crop: "limit" },
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return file.originalname.split(".")[0] + "-" + uniqueSuffix;
    },
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, GIF and WebP are allowed."),
      false
    );
  }
};

const uploadCloudinary = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 124 * 124,
    files: 5,
  },
});

module.exports = { uploadCloudinary, cloudinary };
