import slugify from "slugify";

import Event from "../models/Event.js";

import AppError from "../utils/AppError.js";

/* ===========================================================
   HELPERS
=========================================================== */

/**
 * Generate a unique slug for an event.
 */
const generateUniqueSlug = async (title, excludeId = null) => {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query = { slug };

    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const exists = await Event.exists(query);

    if (!exists) break;

    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
};

/**
 * Check for duplicate event.
 */
const checkDuplicateEvent = async ({
  title,
  startDate,
  venue,
  excludeId = null,
}) => {
  const query = {
    title,
    startDate,
    venue,
    isDeleted: false,
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  const duplicate = await Event.findOne(query);

  if (duplicate) {
    throw new AppError(
      409,
      "An event with the same title, venue and start date already exists."
    );
  }
};

/* ===========================================================
   CREATE EVENT
=========================================================== */

export const createEvent = async (eventData, userId) => {
  await checkDuplicateEvent({
    title: eventData.title,
    startDate: eventData.startDate,
    venue: eventData.venue,
  });

  const slug = await generateUniqueSlug(eventData.title);

  const event = await Event.create({
    ...eventData,
    slug,
    createdBy: userId,
  });

  return Event.findById(event._id)
    .populate("venue")
    .populate("speakers")
    .populate("partners")
    .populate("createdBy", "firstName lastName email");
};

/* ===========================================================
   UPDATE EVENT
=========================================================== */

export const updateEvent = async (
  eventId,
  updateData,
  userId
) => {
  const event = await Event.findOne({
    _id: eventId,
    isDeleted: false,
  });

  if (!event) {
    throw new AppError(404, "Event not found.");
  }

  if (updateData.title) {
    await checkDuplicateEvent({
      title: updateData.title,
      startDate: updateData.startDate || event.startDate,
      venue: updateData.venue || event.venue,
      excludeId: eventId,
    });

    updateData.slug = await generateUniqueSlug(
      updateData.title,
      eventId
    );
  }

  Object.assign(event, updateData);

  event.updatedBy = userId;

  await event.save();

  return Event.findById(event._id)
    .populate("venue")
    .populate("speakers")
    .populate("partners")
    .populate("createdBy", "firstName lastName email")
    .populate("updatedBy", "firstName lastName email");
};

/* ===========================================================
   DELETE EVENT (SOFT DELETE)
=========================================================== */

export const deleteEvent = async (eventId, userId) => {
  const event = await Event.findOne({
    _id: eventId,
    isDeleted: false,
  });

  if (!event) {
    throw new AppError(404, "Event not found.");
  }

  event.isDeleted = true;
  event.deletedAt = new Date();
  event.updatedBy = userId;

  await event.save();

  return {
    success: true,
    message: "Event deleted successfully.",
  };
};

/* ===========================================================
   GET EVENT BY ID
=========================================================== */

export const getEventById = async (eventId) => {
  const event = await Event.findOne({
    _id: eventId,
    isDeleted: false,
  })
    .populate("venue")
    .populate("speakers")
    .populate("partners")
    .populate("createdBy", "firstName lastName email")
    .populate("updatedBy", "firstName lastName email")
    .populate("publishedBy", "firstName lastName email");

  if (!event) {
    throw new AppError(404, "Event not found.");
  }

  return event;
};

/* ===========================================================
   GET EVENT BY SLUG
=========================================================== */

export const getEventBySlug = async (slug) => {
  const event = await Event.findOne({
    slug,
    isDeleted: false,
    isPublished: true,
  })
    .populate("venue")
    .populate("speakers")
    .populate("partners");

  if (!event) {
    throw new AppError(404, "Event not found.");
  }

  return event;
};

/* ===========================================================
   GET ALL EVENTS
=========================================================== */

export const getAllEvents = async (query = {}) => {
  const {
    page = 1,
    limit = 10,
    search,
    category,
    eventType,
    status,
    featured,
    venue,
    sort = "-startDate",
  } = query;

  const filter = {
    isDeleted: false,
  };

  /* -------------------------
     SEARCH
  -------------------------- */

  if (search) {
    filter.$text = {
      $search: search,
    };
  }

  /* -------------------------
     FILTERS
  -------------------------- */

  if (category) {
    filter.category = category;
  }

  if (eventType) {
    filter.eventType = eventType;
  }

  if (status) {
    filter.status = status;
  }

  if (venue) {
    filter.venue = venue;
  }

  if (featured !== undefined) {
    filter.featured = featured === "true";
  }

  const currentPage = Math.max(parseInt(page, 10), 1);
  const pageSize = Math.max(parseInt(limit, 10), 1);

  const skip = (currentPage - 1) * pageSize;

  const [events, total] = await Promise.all([
    Event.find(filter)
      .populate("venue")
      .populate("speakers")
      .populate("partners")
      .sort(sort)
      .skip(skip)
      .limit(pageSize),

    Event.countDocuments(filter),
  ]);

  return {
    events,

    pagination: {
      total,
      page: currentPage,
      limit: pageSize,
      totalPages: Math.ceil(total / pageSize),

      hasNextPage: currentPage * pageSize < total,

      hasPrevPage: currentPage > 1,
    },
  };
};

/* ===========================================================
   GET FEATURED EVENTS
=========================================================== */

export const getFeaturedEvents = async (
  limit = 6
) => {
  return Event.find({
    featured: true,
    isPublished: true,
    isDeleted: false,
  })
    .populate("venue")
    .sort({
      startDate: 1,
    })
    .limit(limit);
};

/* ===========================================================
   GET UPCOMING EVENTS
=========================================================== */

export const getUpcomingEvents = async (
  limit = 10
) => {
  return Event.find({
    startDate: {
      $gte: new Date(),
    },
    isPublished: true,
    isDeleted: false,
  })
    .populate("venue")
    .sort({
      startDate: 1,
    })
    .limit(limit);
};

/* ===========================================================
   GET ONGOING EVENTS
=========================================================== */

export const getOngoingEvents = async () => {
  const now = new Date();

  return Event.find({
    startDate: { $lte: now },
    endDate: { $gte: now },
    isPublished: true,
    isDeleted: false,
  })
    .populate("venue")
    .populate("speakers")
    .sort({
      startDate: 1,
    });
};

/* ===========================================================
   GET EVENTS BY CATEGORY
=========================================================== */

export const getEventsByCategory = async (
  category,
  limit = 20
) => {
  return Event.find({
    category,
    isPublished: true,
    isDeleted: false,
  })
    .populate("venue")
    .sort({
      startDate: 1,
    })
    .limit(limit);
};

/* ===========================================================
   PUBLISH EVENT
=========================================================== */

export const publishEvent = async (eventId, userId) => {
  const event = await Event.findOne({
    _id: eventId,
    isDeleted: false,
  });

  if (!event) {
    throw new AppError(404, "Event not found.");
  }

  await event.publish(userId);

  return Event.findById(eventId)
    .populate("venue")
    .populate("speakers")
    .populate("partners");
};

/* ===========================================================
   ARCHIVE EVENT
=========================================================== */

export const archiveEvent = async (eventId) => {
  const event = await Event.findOne({
    _id: eventId,
    isDeleted: false,
  });

  if (!event) {
    throw new AppError(404, "Event not found.");
  }

  await event.archive();

  return event;
};

/* ===========================================================
   INCREMENT VIEW COUNT
=========================================================== */

export const incrementViews = async (eventId) => {
  const event = await Event.findOne({
    _id: eventId,
    isDeleted: false,
  });

  if (!event) return null;

  await event.incrementViews();

  return true;
};

/* ===========================================================
   INCREMENT SHARE COUNT
=========================================================== */

export const incrementShares = async (eventId) => {
  const event = await Event.findOne({
    _id: eventId,
    isDeleted: false,
  });

  if (!event) return null;

  await event.incrementShares();

  return true;
};

/* ===========================================================
   INCREMENT BOOKMARK COUNT
=========================================================== */

export const incrementBookmarks = async (eventId) => {
  const event = await Event.findOne({
    _id: eventId,
    isDeleted: false,
  });

  if (!event) return null;

  await event.incrementBookmarks();

  return true;
};

/* ===========================================================
   INCREMENT IMPRESSIONS
=========================================================== */

export const incrementImpressions = async (eventId) => {
  const event = await Event.findOne({
    _id: eventId,
    isDeleted: false,
  });

  if (!event) return null;

  await event.incrementImpressions();

  return true;
};

/* ===========================================================
   EVENT DASHBOARD STATISTICS
=========================================================== */

export const getDashboardStatistics = async () => {
  const now = new Date();

  const [
    totalEvents,
    publishedEvents,
    draftEvents,
    featuredEvents,
    upcomingEvents,
    ongoingEvents,
    completedEvents,
    cancelledEvents,
  ] = await Promise.all([
    Event.countDocuments({
      isDeleted: false,
    }),

    Event.countDocuments({
      isPublished: true,
      isDeleted: false,
    }),

    Event.countDocuments({
      status: "draft",
      isDeleted: false,
    }),

    Event.countDocuments({
      featured: true,
      isDeleted: false,
    }),

    Event.countDocuments({
      startDate: { $gt: now },
      isDeleted: false,
    }),

    Event.countDocuments({
      startDate: { $lte: now },
      endDate: { $gte: now },
      isDeleted: false,
    }),

    Event.countDocuments({
      endDate: { $lt: now },
      isDeleted: false,
    }),

    Event.countDocuments({
      status: "cancelled",
      isDeleted: false,
    }),
  ]);

  return {
    totalEvents,
    publishedEvents,
    draftEvents,
    featuredEvents,
    upcomingEvents,
    ongoingEvents,
    completedEvents,
    cancelledEvents,
  };
};

/* ===========================================================
   UPDATE REGISTRATION COUNTERS
=========================================================== */

/**
 * Called by the Event Registration service whenever
 * a registration changes.
 */
export const updateRegistrationCounters = async (
  eventId,
  counters
) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new AppError(404, "Event not found.");
  }

  Object.assign(event, counters);

  await event.save();

  return event;
};
