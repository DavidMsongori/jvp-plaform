import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    /* ==========================================
       ACCOUNT
    ========================================== */

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: null,
      minlength: 6,
      select: false,
    },

    /* ==========================================
       AUTHORIZATION
    ========================================== */

    role: {
      type: String,
      enum: [
        "member",
        "admin",
        "finance",
        "events",
        "super_admin",
      ],
      default: "member",
    },

    /* ==========================================
       ACCOUNT STATUS
    ========================================== */

    isActive: {
      type: Boolean,
      default: false,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    accountLocked: {
      type: Boolean,
      default: false,
    },

    failedLoginAttempts: {
      type: Number,
      default: 0,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
