import { body, param } from "express-validator";

/* ==========================================================
   MEMBERSHIP PAYMENT
========================================================== */

export const membershipPaymentValidator = [

  body()

    .custom(() => true),

];

/* ==========================================================
   MEMBERSHIP RENEWAL
========================================================== */

export const renewalPaymentValidator = [

  body()

    .custom(() => true),

];

/* ==========================================================
   EVENT PAYMENT
========================================================== */

export const eventPaymentValidator = [

  body("eventId")

    .notEmpty()

    .withMessage("Event ID is required.")

    .isMongoId()

    .withMessage("Invalid Event ID."),

];

/* ==========================================================
   VERIFY PAYMENT
========================================================== */

export const verifyPaymentValidator = [

  param("transactionId")

    .notEmpty()

    .withMessage("Transaction ID is required."),

];

/* ==========================================================
   PAYMENT REFERENCE
========================================================== */

export const paymentReferenceValidator = [

  param("reference")

    .notEmpty()

    .withMessage("Payment reference is required."),

];

/* ==========================================================
   FLUTTERWAVE WEBHOOK
========================================================== */

export const paymentWebhookValidator = [

  body("event")

    .notEmpty()

    .withMessage("Webhook event is required."),

  body("data")

    .notEmpty()

    .withMessage("Webhook payload is required."),

];

/* ==========================================================
   ADMIN FILTERS
========================================================== */

export const paymentFilterValidator = [

  body("status")

    .optional()

    .isIn([

      "pending",

      "successful",

      "failed",

    ])

    .withMessage("Invalid payment status."),

  body("paymentFor")

    .optional()

    .isIn([

      "membership",

      "renewal",

      "event",

    ])

    .withMessage("Invalid payment type."),

];