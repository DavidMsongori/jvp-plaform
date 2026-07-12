import { body } from "express-validator";

/* ==========================================================
   UPDATE MEMBER
========================================================== */

export const updateMemberValidator = [

  body("firstName")
    .optional()
    .trim()
    .isLength({
      min: 2,
      max: 50,
    })
    .withMessage(
      "First name must be between 2 and 50 characters."
    ),

  body("middleName")
    .optional()
    .trim()
    .isLength({
      max: 50,
    })
    .withMessage(
      "Middle name cannot exceed 50 characters."
    ),

  body("lastName")
    .optional()
    .trim()
    .isLength({
      min: 2,
      max: 50,
    })
    .withMessage(
      "Last name must be between 2 and 50 characters."
    ),

  body("phone")
    .optional()
    .trim()
    .matches(/^(\+254|0)[17]\d{8}$/)
    .withMessage(
      "Please provide a valid Kenyan phone number."
    ),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage(
      "Please provide a valid email address."
    )
    .normalizeEmail(),

  body("gender")
    .optional()
    .isIn([
      "Male",
      "Female",
    ])
    .withMessage(
      "Gender must be Male or Female."
    ),

  body("county")
    .optional()
    .isIn([
      "Mombasa",
      "Kwale",
      "Kilifi",
      "Tana River",
      "Lamu",
      "Taita Taveta",
    ])
    .withMessage(
      "Invalid county."
    ),

  body("membershipStatus")
    .optional()
    .isIn([
      "pending_payment",
      "active",
      "expired",
      "inactive",
    ])
    .withMessage(
      "Invalid membership status."
    ),

];

/* ==========================================================
   VERIFY PAYMENT
========================================================== */

export const verifyPaymentValidator = [

  body("remarks")
    .optional()
    .trim()
    .isLength({
      max: 500,
    })
    .withMessage(
      "Remarks cannot exceed 500 characters."
    ),

];

/* ==========================================================
   CREATE EVENT
========================================================== */

export const createEventValidator = [

  body("title")
    .trim()
    .notEmpty()
    .withMessage(
      "Event title is required."
    )
    .isLength({
      max: 150,
    })
    .withMessage(
      "Event title cannot exceed 150 characters."
    ),

  body("description")
    .trim()
    .notEmpty()
    .withMessage(
      "Event description is required."
    ),

  body("venue")
    .trim()
    .notEmpty()
    .withMessage(
      "Venue is required."
    ),

  body("county")
    .trim()
    .isIn([
      "Mombasa",
      "Kwale",
      "Kilifi",
      "Tana River",
      "Lamu",
      "Taita Taveta",
    ])
    .withMessage(
      "Invalid county."
    ),

  body("startDate")
    .isISO8601()
    .withMessage(
      "Invalid start date."
    ),

  body("endDate")
    .isISO8601()
    .withMessage(
      "Invalid end date."
    )
    .custom((value, { req }) => {

      if (

        new Date(value) <
        new Date(req.body.startDate)

      ) {

        throw new Error(
          "End date must be after the start date."
        );

      }

      return true;

    }),

  body("capacity")
    .optional()
    .isInt({
      min: 1,
    })
    .withMessage(
      "Capacity must be at least 1."
    ),

];

/* ==========================================================
   UPDATE EVENT
========================================================== */

export const updateEventValidator = [

  body("title")
    .optional()
    .trim()
    .isLength({
      max: 150,
    })
    .withMessage(
      "Event title cannot exceed 150 characters."
    ),

  body("description")
    .optional()
    .trim(),

  body("venue")
    .optional()
    .trim(),

  body("county")
    .optional()
    .isIn([
      "Mombasa",
      "Kwale",
      "Kilifi",
      "Tana River",
      "Lamu",
      "Taita Taveta",
    ])
    .withMessage(
      "Invalid county."
    ),

  body("startDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Invalid start date."
    ),

  body("endDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Invalid end date."
    ),

  body("capacity")
    .optional()
    .isInt({
      min: 1,
    })
    .withMessage(
      "Capacity must be greater than zero."
    ),

];