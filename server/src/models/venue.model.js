import mongoose from "mongoose";
import slugify from "slugify";

import addressSchema from "./schemas/address.schema.js";
import contactSchema from "./schemas/contact.schema.js";
import socialLinksSchema from "./schemas/socialLinks.schema.js";
import cloudinaryImageSchema from "./schemas/cloudinaryImage.schema.js";
import galleryItemSchema from "./schemas/galleryItem.schema.js";
import seoSchema from "./schemas/seo.schema.js";

const venueSchema = new mongoose.Schema(
  {
    /* ==========================================================
       BASIC INFORMATION
    ========================================================== */

    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 200,
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
      trim: true,
      maxlength: 5000,
    },

    /* ==========================================================
       LOCATION
    ========================================================== */

    address: addressSchema,

    /* ==========================================================
       CONTACT
    ========================================================== */

    contact: contactSchema,

    /* ==========================================================
       SOCIAL MEDIA
    ========================================================== */

    socialLinks: socialLinksSchema,

    /* ==========================================================
       MEDIA
    ========================================================== */

    coverImage: cloudinaryImageSchema,

    gallery: [galleryItemSchema],

    /* ==========================================================
       VENUE DETAILS
    ========================================================== */

    venueType: {
      type: String,
      enum: [
        "Conference Hall",
        "Hotel",
        "University",
        "College",
        "TVET",
        "School",
        "Government Facility",
        "Community Hall",
        "Outdoor",
        "Stadium",
        "Convention Centre",
        "Restaurant",
        "Office",
        "Other",
      ],
      default: "Conference Hall",
    },

    capacity: {
      type: Number,
      default: 0,
      min: 0,
    },

    indoorCapacity: {
      type: Number,
      default: 0,
      min: 0,
    },

    outdoorCapacity: {
      type: Number,
      default: 0,
      min: 0,
    },

    facilities: [
      {
        type: String,
        trim: true,
      },
    ],

    amenities: [
      {
        type: String,
        trim: true,
      },
    ],

    parkingAvailable: {
      type: Boolean,
      default: false,
    },

    wheelchairAccessible: {
      type: Boolean,
      default: false,
    },

    wifiAvailable: {
      type: Boolean,
      default: false,
    },

    accommodationAvailable: {
      type: Boolean,
      default: false,
    },

    cateringAvailable: {
      type: Boolean,
      default: false,
    },

    powerBackupAvailable: {
      type: Boolean,
      default: false,
    },

    airConditioned: {
      type: Boolean,
      default: false,
    },

    /* ==========================================================
       SEO
    ========================================================== */

    seo: seoSchema,

    /* ==========================================================
       ANALYTICS
    ========================================================== */

    totalEventsHosted: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalBookings: {
      type: Number,
      default: 0,
      min: 0,
    },

    views: {
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

    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* ==========================================================
       STATUS
    ========================================================== */

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "active",
        "inactive",
        "maintenance",
      ],
      default: "active",
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    /* ==========================================================
       AUDIT
    ========================================================== */

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

/* ==========================================================
   VIRTUALS
========================================================== */

venueSchema.virtual("fullAddress").get(function () {
  if (!this.address) return "";

  return [
    this.address.street,
    this.address.building,
    this.address.town,
    this.address.county,
    this.address.country,
  ]
    .filter(Boolean)
    .join(", ");
});

/* ==========================================================
   INDEXES
========================================================== */

venueSchema.index({ slug: 1 }, { unique: true });

venueSchema.index({ status: 1 });

venueSchema.index({ featured: 1 });

venueSchema.index({ "address.county": 1 });

venueSchema.index({ venueType: 1 });

venueSchema.index({
  name: "text",
  shortDescription: "text",
  description: "text",
});

/* ==========================================================
   MIDDLEWARE
========================================================== */

venueSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  next();
});

/* ==========================================================
   METHODS
========================================================== */

venueSchema.methods.incrementViews = async function () {
  this.views += 1;
  return this.save();
};

venueSchema.methods.incrementEventsHosted = async function () {
  this.totalEventsHosted += 1;
  return this.save();
};

venueSchema.methods.incrementBookings = async function () {
  this.totalBookings += 1;
  return this.save();
};

/* ==========================================================
   EXPORT
========================================================== */

const Venue = mongoose.model("Venue", venueSchema);

export default Venue;