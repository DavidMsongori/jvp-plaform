import { body } from "express-validator";

/* ==========================================
   UPDATE MEMBER PROFILE VALIDATION
========================================== */

export const updateProfileValidator = [
  body("firstName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty."),

  body("lastName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Last name cannot be empty."),

  body("phone")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Phone number cannot be empty.")
    .isLength({ min: 10, max: 15 })
    .withMessage("Please provide a valid phone number."),

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
    .withMessage("Invalid county."),
];