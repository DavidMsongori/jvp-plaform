const mongoose = require("mongoose");

/* =====================================================
   ENUMS
===================================================== */

const COUNTY_ENUM = [
  "Mombasa",
  "Kwale",
  "Kilifi",
  "Tana River",
  "Lamu",
  "Taita Taveta",
];

const ROLE_ENUM = [
  "member",
  "ward_leader",
  "constituency_leader",
  "county_leader",
  "regional_leader",
  "secretariat",
  "admin",
  "super_admin",
];

const MEMBERSHIP_STATUS_ENUM = [
  "Pending",
  "Active",
  "Suspended",
  "Expired",
];

const PAYMENT_STATUS_ENUM = [
  "Pending",
  "Paid",
  "Exempt",
];

const ACTIVATION_STATUS_ENUM = [
  "Not Activated",
  "Pending OTP",
  "OTP Verified",
  "Activated",
];

const GENDER_ENUM = [
  "Male",
  "Female",
  "Other",
];

/* =====================================================
   MEMBER SCHEMA
===================================================== */

const memberSchema = new mongoose.Schema(

  {

    /* =====================================================
       ACCOUNT
    ===================================================== */

    role: {

      type: String,

      enum: ROLE_ENUM,

      default: "member",

      index: true,

    },

    membershipNumber: {

      type: String,

      unique: true,

      sparse: true,

      trim: true,

      index: true,

    },

    legacyMember: {

      type: Boolean,

      default: false,

    },

    migrationCompleted: {

      type: Boolean,

      default: false,

    },

    memberSince: {

      type: Date,

      default: Date.now,

    },

    membershipExpiry: {

      type: Date,

      default: null,

    },

    membershipStatus: {

      type: String,

      enum: MEMBERSHIP_STATUS_ENUM,

      default: "Pending",

      index: true,

    },

    paymentStatus: {

      type: String,

      enum: PAYMENT_STATUS_ENUM,

      default: "Pending",

      index: true,

    },

    activationStatus: {

      type: String,

      enum: ACTIVATION_STATUS_ENUM,

      default: "Not Activated",

    },

    /* =====================================================
       AUTHENTICATION
    ===================================================== */

    password: {

      type: String,

      default: null,

      select: false,

    },

    otp: {

      type: String,

      default: null,

      select: false,

    },

    otpExpires: {

      type: Date,

      default: null,

      select: false,

    },

    passwordChangedAt: {

      type: Date,

      default: null,

    },

    forcePasswordReset: {

      type: Boolean,

      default: false,

    },

    accountLocked: {

      type: Boolean,

      default: false,

    },

    accountSuspended: {

      type: Boolean,

      default: false,

    },

    failedLoginAttempts: {

      type: Number,

      default: 0,

    },

    twoFactorEnabled: {

      type: Boolean,

      default: false,

    },

    lastLogin: {

      type: Date,

      default: null,

    },

    loginCount: {

      type: Number,

      default: 0,

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

      enum: GENDER_ENUM,

      default: "",

    },

    dateOfBirth: {

      type: Date,

      default: null,

    },

    nationalId: {

      type: String,

      unique: true,

      sparse: true,

      trim: true,

    },

    phone: {

      type: String,

      required: true,

      unique: true,

      trim: true,

      index: true,

    },

    email: {

      type: String,

      lowercase: true,

      trim: true,

      sparse: true,

      index: true,

    },

    profilePhoto: {

      type: String,

      default: "",

      trim: true,

    },
    /* =====================================================
       LOCATION
    ===================================================== */

    location: {

      county: {

        type: String,

        enum: COUNTY_ENUM,

        default: "",

        index: true,

      },

      constituency: {

        type: String,

        default: "",

        trim: true,

      },

      ward: {

        type: String,

        default: "",

        trim: true,

      },

      village: {

        type: String,

        default: "",

        trim: true,

      },

      address: {

        type: String,

        default: "",

        trim: true,

      },

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

        trim: true,

      },

      course: {

        type: String,

        default: "",

        trim: true,

      },

      studentRegistrationNumber: {

        type: String,

        default: "",

        trim: true,

      },

      graduationYear: {

        type: Number,

        default: null,

      },

      status: {

        type: String,

        enum: [

          "",

          "Current Student",

          "Graduated",

          "Deferred",

          "Completed",

          "Discontinued",

        ],

        default: "",

      },

    },

    /* =====================================================
       EMPLOYMENT
    ===================================================== */

    employment: {

      employmentStatus: {

        type: String,

        default: "",

      },

      occupation: {

        type: String,

        default: "",

        trim: true,

      },

      employer: {

        type: String,

        default: "",

        trim: true,

      },

      businessName: {

        type: String,

        default: "",

        trim: true,

      },

      industry: {

        type: String,

        default: "",

        trim: true,

      },

      yearsExperience: {

        type: Number,

        default: 0,

      },

      professionalBackground: {

        type: String,

        default: "",

      },

    },

    /* =====================================================
       LEADERSHIP
    ===================================================== */

    leadership: {

      leadershipExperience: {

        type: Boolean,

        default: false,

      },

      leadershipPosition: {

        type: String,

        default: "",

      },

      leadershipOrganization: {

        type: String,

        default: "",

      },

      leadershipYears: {

        type: Number,

        default: 0,

      },

      currentLeadershipStatus: {

        type: String,

        enum: [

          "",

          "Active",

          "Former",

          "Acting",

          "Interim",

        ],

        default: "",

      },

      leadershipDescription: {

        type: String,

        default: "",

      },

    },

    /* =====================================================
       SKILLS
    ===================================================== */

    skills: [

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

    interests: [

      {

        type: String,

        trim: true,

      },

    ],

    availability: {

      type: String,

      enum: [

        "",

        "Full Time",

        "Part Time",

        "Weekends",

        "Evenings",

        "Remote",

        "On Call",

      ],

      default: "",

    },

    volunteerPreference: {

      type: String,

      enum: [

        "",

        "Community Service",

        "Environmental Activities",

        "Leadership",

        "Training",

        "Mentorship",

        "Administration",

        "Any Opportunity",

      ],

      default: "",

    },

    bio: {

      type: String,

      default: "",

      maxlength: 1000,

      trim: true,

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

      x: {

        type: String,

        default: "",

      },

      tiktok: {

        type: String,

        default: "",

      },

      website: {

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

    profileViews: {

      type: Number,

      default: 0,

    },

    dashboardVisits: {

      type: Number,

      default: 0,

    },

    certificatesEarned: {

      type: Number,

      default: 0,

    },

    eventsAttended: {

      type: Number,

      default: 0,

    },

    programsJoined: {

      type: Number,

      default: 0,

    },

    volunteerHours: {

      type: Number,

      default: 0,

    },

    leadershipScore: {

      type: Number,

      default: 0,

    },

    memberPoints: {

      type: Number,

      default: 0,

    },

    /* =====================================================
       ACTIVITY TRACKING
    ===================================================== */

    lastProfileUpdate: {

      type: Date,

      default: null,

    },

    lastDashboardVisit: {

      type: Date,

      default: null,

    },

    lastActivity: {

      type: Date,

      default: null,

    },

    isOnline: {

      type: Boolean,

      default: false,

    },

    accountVerified: {

      type: Boolean,

      default: false,

    },

    notificationsEnabled: {

      type: Boolean,

      default: true,

    },
  },

  /* =====================================================
     SCHEMA OPTIONS
  ===================================================== */

  {

    timestamps: true,

    versionKey: false,

    toJSON: {

      virtuals: true,

    },

    toObject: {

      virtuals: true,

    },

  }

);

/* =====================================================
   INDEXES
===================================================== */

memberSchema.index({

  membershipNumber: 1,

});

memberSchema.index({

  "location.county": 1,

});

memberSchema.index({

  role: 1,

});

memberSchema.index({

  membershipStatus: 1,

});

memberSchema.index({

  paymentStatus: 1,

});

memberSchema.index({

  activationStatus: 1,

});

memberSchema.index({

  phone: 1,

});

memberSchema.index({

  email: 1,

});

memberSchema.index({

  createdAt: -1,

});

memberSchema.index({

  memberSince: -1,

});

/* =====================================================
   VIRTUALS
===================================================== */

memberSchema.virtual("fullName").get(function () {

  return [

    this.firstName,

    this.middleName,

    this.lastName,

  ]

    .filter(Boolean)

    .join(" ");

});

memberSchema.virtual("age").get(function () {

  if (!this.dateOfBirth) {

    return null;

  }

  const today = new Date();

  const birth = new Date(this.dateOfBirth);

  let age =

    today.getFullYear() -

    birth.getFullYear();

  const month =

    today.getMonth() -

    birth.getMonth();

  if (

    month < 0 ||

    (month === 0 &&

      today.getDate() < birth.getDate())

  ) {

    age--;

  }

  return age;

});

/* =====================================================
   INSTANCE METHODS
===================================================== */

memberSchema.methods.calculateProfileCompletion = function () {

  const fields = [

    this.firstName,

    this.lastName,

    this.phone,

    this.email,

    this.profilePhoto,

    this.gender,

    this.dateOfBirth,

    this.nationalId,

    this.location?.county,

    this.location?.constituency,

    this.location?.ward,

    this.location?.village,

    this.location?.address,

    this.education?.level,

    this.education?.institution,

    this.education?.course,

    this.education?.status,

    this.employment?.employmentStatus,

    this.employment?.occupation,

    this.employment?.industry,

    this.leadership?.leadershipPosition,

    this.leadership?.leadershipOrganization,

    this.bio,

    this.social?.facebook,

    this.social?.instagram,

    this.social?.linkedin,

    this.social?.x,

    this.social?.tiktok,

    this.social?.website,

  ];

  let completed =

    fields.filter(Boolean).length;

  if (this.skills?.length) completed++;

  if (this.languages?.length) completed++;

  if (this.interests?.length) completed++;

  const total =

    fields.length + 3;

  this.profileCompleted =

    Math.round(

      (completed / total) * 100

    );

  return this.profileCompleted;

};

/* =====================================================
   STATIC METHODS
===================================================== */

memberSchema.statics.getDashboardStatistics = async function () {

  const [

    totalMembers,

    activeMembers,

    pendingMembers,

    suspendedMembers,

    expiredMembers,

  ] = await Promise.all([

    this.countDocuments(),

    this.countDocuments({

      membershipStatus: "Active",

    }),

    this.countDocuments({

      membershipStatus: "Pending",

    }),

    this.countDocuments({

      membershipStatus: "Suspended",

    }),

    this.countDocuments({

      membershipStatus: "Expired",

    }),

  ]);

  return {

    totalMembers,

    activeMembers,

    pendingMembers,

    suspendedMembers,

    expiredMembers,

  };

};

/* =====================================================
   MIDDLEWARE
===================================================== */

memberSchema.pre(

  "save",

  function (next) {

    this.lastProfileUpdate =

      new Date();

    this.calculateProfileCompletion();

    next();

  }

);

memberSchema.pre(

  "findOneAndUpdate",

  function (next) {

    this.set({

      lastProfileUpdate:

        new Date(),

    });

    next();

  }

);

/* =====================================================
   EXPORT MODEL
===================================================== */

module.exports = mongoose.model(

  "Member",

  memberSchema

);