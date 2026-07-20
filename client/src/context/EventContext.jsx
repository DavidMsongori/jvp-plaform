import {
  createContext,
  useContext,
  useReducer,
  useMemo,
} from "react";

import eventService from "../services/event.service";

/* ===========================================================
   INITIAL STATE
=========================================================== */

const initialState = {
  /* ------------------------------------------
     EVENTS
  ------------------------------------------ */

  events: [],

  featuredEvents: [],

  upcomingEvents: [],

  ongoingEvents: [],

  selectedEvent: null,

  /* ------------------------------------------
     REGISTRATIONS
  ------------------------------------------ */

  registrations: [],

  myRegistration: null,

  /* ------------------------------------------
     DASHBOARD
  ------------------------------------------ */

  statistics: null,

  /* ------------------------------------------
     PAGINATION
  ------------------------------------------ */

  pagination: null,

  /* ------------------------------------------
     UI
  ------------------------------------------ */

  loading: false,

  submitting: false,

  error: null,
};

/* ===========================================================
   ACTION TYPES
=========================================================== */

const ACTIONS = {
  /* ---------- UI ---------- */

  SET_LOADING: "SET_LOADING",

  SET_SUBMITTING: "SET_SUBMITTING",

  SET_ERROR: "SET_ERROR",

  CLEAR_ERROR: "CLEAR_ERROR",

  /* ---------- EVENTS ---------- */

  SET_EVENTS: "SET_EVENTS",

  SET_FEATURED_EVENTS:
    "SET_FEATURED_EVENTS",

  SET_UPCOMING_EVENTS:
    "SET_UPCOMING_EVENTS",

  SET_ONGOING_EVENTS:
    "SET_ONGOING_EVENTS",

  SET_SELECTED_EVENT:
    "SET_SELECTED_EVENT",

  CLEAR_SELECTED_EVENT:
    "CLEAR_SELECTED_EVENT",

  /* ---------- REGISTRATIONS ---------- */

  SET_REGISTRATIONS:
    "SET_REGISTRATIONS",

  SET_MY_REGISTRATION:
    "SET_MY_REGISTRATION",

  /* ---------- DASHBOARD ---------- */

  SET_STATISTICS:
    "SET_STATISTICS",

  /* ---------- PAGINATION ---------- */

  SET_PAGINATION:
    "SET_PAGINATION",
};

/* ===========================================================
   REDUCER
=========================================================== */

const eventReducer = (
  state,
  action
) => {
  switch (action.type) {
    /* ======================================
       UI
    ====================================== */

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ACTIONS.SET_SUBMITTING:
      return {
        ...state,
        submitting: action.payload,
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    /* ======================================
       EVENTS
    ====================================== */

    case ACTIONS.SET_EVENTS:
      return {
        ...state,
        events: action.payload.events,

        pagination:
          action.payload.pagination,
      };

    case ACTIONS.SET_FEATURED_EVENTS:
      return {
        ...state,
        featuredEvents:
          action.payload,
      };

    case ACTIONS.SET_UPCOMING_EVENTS:
      return {
        ...state,
        upcomingEvents:
          action.payload,
      };

    case ACTIONS.SET_ONGOING_EVENTS:
      return {
        ...state,
        ongoingEvents:
          action.payload,
      };

    case ACTIONS.SET_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent:
          action.payload,
      };

    case ACTIONS.CLEAR_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: null,
      };

    /* ======================================
       REGISTRATIONS
    ====================================== */

    case ACTIONS.SET_REGISTRATIONS:
      return {
        ...state,
        registrations:
          action.payload.registrations,

        pagination:
          action.payload.pagination,
      };

    case ACTIONS.SET_MY_REGISTRATION:
      return {
        ...state,
        myRegistration:
          action.payload,
      };

    /* ======================================
       DASHBOARD
    ====================================== */

    case ACTIONS.SET_STATISTICS:
      return {
        ...state,
        statistics:
          action.payload,
      };

    /* ======================================
       PAGINATION
    ====================================== */

    case ACTIONS.SET_PAGINATION:
      return {
        ...state,
        pagination:
          action.payload,
      };

    /* ======================================
       DEFAULT
    ====================================== */

    default:
      return state;
  }
};

/* ===========================================================
   CONTEXT
=========================================================== */

const EventContext =
  createContext(null);

/* ===========================================================
   PROVIDER
=========================================================== */

