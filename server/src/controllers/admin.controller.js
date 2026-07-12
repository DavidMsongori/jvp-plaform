import * as adminService from "../services/admin.service.js";

/* ==========================================
   ADMIN DASHBOARD
========================================== */

export const getDashboard = async (req, res, next) => {
  try {

    const dashboard =
      await adminService.getDashboard();

    return res.status(200).json({
      success: true,
      message: "Dashboard retrieved successfully.",
      data: dashboard,
    });

  } catch (error) {

    next(error);

  }
};

/* ==========================================
   MEMBER MANAGEMENT
========================================== */

export const getMembers = async (req, res, next) => {
  try {

    const members =
      await adminService.getMembers(req.query);

    return res.status(200).json({
      success: true,
      message: "Members retrieved successfully.",
      data: members,
    });

  } catch (error) {

    next(error);

  }
};

export const getMemberById = async (req, res, next) => {
  try {

    const member =
      await adminService.getMemberById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: "Member retrieved successfully.",
      data: member,
    });

  } catch (error) {

    next(error);

  }
};

export const updateMember = async (req, res, next) => {
  try {

    const member =
      await adminService.updateMember(
        req.params.id,
        req.body,
        req.user._id
      );

    return res.status(200).json({
      success: true,
      message: "Member updated successfully.",
      data: member,
    });

  } catch (error) {

    next(error);

  }
};

export const activateMember = async (req, res, next) => {
  try {

    const member =
      await adminService.activateMember(
        req.params.id,
        req.user._id
      );

    return res.status(200).json({
      success: true,
      message: "Member activated successfully.",
      data: member,
    });

  } catch (error) {

    next(error);

  }
};

export const deactivateMember = async (req, res, next) => {
  try {

    const member =
      await adminService.deactivateMember(
        req.params.id,
        req.user._id
      );

    return res.status(200).json({
      success: true,
      message: "Member deactivated successfully.",
      data: member,
    });

  } catch (error) {

    next(error);

  }
};

export const deleteMember = async (req, res, next) => {
  try {

    const result =
      await adminService.deleteMember(
        req.params.id,
        req.user._id
      );

    return res.status(200).json(result);

  } catch (error) {

    next(error);

  }
};

/* ==========================================
   PAYMENT MANAGEMENT
========================================== */

export const getPayments = async (req, res, next) => {
  try {

    const payments =
      await adminService.getPayments(req.query);

    return res.status(200).json({
      success: true,
      message: "Payments retrieved successfully.",
      data: payments,
    });

  } catch (error) {

    next(error);

  }
};

export const verifyPayment = async (req, res, next) => {
  try {

    const payment =
      await adminService.verifyPayment(
        req.params.id,
        req.user._id
      );

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully.",
      data: payment,
    });

  } catch (error) {

    next(error);

  }
};

/* ==========================================
   EVENT MANAGEMENT
========================================== */

export const getEvents = async (req, res, next) => {
  try {

    const events =
      await adminService.getEvents(req.query);

    return res.status(200).json({
      success: true,
      message: "Events retrieved successfully.",
      data: events,
    });

  } catch (error) {

    next(error);

  }
};

export const getEventById = async (req, res, next) => {
  try {

    const event =
      await adminService.getEventById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: "Event retrieved successfully.",
      data: event,
    });

  } catch (error) {

    next(error);

  }
};

export const createEvent = async (req, res, next) => {
  try {

    const event =
      await adminService.createEvent(
        req.body,
        req.user._id
      );

    return res.status(201).json({
      success: true,
      message: "Event created successfully.",
      data: event,
    });

  } catch (error) {

    next(error);

  }
};

export const updateEvent = async (req, res, next) => {
  try {

    const event =
      await adminService.updateEvent(
        req.params.id,
        req.body,
        req.user._id
      );

    return res.status(200).json({
      success: true,
      message: "Event updated successfully.",
      data: event,
    });

  } catch (error) {

    next(error);

  }
};

export const deleteEvent = async (req, res, next) => {
  try {

    const result =
      await adminService.deleteEvent(
        req.params.id,
        req.user._id
      );

    return res.status(200).json(result);

  } catch (error) {

    next(error);

  }
};

/* ==========================================
   REPORTS
========================================== */

export const getReports = async (req, res, next) => {
  try {

    const reports =
      await adminService.getReports();

    return res.status(200).json({
      success: true,
      message: "Reports generated successfully.",
      data: reports,
    });

  } catch (error) {

    next(error);

  }
};

/* ==========================================
   ACTIVITY LOGS
========================================== */

export const getActivityLogs = async (
  req,
  res,
  next
) => {
  try {

    const logs =
      await adminService.getActivityLogs(
        req.query
      );

    return res.status(200).json({
      success: true,
      message: "Activity logs retrieved successfully.",
      data: logs,
    });

  } catch (error) {

    next(error);

  }
};