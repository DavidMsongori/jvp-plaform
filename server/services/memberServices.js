const Member = require("../models/Member");

/* ==========================================
   GET MEMBER PROFILE
========================================== */

const getMemberProfile = async (memberId) => {
  const member = await Member.findById(memberId).select(
    "-password -otp -otpExpires -refreshToken"
  );

  if (!member) {
    throw new Error("Member not found.");
  }

  return member;
};

/* ==========================================
   UPDATE MEMBER PROFILE
========================================== */

const updateMemberProfile = async (memberId, profileData) => {
  const member = await Member.findById(memberId);

  if (!member) {
    throw new Error("Member not found.");
  }

  Object.assign(member, profileData);

  member.lastProfileUpdate = new Date();

  await member.save();

  return member;
};

/* ==========================================
   GET MEMBER DASHBOARD
========================================== */

const getDashboardData = async (memberId) => {
  const member = await Member.findById(memberId).select(
    "firstName lastName membershipNumber membershipStatus county profilePhoto profileCompleted"
  );

  if (!member) {
    throw new Error("Member not found.");
  }

  return {
    member,
    statistics: {
      upcomingEvents: 0,
      activePrograms: 0,
      certificates: 0,
      volunteerHours: 0,
    },
  };
};

/* ==========================================
   GET DIGITAL MEMBERSHIP CARD
========================================== */

const getMembershipCard = async (memberId) => {
  const member = await Member.findById(memberId).select(
    "firstName lastName membershipNumber membershipStatus county profilePhoto memberSince"
  );

  if (!member) {
    throw new Error("Member not found.");
  }

  return member;
};

/* ==========================================
   MEMBER EVENTS
========================================== */

const getMemberEvents = async () => {
  return [];
};

/* ==========================================
   MEMBER PROGRAMS
========================================== */

const getMemberPrograms = async () => {
  return [];
};

/* ==========================================
   MEMBER CERTIFICATES
========================================== */

const getMemberCertificates = async () => {
  return [];
};

module.exports = {
  getMemberProfile,
  updateMemberProfile,
  getDashboardData,
  getMembershipCard,
  getMemberEvents,
  getMemberPrograms,
  getMemberCertificates,
};