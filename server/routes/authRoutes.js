const express = require("express");

const router = express.Router();

const {

  activateMembership,

  verifyOTP,

  login,

  createPassword

} = require("../controllers/auth.controllers");

router.post("/activate", activateMembership);

router.post("/verify-otp", verifyOTP);

router.post("/create-password", createPassword);

router.post("/login", login);

module.exports = router;