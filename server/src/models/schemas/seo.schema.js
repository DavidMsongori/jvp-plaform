import mongoose from "mongoose";

const seoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 60,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 160,
    },

    keywords: [
      {
        type: String,
        trim: true,
        maxlength: 50,
      },
    ],

    canonicalUrl: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    robots: {
      type: String,
      enum: [
        "index,follow",
        "index,nofollow",
        "noindex,follow",
        "noindex,nofollow",
      ],
      default: "index,follow",
    },

    openGraph: {
      title: {
        type: String,
        trim: true,
        maxlength: 60,
      },

      description: {
        type: String,
        trim: true,
        maxlength: 200,
      },

      image: {
        type: String,
        trim: true,
      },

      type: {
        type: String,
        default: "website",
      },
    },

    twitterCard: {
      card: {
        type: String,
        enum: [
          "summary",
          "summary_large_image",
        ],
        default: "summary_large_image",
      },

      title: {
        type: String,
        trim: true,
        maxlength: 60,
      },

      description: {
        type: String,
        trim: true,
        maxlength: 200,
      },

      image: {
        type: String,
        trim: true,
      },
    },
  },
  {
    _id: false,
  }
);

export default seoSchema;