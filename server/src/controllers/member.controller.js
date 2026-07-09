const memberService = require("../services/member.service");
const dashboardService = require("../services/dashboard.service");

/* =====================================================
   GET CURRENT MEMBER PROFILE
===================================================== */

exports.getProfile = async (req, res) => {

  try {

    const result = await memberService.getProfile(

      req.member._id

    );

    return res.status(200).json({

      success: true,

      message: result.message,

      data: result.member,

    });

  } catch (error) {

    console.error(

      "Get Profile:",

      error.message

    );

    return res.status(400).json({

      success: false,

      message: error.message,

      errors: [],

    });

  }

};

/* =====================================================
   UPDATE CURRENT MEMBER PROFILE
===================================================== */

exports.updateProfile = async (req, res) => {

  try {

    const result = await memberService.updateProfile(

      req.member._id,

      req.body

    );

    return res.status(200).json({

      success: true,

      message: result.message,

      data: result.member,

    });

  } catch (error) {

    console.error(

      "Update Profile:",

      error.message

    );

    return res.status(400).json({

      success: false,

      message: error.message,

      errors: [],

    });

  }

};

/* =====================================================
   UPLOAD PROFILE PHOTO
===================================================== */

exports.uploadProfilePhoto = async (req, res) => {

  try {

    const result = await memberService.uploadProfilePhoto(

      req.member._id,

      req.file

    );

    return res.status(200).json({

      success: true,

      message: result.message,

      data: {

        member: result.member,

        profilePhoto: result.member.profilePhoto,

      },

    });

  } catch (error) {

    console.error(

      "Upload Profile Photo:",

      error.message

    );

    return res.status(400).json({

      success: false,

      message: error.message,

      errors: [],

    });

  }

};

/* =====================================================
   MEMBER DASHBOARD
===================================================== */

exports.getDashboard = async (req, res) => {

  try {

    const result = await dashboardService.getDashboard(

      req.member._id

    );

    return res.status(200).json({

      success: true,

      message: result.message,

      data: result.dashboard,

    });

  } catch (error) {

    console.error(

      "Dashboard:",

      error.message

    );

    return res.status(400).json({

      success: false,

      message: error.message,

      errors: [],

    });

  }

};

/* =====================================================
   MEMBERSHIP CARD
===================================================== */

exports.getMembershipCard = async (req, res) => {

  try {

    const result = await memberService.getMembershipCard(

      req.member._id

    );

    return res.status(200).json({

      success: true,

      message: result.message,

      data: result.card,

    });

  } catch (error) {

    console.error(

      "Membership Card:",

      error.message

    );

    return res.status(400).json({

      success: false,

      message: error.message,

      errors: [],

    });

  }

};

/* =====================================================
   ADMIN
   GET ALL MEMBERS
===================================================== */

exports.getAllMembers = async (req, res) => {

  try {

    const result = await memberService.getAllMembers();

    return res.status(200).json({

      success: true,

      message: result.message,

      total: result.total,

      data: result.members,

    });

  } catch (error) {

    console.error(

      "Get Members:",

      error.message

    );

    return res.status(400).json({

      success: false,

      message: error.message,

      errors: [],

    });

  }

};

/* =====================================================
   ADMIN
   GET MEMBER BY ID
===================================================== */

exports.getMemberById = async (req, res) => {

  try {

    const result = await memberService.getMemberById(

      req.params.id

    );

    return res.status(200).json({

      success: true,

      message: result.message,

      data: result.member,

    });

  } catch (error) {

    console.error(

      "Get Member:",

      error.message

    );

    return res.status(400).json({

      success: false,

      message: error.message,

      errors: [],

    });

  }

};

/* =====================================================
   EXPORTS
===================================================== */

module.exports = {

  getProfile: exports.getProfile,

  updateProfile: exports.updateProfile,

  uploadProfilePhoto: exports.uploadProfilePhoto,

  getDashboard: exports.getDashboard,

  getMembershipCard: exports.getMembershipCard,

  getAllMembers: exports.getAllMembers,

  getMemberById: exports.getMemberById,

};