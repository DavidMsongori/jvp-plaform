import mongoose from "mongoose";
import slugify from "slugify";

import addressSchema from "./schemas/address.schema.js";
import contactSchema from "./schemas/contact.schema.js";
import socialLinksSchema from "./schemas/socialLinks.schema.js";
import cloudinaryImageSchema from "./schemas/cloudinaryImage.schema.js";
import galleryItemSchema from "./schemas/galleryItem.schema.js";
import seoSchema from "./schemas/seo.schema.js";

const partnerSchema = new mongoose.Schema(
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

    shortName: {
      type: String,
      trim: true,
      maxlength: 80,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 8000,
    },

    shortDescription: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    /* ==========================================================
       CLASSIFICATION
    ========================================================== */

    partnerType: {
      type: String,
      enum: [
        "Government",
        "County Government",
        "NGO",
        "CBO",
        "University",
        "TVET",
        "School",
        "Corporate",
        "Foundation",
        "Development Partner",
        "Financial Institution",
        "Media",
        "Technology",
        "Private Company",
        "International Organization",
        "Faith Based Organization",
        "Association",
        "Other",
      ],
      required: true,
    },

    partnershipCategory: {
      type: String,
      enum: [
        "Strategic",
        "Event Sponsor",
        "Program Partner",
        "Knowledge Partner",
        "Technology Partner",
        "Media Partner",
        "Training Partner",
        "Funding Partner",
        "Research Partner",
        "Implementation Partner",
        "Community Partner",
        "Other",
      ],
      default: "Strategic",
    },

    /* ==========================================================
       MEDIA
    ========================================================== */

    logo: cloudinaryImageSchema,

    coverImage: cloudinaryImageSchema,

    gallery: [galleryItemSchema],

    /* ==========================================================
       CONTACT INFORMATION
    ========================================================== */

    contact: contactSchema,

    address: addressSchema,

    socialLinks: socialLinksSchema,

    /* ==========================================================
       ORGANIZATION DETAILS
    ========================================================== */

    foundedYear: {
      type: Number,
      min: 1800,
    },

    registrationNumber: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    industry: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    areasOfWork: [
      {
        type: String,
        trim: true,
      },
    ],

    countiesCovered: [
      {
        type: String,
        trim: true,
      },
    ],

    /* ==========================================================
       PARTNERSHIP DETAILS
    ========================================================== */

    partnershipStartDate: {
      type: Date,
    },

    partnershipEndDate: {
      type: Date,
    },

    partnershipStatus: {
      type: String,
      enum: [
        "Prospective",
        "Active",
        "Completed",
        "Expired",
        "Suspended",
      ],
      default: "Active",
    },

    sponsorshipValue: {
      type: Number,
      default: 0,
      min: 0,
    },

    currency: {
      type: String,
      default: "KES",
    },

    notes: {
      type: String,
      maxlength: 5000,
    },

    /* ==========================================================
       ANALYTICS
    ========================================================== */

    totalEventsSponsored: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalProgramsSupported: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalProjectsSupported: {
      type: Number,
      default: 0,
      min: 0,
    },

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    /* ==========================================================
       SEO
    ========================================================== */

    seo: seoSchema,

    /* ==========================================================
       STATUS
    ========================================================== */

    status: {
      type: String,
      enum: [
        "active",
        "inactive",
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
   INDEXES
========================================================== */

partnerSchema.index({ slug: 1 }, { unique: true });

partnerSchema.index({ partnerType: 1 });

partnerSchema.index({ partnershipCategory: 1 });

partnerSchema.index({ featured: 1 });

partnerSchema.index({ status: 1 });

partnerSchema.index({ "address.county": 1 });

partnerSchema.index({
  name: "text",
  shortDescription: "text",
  description: "text",
  industry: "text",
});

/* ==========================================================
   VIRTUALS
========================================================== */

partnerSchema.virtual("isPartnershipActive").get(function () {
  if (!this.partnershipEndDate) return true;

  return this.partnershipEndDate >= new Date();
});

/* ==========================================================
   MIDDLEWARE
========================================================== */

partnerSchema.pre("validate", function (next) {
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

partnerSchema.methods.incrementViews = async function () {
  this.views += 1;
  return this.save();
};

partnerSchema.methods.incrementEventsSponsored = async function () {
  this.totalEventsSponsored += 1;
  return this.save();
};

partnerSchema.methods.incrementProgramsSupported = async function () {
  this.totalProgramsSupported += 1;
  return this.save();
};

partnerSchema.methods.incrementProjectsSupported = async function () {
  this.totalProjectsSupported += 1;
  return this.save();
};

/* ==========================================================
   EXPORT
========================================================== */

const Partner = mongoose.model("Partner", partnerSchema);

export default Partner;