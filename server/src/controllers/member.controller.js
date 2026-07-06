const Member = require("../models/Member");

/* ==========================================
   GET ALL MEMBERS
========================================== */

const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find()
      .select("-password -otp -otpExpires")
      .sort({ firstName: 1 });

    return res.status(200).json({
      success: true,
      total: members.length,
      members,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ==========================================
   GET MEMBER BY ID
========================================== */

const getMemberById = async (req, res) => {
  try {

    const member = await Member.findById(req.params.id)
      .select("-password -otp -otpExpires");

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found.",
      });
    }

    return res.status(200).json({
      success: true,
      member,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getAllMembers,
  getMemberById,
};