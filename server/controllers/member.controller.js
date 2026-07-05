const Member = require("../models/Member");

/* ==========================================
   Get Logged-in Member
========================================== */

const getMyProfile = async (req, res) => {

  try {

    const member = await Member.findById(req.member._id)
      .select("-password -otp -otpExpires");

    return res.json({

      success: true,

      member

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

/* ==========================================
   Update Profile
========================================== */

const updateMyProfile = async (req, res) => {

  try {

    const member = await Member.findById(req.member._id);

    if (!member) {

      return res.status(404).json({

        success: false,

        message: "Member not found."

      });

    }

    Object.assign(member, req.body);

    member.lastProfileUpdate = new Date();

    await member.save();

    return res.json({

      success: true,

      message: "Profile updated successfully.",

      member

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {

  getMyProfile,

  updateMyProfile

};