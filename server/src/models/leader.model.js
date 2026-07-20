import mongoose from "mongoose";

const { Schema } = mongoose;

/* ===========================================================
   LEADER MODEL
=========================================================== */

const leaderSchema = new Schema(
  {
    /* =======================================================
       MEMBER
       (Null only for Patron)
    ======================================================= */
    member: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      default: null,
      index: true,
    },

    /* =======================================================
       PATRON DETAILS
       (Used only when member is null)
    ======================================================= */
    patron: {
      fullName: {
        type: String,
        trim: true,
        default: "",
      },

      title: {
        type: String,
        trim: true,
        default: "Patron",
      },

      organization: {
        type: String,
        trim: true,
        default: "",
      },

      photo: {
        type: String,
        default: "",
      },

      bio: {
        type: String,
        trim: true,
        default: "",
      },
    },

    /* =======================================================
       LEADERSHIP CATEGORY
    ======================================================= */
    category: {
      type: String,
      enum: [
        "patron",
        "regional_executive",
        "youth_assembly",
        "county_leadership",
      ],
      required: true,
      index: true,
    },

    /* =======================================================
       POSITION
    ======================================================= */
    position: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    /* =======================================================
       LOCATION
    ======================================================= */
    county: {
      type: String,
      enum: [
        "",
        "Mombasa",
        "Kwale",
        "Kilifi",
        "Tana River",
        "Lamu",
        "Taita Taveta",
      ],
      default: "",
      index: true,
    },

    constituency: {
      type: String,
      trim: true,
      default: "",
    },

    ward: {
      type: String,
      trim: true,
      default: "",
    },

    /* =======================================================
       DISPLAY
    ======================================================= */
    displayOrder: {
      type: Number,
      default: 999,
      min: 1,
      index: true,
    },

    /* =======================================================
       TERM
    ======================================================= */
    termStart: {
      type: Date,
      default: Date.now,
    },

    termEnd: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    /* =======================================================
       AUDIT
    ======================================================= */
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* ===========================================================
   INDEXES
=========================================================== */

leaderSchema.index({
  category: 1,
  county: 1,
  displayOrder: 1,
});

leaderSchema.index({
  member: 1,
  isActive: 1,
});

/* ===========================================================
   VIRTUALS
=========================================================== */

leaderSchema.virtual("isPatron").get(function () {
  return this.category === "patron";
});

leaderSchema.virtual("profile").get(function () {

  if (this.member) {
    return {
      _id: this.member._id,
      memberNumber: this.member.memberNumber,
      firstName: this.member.firstName,
      middleName: this.member.middleName,
      lastName: this.member.lastName,
      fullName: [
        this.member.firstName,
        this.member.middleName,
        this.member.lastName,
      ]
        .filter(Boolean)
        .join(" "),
      profilePhoto: this.member.profilePhoto,
      county: this.member.county,
      constituency: this.member.constituency,
      ward: this.member.ward,
      membershipStatus: this.member.membershipStatus,
      isMember: true,
    };
  }

  return {
    fullName: this.patron.fullName,
    firstName: this.patron.fullName,
    lastName: "",
    profilePhoto: this.patron.photo,
    county: "",
    constituency: "",
    ward: "",
    organization: this.patron.organization,
    title: this.patron.title,
    bio: this.patron.bio,
    isMember: false,
  };

});

leaderSchema.set("toJSON", { virtuals: true });
leaderSchema.set("toObject", { virtuals: true });

/* ===========================================================
   EXPORT
=========================================================== */

export default mongoose.model("Leader", leaderSchema);