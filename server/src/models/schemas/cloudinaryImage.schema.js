import mongoose from "mongoose";

const cloudinaryImageSchema = new mongoose.Schema(
  {
    /* ==========================================
       CLOUDINARY IDENTIFIERS
    ========================================== */

    publicId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    assetId: {
      type: String,
      trim: true,
    },

    version: {
      type: Number,
      default: null,
    },

    signature: {
      type: String,
      trim: true,
    },

    /* ==========================================
       URLS
    ========================================== */

    url: {
      type: String,
      required: true,
      trim: true,
    },

    secureUrl: {
      type: String,
      required: true,
      trim: true,
    },

    /* ==========================================
       FILE INFORMATION
    ========================================== */

    resourceType: {
      type: String,
      enum: ["image"],
      default: "image",
    },

    format: {
      type: String,
      trim: true,
    },

    bytes: {
      type: Number,
      default: 0,
      min: 0,
    },

    width: {
      type: Number,
      min: 0,
    },

    height: {
      type: Number,
      min: 0,
    },

    /* ==========================================
       ORGANIZATION
    ========================================== */

    folder: {
      type: String,
      trim: true,
    },

    originalFilename: {
      type: String,
      trim: true,
    },

    displayName: {
      type: String,
      trim: true,
    },

    /* ==========================================
       ACCESSIBILITY
    ========================================== */

    alt: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    caption: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    /* ==========================================
       TAGGING
    ========================================== */

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    /* ==========================================
       STATUS
    ========================================== */

    isPrimary: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    /* ==========================================
       AUDIT
    ========================================== */

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

/* ==========================================
   VIRTUALS
========================================== */

cloudinaryImageSchema.virtual("aspectRatio").get(function () {
  if (!this.width || !this.height) return null;

  return Number((this.width / this.height).toFixed(2));
});

cloudinaryImageSchema.virtual("orientation").get(function () {
  if (!this.width || !this.height) return null;

  if (this.width > this.height) return "landscape";

  if (this.height > this.width) return "portrait";

  return "square";
});

/* ==========================================
   INSTANCE METHODS
========================================== */

cloudinaryImageSchema.methods.isLandscape = function () {
  return this.width > this.height;
};

cloudinaryImageSchema.methods.isPortrait = function () {
  return this.height > this.width;
};

cloudinaryImageSchema.methods.isSquare = function () {
  return this.width === this.height;
};

/* ==========================================
   EXPORT
========================================== */

export default cloudinaryImageSchema;