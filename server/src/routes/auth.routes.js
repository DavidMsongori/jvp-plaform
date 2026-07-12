import express from "express";

import {
  register,
  activateExistingMember,
  verifyOTP,
  resendOTP,
  createPassword,
  login,
  forgotPassword,
  resetPassword,
  logout,
  refreshToken,
} from "../controllers/auth.controller.js";

import validate from "../middleware/validate.js";

import {
  registerValidator,
  activateExistingMemberValidator,
  verifyOTPValidator,
  resendOTPValidator,
  createPasswordValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from "../utils/auth.validators.js";

const router = express.Router();

/* ==========================================================
   MEMBER REGISTRATION
========================================================== */

router.post(
  "/register",
  registerValidator,
  validate,
  register
);

/* ==========================================================
   IMPORTED MEMBER ACTIVATION
========================================================== */

router.post(
  "/activate",
  activateExistingMemberValidator,
  validate,
  activateExistingMember
);

/* ==========================================================
   OTP
========================================================== */

router.post(
  "/verify-otp",
  verifyOTPValidator,
  validate,
  verifyOTP
);

router.post(
  "/resend-otp",
  resendOTPValidator,
  validate,
  resendOTP
);

/* ==========================================================
   PASSWORD CREATION
========================================================== */

router.post(
  "/create-password",
  createPasswordValidator,
  validate,
  createPassword
);

/* ==========================================================
   LOGIN
========================================================== */

router.post(
  "/login",
  loginValidator,
  validate,
  login
);

/* ==========================================================
   PASSWORD RESET
========================================================== */

router.post(
  "/forgot-password",
  forgotPasswordValidator,
  validate,
  forgotPassword
);

router.post(
  "/reset-password",
  resetPasswordValidator,
  validate,
  resetPassword
);

/* ==========================================================
   TOKEN MANAGEMENT
========================================================== */

router.post(
  "/refresh-token",
  refreshToken
);

router.post(
  "/logout",
  logout
);

export default router;