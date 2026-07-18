import express from "express";

import * as eventController from "../controllers/event.controller.js";

import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

/* ===========================================================
   PUBLIC ROUTES
=========================================================== */

router.get("/", eventController.getAllEvents);

router.get("/featured", eventController.getFeaturedEvents);

router.get("/upcoming", eventController.getUpcomingEvents);

router.get("/ongoing", eventController.getOngoingEvents);

router.get("/statistics", eventController.getDashboardStatistics);

router.get(
  "/category/:category",
  eventController.getEventsByCategory
);

router.get(
  "/slug/:slug",
  eventController.getEventBySlug
);

router.get(
  "/:id",
  eventController.getEventById
);

/* ===========================================================
   PROTECTED ROUTES
=========================================================== */

router.use(auth);

/* ===========================================================
   EVENT MANAGEMENT
=========================================================== */

router.post(
  "/",
  authorize(
    "super_admin",
    "admin",
    "events",
    "president"
  ),
  eventController.createEvent
);

router.put(
  "/:id",
  authorize(
    "super_admin",
    "admin",
    "events",
    "president"
  ),
  eventController.updateEvent
);

router.delete(
  "/:id",
  authorize(
    "super_admin",
    "admin",
    "events",
    "president"
  ),
  eventController.deleteEvent
);

router.patch(
  "/:id/publish",
  authorize(
    "super_admin",
    "admin",
    "events",
    "president"
  ),
  eventController.publishEvent
);

router.patch(
  "/:id/archive",
  authorize(
    "super_admin",
    "admin",
    "events",
    "president"
  ),
  eventController.archiveEvent
);

/* ===========================================================
   ANALYTICS
=========================================================== */

router.patch("/:id/view", eventController.incrementViews);

router.patch("/:id/share", eventController.incrementShares);

router.patch("/:id/bookmark", eventController.incrementBookmarks);

router.patch("/:id/impression", eventController.incrementImpressions);

export default router;