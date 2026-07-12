import express from "express";

import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";
import validate from "../middleware/validate.js";

import {
  /* Dashboard */
  getDashboard,

  /* Members */
  getMembers,
  getMemberById,
  updateMember,
  activateMember,
  deactivateMember,
  deleteMember,

  /* Payments */
  getPayments,
  verifyPayment,

  /* Events */
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,

  /* Reports */
  getReports,

  /* Activity */
  getActivityLogs,

} from "../controllers/admin.controller.js";

import {
  updateMemberValidator,
  verifyPaymentValidator,
  createEventValidator,
  updateEventValidator,
} from "../utils/admin.validators.js";

const router = express.Router();

/* ==========================================================
   ADMIN DASHBOARD
========================================================== */

router.get(
  "/dashboard",
  auth,
  authorize("admin", "super_admin"),
  getDashboard
);

/* ==========================================================
   MEMBER MANAGEMENT
========================================================== */

// Get all members
router.get(
  "/members",
  auth,
  authorize("admin", "super_admin"),
  getMembers
);

// Get member
router.get(
  "/members/:id",
  auth,
  authorize("admin", "super_admin"),
  getMemberById
);

// Update member
router.put(
  "/members/:id",
  auth,
  authorize("admin", "super_admin"),
  updateMemberValidator,
  validate,
  updateMember
);

// Activate member
router.patch(
  "/members/:id/activate",
  auth,
  authorize("admin", "super_admin"),
  activateMember
);

// Deactivate member
router.patch(
  "/members/:id/deactivate",
  auth,
  authorize("admin", "super_admin"),
  deactivateMember
);

// Delete member
router.delete(
  "/members/:id",
  auth,
  authorize("super_admin"),
  deleteMember
);

/* ==========================================================
   PAYMENT MANAGEMENT
========================================================== */

// Get payments
router.get(
  "/payments",
  auth,
  authorize(
    "finance",
    "admin",
    "super_admin"
  ),
  getPayments
);

// Verify payment
router.patch(
  "/payments/:id/verify",
  auth,
  authorize(
    "finance",
    "admin",
    "super_admin"
  ),
  verifyPaymentValidator,
  validate,
  verifyPayment
);

/* ==========================================================
   EVENT MANAGEMENT
========================================================== */

// Get all events
router.get(
  "/events",
  auth,
  authorize(
    "events",
    "admin",
    "super_admin"
  ),
  getEvents
);

// Get single event
router.get(
  "/events/:id",
  auth,
  authorize(
    "events",
    "admin",
    "super_admin"
  ),
  getEventById
);

// Create event
router.post(
  "/events",
  auth,
  authorize(
    "events",
    "admin",
    "super_admin"
  ),
  createEventValidator,
  validate,
  createEvent
);

// Update event
router.put(
  "/events/:id",
  auth,
  authorize(
    "events",
    "admin",
    "super_admin"
  ),
  updateEventValidator,
  validate,
  updateEvent
);

// Delete event
router.delete(
  "/events/:id",
  auth,
  authorize(
    "admin",
    "super_admin"
  ),
  deleteEvent
);

/* ==========================================================
   REPORTS
========================================================== */

router.get(
  "/reports",
  auth,
  authorize(
    "admin",
    "super_admin"
  ),
  getReports
);

/* ==========================================================
   ACTIVITY LOGS
========================================================== */

router.get(
  "/activity-logs",
  auth,
  authorize(
    "admin",
    "super_admin"
  ),
  getActivityLogs
);

export default router;