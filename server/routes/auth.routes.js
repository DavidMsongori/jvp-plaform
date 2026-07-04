const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controllers");

const {
  registerValidation,
} = require("../validators/auth.validators");

router.post(
  "/register",
  registerValidation,
  authController.register
);

router.post(
  "/login",
  authController.login
);

console.log("✅ Auth routes loaded");
module.exports = router;