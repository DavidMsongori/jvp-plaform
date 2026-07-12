import { body } from "express-validator";

/* ==========================================
   REGISTER VALIDATION
========================================== */

export const registerValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email.")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),

  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required."),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required."),

  body("nationalId")
    .trim()
    .notEmpty()
    .withMessage("National ID is required."),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required."),

  body("county")
    .notEmpty()
    .withMessage("County is required.")
    .isIn([
      "Mombasa",
      "Kwale",
      "Kilifi",
      "Tana River",
      "Lamu",
      "Taita Taveta",
    ])
    .withMessage("Invalid county."),

  body("membershipType")
    .optional()
    .isIn(["ordinary", "leadership"])
    .withMessage("Invalid membership type."),
];

/* ==========================================
   LOGIN VALIDATION
========================================== */

export const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email.")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required."),
];