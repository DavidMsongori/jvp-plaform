import { ACTIVITY } from "../constants/activity.constants.js";

/* ==========================================================
   ACTIVITY TITLES
========================================================== */

const ACTIVITY_TITLES = {
  /* ======================================
     AUTH
  ====================================== */

  [ACTIVITY.AUTH.LOGIN]: "User Logged In",
  [ACTIVITY.AUTH.LOGOUT]: "User Logged Out",
  [ACTIVITY.AUTH.REGISTER]: "User Registered",
  [ACTIVITY.AUTH.VERIFY_EMAIL]: "Email Verified",
  [ACTIVITY.AUTH.RESET_PASSWORD]: "Password Reset",
  [ACTIVITY.AUTH.CHANGE_PASSWORD]: "Password Changed",
  [ACTIVITY.AUTH.REFRESH_TOKEN]: "Session Refreshed",

  /* ======================================
     MEMBERS
  ====================================== */

  [ACTIVITY.MEMBER.CREATED]: "Member Created",
  [ACTIVITY.MEMBER.UPDATED]: "Member Updated",
  [ACTIVITY.MEMBER.ACTIVATED]: "Member Activated",
  [ACTIVITY.MEMBER.DEACTIVATED]: "Member Deactivated",
  [ACTIVITY.MEMBER.IMPORTED]: "Member Imported",
  [ACTIVITY.MEMBER.PROFILE_UPDATED]: "Profile Updated",
  [ACTIVITY.MEMBER.PHOTO_UPDATED]: "Profile Photo Updated",
  [ACTIVITY.MEMBER.RENEWED]: "Membership Renewed",
  [ACTIVITY.MEMBER.STATUS_CHANGED]: "Membership Status Changed",
  [ACTIVITY.MEMBER.TYPE_CHANGED]: "Membership Type Changed",

  /* ======================================
     PAYMENTS
  ====================================== */

  [ACTIVITY.PAYMENT.CREATED]: "Payment Created",
  [ACTIVITY.PAYMENT.SUCCESSFUL]: "Payment Successful",
  [ACTIVITY.PAYMENT.FAILED]: "Payment Failed",
  [ACTIVITY.PAYMENT.VERIFIED]: "Payment Verified",
  [ACTIVITY.PAYMENT.REFUNDED]: "Payment Refunded",

  /* ======================================
     EVENTS
  ====================================== */

  [ACTIVITY.EVENT.CREATED]: "Event Created",
  [ACTIVITY.EVENT.UPDATED]: "Event Updated",
  [ACTIVITY.EVENT.DELETED]: "Event Deleted",
  [ACTIVITY.EVENT.PUBLISHED]: "Event Published",
  [ACTIVITY.EVENT.CANCELLED]: "Event Cancelled",

  /* ======================================
     REGISTRATIONS
  ====================================== */

  [ACTIVITY.REGISTRATION.REGISTERED]: "Event Registration",
  [ACTIVITY.REGISTRATION.CONFIRMED]: "Registration Confirmed",
  [ACTIVITY.REGISTRATION.WAITLISTED]: "Added to Waiting List",
  [ACTIVITY.REGISTRATION.CANCELLED]: "Registration Cancelled",
  [ACTIVITY.REGISTRATION.CHECKED_IN]: "Checked In",
  [ACTIVITY.REGISTRATION.ATTENDED]: "Attendance Confirmed",
  [ACTIVITY.REGISTRATION.CERTIFICATE_ISSUED]: "Certificate Issued",

  /* ======================================
     VENUES
  ====================================== */

  [ACTIVITY.VENUE.CREATED]: "Venue Created",
  [ACTIVITY.VENUE.UPDATED]: "Venue Updated",
  [ACTIVITY.VENUE.DELETED]: "Venue Deleted",

  /* ======================================
     SPEAKERS
  ====================================== */

  [ACTIVITY.SPEAKER.CREATED]: "Speaker Created",
  [ACTIVITY.SPEAKER.UPDATED]: "Speaker Updated",
  [ACTIVITY.SPEAKER.DELETED]: "Speaker Deleted",

  /* ======================================
     PARTNERS
  ====================================== */

  [ACTIVITY.PARTNER.CREATED]: "Partner Created",
  [ACTIVITY.PARTNER.UPDATED]: "Partner Updated",
  [ACTIVITY.PARTNER.DELETED]: "Partner Deleted",

  /* ======================================
     NEWS
  ====================================== */

  [ACTIVITY.NEWS.CREATED]: "News Created",
  [ACTIVITY.NEWS.UPDATED]: "News Updated",
  [ACTIVITY.NEWS.PUBLISHED]: "News Published",
  [ACTIVITY.NEWS.DELETED]: "News Deleted",

  /* ======================================
     BLOGS
  ====================================== */

  [ACTIVITY.BLOG.CREATED]: "Blog Created",
  [ACTIVITY.BLOG.UPDATED]: "Blog Updated",
  [ACTIVITY.BLOG.PUBLISHED]: "Blog Published",
  [ACTIVITY.BLOG.DELETED]: "Blog Deleted",

  /* ======================================
     SETTINGS
  ====================================== */

  [ACTIVITY.SETTINGS.UPDATED]: "Settings Updated",

  /* ======================================
     REPORTS
  ====================================== */

  [ACTIVITY.REPORT.GENERATED]: "Report Generated",
  [ACTIVITY.REPORT.EXPORTED]: "Report Exported",

  /* ======================================
     SYSTEM
  ====================================== */

  [ACTIVITY.SYSTEM.BACKUP]: "System Backup",
  [ACTIVITY.SYSTEM.RESTORE]: "System Restored",
  [ACTIVITY.SYSTEM.MAINTENANCE]: "Maintenance Mode",
};

/* ==========================================================
   GET TITLE
========================================================== */

export const getActivityTitle = (action) => {
  return ACTIVITY_TITLES[action] || "System Activity";
};

export default getActivityTitle;