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

    member.calculateProfileCompletion();

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
       PERSONAL INFORMATION
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

    if (data.nationalId !== undefined)
      member.nationalId = data.nationalId;

    if (data.phone !== undefined)
      member.phone = data.phone;

    if (data.email !== undefined)
      member.email = data.email;

    /* ==========================================
       LOCATION
    ========================================== */

    member.location = {

      ...member.location,

      ...(data.location || {}),

    };

    /* ==========================================
       EDUCATION
    ========================================== */

    member.education = {

      ...member.education,

      ...(data.education || {}),

    };

    /* ==========================================
       EMPLOYMENT
    ========================================== */

    member.employment = {

      ...member.employment,

      ...(data.employment || {}),

    };

    /* ==========================================
       LEADERSHIP
    ========================================== */

    member.leadership = {

      ...member.leadership,

      ...(data.leadership || {}),

    };

    /* ==========================================
       SKILLS
    ========================================== */

    if (data.skills !== undefined)
      member.skills = data.skills;

    if (data.languages !== undefined)
      member.languages = data.languages;

    if (data.interests !== undefined)
      member.interests = data.interests;

    if (data.availability !== undefined)
      member.availability = data.availability;

    if (data.volunteerPreference !== undefined)
      member.volunteerPreference = data.volunteerPreference;

    if (data.bio !== undefined)
      member.bio = data.bio;

    /* ==========================================
       SOCIAL MEDIA
    ========================================== */

    member.social = {

      ...member.social,

      ...(data.social || {}),

    };

    /* ==========================================
       MEMBERSHIP
    ========================================== */

    if (data.membershipNumber !== undefined)
      member.membershipNumber = data.membershipNumber;

    if (data.membershipStatus !== undefined)
      member.membershipStatus = data.membershipStatus;

    if (data.activationStatus !== undefined)
      member.activationStatus = data.activationStatus;

    if (data.paymentStatus !== undefined)
      member.paymentStatus = data.paymentStatus;

    if (data.memberSince !== undefined)
      member.memberSince = data.memberSince;

    if (data.membershipExpiry !== undefined)
      member.membershipExpiry = data.membershipExpiry;

    if (data.role !== undefined)
      member.role = data.role;

    if (data.legacyMember !== undefined)
      member.legacyMember = data.legacyMember;

    if (data.migrationCompleted !== undefined)
      member.migrationCompleted = data.migrationCompleted;

    /* ==========================================
       SECURITY
    ========================================== */

    if (data.accountLocked !== undefined)
      member.accountLocked = data.accountLocked;

    if (data.accountSuspended !== undefined)
      member.accountSuspended = data.accountSuspended;

    if (data.forcePasswordReset !== undefined)
      member.forcePasswordReset = data.forcePasswordReset;

    if (data.twoFactorEnabled !== undefined)
      member.twoFactorEnabled = data.twoFactorEnabled;

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

    member.calculateProfileCompletion();

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

        fullName:
          member.fullName,

        firstName:
          member.firstName,

        middleName:
          member.middleName,

        lastName:
          member.lastName,

        profilePhoto:
          member.profilePhoto,

        county:
          member.location?.county,

        constituency:
          member.location?.constituency,

        ward:
          member.location?.ward,

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
     DELETE OLD PROFILE PHOTO
  ===================================================== */

  async deleteOldPhoto(photoPath) {

    if (!photoPath) {

      return;

    }

    try {

      const relativePath = photoPath.startsWith("/")

        ? photoPath.substring(1)

        : photoPath;

      const fullPath = path.join(

        process.cwd(),

        relativePath

      );

      if (fs.existsSync(fullPath)) {

        fs.unlinkSync(fullPath);

      }

    } catch (error) {

      console.error(

        "Delete Profile Photo:",

        error.message

      );

    }

  }

}

module.exports = new MemberService();