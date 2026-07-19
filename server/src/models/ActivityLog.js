import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    /* ======================================
       ACTOR
    ====================================== */

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    /* ======================================
       ACTION
    ====================================== */

    action: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    /* ======================================
       MODULE
    ====================================== */

    module: {
      type: String,
      enum: [
        "auth",
        "members",
        "payments",
        "events",
        "registrations",
        "venues",
        "speakers",
        "partners",
        "news",
        "blogs",
        "settings",
        "reports",
        "system",
      ],
      required: true,
      default: "system",
      index: true,
    },

    /* ======================================
       TARGET RESOURCE
    ====================================== */

    targetType: {
      type: String,
      enum: [
        "User",
        "Member",
        "Payment",
        "Event",
        "EventRegistration",
        "Venue",
        "Speaker",
        "Partner",
        "News",
        "Blog",
        "Setting",
        "Report",
        "System",
      ],
      required: true,
      default: "System",
      index: true,
    },

    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      index: true,
    },

    /* ======================================
       DESCRIPTION
    ====================================== */

    title: {
      type: String,
      trim: true,
      maxlength: 150,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 3000,
      default: "",
    },

    /* ======================================
       REQUEST DETAILS
    ====================================== */

    ipAddress: {
      type: String,
      trim: true,
      default: null,
    },

    userAgent: {
      type: String,
      trim: true,
      default: null,
    },

    /* ======================================
       METADATA
    ====================================== */

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    /* ======================================
       SUCCESS
    ====================================== */

    status: {
      type: String,
      enum: [
        "success",
        "warning",
        "failed",
      ],
      default: "success",
    },

    /* ======================================
       DATE
    ====================================== */

    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* ======================================
   INDEXES
====================================== */

activityLogSchema.index({
  targetType: 1,
  targetId: 1,
  createdAt: -1,
});

activityLogSchema.index({
  module: 1,
  createdAt: -1,
});

activityLogSchema.index({
  user: 1,
  createdAt: -1,
});

activityLogSchema.index({
  status: 1,
});

const ActivityLog = mongoose.model(
  "ActivityLog",
  activityLogSchema
);

export default ActivityLog;