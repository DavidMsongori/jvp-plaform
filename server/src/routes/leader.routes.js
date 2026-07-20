import express from "express";

import {
  createLeader,
  getLeaders,
  getLeader,
  updateLeader,
  deleteLeader,
} from "../controllers/leader.controller.js";

import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

/* ===========================================================
   PUBLIC ROUTES
=========================================================== */

router.get("/", getLeaders);

router.get("/:id", getLeader);

/* ===========================================================
   ADMIN ROUTES
=========================================================== */

router.post(
  "/",
  auth,
  authorize("admin", "super_admin"),
  createLeader
);

router.put(
  "/:id",
  auth,
  authorize("admin", "super_admin"),
  updateLeader
);

router.delete(
  "/:id",
  auth,
  authorize("admin", "super_admin"),
  deleteLeader
);

export default router;