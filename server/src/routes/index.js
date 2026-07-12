import express from "express";

import authRoutes from "./auth.routes.js";
import memberRoutes from "./member.routes.js";
import healthRoutes from "./event.routes.js";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/member", memberRoutes);

export default router;