const TryCatch = require("../templates/trycatch");
const { ErrorHandler, ErrorCodes } = require("../templates/errorHandler");
const ApiResponse = require("../templates/apiResponse");
const cloudinary = require("../config/cloudinary.config");

const uploadSingleFile = TryCatch((req, res, next) => {
  if (!req.file)
    return next(
      new ErrorHandler(ErrorCodes.INTERNAL_SERVER_ERROR, "No file uploaded")
    );

  return ApiResponse.success(
    res,
    {
      url: req.file.path,
      public_id: req.file.filename,
      original_name: req.file.originalname,
      size: req.file.size,
      format: req.file.format,
    },
    "File uploaded successfully"
  );
});

const uploadMultipleFiles = TryCatch((req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(ErrorCodes.BAD_REQUEST, "No files uploaded");
  }

  const uploadedFiles = req.files.map((file) => ({
    url: file.path,
    public_id: file.filename,
    original_name: file.originalname,
    size: file.size,
    format: file.format,
  }));

  return ApiResponse.success(
    res,
    uploadedFiles,
    `${req.files.length} files uploaded successfully`
  );
});

const deleteFile = TryCatch(async (req, res, next) => {
  const { public_id } = req.params;

  if (!public_id)
    return next(
      new ErrorHandler(ErrorCodes.BAD_REQUEST, "Public ID is required")
    );

  const result = await cloudinary.uploader.destroy(public_id);

  if (result.result === "ok") {
    return ApiResponse.success(res, null, "File deleted successfully");
  } else {
    return ApiResponse.error(res, "File not found or already deleted");
  }
});

module.exports = { uploadSingleFile, uploadMultipleFiles, deleteFile };
