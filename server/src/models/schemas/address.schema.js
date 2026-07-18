import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    building: {
      type: String,
      trim: true,
      maxlength: 120,
    },

    floor: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    room: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    postalAddress: {
      type: String,
      trim: true,
      maxlength: 120,
    },

    postalCode: {
      type: String,
      trim: true,
      maxlength: 20,
    },

    town: {
      type: String,
      trim: true,
      maxlength: 120,
    },

    ward: {
      type: String,
      trim: true,
      maxlength: 120,
    },

    constituency: {
      type: String,
      trim: true,
      maxlength: 120,
    },

    county: {
      type: String,
      trim: true,
      enum: [
        "Mombasa",
        "Kwale",
        "Kilifi",
        "Tana River",
        "Lamu",
        "Taita Taveta",
        "Nairobi",
        "Other",
      ],
    },

    country: {
      type: String,
      trim: true,
      default: "Kenya",
      maxlength: 120,
    },

    latitude: {
      type: Number,
      min: -90,
      max: 90,
    },

    longitude: {
      type: Number,
      min: -180,
      max: 180,
    },

    googleMapsUrl: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    _id: false,
  }
);

export default addressSchema;