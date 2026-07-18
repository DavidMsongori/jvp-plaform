import mongoose from "mongoose";

const socialLinksSchema = new mongoose.Schema(
  {
    website: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    facebook: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    instagram: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    twitter: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    x: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    linkedin: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    youtube: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    tiktok: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    threads: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    whatsapp: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    telegram: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    discord: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    github: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    medium: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    spotify: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    podcast: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    linktree: {
      type: String,
      trim: true,
      maxlength: 300,
    },
  },
  {
    _id: false,
  }
);

export default socialLinksSchema;