const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin.controller");

const {
  protect,
  authorize,
} = require("../middleware/auth.middleware");

/* =====================================================
   ALL ADMIN ROUTES
===================================================== */

router.use(

  protect,

  authorize(

    "admin",

    "super_admin"

  )

);

/* =====================================================
   DASHBOARD
===================================================== */

router.get(

  "/dashboard",

  adminController.getDashboard

);

/* =====================================================
   MEMBERS
===================================================== */

router.get(

  "/members",

  adminController.getMembers

);

router.get(

  "/members/:id",

  adminController.getMember

);

router.put(

  "/members/:id",

  adminController.updateMember

);

router.delete(

  "/members/:id",

  adminController.deleteMember

);

/* =====================================================
   MEMBER APPLICATIONS
===================================================== */

router.get(

  "/applications",

  adminController.getApplications

);

/* =====================================================
   LEADERSHIP
===================================================== */

router.get(

  "/leadership",

  adminController.getLeadership

);

/* =====================================================
   EVENTS
===================================================== */

router.get(

  "/events",

  adminController.getEvents

);

/* =====================================================
   PROGRAMS
===================================================== */

router.get(

  "/programs",

  adminController.getPrograms

);

/* =====================================================
   COUNTIES
===================================================== */

router.get(

  "/counties",

  adminController.getCounties

);

/* =====================================================
   PAYMENTS
===================================================== */

router.get(

  "/payments",

  adminController.getPayments

);

/* =====================================================
   CERTIFICATES
===================================================== */

router.get(

  "/certificates",

  adminController.getCertificates

);

/* =====================================================
   NEWS
===================================================== */

router.get(

  "/news",

  adminController.getNews

);

/* =====================================================
   NOTIFICATIONS
===================================================== */

router.get(

  "/notifications",

  adminController.getNotifications

);

/* =====================================================
   SETTINGS
===================================================== */

router.get(

  "/settings",

  adminController.getSettings

);

router.put(

  "/settings",

  adminController.updateSettings

);

module.exports = router;