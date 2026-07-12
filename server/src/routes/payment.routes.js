import express from "express";

import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";

import {
  initiateMembershipPayment,
  verifyMembershipPayment,
  webhook,
  getPaymentHistory,
  getPayment,
  getAllPayments,
  getPaymentStatistics,
} from "../controllers/payment.controller.js";

import {
  membershipPaymentValidator,
  verifyPaymentValidator,
  paymentReferenceValidator,
  paymentWebhookValidator,
} from "../utils/payment.validators.js";

const router = express.Router();

/* ==========================================================
   MEMBER PAYMENTS
========================================================== */

/**
 * Initialize Membership Payment
 */

router.post(
  "/membership",
  auth,
  membershipPaymentValidator,
  validate,
  initiateMembershipPayment
);

/**
 * Member Payment History
 */

router.get(
  "/history",
  auth,
  getPaymentHistory
);

/**
 * Get Single Payment
 */

router.get(
  "/:reference",
  auth,
  paymentReferenceValidator,
  validate,
  getPayment
);

/* ==========================================================
   PAYMENT VERIFICATION
========================================================== */

/**
 * Flutterwave Redirect Verification
 */

router.get(
  "/verify/:transactionId",
  verifyPaymentValidator,
  validate,
  verifyMembershipPayment
);

/**
 * Flutterwave Webhook
 */

router.post(
  "/webhook",
  paymentWebhookValidator,
  validate,
  webhook
);

/* ==========================================================
   ADMIN PAYMENT MANAGEMENT
========================================================== */

/**
 * Get All Payments
 */

router.get(
  "/admin/all",
  auth,
  getAllPayments
);

/**
 * Payment Statistics
 */

router.get(
  "/admin/statistics",
  auth,
  getPaymentStatistics
);

export default router;