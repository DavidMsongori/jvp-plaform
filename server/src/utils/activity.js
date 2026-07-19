import ActivityLog from "../models/ActivityLog.js";
import getActivityTitle from "./activityTitle.util.js";

import {
  ACTIVITY,
  ACTIVITY_MODULES,
  TARGET_TYPES,
} from "../constants/activity.constants.js";

/* ==========================================================
   LOG ACTIVITY
========================================================== */

export const logActivity = async ({
  user,
  action,
  module = ACTIVITY_MODULES.SYSTEM,
  targetType = TARGET_TYPES.SYSTEM,
  targetId = null,
  title = null,
  description = "",
  metadata = {},
  changes = null,
  status = "success",
  ipAddress = null,
  userAgent = null,
  session = null,
}) => {
  try {
    const activity = new ActivityLog({
      user,
      action,
      module,
      targetType,
      targetId,

      title:
  title ||
  getActivityTitle(action) ||
  action,

      description,

      metadata: {
        ...metadata,
        ...(changes ? { changes } : {}),
      },

      status,
      ipAddress,
      userAgent,
    });

    if (session) {
  await activity.save({ session });
} else {
  await activity.save();
}
    return activity;
  } catch (error) {
    console.error("[Activity Log]", error.message);

    // Logging should never stop the main request.
    return null;
  }
};

/* ==========================================================
   GENERIC SEARCH
========================================================== */

export const searchActivity = async (
  filters = {},
  options = {}
) => {
  const {
    limit = 50,
    skip = 0,
    sort = { createdAt: -1 },
    populateUser = true,
  } = options;

  let query = ActivityLog.find(filters).sort(sort);

  if (populateUser) {
    query = query.populate(
      "user",
      "email role"
    );
  }

  return query.skip(skip).limit(limit).lean();
};

/* ==========================================================
   TARGET ACTIVITY
========================================================== */

export const getActivityForTarget = (
  targetType,
  targetId,
  options = {}
) =>
  searchActivity(
    {
      targetType,
      targetId,
    },
    options
  );

/* ==========================================================
   USER ACTIVITY
========================================================== */

export const getUserActivity = (
  userId,
  options = {}
) =>
  searchActivity(
    {
      user: userId,
    },
    options
  );

/* ==========================================================
   MODULE ACTIVITY
========================================================== */

export const getModuleActivity = (
  module,
  options = {}
) =>
  searchActivity(
    {
      module,
    },
    options
  );

/* ==========================================================
   ACTION ACTIVITY
========================================================== */

export const getActivityByAction = (
  action,
  options = {}
) =>
  searchActivity(
    {
      action,
    },
    options
  );

/* ==========================================================
   STATUS ACTIVITY
========================================================== */

export const getActivityByStatus = (
  status,
  options = {}
) =>
  searchActivity(
    {
      status,
    },
    options
  );

/* ==========================================================
   RECENT ACTIVITY
========================================================== */

export const getRecentActivity = (
  limit = 20
) =>
  searchActivity(
    {},
    {
      limit,
    }
  );

/* ==========================================================
   DELETE OLD LOGS
========================================================== */

export const deleteLogsOlderThan = async (
  date
) => {
  return ActivityLog.deleteMany({
    createdAt: {
      $lt: date,
    },
  });
};

/* ==========================================================
   ACTIVITY STATISTICS
========================================================== */

export const getActivityStatistics =
  async () => {
    const [
      totalLogs,
      successfulLogs,
      failedLogs,
      warningLogs,
      todayLogs,
      moduleSummary,
    ] = await Promise.all([
      ActivityLog.countDocuments(),

      ActivityLog.countDocuments({
        status: "success",
      }),

      ActivityLog.countDocuments({
        status: "failed",
      }),

      ActivityLog.countDocuments({
        status: "warning",
      }),

      ActivityLog.countDocuments({
        createdAt: {
          $gte: new Date(
            new Date().setHours(
              0,
              0,
              0,
              0
            )
          ),
        },
      }),

      ActivityLog.aggregate([
        {
          $group: {
            _id: "$module",
            total: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            total: -1,
          },
        },
      ]),
    ]);

    return {
      totalLogs,

      successfulLogs,

      failedLogs,

      warningLogs,

      todayLogs,

      moduleSummary,
    };
  };

/* ==========================================================
   EXPORT CONSTANTS
========================================================== */

export {
  ACTIVITY,
  ACTIVITY_MODULES,
  TARGET_TYPES,
};

export const Activity = Object.freeze(ACTIVITY);

export const Modules = Object.freeze(
  ACTIVITY_MODULES
);

export const Targets = Object.freeze(
  TARGET_TYPES
);

/* ==========================================================
   DEFAULT EXPORT
========================================================== */

export default {
  logActivity,

  searchActivity,

  getActivityForTarget,

  getUserActivity,

  getModuleActivity,

  getActivityByAction,

  getActivityByStatus,

  getRecentActivity,

  deleteLogsOlderThan,

  getActivityStatistics,

  Activity,

  Modules,

  Targets,
};