import ActivityLog from "../models/ActivityLog.js";

/* ==========================================================
   LOG ACTIVITY
========================================================== */

export const logActivity = async ({

  user,

  action,

  module = "system",

  description = "",

  targetId = null,

  metadata = {},

}) => {

  return ActivityLog.create({

    user,

    action,

    module,

    description,

    targetId,

    metadata,

  });

};

/* ==========================================================
   ACTIVITY TYPES
========================================================== */

export const ActivityModules = {

  AUTH: "auth",

  MEMBERS: "members",

  PAYMENTS: "payments",

  EVENTS: "events",

  REPORTS: "reports",

  SETTINGS: "settings",

  SYSTEM: "system",

};

export default {

  logActivity,

  ActivityModules,

};