const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    /* =====================================================
       ACCOUNT
    ===================================================== */

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

    /* =====================================================
       PERSONAL INFORMATION
    ===================================================== */

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

    gender: {
      type: String,
      default: "",
    },

    dateOfBirth: {
      type: Date,
    },

    nationalId: {
      type: String,
      sparse: true,
      trim: true,
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

    /* =====================================================
       LOCATION
    ===================================================== */

    county: {
      type: String,
      default: "",
    },

    constituency: {
      type: String,
      default: "",
    },

    ward: {
      type: String,
      default: "",
    },

    village: {
      type: String,
      default: "",
    },

    /* =====================================================
       EDUCATION
    ===================================================== */

    education: {

      level: {
        type: String,
        default: "",
      },

      institution: {
        type: String,
        default: "",
      },

      course: {
        type: String,
        default: "",
      },

      registrationNumber: {
        type: String,
        default: "",
      },

      graduationYear: {
        type: Number,
      },

      status: {
        type: String,
        default: "",
      },

    },

    /* =====================================================
       EMPLOYMENT
    ===================================================== */

    employment: {

      status: {
        type: String,
        default: "",
      },

      occupation: {
        type: String,
        default: "",
      },

      employer: {
        type: String,
        default: "",
      },

      businessName: {
        type: String,
        default: "",
      },

      industry: {
        type: String,
        default: "",
      },

      experienceYears: {
        type: Number,
        default: 0,
      },

    },

    /* =====================================================
       LEADERSHIP
    ===================================================== */

    leadership: {

      hasExperience: {
        type: Boolean,
        default: false,
      },

      organization: {
        type: String,
        default: "",
      },

      position: {
        type: String,
        default: "",
      },

      startYear: {
        type: Number,
      },

      endYear: {
        type: Number,
      },

      achievements: {
        type: String,
        default: "",
      },

    },

    /* =====================================================
       SKILLS
    ===================================================== */

    skills: [{
      type: String,
    }],

    languages: [{
      type: String,
    }],

    interests: [{
      type: String,
    }],

    bio: {
      type: String,
      default: "",
    },

    /* =====================================================
       SOCIAL MEDIA
    ===================================================== */

    social: {

      facebook: {
        type: String,
        default: "",
      },

      instagram: {
        type: String,
        default: "",
      },

      linkedin: {
        type: String,
        default: "",
      },

      twitter: {
        type: String,
        default: "",
      },

      tiktok: {
        type: String,
        default: "",
      },

    },

    /* =====================================================
       MEMBER STATISTICS
    ===================================================== */

    profileCompleted: {
      type: Number,
      default: 20,
      min: 0,
      max: 100,
    },

    memberSince: {
      type: Date,
      default: Date.now,
    },

    lastLogin: {
      type: Date,
    },

    loginCount: {
      type: Number,
      default: 0,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", memberSchema);