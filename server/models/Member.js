const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const memberSchema = new mongoose.Schema(
  {
    /* ===================================================
       ACCOUNT
    =================================================== */

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
      trim: true,
    },

    legacyMember: {
      type: Boolean,
      default: false,
    },

    migrationCompleted: {
      type: Boolean,
      default: false,
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    activationStatus: {
      type: String,
      enum: [
        "Not Activated",
        "Pending OTP",
        "OTP Verified",
        "Activated",
      ],
      default: "Not Activated",
    },

    activationDate: {
      type: Date,
      default: null,
    },

    memberSince: {
      type: Date,
      default: null,
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

    passwordCreatedAt: {
      type: Date,
      default: null,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    loginCount: {
      type: Number,
      default: 0,
    },

    failedLoginAttempts: {
      type: Number,
      default: 0,
    },

    accountLockedUntil: {
      type: Date,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
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

    /* ===================================================
       PERSONAL INFORMATION
    =================================================== */

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    middleName: {
      type: String,
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
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/,
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    /* ===================================================
       LOCATION
    =================================================== */

    county: String,

    constituency: String,

    ward: String,

    village: String,

    /* ===================================================
       EDUCATION
    =================================================== */

    institution: String,

    course: String,

    level: String,

    graduationYear: Number,

    studentRegistrationNumber: String,

    /* ===================================================
       EMPLOYMENT
    =================================================== */

    employmentStatus: String,

    occupation: String,

    employer: String,

    businessName: String,

    yearsExperience: Number,

    /* ===================================================
       LEADERSHIP
    =================================================== */

    leadershipExperience: String,

    leadershipPosition: String,

    leadershipOrganization: String,

    /* ===================================================
       PROFILE
    =================================================== */

    skills: {
      type: [String],
      default: [],
    },

    interests: {
      type: [String],
      default: [],
    },

    languages: {
      type: [String],
      default: [],
    },

    bio: {
      type: String,
      maxlength: 500,
    },

    availability: {
      type: String,
      enum: [
        "",
        "Weekdays",
        "Weekends",
        "Evenings",
        "Any Time",
      ],
      default: "",
    },

    lastProfileUpdate: {
      type: Date,
      default: null,
    },

    /* ===================================================
       SOCIAL MEDIA
    =================================================== */

    facebook: String,

    instagram: String,

    linkedin: String,

    x: String,

    tiktok: String,
  },
  {
    timestamps: true,
  }
);

/* ===================================================
   HASH PASSWORD
=================================================== */

memberSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

/* ===================================================
   COMPARE PASSWORD
=================================================== */

memberSchema.methods.comparePassword = async function (
  enteredPassword
) {
  if (!this.password) {
    return false;
  }

  return await bcrypt.compare(
    enteredPassword,
    this.password
  );
};

module.exports = mongoose.model(
  "Member",
  memberSchema
);