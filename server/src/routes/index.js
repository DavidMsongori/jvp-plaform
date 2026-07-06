const express = require("express");

const router = express.Router();

const memberRoutes = require("./member.routes");

/* ==========================================
   API HEALTH
========================================== */

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "JVP Connect API is running.",
    timestamp: new Date(),
  });
});

/* ==========================================
   ROUTES
========================================== */

router.use("/members", memberRoutes);

module.exports = router;