const fs = require("fs");
const path = require("path");

const Member = require("../models/Member");

class MemberService {

  /* =====================================================
     GET CURRENT MEMBER PROFILE
  ===================================================== */

  async getProfile(memberId) {

    const member = await Member.findById(memberId)
      .select("-password -otp -otpExpires -refreshToken");

    if (!member) {
      throw new Error("Member not found.");
    }

    return {
      success: true,
      message: "Profile retrieved successfully.",
      member,
    };

  }

  /* =====================================================
     UPDATE MEMBER PROFILE
  ===================================================== */

  async updateProfile(memberId, data) {

    const member = await Member.findById(memberId);

    if (!member) {
      throw new Error("Member not found.");
    }

    const allowedFields = [

      // Personal
      "firstName",
      "middleName",
      "lastName",
      "gender",
      "dob",
      "phone",
      "email",

      // Location
      "county",
      "constituency",
      "ward",
      "village",

      // Education
      "institution",
      "course",
      "level",
      "graduationYear",
      "studentRegistrationNumber",

      // Employment
      "employmentStatus",
      "occupation",
      "employer",
      "businessName",
      "yearsExperience",

      // Leadership
      "leadershipExperience",
      "leadershipPosition",
      "leadershipOrganization",

      // Profile
      "skills",
      "interests",
      "languages",
      "bio",
      "availability",

      // Social Media
      "facebook",
      "instagram",
      "linkedin",
      "x",
      "tiktok"

    ];

    allowedFields.forEach(field => {

      if (data[field] !== undefined) {
        member[field] = data[field];
      }

    });

    member.lastProfileUpdate = new Date();

    member.profileCompleted =
      this.calculateProfileCompletion(member);

    await member.save();

    return {

      success: true,

      message: "Profile updated successfully.",

      member

    };

  }

  /* =====================================================
     UPLOAD PROFILE PHOTO
  ===================================================== */

  async uploadProfilePhoto(memberId, file) {

    if (!file) {
      throw new Error("No photo uploaded.");
    }

    const member = await Member.findById(memberId);

    if (!member) {
      throw new Error("Member not found.");
    }

    /*
      Delete previous photo
    */

    if (member.profilePhoto) {

      const oldPhoto = path.join(
        __dirname,
        "../../",
        member.profilePhoto
      );

      if (fs.existsSync(oldPhoto)) {
        fs.unlinkSync(oldPhoto);
      }

    }

    /*
      Save new path
    */

    member.profilePhoto =
      `/uploads/profiles/${file.filename}`;

    member.lastProfileUpdate =
      new Date();

    member.profileCompleted =
      this.calculateProfileCompletion(member);

    await member.save();

    return {

      success: true,

      message:
        "Profile photo uploaded successfully.",

      member

    };

  }

  /* =====================================================
     MEMBER DASHBOARD
  ===================================================== */

