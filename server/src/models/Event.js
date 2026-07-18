import mongoose from "mongoose";
import slugify from "slugify";

import cloudinaryImageSchema from "./schemas/cloudinaryImage.schema.js";
import galleryItemSchema from "./schemas/galleryItem.schema.js";
import seoSchema from "./schemas/seo.schema.js";

/* ===========================================================
   SESSION
=========================================================== */

const sessionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 3000,
    },

    speaker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Speaker",
    },

    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      required: true,
    },

    capacity: {
      type: Number,
      min: 0,
    },

    order: {
      type: Number,
      default: 0,
      min: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

/* ===========================================================
   REGISTRATION SETTINGS
=========================================================== */

const registrationSchema = new mongoose.Schema(
  {
    enabled: {
      type: Boolean,
      default: true,
    },

    requiresMembership: {
      type: Boolean,
      default: false,
    },

    paymentRequired: {
      type: Boolean,
      default: false,
    },

    registrationFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    currency: {
      type: String,
      default: "KES",
    },

    capacity: {
      type: Number,
      default: 0,
      min: 0,
    },

    minimumAge: {
      type: Number,
      min: 0,
    },

    maximumAge: {
      type: Number,
      min: 0,
    },

    allowWaitlist: {
      type: Boolean,
      default: true,
    },

    approvalRequired: {
      type: Boolean,
      default: false,
    },

    opensAt: {
      type: Date,
    },

    closesAt: {
      type: Date,
    },
  },
  {
    _id: false,
  }
);

/* ===========================================================
   EVENT
=========================================================== */

const eventSchema = new mongoose.Schema(
  {
    /* =======================================================
       BASIC INFORMATION
    ======================================================= */

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 15000,
    },

    category: {
      type: String,
      enum: [
        "conference",
        "summit",
        "training",
        "workshop",
        "forum",
        "webinar",
        "networking",
        "competition",
        "sports",
        "tree_planting",
        "community_service",
        "career_fair",
        "meeting",
        "leadership",
        "other",
      ],
      default: "other",
    },

    eventType: {
      type: String,
      enum: [
        "physical",
        "virtual",
        "hybrid",
      ],
      default: "physical",
    },

    /* =======================================================
       MEDIA
    ======================================================= */

    coverImage: cloudinaryImageSchema,

    gallery: [galleryItemSchema],

    /* =======================================================
       EVENT DATES
    ======================================================= */

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    timezone: {
      type: String,
      default: "Africa/Nairobi",
    },

    /* =======================================================
       VENUE
    ======================================================= */

    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      required: true,
    },

    virtualLink: {
      type: String,
      trim: true,
      default: "",
    },
        /* =======================================================
       REGISTRATION
    ======================================================= */

    registration: registrationSchema,

    registeredParticipants: {
      type: Number,
      default: 0,
      min: 0,
    },

    confirmedParticipants: {
      type: Number,
      default: 0,
      min: 0,
    },

    waitlistedParticipants: {
      type: Number,
      default: 0,
      min: 0,
    },

    attendedParticipants: {
      type: Number,
      default: 0,
      min: 0,
    },

    cancelledRegistrations: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* =======================================================
       PROGRAM
    ======================================================= */

    speakers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Speaker",
      },
    ],

    sessions: [sessionSchema],

    /* =======================================================
       PARTNERS
    ======================================================= */

    partners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Partner",
      },
    ],

    /* =======================================================
       TAGS
    ======================================================= */

    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    /* =======================================================
       VISIBILITY
    ======================================================= */

    featured: {
      type: Boolean,
      default: false,
    },

    showOnHomepage: {
      type: Boolean,
      default: false,
    },

    isPublic: {
      type: Boolean,
      default: true,
    },

    allowSharing: {
      type: Boolean,
      default: true,
    },

    /* =======================================================
       SEO
    ======================================================= */

    seo: seoSchema,

    /* =======================================================
       ANALYTICS
    ======================================================= */

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    shares: {
      type: Number,
      default: 0,
      min: 0,
    },

    bookmarks: {
      type: Number,
      default: 0,
      min: 0,
    },

    impressions: {
      type: Number,
      default: 0,
      min: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalRatings: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* =======================================================
       STATUS
    ======================================================= */

    status: {
      type: String,
      enum: [
        "draft",
        "published",
        "registration_open",
        "registration_closed",
        "ongoing",
        "completed",
        "cancelled",
        "postponed",
      ],
      default: "draft",
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    archiveDate: {
      type: Date,
    },

    /* =======================================================
       AUDIT
    ======================================================= */

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    publishedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    publishedAt: {
      type: Date,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

/* ===========================================================
   VIRTUALS
=========================================================== */

/**
 * Returns true if registration is currently open.
 */
eventSchema.virtual("isRegistrationOpen").get(function () {
  if (!this.registration?.enabled) return false;

  const now = new Date();

  if (
    this.registration.opensAt &&
    now < this.registration.opensAt
  ) {
    return false;
  }

  if (
    this.registration.closesAt &&
    now > this.registration.closesAt
  ) {
    return false;
  }

  if (
    this.registration.capacity > 0 &&
    this.registeredParticipants >= this.registration.capacity &&
    !this.registration.allowWaitlist
  ) {
    return false;
  }

  return true;
});

/**
 * Remaining available slots.
 * Returns null when capacity is unlimited.
 */
eventSchema.virtual("availableSlots").get(function () {
  if (!this.registration?.capacity) return null;

  return Math.max(
    this.registration.capacity - this.registeredParticipants,
    0
  );
});

/**
 * Event duration in days.
 */
eventSchema.virtual("durationInDays").get(function () {
  const oneDay = 1000 * 60 * 60 * 24;

  return (
    Math.ceil(
      (this.endDate - this.startDate) / oneDay
    ) + 1
  );
});

/**
 * Whether the event has already started.
 */
eventSchema.virtual("hasStarted").get(function () {
  return new Date() >= this.startDate;
});

/**
 * Whether the event has ended.
 */
eventSchema.virtual("hasEnded").get(function () {
  return new Date() > this.endDate;
});

/**
 * Whether the event is currently taking place.
 */
eventSchema.virtual("isOngoing").get(function () {
  const now = new Date();

  return now >= this.startDate && now <= this.endDate;
});

/* ===========================================================
   INDEXES
=========================================================== */

eventSchema.index({ status: 1 });

eventSchema.index({ category: 1 });

eventSchema.index({ featured: 1 });

eventSchema.index({ showOnHomepage: 1 });

eventSchema.index({ startDate: 1 });

eventSchema.index({ endDate: 1 });

eventSchema.index({ eventType: 1 });

eventSchema.index({ "registration.enabled": 1 });

eventSchema.index({
  title: "text",
  shortDescription: "text",
  description: "text",
  tags: "text",
});

/* ===========================================================
   MIDDLEWARE
=========================================================== */

eventSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  next();
});

eventSchema.pre("save", function (next) {
  if (this.endDate < this.startDate) {
    return next(
      new Error("End date cannot be earlier than start date.")
    );
  }

  if (
    this.registration?.opensAt &&
    this.registration?.closesAt &&
    this.registration.opensAt > this.registration.closesAt
  ) {
    return next(
      new Error(
        "Registration opening date must be before closing date."
      )
    );
  }

  next();
});

/* ===========================================================
   INSTANCE METHODS
=========================================================== */

eventSchema.methods.incrementViews = async function () {
  this.views += 1;
  return this.save();
};

eventSchema.methods.incrementShares = async function () {
  this.shares += 1;
  return this.save();
};

eventSchema.methods.incrementBookmarks = async function () {
  this.bookmarks += 1;
  return this.save();
};

eventSchema.methods.incrementImpressions = async function () {
  this.impressions += 1;
  return this.save();
};

/**
 * Publish event.
 */
eventSchema.methods.publish = async function (userId) {
  this.isPublished = true;
  this.status = "published";
  this.publishedBy = userId;
  this.publishedAt = new Date();

  return this.save();
};

/**
 * Archive event.
 */
eventSchema.methods.archive = async function () {
  this.isArchived = true;
  this.archiveDate = new Date();

  return this.save();
};

/* ===========================================================
   STATIC METHODS
=========================================================== */

/**
 * Find only published events.
 */
eventSchema.statics.findPublished = function () {
  return this.find({
    isPublished: true,
    isDeleted: false,
  });
};

/**
 * Find featured events.
 */
eventSchema.statics.findFeatured = function () {
  return this.find({
    featured: true,
    isPublished: true,
    isDeleted: false,
  });
};

/**
 * Find upcoming events.
 */
eventSchema.statics.findUpcoming = function () {
  return this.find({
    startDate: { $gte: new Date() },
    isPublished: true,
    isDeleted: false,
  }).sort({
    startDate: 1,
  });
};

/* ===========================================================
   EXPORT
=========================================================== */

const Event = mongoose.model("Event", eventSchema);

export default Event;