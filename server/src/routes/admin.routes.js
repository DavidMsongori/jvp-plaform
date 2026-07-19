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
   GLOBAL ADMIN AUTHENTICATION
========================================================== */

router.use(auth);

/* ==========================================================
   DASHBOARD
========================================================== */

router.get(
  "/dashboard",
  authorize("admin", "super_admin"),
  getDashboard
);

/* ==========================================================
   MEMBER MANAGEMENT
========================================================== */

router
  .route("/members")
  .get(
    authorize("admin", "super_admin"),
    getMembers
  );

router
  .route("/members/:id")
  .get(
    authorize("admin", "super_admin"),
    getMemberById
  )
  .put(
    authorize("admin", "super_admin"),
    updateMemberValidator,
    validate,
    updateMember
  )
  .delete(
    authorize("super_admin"),
    deleteMember
  );

router.patch(
  "/members/:id/activate",
  authorize("admin", "super_admin"),
  activateMember
);

router.patch(
  "/members/:id/deactivate",
  authorize("admin", "super_admin"),
  deactivateMember
);

/* ==========================================================
   PAYMENT MANAGEMENT
========================================================== */

router
  .route("/payments")
  .get(
    authorize(
      "finance",
      "admin",
      "super_admin"
    ),
    getPayments
  );

router.patch(
  "/payments/:id/verify",
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

router
  .route("/events")
  .get(
    authorize(
      "events",
      "admin",
      "super_admin"
    ),
    getEvents
  )
  .post(
    authorize(
      "events",
      "admin",
      "super_admin"
    ),
    createEventValidator,
    validate,
    createEvent
  );

router
  .route("/events/:id")
  .get(
    authorize(
      "events",
      "admin",
      "super_admin"
    ),
    getEventById
  )
  .put(
    authorize(
      "events",
      "admin",
      "super_admin"
    ),
    updateEventValidator,
    validate,
    updateEvent
  )
  .delete(
    authorize("admin", "super_admin"),
    deleteEvent
  );

/* ==========================================================
   REPORTS
========================================================== */

router.get(
  "/reports",
  authorize("admin", "super_admin"),
  getReports
);

/* ==========================================================
   ACTIVITY LOGS
========================================================== */

router.get(
  "/activity-logs",
  authorize("admin", "super_admin"),
  getActivityLogs
);

export default router;