  async getDashboard(memberId) {

    const member = await Member.findById(memberId)
      .select("-password -otp -otpExpires -refreshToken");

    if (!member) {
      throw new Error("Member not found.");
    }

    return {

      success: true,

      message: "Dashboard loaded successfully.",

      dashboard: {

        /* ======================================
           MEMBER SUMMARY
        ====================================== */

        member: {

          id: member._id,

          membershipNumber:
            member.membershipNumber,

          firstName:
            member.firstName,

          middleName:
            member.middleName,

          lastName:
            member.lastName,

          profilePhoto:
            member.profilePhoto,

          role:
            member.role,

          county:
            member.county,

          constituency:
            member.constituency,

          ward:
            member.ward,

          membershipStatus:
            member.membershipStatus,

          activationStatus:
            member.activationStatus,

          memberSince:
            member.memberSince,

          profileCompleted:
            member.profileCompleted,

        },

        /* ======================================
           DASHBOARD STATISTICS
        ====================================== */

        stats: {

          profileCompletion:
            member.profileCompleted || 0,

          events: 0,

          programs: 0,

          certificates: 0,

          volunteerHours: 0,

          loginCount:
            member.loginCount || 0,

          lastLogin:
            member.lastLogin,

        },

        /* ======================================
           UPCOMING EVENTS
        ====================================== */

        events: [

          {
            id: 1,
            title: "Coastal Youth Summit 2026",
            date: "2026-08-06",
            location: "Malindi, Kilifi",
            registered: true,
          },

          {
            id: 2,
            title: "Beach Cleanup Exercise",
            date: "2026-08-16",
            location: "Mombasa",
            registered: false,
          },

          {
            id: 3,
            title: "Leadership Bootcamp",
            date: "2026-09-05",
            location: "Kwale",
            registered: false,
          },

        ],

        /* ======================================
           NOTIFICATIONS
        ====================================== */

        notifications: [

          {
            id: 1,
            title: "Membership Activated",
            message:
              "Your JVP Connect account is active.",
            type: "success",
            time: "Today",
          },

          {
            id: 2,
            title: "Complete Your Profile",
            message:
              "Finish your profile to unlock all features.",
            type: "info",
            time: "Today",
          },

          {
            id: 3,
            title: "Coastal Youth Summit",
            message:
              "Registration is now open.",
            type: "warning",
            time: "2 days ago",
          },

        ],

        /* ======================================
           LATEST NEWS
        ====================================== */

        news: [

          {
            id: 1,
            title:
              "Registration for Coastal Youth Summit 2026 Now Open",
            category: "Events",
            date: "Today",
          },

          {
            id: 2,
            title:
              "JVP Signs New Youth Empowerment Partnership",
            category: "Partnership",
            date: "Yesterday",
          },

          {
            id: 3,
            title:
              "Applications Open for County Volunteer Leaders",
            category: "Leadership",
            date: "3 days ago",
          },

        ],

      },

    };

  }

   /* =====================================================
     MEMBERSHIP CARD
  ===================================================== */

  async getMembershipCard(memberId) {

    const member = await Member.findById(memberId)
      .select("-password -otp -otpExpires -refreshToken");

    if (!member) {
      throw new Error("Member not found.");
    }

    return {

      success: true,

      message:
        "Membership card retrieved successfully.",

      card: {

        membershipNumber:
          member.membershipNumber,

        firstName:
          member.firstName,

        middleName:
          member.middleName,

        lastName:
          member.lastName,

        county:
          member.county,

        constituency:
          member.constituency,

        ward:
          member.ward,

        role:
          member.role,

        memberSince:
          member.memberSince,

        membershipStatus:
          member.membershipStatus,

        profilePhoto:
          member.profilePhoto

      }

    };

  }

  /* =====================================================
     ADMIN - GET ALL MEMBERS
  ===================================================== */

  async getAllMembers() {

    const members = await Member.find()
      .select("-password -otp -otpExpires -refreshToken")
      .sort({
        firstName: 1,
        lastName: 1
      });

    return {

      success: true,

      message: "Members retrieved successfully.",

      total: members.length,

      members

    };

  }

  /* =====================================================
     ADMIN - GET MEMBER BY ID
  ===================================================== */

  async getMemberById(memberId) {

    const member = await Member.findById(memberId)
      .select("-password -otp -otpExpires -refreshToken");

    if (!member) {
      throw new Error("Member not found.");
    }

    return {

      success: true,

      message: "Member retrieved successfully.",

      member

    };

  }

  /* =====================================================
     PROFILE COMPLETION CALCULATOR
  ===================================================== */

  calculateProfileCompletion(member) {

    const fields = [

      // Personal
      member.firstName,
      member.lastName,
      member.phone,
      member.email,
      member.gender,
      member.dob,

      // Location
      member.county,
      member.constituency,
      member.ward,

      // Profile
      member.profilePhoto,
      member.bio,

      // Education
      member.institution,
      member.course,
      member.level,

      // Employment
      member.employmentStatus,
      member.occupation,

      // Skills
      member.skills?.length,
      member.interests?.length,
      member.languages?.length

    ];

    const completed = fields.filter(value => {

      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return Boolean(value);

    }).length;

    return Math.round(
      (completed / fields.length) * 100
    );

  }

}

module.exports = new MemberService(); 