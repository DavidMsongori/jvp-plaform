import mongoose from "mongoose";
import crypto from "crypto";

const eventRegistrationSchema = new mongoose.Schema(
  {
    /* ==========================================================
       REFERENCES
    ========================================================== */

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },

    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
      index: true,
    },

    /* ==========================================================
       REGISTRATION
    ========================================================== */

    registrationNumber: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
    },

    registrationDate: {
      type: Date,
      default: Date.now,
    },

    registrationStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "waitlisted",
        "cancelled",
        "declined",
      ],
      default: "pending",
    },

    /* ==========================================================
       PAYMENT
    ========================================================== */

    paymentRequired: {
      type: Boolean,
      default: false,
    },

    amount: {
      type: Number,
      default: 0,
      min: 0,
    },

    currency: {
      type: String,
      default: "KES",
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },

    paymentStatus: {
      type: String,
      enum: [
        "not_required",
        "pending",
        "paid",
        "failed",
        "refunded",
      ],
      default: "not_required",
    },

    /* ==========================================================
       TICKET
    ========================================================== */

    ticketType: {
      type: String,
      default: "General Admission",
      trim: true,
    },

    ticketNumber: {
      type: String,
      unique: true,
      sparse: true,
      uppercase: true,
    },

    qrCode: {
      type: String,
      trim: true,
    },

    /* ==========================================================
       ATTENDANCE
    ========================================================== */

    attendanceStatus: {
      type: String,
      enum: [
        "registered",
        "checked_in",
        "attended",
        "absent",
      ],
      default: "registered",
    },

    checkedIn: {
      type: Boolean,
      default: false,
    },

    checkInTime: Date,

    checkedInBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    /* ==========================================================
       CERTIFICATE
    ========================================================== */

    certificateEligible: {
      type: Boolean,
      default: false,
    },

    certificateIssued: {
      type: Boolean,
      default: false,
    },

    certificateIssuedAt: Date,

    certificateNumber: {
      type: String,
      trim: true,
    },

    certificateUrl: {
      type: String,
      trim: true,
    },

    /* ==========================================================
       FEEDBACK
    ========================================================== */

    feedbackSubmitted: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    feedback: {
      type: String,
      maxlength: 3000,
    },

    feedbackSubmittedAt: Date,

    /* ==========================================================
       CANCELLATION
    ========================================================== */

    cancelledAt: Date,

    cancellationReason: {
      type: String,
      maxlength: 1000,
    },

    /* ==========================================================
       NOTES
    ========================================================== */

    notes: {
      type: String,
      maxlength: 3000,
    },

    /* ==========================================================
       SYSTEM
    ========================================================== */

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

/* ==========================================================
   UNIQUE REGISTRATION PER MEMBER PER EVENT
========================================================== */

eventRegistrationSchema.index(
  {
    event: 1,
    member: 1,
  },
  {
    unique: true,
  }
);

/* ==========================================================
   SEARCH INDEXES
========================================================== */

eventRegistrationSchema.index({ attendanceStatus: 1 });

eventRegistrationSchema.index({ paymentStatus: 1 });

eventRegistrationSchema.index({ registrationStatus: 1 });

/* ==========================================================
   MIDDLEWARE
========================================================== */

eventRegistrationSchema.pre("save", async function () {
  if (!this.registrationNumber) {
    this.registrationNumber =
      "REG-" +
      new Date().getFullYear() +
      "-" +
      crypto.randomBytes(4).toString("hex").toUpperCase();
  }

  if (!this.ticketNumber) {
    this.ticketNumber =
      "TKT-" +
      crypto.randomBytes(5).toString("hex").toUpperCase();
  }

  if (!this.qrCode) {
    this.qrCode = crypto.randomUUID();
  }
});

/* ==========================================================
   VIRTUALS
========================================================== */

eventRegistrationSchema.virtual("isPaid").get(function () {
  return (
    this.paymentStatus === "paid" ||
    this.paymentStatus === "not_required"
  );
});

eventRegistrationSchema.virtual("canCheckIn").get(function () {
  return (
    this.registrationStatus === "confirmed" &&
    (
      this.paymentStatus === "paid" ||
      this.paymentStatus === "not_required"
    )
  );
});

/* ==========================================================
   METHODS
========================================================== */

eventRegistrationSchema.methods.checkIn = async function (userId) {
  this.checkedIn = true;
  this.checkInTime = new Date();
  this.checkedInBy = userId;
  this.attendanceStatus = "checked_in";

  return this.save();
};

eventRegistrationSchema.methods.markAttended = async function () {
  this.attendanceStatus = "attended";
  this.certificateEligible = true;

  return this.save();
};

eventRegistrationSchema.methods.cancel = async function (reason) {
  this.registrationStatus = "cancelled";
  this.cancelledAt = new Date();
  this.cancellationReason = reason;

  return this.save();
};

/* ==========================================================
   EXPORT
========================================================== */

const EventRegistration = mongoose.model(
  "EventRegistration",
  eventRegistrationSchema
);

export default EventRegistration;