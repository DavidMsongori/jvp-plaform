import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(

  {

    /* ======================================
       USER
    ====================================== */

    user: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

    },

    /* ======================================
       ACTION
    ====================================== */

    action: {

      type: String,

      required: true,

      trim: true,

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

        "reports",

        "settings",

        "system",

      ],

      default: "system",

    },

    /* ======================================
       DESCRIPTION
    ====================================== */

    description: {

      type: String,

      trim: true,

      default: "",

    },

    /* ======================================
       TARGET RECORD
    ====================================== */

    targetId: {

      type: mongoose.Schema.Types.ObjectId,

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
       DATE
    ====================================== */

    date: {

      type: Date,

      default: Date.now,

    },

  },

  {

    timestamps: true,

    versionKey: false,

  }

);

activityLogSchema.index({

  user: 1,

  createdAt: -1,

});

activityLogSchema.index({

  module: 1,

});

activityLogSchema.index({

  action: 1,

});

const ActivityLog = mongoose.model(

  "ActivityLog",

  activityLogSchema

);

export default ActivityLog;