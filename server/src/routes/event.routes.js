import express from "express";

import * as eventController from "../controllers/event.controller.js";

import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";
import { uploadEventImages } from "../middleware/upload.js";

const router = express.Router();

/* ===========================================================
   PUBLIC ROUTES
=========================================================== */

router.get("/", eventController.getAllEvents);

router.get("/featured", eventController.getFeaturedEvents);

router.get("/upcoming", eventController.getUpcomingEvents);

router.get("/ongoing", eventController.getOngoingEvents);

router.get(
  "/statistics",
  eventController.getDashboardStatistics
);

router.get(
  "/category/:category",
  eventController.getEventsByCategory
);

router.get(
  "/slug/:slug",
  eventController.getEventBySlug
);

/* ===========================================================
   AUTHENTICATION
=========================================================== */

router.use(auth);

/* ===========================================================
   MEMBER EVENT REGISTRATION
=========================================================== */

router.get(
  "/my-registrations",
  eventController.getMyRegistrations
);

router.post(
  "/:id/register",
  eventController.registerForEvent
);

router.get(
  "/:id/registration",
  eventController.getMyRegistration
);

router.delete(
  "/:id/register",
  eventController.cancelRegistration
);

/* ===========================================================
   EVENT MANAGEMENT PERMISSIONS
=========================================================== */

const manageEvents = authorize(
  "super_admin",
  "admin",
  "events",
  "president"
);

/* ===========================================================
   EVENT MANAGEMENT ROUTES
=========================================================== */

router.post(
  "/",
  manageEvents,
  uploadEventImages,
  eventController.createEvent
);

router.put(
  "/:id",
  manageEvents,
  uploadEventImages,
  eventController.updateEvent
);

router.patch(
  "/:id/publish",
  manageEvents,
  eventController.publishEvent
);

router.patch(
  "/:id/archive",
  manageEvents,
  eventController.archiveEvent
);

router.delete(
  "/:id",
  manageEvents,
  eventController.deleteEvent
);

/* ===========================================================
   EVENT DETAILS
   (KEEP THIS LAST)
=========================================================== */

router.get(
  "/:id",
  eventController.getEventById
);

export default router;