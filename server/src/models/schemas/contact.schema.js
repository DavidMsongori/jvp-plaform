import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    contactPerson: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    position: {
      type: String,
      trim: true,
      maxlength: 120,
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 20,
    },

    alternativePhone: {
      type: String,
      trim: true,
      maxlength: 20,
    },

    whatsapp: {
      type: String,
      trim: true,
      maxlength: 20,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },

    alternativeEmail: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },

    website: {
      type: String,
      trim: true,
      maxlength: 250,
    },

    availableDays: [
      {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    ],

    openingTime: {
      type: String,
      trim: true,
    },

    closingTime: {
      type: String,
      trim: true,
    },

    emergencyContact: {
      type: String,
      trim: true,
      maxlength: 20,
    },
  },
  {
    _id: false,
  }
);

export default contactSchema;