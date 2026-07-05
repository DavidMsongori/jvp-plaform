const express = require("express");

const router = express.Router();

/* ==========================================
   Route Imports
========================================== */

const authRoutes = require("./authRoutes");
const passwordRoutes = require("./passwordRoutes");
const memberRoutes = require("./memberRoutes");
const adminRoutes = require("./adminRoutes");
const importRoutes = require("./importRoutes");

/* ==========================================
   API Health Check
========================================== */

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    application: "JVP Connect API",
    version: "1.0.0",
    status: "Running",
    message: "JVP API is connected.",
  });
});

/* ==========================================
   API Routes
========================================== */

router.use("/auth", authRoutes);

router.use("/password", passwordRoutes);

router.use("/members", memberRoutes);

router.use("/admin", adminRoutes);

router.use("/import", importRoutes);

module.exports = router;