import mongoose from "mongoose";
import cloudinaryImageSchema from "./cloudinaryImage.schema.js";

const galleryItemSchema = new mongoose.Schema(
  {
    image: {
      type: cloudinaryImageSchema,
      required: true,
    },

    title: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    caption: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    alt: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    category: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
      min: 0,
    },

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
  }
);

export default galleryItemSchema;