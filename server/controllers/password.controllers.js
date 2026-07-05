const bcrypt = require("bcrypt");
const Member = require("../models/Member");
const generateToken = require("../utils/generateToken");

const createPassword = async (req, res) => {
  try {
    const { memberId, password } = req.body;

    if (!memberId || !password) {
      return res.status(400).json({
        success: false,
        message: "Member ID and password are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    member.password = hashedPassword;
    member.activationStatus = "Activated";

    member.otp = null;
    member.otpExpires = null;

    await member.save();

    const token = generateToken(member);

    return res.json({
      success: true,
      message: "Password created successfully.",
      token,
      member,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createPassword,
};