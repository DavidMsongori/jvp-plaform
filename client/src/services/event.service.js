import api from "./api";

/* ==========================================
   FORM DATA HELPER
========================================== */

const buildEventFormData = (event = {}) => {
  const formData = new FormData();

  /* ==========================================
     BASIC INFORMATION
  ========================================== */

  formData.append("title", event.title || "");
  formData.append("slug", event.slug || "");
  formData.append("summary", event.summary || "");
  formData.append("description", event.description || "");

  /* ==========================================
   CLASSIFICATION
========================================== */

formData.append("category", event.category || "");

formData.append(
  "eventType",
  event.eventType || "physical"
);

formData.append(
  "isFeatured",
  event.isFeatured ?? false
);

  /* ==========================================
     SCHEDULE
  ========================================== */

  formData.append(
    "startDate",
    event.startDate || ""
  );

  formData.append(
    "endDate",
    event.endDate || ""
  );

  formData.append(
    "timezone",
    event.timezone || "Africa/Nairobi"
  );

  /* ==========================================
     VENUE
  ========================================== */

  formData.append(
    "venue",
    JSON.stringify(event.venue || {})
  );

  formData.append(
    "virtualLink",
    event.virtualLink || ""
  );

  /* ==========================================
     REGISTRATION
  ========================================== */

  formData.append(
    "registration",
    JSON.stringify(event.registration || {})
  );

  /* ==========================================
     PUBLISHING
  ========================================== */

  formData.append(
    "isPublished",
    event.isPublished ?? false
  );

  /* ==========================================
     COVER IMAGE
  ========================================== */

  if (event.coverImage?.file) {
    formData.append(
      "coverImage",
      event.coverImage.file
    );
  }

  if (event.coverImage?.alt) {
    formData.append(
      "coverImageAlt",
      event.coverImage.alt
    );
  }

  /* ==========================================
     GALLERY
  ========================================== */

  if (Array.isArray(event.gallery)) {
    event.gallery.forEach((image) => {
      if (image.file) {
        formData.append(
          "gallery",
          image.file
        );
      }
    });
  }

  return formData;
};

/* ==========================================
   PUBLIC EVENTS
========================================== */

export const getEvents = async (params = {}) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) =>
        value !== "" &&
        value !== null &&
        value !== undefined
    )
  );

  const response = await api.get("/events", {
    params: cleanParams,
  });

  return response.data;
};

/* ==========================================
   SEARCH EVENTS
========================================== */

export const searchEvents = async (
  search,
  params = {}
) => {
  const response = await api.get(
    "/events",
    {
      params: {
        search,
        ...params,
      },
    }
  );

  return response.data;
};

/* ==========================================
   FILTER EVENTS
========================================== */

export const filterEvents = async (
  filters = {}
) => {
  const response = await api.get(
    "/events",
    {
      params: filters,
    }
  );

  return response.data;
};


export const getEventById = async (id) => {
  const response = await api.get(
    `/events/${id}`
  );

  return response.data;
};

export const getEventBySlug = async (
  slug
) => {
  const response = await api.get(
    `/events/slug/${slug}`
  );

  return response.data;
};

export const getFeaturedEvents =
  async (limit = 6) => {
    const response = await api.get(
      "/events/featured",
      {
        params: { limit },
      }
    );

    return response.data;
  };

export const getUpcomingEvents =
  async (limit = 10) => {
    const response = await api.get(
      "/events/upcoming",
      {
        params: { limit },
      }
    );

    return response.data;
  };

export const getOngoingEvents =
  async () => {
    const response = await api.get(
      "/events/ongoing"
    );

    return response.data;
  };

export const getEventsByCategory =
  async (
    category,
    limit = 20
  ) => {
    const response = await api.get(
      `/events/category/${category}`,
      {
        params: { limit },
      }
    );

    return response.data;
  };

/* ==========================================
   EVENT MANAGEMENT
========================================== */

export const createEvent = async (
  eventData
) => {
  const formData =
    buildEventFormData(eventData);

  const response = await api.post(
    "/events",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateEvent = async (
  id,
  eventData
) => {
  const formData =
    buildEventFormData(eventData);

  const response = await api.put(
    `/events/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteEvent = async (
  id
) => {
  const response = await api.delete(
    `/events/${id}`
  );

  return response.data;
};

export const publishEvent = async (
  id
) => {
  const response = await api.patch(
    `/events/${id}/publish`
  );

  return response.data;
};

export const archiveEvent = async (
  id
) => {
  const response = await api.patch(
    `/events/${id}/archive`
  );

  return response.data;
};

/* ==========================================
   DASHBOARD
========================================== */

export const getDashboardStatistics =
  async () => {
    const response = await api.get(
      "/events/statistics"
    );

    return response.data;
  };

/* ==========================================
   MEMBER REGISTRATIONS
========================================== */

export const registerForEvent = async (
  eventId,
  registrationData = {}
) => {
  const response = await api.post(
    `/events/${eventId}/register`,
    registrationData
  );

  return response.data;
};

export const cancelRegistration = async (
  eventId,
  reason = ""
) => {
  const response = await api.delete(
    `/events/${eventId}/register`,
    {
      data: {
        reason,
      },
    }
  );

  return response.data;
};

export const getMyRegistrations =
  async (params = {}) => {
    const response = await api.get(
      "/events/my-registrations",
      {
        params,
      }
    );

    return response.data;
  };

export const getMyRegistration =
  async (eventId) => {
    const response = await api.get(
      `/events/${eventId}/registration`
    );

    return response.data;
  };

/* ==========================================
   DEFAULT EXPORT
========================================== */

const eventService = {
  // Public
  getEvents,
  searchEvents,
  filterEvents,
  getEventById,
  getEventBySlug,
  getFeaturedEvents,
  getUpcomingEvents,
  getOngoingEvents,
  getEventsByCategory,

  // Admin
  createEvent,
  updateEvent,
  deleteEvent,
  publishEvent,
  archiveEvent,

  // Dashboard
  getDashboardStatistics,

  // Member
  registerForEvent,
  cancelRegistration,
  getMyRegistrations,
  getMyRegistration,
};
export default eventService;