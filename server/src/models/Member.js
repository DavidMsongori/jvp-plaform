const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    // Account
    role: {
      type: String,
      enum: [
        "member",
        "ward_leader",
        "constituency_leader",
        "county_leader",
        "regional_leader",
        "secretariat",
        "admin",
        "super_admin",
      ],
      default: "member",
    },

    membershipNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    legacyMember: {
      type: Boolean,
      default: false,
    },

    migrationCompleted: {
      type: Boolean,
      default: false,
    },

    activationStatus: {
      type: String,
      enum: [
        "Not Activated",
        "Pending OTP",
        "Activated",
      ],
      default: "Not Activated",
    },

    membershipStatus: {
      type: String,
      enum: [
        "Pending",
        "Active",
        "Suspended",
        "Expired",
      ],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Exempt",
      ],
      default: "Pending",
    },

    password: {
      type: String,
      default: null,
    },

    otp: {
      type: String,
      default: null,
    },

    otpExpires: {
      type: Date,
      default: null,
    },

    // Personal Information
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    middleName: {
      type: String,
      default: "",
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    gender: String,

    dob: Date,

    nationalId: {
      type: String,
      sparse: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      sparse: true,
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    // Location
    county: String,

    constituency: String,

    ward: String,

    village: String,

    // Profile
    skills: {
      type: [String],
      default: [],
    },

    interests: {
      type: [String],
      default: [],
    },

    bio: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", memberSchema);