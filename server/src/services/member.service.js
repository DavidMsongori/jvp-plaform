const fs = require("fs");
const path = require("path");

const Member = require("../models/Member");

class MemberService {

  /* =====================================================
     GET CURRENT MEMBER PROFILE
  ===================================================== */

  async getProfile(memberId) {

    const member = await Member.findById(memberId)
      .select("-password -otp -otpExpires");

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
     UPDATE PROFILE
  ===================================================== */

  async updateProfile(memberId, profileData) {

    const member = await Member.findById(memberId);

    if (!member) {
      throw new Error("Member not found.");
    }

    this.mapProfileData(member, profileData);

    member.profileCompleted =
      this.calculateProfileCompletion(member);

    await member.save();

    return {

      success: true,

      message: "Profile updated successfully.",

      member,

    };

  }

  /* =====================================================
     MAP PROFILE DATA
  ===================================================== */

  mapProfileData(member, data) {

    /* ==========================================
       PERSONAL
    ========================================== */

    if (data.firstName !== undefined)
      member.firstName = data.firstName;

    if (data.middleName !== undefined)
      member.middleName = data.middleName;

    if (data.lastName !== undefined)
      member.lastName = data.lastName;

    if (data.gender !== undefined)
      member.gender = data.gender;

    if (data.dateOfBirth !== undefined)
      member.dateOfBirth = data.dateOfBirth;

    if (data.phone !== undefined)
      member.phone = data.phone;

    if (data.email !== undefined)
      member.email = data.email;

    /* ==========================================
       LOCATION
    ========================================== */

    if (data.county !== undefined)
      member.county = data.county;

    if (data.constituency !== undefined)
      member.constituency = data.constituency;

    if (data.ward !== undefined)
      member.ward = data.ward;

    if (data.village !== undefined)
      member.village = data.village;

    /* ==========================================
       EDUCATION
    ========================================== */

    if (data.education) {

      member.education = {

        ...member.education,

        ...data.education,

      };

    }

    /* ==========================================
       EMPLOYMENT
    ========================================== */

    if (data.employment) {

      member.employment = {

        ...member.employment,

        ...data.employment,

      };

    }

    /* ==========================================
       LEADERSHIP
    ========================================== */

    if (data.leadership) {

      member.leadership = {

        ...member.leadership,

        ...data.leadership,

      };

    }

    /* ==========================================
       PROFILE
    ========================================== */

    if (data.skills !== undefined)
      member.skills = data.skills;

    if (data.languages !== undefined)
      member.languages = data.languages;

    if (data.interests !== undefined)
      member.interests = data.interests;

    if (data.bio !== undefined)
      member.bio = data.bio;

    /* ==========================================
       SOCIAL MEDIA
    ========================================== */

    if (data.social) {

      member.social = {

        ...member.social,

        ...data.social,

      };

    }

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

    await this.deleteOldPhoto(member.profilePhoto);

    member.profilePhoto =
      `/uploads/profiles/${file.filename}`;

    member.profileCompleted =
      this.calculateProfileCompletion(member);

    await member.save();

    return {

      success: true,

      message:
        "Profile photo uploaded successfully.",

      member,

    };

  }

  /* =====================================================
     MEMBERSHIP CARD
  ===================================================== */

  async getMembershipCard(memberId) {

    const member = await Member.findById(memberId)
      .select("-password -otp -otpExpires");

    if (!member) {
      throw new Error("Member not found.");
    }

    return {

      success: true,

      message:
        "Membership card retrieved successfully.",

      card: {

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

        activationStatus:
          member.activationStatus,

        paymentStatus:
          member.paymentStatus,

      },

    };

  }

  /* =====================================================
     ADMIN
     GET ALL MEMBERS
  ===================================================== */

  async getAllMembers() {

    const members = await Member.find()

      .select("-password -otp -otpExpires")

      .sort({

        firstName: 1,

        lastName: 1,

      });

    return {

      success: true,

      message:
        "Members retrieved successfully.",

      total: members.length,

      members,

    };

  }

  /* =====================================================
     ADMIN
     GET MEMBER BY ID
  ===================================================== */

  async getMemberById(memberId) {

    const member = await Member.findById(memberId)

      .select("-password -otp -otpExpires");

    if (!member) {
      throw new Error("Member not found.");
    }

    return {

      success: true,

      message:
        "Member retrieved successfully.",

      member,

    };

  }
    /* =====================================================
     PROFILE COMPLETION
  ===================================================== */

  calculateProfileCompletion(member) {

    let completed = 0;

    const checks = [

      /* ==========================================
         PERSONAL
      ========================================== */

      member.firstName,

      member.lastName,

      member.phone,

      member.email,

      member.gender,

      member.dateOfBirth,

      /* ==========================================
         LOCATION
      ========================================== */

      member.county,

      member.constituency,

      member.ward,

      member.village,

      /* ==========================================
         EDUCATION
      ========================================== */

      member.education?.level,

      member.education?.institution,

      member.education?.course,

      member.education?.status,

      /* ==========================================
         EMPLOYMENT
      ========================================== */

      member.employment?.status,

      member.employment?.occupation,

      /* ==========================================
         LEADERSHIP
      ========================================== */

      member.leadership?.organization,

      member.leadership?.position,

      /* ==========================================
         PROFILE
      ========================================== */

      member.profilePhoto,

      member.bio,

    ];

    completed += checks.filter(Boolean).length;

    if (member.skills?.length > 0) {
      completed++;
    }

    if (member.languages?.length > 0) {
      completed++;
    }

    if (member.interests?.length > 0) {
      completed++;
    }

    if (member.social?.facebook) {
      completed++;
    }

    if (member.social?.linkedin) {
      completed++;
    }

    if (member.social?.instagram) {
      completed++;
    }

    if (member.social?.twitter) {
      completed++;
    }

    if (member.social?.tiktok) {
      completed++;
    }

    const totalFields = 28;

    return Math.round(

      (completed / totalFields) * 100

    );

  }

  /* =====================================================
     DELETE OLD PROFILE PHOTO
  ===================================================== */

  async deleteOldPhoto(photoPath) {

    if (!photoPath) return;

    const fullPath = path.join(

      __dirname,

      "../../",

      photoPath

    );

    if (

      fs.existsSync(fullPath)

    ) {

      fs.unlinkSync(fullPath);

    }

  }

}

module.exports = new MemberService();