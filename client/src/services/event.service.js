import api from "./api";

/* ==========================================
   FORM DATA HELPER
========================================== */

const buildEventFormData = (event) => {
  const formData = new FormData();

  /* ==========================================
     BASIC INFORMATION
  ========================================== */

  formData.append("title", event.title || "");
  formData.append("slug", event.slug || "");
  formData.append(
    "shortDescription",
    event.shortDescription || ""
  );
  formData.append(
    "description",
    event.description || ""
  );

  /* ==========================================
     CLASSIFICATION
  ========================================== */

  formData.append(
    "category",
    event.category || ""
  );

  formData.append(
    "eventType",
    event.eventType || "physical"
  );

  formData.append(
    "featured",
    event.featured
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

  if (event.venue) {
    formData.append("venue", event.venue);
  }

  /* ==========================================
     REGISTRATION
  ========================================== */

  formData.append(
    "registration",
    JSON.stringify(
      event.registration || {}
    )
  );

  /* ==========================================
     STATUS
  ========================================== */

  formData.append(
    "status",
    event.status || "draft"
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

  if (
    Array.isArray(event.gallery)
  ) {
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
   EVENTS
========================================== */

export const getEvents = async (
  params = {}
) => {
  const response = await api.get(
    "/events",
    { params }
  );

  return response.data;
};

export const getEventById = async (
  id
) => {
  const response = await api.get(
    `/events/${id}`
  );

  return response.data;
};

export const getEventBySlug =
  async (slug) => {
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
    const response =
      await api.get(
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

export const createEvent =
  async (eventData) => {
    const formData =
      buildEventFormData(
        eventData
      );

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

export const updateEvent =
  async (
    id,
    eventData
  ) => {
    const formData =
      buildEventFormData(
        eventData
      );

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

export const deleteEvent =
  async (id) => {
    const response =
      await api.delete(
        `/events/${id}`
      );

    return response.data;
  };

export const publishEvent =
  async (id) => {
    const response =
      await api.patch(
        `/events/${id}/publish`
      );

    return response.data;
  };

export const archiveEvent =
  async (id) => {
    const response =
      await api.patch(
        `/events/${id}/archive`
      );

    return response.data;
  };

/* ==========================================
   DASHBOARD
========================================== */

export const getDashboardStatistics =
  async () => {
    const response =
      await api.get(
        "/events/statistics"
      );

    return response.data;
  };

/* ==========================================
   ANALYTICS
========================================== */

export const recordView =
  async (id) => {
    const response =
      await api.patch(
        `/events/${id}/view`
      );

    return response.data;
  };

export const recordShare =
  async (id) => {
    const response =
      await api.patch(
        `/events/${id}/share`
      );

    return response.data;
  };

export const recordBookmark =
  async (id) => {
    const response =
      await api.patch(
        `/events/${id}/bookmark`
      );

    return response.data;
  };

export const recordImpression =
  async (id) => {
    const response =
      await api.patch(
        `/events/${id}/impression`
      );

    return response.data;
  };

/* ==========================================
   DEFAULT EXPORT
========================================== */

const eventService = {
  getEvents,
  getEventById,
  getEventBySlug,
  getFeaturedEvents,
  getUpcomingEvents,
  getOngoingEvents,
  getEventsByCategory,

  createEvent,
  updateEvent,
  deleteEvent,
  publishEvent,
  archiveEvent,

  getDashboardStatistics,

  recordView,
  recordShare,
  recordBookmark,
  recordImpression,
};

export default eventService;