export const EventProvider = ({
  children,
}) => {
  const [state, dispatch] =
    useReducer(
      eventReducer,
      initialState
    );

  /* =========================================================
     UI HELPERS
  ========================================================= */

  const setLoading = (value) => {
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: value,
    });
  };

  const setSubmitting = (
    value
  ) => {
    dispatch({
      type:
        ACTIONS.SET_SUBMITTING,
      payload: value,
    });
  };

  const setError = (
    error
  ) => {
    dispatch({
      type: ACTIONS.SET_ERROR,
      payload:
        error?.response?.data
          ?.message ||
        error.message ||
        "Something went wrong.",
    });
  };

  const clearError = () => {
    dispatch({
      type:
        ACTIONS.CLEAR_ERROR,
    });
  };

  /*
   -----------------------------------------------------------

   PART 2 STARTS HERE

   Event Loading Functions

   loadEvents()

   searchEvents()

   filterEvents()

   loadEventById()

   loadEventBySlug()

   loadFeaturedEvents()

   loadUpcomingEvents()

   loadOngoingEvents()

   loadEventsByCategory()

   -----------------------------------------------------------
  */


  /* ===========================================================
     LOAD EVENTS
  =========================================================== */

 const loadEvents = async (params = {}) => {
  try {
    setLoading(true);
    clearError();

    const response =
      await eventService.getEvents(params);

    const eventList = Array.isArray(response.data)
      ? response.data
      : response.data?.events ??
        response.events ??
        [];

    dispatch({
      type: ACTIONS.SET_EVENTS,
      payload: {
        events: eventList,
        pagination:
          response.pagination ??
          response.data?.pagination ??
          null,
      },
    });

    return response;
  } catch (error) {
    setError(error);
    throw error;
  } finally {
    setLoading(false);
  }
};

  /* ===========================================================
     SEARCH EVENTS
  =========================================================== */

  const searchEvents = async (
    search,
    params = {}
  ) => {
    try {
      setLoading(true);
      clearError();

      const response =
        await eventService.searchEvents(
          search,
          params
        );

      dispatch({
        type: ACTIONS.SET_EVENTS,
        payload: {
          events:
            response.data?.events ||
            response.events ||
            [],
          pagination:
            response.data?.pagination ||
            response.pagination ||
            null,
        },
      });

      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /* ===========================================================
     FILTER EVENTS
  =========================================================== */

  const filterEvents = async (
    filters = {}
  ) => {
    try {
      setLoading(true);
      clearError();

      const response =
        await eventService.filterEvents(
          filters
        );

      dispatch({
        type: ACTIONS.SET_EVENTS,
        payload: {
          events:
            response.data?.events ||
            response.events ||
            [],
          pagination:
            response.data?.pagination ||
            response.pagination ||
            null,
        },
      });

      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /* ===========================================================
     LOAD EVENT BY ID
  =========================================================== */

  const loadEventById = async (
    id
  ) => {
    try {
      setLoading(true);
      clearError();

      const response =
        await eventService.getEventById(id);

      dispatch({
        type:
          ACTIONS.SET_SELECTED_EVENT,
        payload:
          response.data ||
          response.event ||
          response,
      });

      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /* ===========================================================
     LOAD EVENT BY SLUG
  =========================================================== */

  const loadEventBySlug =
    async (slug) => {
      try {
        setLoading(true);
        clearError();

        const response =
          await eventService.getEventBySlug(
            slug
          );

        dispatch({
          type:
            ACTIONS.SET_SELECTED_EVENT,
          payload:
            response.data ||
            response.event ||
            response,
        });

        return response;
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

  /* ===========================================================
     FEATURED EVENTS
  =========================================================== */

  const loadFeaturedEvents = async (limit = 6) => {
  try {
    clearError();

    const response =
      await eventService.getFeaturedEvents(limit);

    const featuredList = Array.isArray(response.data)
      ? response.data
      : response.data?.events ??
        response.events ??
        [];

    dispatch({
      type: ACTIONS.SET_FEATURED_EVENTS,
      payload: featuredList,
    });

    return response;
  } catch (error) {
    setError(error);
    throw error;
  }
};

  /* ===========================================================
     UPCOMING EVENTS
  =========================================================== */

  const loadUpcomingEvents =
    async (limit = 10) => {
      try {
        clearError();

        const response =
          await eventService.getUpcomingEvents(
            limit
          );

        dispatch({
          type:
            ACTIONS.SET_UPCOMING_EVENTS,
          payload:
            response.data ||
            response.events ||
            response ||
            [],
        });

        return response;
      } catch (error) {
        setError(error);
        throw error;
      }
    };

  /* ===========================================================
     ONGOING EVENTS
  =========================================================== */

  const loadOngoingEvents =
    async () => {
      try {
        clearError();

        const response =
          await eventService.getOngoingEvents();

        dispatch({
          type:
            ACTIONS.SET_ONGOING_EVENTS,
          payload:
            response.data ||
            response.events ||
            response ||
            [],
        });

        return response;
      } catch (error) {
        setError(error);
        throw error;
      }
    };

  /* ===========================================================
     EVENTS BY CATEGORY
  =========================================================== */

  const loadEventsByCategory =
    async (
      category,
      limit = 20
    ) => {
      try {
        setLoading(true);
        clearError();

        const response =
          await eventService.getEventsByCategory(
            category,
            limit
          );

        dispatch({
          type: ACTIONS.SET_EVENTS,
          payload: {
            events:
              response.data ||
              response.events ||
              response ||
              [],
            pagination: null,
          },
        });

        return response;
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

  /* ===========================================================
     CLEAR SELECTED EVENT
  =========================================================== */

  const clearSelectedEvent =
    () => {
      dispatch({
        type:
          ACTIONS.CLEAR_SELECTED_EVENT,
      });
    };

      /* ===========================================================
     LOAD MY REGISTRATIONS
  =========================================================== */

  const loadMyRegistrations = async (params = {}) => {
  try {
    setLoading(true);
    clearError();

    const response =
      await eventService.getMyRegistrations(params);

    const registrations = Array.isArray(response.data)
      ? response.data
      : response.data?.registrations ??
        response.registrations ??
        [];

    const pagination =
      response.pagination ??
      response.data?.pagination ??
      null;

    dispatch({
      type: ACTIONS.SET_REGISTRATIONS,
      payload: {
        registrations,
        pagination,
      },
    });

    return response;
  } catch (error) {
    setError(error);
    throw error;
  } finally {
    setLoading(false);
  }
};

 /* ===========================================================
   LOAD MY REGISTRATION
=========================================================== */

const loadMyRegistration = async (eventId) => {
  try {
    const response =
      await eventService.getMyRegistration(
        eventId
      );

    dispatch({
      type: ACTIONS.SET_MY_REGISTRATION,
      payload:
        response.data ||
        response.registration ||
        response,
    });

    return response;
  } catch (error) {
    // User is not registered
    if (error?.response?.status === 404) {
      dispatch({
        type: ACTIONS.SET_MY_REGISTRATION,
        payload: null,
      });

      return null;
    }

    // Don't overwrite the event page with a registration error
    console.error(
      "Failed to load registration:",
      error
    );

    dispatch({
      type: ACTIONS.SET_MY_REGISTRATION,
      payload: null,
    });

    throw error;
  }
};

 /* ===========================================================
   REGISTER FOR EVENT
=========================================================== */

const register = async (
  eventId,
  registrationData = {}
) => {
  try {
    setSubmitting(true);

    const response =
      await eventService.registerForEvent(
        eventId,
        registrationData
      );

    dispatch({
      type: ACTIONS.SET_MY_REGISTRATION,
      payload:
        response.data ||
        response.registration ||
        response,
    });

    // Refresh user's registrations
    await loadMyRegistrations();

    // Refresh current event statistics
    if (state.selectedEvent?._id) {
      await loadEventById(state.selectedEvent._id);
    }

    return response;
  } catch (error) {
    // Registration errors should NOT replace the event page
    console.error("Registration failed:", error);

    throw error;
  } finally {
    setSubmitting(false);
  }
};

/* ===========================================================
   CANCEL REGISTRATION
=========================================================== */

const cancelEventRegistration = async (
  eventId,
  reason = ""
) => {
  try {
    setSubmitting(true);

    const response =
      await eventService.cancelRegistration(
        eventId,
        reason
      );

    dispatch({
      type: ACTIONS.SET_MY_REGISTRATION,
      payload: null,
    });

    // Refresh user's registrations
    await loadMyRegistrations();

    // Refresh current event statistics
    if (state.selectedEvent?._id) {
      await loadEventById(state.selectedEvent._id);
    }

    return response;
  } catch (error) {
    // Cancellation errors should NOT replace the event page
    console.error(
      "Failed to cancel registration:",
      error
    );

    throw error;
  } finally {
    setSubmitting(false);
  }
};

    /* ===========================================================
   DASHBOARD STATISTICS
=========================================================== */

const loadDashboardStatistics =
  async () => {
    try {
      setLoading(true);
      clearError();

      const response =
        await eventService.getDashboardStatistics();

      dispatch({
        type: ACTIONS.SET_STATISTICS,
        payload:
          response.data ||
          response.statistics ||
          response,
      });

      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

/* ===========================================================
   CREATE EVENT
=========================================================== */

const createNewEvent = async (
  eventData
) => {
  try {
    setSubmitting(true);
    clearError();

    const response =
      await eventService.createEvent(
        eventData
      );

    // Refresh event list
    await loadEvents();

    return response;
  } catch (error) {
    setError(error);
    throw error;
  } finally {
    setSubmitting(false);
  }
};

/* ===========================================================
   UPDATE EVENT
=========================================================== */

const updateExistingEvent =
  async (
    eventId,
    eventData
  ) => {
    try {
      setSubmitting(true);
      clearError();

      const response =
        await eventService.updateEvent(
          eventId,
          eventData
        );

      if (
        state.selectedEvent?._id ===
        eventId
      ) {
        await loadEventById(eventId);
      }

      await loadEvents();

      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

/* ===========================================================
   DELETE EVENT
=========================================================== */

const removeEvent = async (
  eventId
) => {
  try {
    setSubmitting(true);
    clearError();

    const response =
      await eventService.deleteEvent(
        eventId
      );

    if (
      state.selectedEvent?._id ===
      eventId
    ) {
      clearSelectedEvent();
    }

    await loadEvents();

    return response;
  } catch (error) {
    setError(error);
    throw error;
  } finally {
    setSubmitting(false);
  }
};

/* ===========================================================
   PUBLISH EVENT
=========================================================== */

const publishExistingEvent =
  async (eventId) => {
    try {
      setSubmitting(true);
      clearError();

      const response =
        await eventService.publishEvent(
          eventId
        );

      if (
        state.selectedEvent?._id ===
        eventId
      ) {
        await loadEventById(eventId);
      }

      await loadEvents();

      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

/* ===========================================================
   ARCHIVE EVENT
=========================================================== */

const archiveExistingEvent =
  async (eventId) => {
    try {
      setSubmitting(true);
      clearError();

      const response =
        await eventService.archiveEvent(
          eventId
        );

      if (
        state.selectedEvent?._id ===
        eventId
      ) {
        await loadEventById(eventId);
      }

      await loadEvents();

      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

    /* ===========================================================
     REFRESH HELPERS
  =========================================================== */

  const refreshEvents = async (params = {}) => {
    return loadEvents(params);
  };

  const refreshSelectedEvent = async () => {
    if (!state.selectedEvent?._id) return null;

    return loadEventById(state.selectedEvent._id);
  };

  const refreshDashboard = async () => {
    return loadDashboardStatistics();
  };

  const refreshFeaturedEvents = async (limit = 6) => {
    return loadFeaturedEvents(limit);
  };

  const refreshUpcomingEvents = async (limit = 10) => {
    return loadUpcomingEvents(limit);
  };

  const refreshOngoingEvents = async () => {
    return loadOngoingEvents();
  };

  /* ===========================================================
     CONTEXT VALUE
  =========================================================== */

  const value = useMemo(
    () => ({
      /* -------------------------
         STATE
      ------------------------- */

      ...state,

      /* -------------------------
         UI
      ------------------------- */

      setLoading,
      setSubmitting,
      setError,
      clearError,

      /* -------------------------
         EVENTS
      ------------------------- */

      loadEvents,
      refreshEvents,

      searchEvents,
      filterEvents,

      loadEventById,
      loadEventBySlug,

      refreshSelectedEvent,

      clearSelectedEvent,

      loadFeaturedEvents,
      loadUpcomingEvents,
      loadOngoingEvents,
      loadEventsByCategory,

      refreshFeaturedEvents,
      refreshUpcomingEvents,
      refreshOngoingEvents,

      /* -------------------------
         REGISTRATION
      ------------------------- */

      loadMyRegistrations,
      loadMyRegistration,

      register,

      cancelRegistration:
        cancelEventRegistration,

      /* -------------------------
         ADMIN
      ------------------------- */

      loadDashboardStatistics,
      refreshDashboard,

      createEvent:
        createNewEvent,

      updateEvent:
        updateExistingEvent,

      deleteEvent:
        removeEvent,

      publishEvent:
        publishExistingEvent,

      archiveEvent:
        archiveExistingEvent,
    }),
    [state]
  );

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

/* ===========================================================
   CUSTOM HOOK
=========================================================== */

export const useEvent = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error(
      "useEvent must be used within an EventProvider."
    );
  }

  return context;
};

export default EventContext;