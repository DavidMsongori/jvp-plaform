const express = require("express");

const router = express.Router();

const {
  activateMembership,
  verifyOTP,
  resendOTP,
  createPassword,
  login,
  forgotPassword,
  resetPassword,
  me,
} = require("../controllers/auth.controller");

const {
  protect,
} = require("../middleware/auth.middleware");

/* =====================================================
   PUBLIC AUTH ROUTES
===================================================== */

/**
 * Activate an existing (legacy) member account
 * POST /api/auth/activate
 */
router.post("/activate", activateMembership);

/**
 * Verify OTP
 * POST /api/auth/verify-otp
 */
router.post("/verify-otp", verifyOTP);

/**
 * Resend OTP
 * POST /api/auth/resend-otp
 */
router.post("/resend-otp", resendOTP);

/**
 * Create password after OTP verification
 * POST /api/auth/create-password
 */
router.post("/create-password", createPassword);

/**
 * Member Login
 * POST /api/auth/login
 */
router.post("/login", login);

/**
 * Forgot Password
 * POST /api/auth/forgot-password
 */
router.post("/forgot-password", forgotPassword);

/**
 * Reset Password
 * POST /api/auth/reset-password
 */
router.post("/reset-password", resetPassword);

/* =====================================================
   PROTECTED ROUTES
===================================================== */

/**
 * Get currently logged-in member
 * GET /api/auth/me
 */
router.get("/me", protect, me);

module.exports = router;