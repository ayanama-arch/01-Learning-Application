const nodemailer = require("nodemailer");
const EmailVerifyModel = require("../models/verifyEmail.model");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your app password
  },
});

const sendOtpVerificationMail = async (user) => {
  try {
    const existingOtp = await EmailVerifyModel.findOne({ userId: user._id });

    if (existingOtp) {
      return {
        success: false,
        statusCode: 429, // Too many requests
        message: "Too many requests. Please wait before requesting a new OTP.",
      };
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    await EmailVerifyModel.create({
      userId: user._id,
      otp: otp.toString(),
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "OTP Verification",
      html: `
          <p>Hi ${user.firstName},</p>
          <p>Your OTP for verifying your email is:</p>
          <h2>${otp}</h2>
          <p>This OTP is valid for the next 2 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
          <p>— ON-LEARN Team</p>
        `,
    });

    return {
      success: true,
      statusCode: 200,
      message: "OTP sent successfully",
    };
  } catch (error) {
    console.error("OTP email error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Failed to send OTP",
      error: error.message,
    };
  }
};

module.exports = { sendOtpVerificationMail, transporter };
