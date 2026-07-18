import mongoose from "mongoose";
import slugify from "slugify";

import addressSchema from "./schemas/address.schema.js";
import contactSchema from "./schemas/contact.schema.js";
import socialLinksSchema from "./schemas/socialLinks.schema.js";
import cloudinaryImageSchema from "./schemas/cloudinaryImage.schema.js";
import seoSchema from "./schemas/seo.schema.js";

const speakerSchema = new mongoose.Schema(
  {
    /* ==========================================================
       BASIC INFORMATION
    ========================================================== */

    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    middleName: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    fullName: {
      type: String,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    title: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    organization: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    department: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    profession: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    biography: {
      type: String,
      trim: true,
      maxlength: 10000,
    },

    shortBiography: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    /* ==========================================================
       MEDIA
    ========================================================== */

    photo: cloudinaryImageSchema,

    /* ==========================================================
       CONTACT
    ========================================================== */

    contact: contactSchema,

    address: addressSchema,

    socialLinks: socialLinksSchema,

    /* ==========================================================
       EXPERTISE
    ========================================================== */

    expertise: [
      {
        type: String,
        trim: true,
      },
    ],

    languages: [
      {
        type: String,
        trim: true,
      },
    ],

    certifications: [
      {
        type: String,
        trim: true,
      },
    ],

    education: [
      {
        institution: {
          type: String,
          trim: true,
        },

        qualification: {
          type: String,
          trim: true,
        },

        yearCompleted: Number,
      },
    ],

    /* ==========================================================
       PROFESSIONAL
    ========================================================== */

    yearsOfExperience: {
      type: Number,
      default: 0,
      min: 0,
    },

    speakingFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    currency: {
      type: String,
      default: "KES",
    },

    availableForBooking: {
      type: Boolean,
      default: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    /* ==========================================================
       EVENTS
    ========================================================== */

    totalEvents: {
      type: Number,
      default: 0,
    },

    totalTalks: {
      type: Number,
      default: 0,
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
    },

    totalViews: {
      type: Number,
      default: 0,
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
        "retired",
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

speakerSchema.virtual("displayName").get(function () {
  return [
    this.firstName,
    this.middleName,
    this.lastName,
  ]
    .filter(Boolean)
    .join(" ");
});

/* ==========================================================
   INDEXES
========================================================== */

speakerSchema.index({ slug: 1 }, { unique: true });

speakerSchema.index({ featured: 1 });

speakerSchema.index({ status: 1 });

speakerSchema.index({ organization: 1 });

speakerSchema.index({
  firstName: "text",
  lastName: "text",
  organization: "text",
  profession: "text",
  biography: "text",
});

/* ==========================================================
   MIDDLEWARE
========================================================== */

speakerSchema.pre("validate", function (next) {
  this.fullName = [
    this.firstName,
    this.middleName,
    this.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  if (!this.slug && this.fullName) {
    this.slug = slugify(this.fullName, {
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

speakerSchema.methods.incrementViews = async function () {
  this.totalViews += 1;
  return this.save();
};

speakerSchema.methods.incrementEvents = async function () {
  this.totalEvents += 1;
  return this.save();
};

speakerSchema.methods.incrementTalks = async function () {
  this.totalTalks += 1;
  return this.save();
};

/* ==========================================================
   EXPORT
========================================================== */

const Speaker = mongoose.model("Speaker", speakerSchema);

export default Speaker;