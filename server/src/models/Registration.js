import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    /* ==========================================
       MEMBER
    ========================================== */

    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    /* ==========================================
       EVENT
    ========================================== */

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    /* ==========================================
       PAYMENT
    ========================================== */

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      default: null,
    },

    /* ==========================================
       REGISTRATION
    ========================================== */

    registrationNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    registrationStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "cancelled",
      ],
      default: "pending",
    },

    registeredAt: {
      type: Date,
      default: Date.now,
    },

    /* ==========================================
       ATTENDANCE
    ========================================== */

    attendanceStatus: {
      type: String,
      enum: [
        "not_checked_in",
        "checked_in",
        "checked_out",
        "absent",
      ],
      default: "not_checked_in",
    },

    checkedInAt: {
      type: Date,
      default: null,
    },

    checkedOutAt: {
      type: Date,
      default: null,
    },

    /* ==========================================
       CERTIFICATE
    ========================================== */

    certificateIssued: {
      type: Boolean,
      default: false,
    },

    certificateNumber: {
      type: String,
      default: null,
      trim: true,
    },

    certificateIssuedAt: {
      type: Date,
      default: null,
    },

    /* ==========================================
       NOTES
    ========================================== */

    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* ==========================================
   INDEXES
========================================== */

// A member can only register once for the same event.
registrationSchema.index(
  {
    member: 1,
    event: 1,
  },
  {
    unique: true,
  }
);


registrationSchema.index({
  registrationStatus: 1,
});

registrationSchema.index({
  attendanceStatus: 1,
});

const Registration = mongoose.model(
  "Registration",
  registrationSchema
);

export default Registration;