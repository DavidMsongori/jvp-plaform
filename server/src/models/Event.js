import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    /* ==========================================
       ORGANIZER
    ========================================== */

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    /* ==========================================
       BASIC INFORMATION
    ========================================== */

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    bannerImage: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "conference",
        "summit",
        "training",
        "workshop",
        "forum",
        "meeting",
        "competition",
        "community",
        "other",
      ],
      default: "other",
    },

    /* ==========================================
       REGISTRATION
    ========================================== */

    isPaid: {
      type: Boolean,
      default: false,
    },

    registrationFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    registrationDeadline: {
      type: Date,
      default: null,
    },

    maximumParticipants: {
      type: Number,
      default: null,
      min: 1,
    },

    /* ==========================================
       SCHEDULE
    ========================================== */

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    /* ==========================================
       VENUE
    ========================================== */

    venue: {
      type: String,
      required: true,
      trim: true,
    },

    county: {
      type: String,
      enum: [
        "Mombasa",
        "Kwale",
        "Kilifi",
        "Tana River",
        "Lamu",
        "Taita Taveta",
      ],
      required: true,
    },

    /* ==========================================
       EVENT STATUS
    ========================================== */

    status: {
      type: String,
      enum: [
        "draft",
        "published",
        "registration_closed",
        "ongoing",
        "completed",
        "cancelled",
      ],
      default: "draft",
    },

    featured: {
      type: Boolean,
      default: false,
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



eventSchema.index({
  startDate: 1,
});

eventSchema.index({
  status: 1,
});

eventSchema.index({
  county: 1,
});

const Event = mongoose.model("Event", eventSchema);

export default Event;


