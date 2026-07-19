import * as eventService from "../services/event.service.js";

/* ===========================================================
   CREATE EVENT
=========================================================== */

export const createEvent = async (req, res, next) => {
  try {
    const event = await eventService.createEvent(
      req.body,
      req.files,
      req.user._id
    );

    res.status(201).json({
      success: true,
      message: "Event created successfully.",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   UPDATE EVENT
=========================================================== */

export const updateEvent = async (req, res, next) => {
  try {
    const event = await eventService.updateEvent(
      req.params.id,
      req.body,
      req.files,
      req.user._id
    );

    res.status(200).json({
      success: true,
      message: "Event updated successfully.",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   DELETE EVENT
=========================================================== */

export const deleteEvent = async (req, res, next) => {
  try {
    const result = await eventService.deleteEvent(
      req.params.id,
      req.user._id
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   GET EVENT BY ID
=========================================================== */

export const getEventById = async (req, res, next) => {
  try {
    const event = await eventService.getEventById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   GET EVENT BY SLUG
=========================================================== */

export const getEventBySlug = async (req, res, next) => {
  try {
    const event = await eventService.getEventBySlug(
      req.params.slug
    );

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   GET ALL EVENTS
=========================================================== */

export const getAllEvents = async (req, res, next) => {
  try {
    const result = await eventService.getAllEvents(
      req.query
    );

    res.status(200).json({
      success: true,
      count: result.events.length,
      data: result.events,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   PUBLISH EVENT
=========================================================== */

export const publishEvent = async (req, res, next) => {
  try {
    const event = await eventService.publishEvent(
      req.params.id,
      req.user._id
    );

    res.status(200).json({
      success: true,
      message: "Event published successfully.",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   ARCHIVE EVENT
=========================================================== */

export const archiveEvent = async (req, res, next) => {
  try {
    const event = await eventService.archiveEvent(
      req.params.id,
      req.user._id
    );

    res.status(200).json({
      success: true,
      message: "Event archived successfully.",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   GET FEATURED EVENTS
=========================================================== */

export const getFeaturedEvents = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 6;

    const events =
      await eventService.getFeaturedEvents(limit);

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   GET UPCOMING EVENTS
=========================================================== */

export const getUpcomingEvents = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;

    const events =
      await eventService.getUpcomingEvents(limit);

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   GET ONGOING EVENTS
=========================================================== */

export const getOngoingEvents = async (req, res, next) => {
  try {
    const events =
      await eventService.getOngoingEvents();

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   GET EVENTS BY CATEGORY
=========================================================== */

export const getEventsByCategory = async (
  req,
  res,
  next
) => {
  try {
    const limit = Number(req.query.limit) || 20;

    const events =
      await eventService.getEventsByCategory(
        req.params.category,
        limit
      );

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   REGISTER FOR EVENT
=========================================================== */

export const registerForEvent = async (
  req,
  res,
  next
) => {
  try {
    const registration =
      await eventService.registerForEvent(
        req.params.id,
        req.user._id
      );

    res.status(201).json({
      success: true,
      message:
        "Event registration completed successfully.",
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   GET MY REGISTRATIONS
=========================================================== */

export const getMyRegistrations = async (
  req,
  res,
  next
) => {
  try { 
    console.log("Authenticated User:", req.user);
    const result =
      await eventService.getMyRegistrations(
        req.user._id,
        req.query
      );

    res.status(200).json({
      success: true,
      count: result.registrations.length,
      data: result.registrations,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   GET MY REGISTRATION
=========================================================== */

export const getMyRegistration = async (
  req,
  res,
  next
) => {
  try {
    const registration =
      await eventService.getMyRegistration(
        req.params.id,
       req.user._id
      );

    res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   CANCEL REGISTRATION
=========================================================== */

export const cancelRegistration = async (
  req,
  res,
  next
) => {
  try {
    const registration =
      await eventService.cancelRegistration(
        req.params.id,
        req.user._id,
        req.body.reason
      );

    res.status(200).json({
      success: true,
      message:
        "Registration cancelled successfully.",
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   DASHBOARD STATISTICS
=========================================================== */

export const getDashboardStatistics = async (
  req,
  res,
  next
) => {
  try {
    const statistics =
      await eventService.getDashboardStatistics();

    res.status(200).json({
      success: true,
      data: statistics,
    });
  } catch (error) {
    next(error);
  }
};