const express = require("express");

const router = express.Router();

const {
  createPassword,
} = require("../controllers/password.controllers");

router.post(
  "/create-password",
  createPassword
);

module.exports = router;