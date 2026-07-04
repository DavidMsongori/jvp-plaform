const express = require("express");

const router = express.Router();

// Health Routes
router.use("/health", require("./health.routes"));

// Authentication Routes
router.use("/auth", require("./auth.routes"));

module.exports = router;