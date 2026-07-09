const adminService = require("../services/admin.service");

/* =====================================================
   ADMIN DASHBOARD
===================================================== */

exports.getDashboard = async (req, res) => {

  try {

    const dashboard = await adminService.getDashboard();

    return res.status(200).json({

      success: true,

      message: "Dashboard retrieved successfully.",

      data: dashboard,

    });

  } catch (error) {

    console.error(

      "Admin Dashboard:",

      error.message

    );

    return res.status(500).json({

      success: false,

      message: error.message,

      errors: [],

    });

  }

};

/* =====================================================
   GET ALL MEMBERS
===================================================== */

exports.getMembers = async (req, res) => {

  try {

    const members = await adminService.getMembers(

      req.query

    );

    return res.status(200).json({

      success: true,

      message: "Members retrieved successfully.",

      total: members.length,

      data: members,

    });

  } catch (error) {

    console.error(

      "Get Members:",

      error.message

    );

    return res.status(500).json({

      success: false,

      message: error.message,

      errors: [],

    });

  }

};

/* =====================================================
   GET MEMBER BY ID
===================================================== */

exports.getMember = async (req, res) => {

  try {

    const member = await adminService.getMemberById(

      req.params.id

    );

    return res.status(200).json({

      success: true,

      message: "Member retrieved successfully.",

      data: member,

    });

  } catch (error) {

    console.error(

      "Get Member:",

      error.message

    );

    return res.status(404).json({

      success: false,

      message: error.message,

      errors: [],

    });

  }

};

/* =====================================================
   UPDATE MEMBER
===================================================== */

exports.updateMember = async (req, res) => {

  try {

    const member = await adminService.updateMember(

      req.params.id,

      req.body

    );

    return res.status(200).json({

      success: true,

      message: "Member updated successfully.",

      data: member,

    });

  } catch (error) {

    console.error(

      "Update Member:",

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
   DELETE MEMBER
===================================================== */

exports.deleteMember = async (req, res) => {

  try {

    await adminService.deleteMember(

      req.params.id

    );

    return res.status(200).json({

      success: true,

      message: "Member deleted successfully.",

    });

  } catch (error) {

    console.error(

      "Delete Member:",

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
   MEMBER APPLICATIONS
===================================================== */

exports.getApplications = async (req, res) => {

  try {

    const applications =

      await adminService.getApplications();

    return res.status(200).json({

      success: true,

      data: applications,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

/* =====================================================
   LEADERSHIP
===================================================== */

exports.getLeadership = async (req, res) => {

  try {

    const leadership =

      await adminService.getLeadership();

    return res.status(200).json({

      success: true,

      data: leadership,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

/* =====================================================
   EVENTS
===================================================== */

exports.getEvents = async (req, res) => {

  try {

    const events =

      await adminService.getEvents();

    return res.status(200).json({

      success: true,

      data: events,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

/* =====================================================
   PROGRAMS
===================================================== */

exports.getPrograms = async (req, res) => {

  try {

    const programs =

      await adminService.getPrograms();

    return res.status(200).json({

      success: true,

      data: programs,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

/* =====================================================
   COUNTIES
===================================================== */

exports.getCounties = async (req, res) => {

  try {

    const counties =

      await adminService.getCounties();

    return res.status(200).json({

      success: true,

      data: counties,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

/* =====================================================
   PAYMENTS
===================================================== */

exports.getPayments = async (req, res) => {

  try {

    const payments =

      await adminService.getPayments();

    return res.status(200).json({

      success: true,

      data: payments,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

/* =====================================================
   CERTIFICATES
===================================================== */

exports.getCertificates = async (req, res) => {

  try {

    const certificates =

      await adminService.getCertificates();

    return res.status(200).json({

      success: true,

      data: certificates,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

/* =====================================================
   NEWS
===================================================== */

exports.getNews = async (req, res) => {

  try {

    const news =

      await adminService.getNews();

    return res.status(200).json({

      success: true,

      data: news,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

/* =====================================================
   NOTIFICATIONS
===================================================== */

exports.getNotifications = async (req, res) => {

  try {

    const notifications =

      await adminService.getNotifications();

    return res.status(200).json({

      success: true,

      data: notifications,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

/* =====================================================
   SETTINGS
===================================================== */

exports.getSettings = async (req, res) => {

  try {

    const settings =

      await adminService.getSettings();

    return res.status(200).json({

      success: true,

      data: settings,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

exports.updateSettings = async (req, res) => {

  try {

    await adminService.updateSettings(

      req.body

    );

    return res.status(200).json({

      success: true,

      message: "Settings updated successfully.",

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};