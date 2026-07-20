import { useEffect } from "react";
import {
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";

import { useEvent } from "../../context/EventContext";
import { useAuth } from "../../context/AuthContext";

import EventDetails from "../../components/event/eventDetails/EventDetails";

import "./event.css";

export default function Event() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    selectedEvent,
    myRegistration,

    loading,
    submitting,
    error,

    loadEventBySlug,
    loadMyRegistration,

    register,
    cancelEventRegistration,
  } = useEvent();

  const {
    isAuthenticated,
    member,
  } = useAuth();

  /* =====================================================
     LOAD EVENT
  ===================================================== */

  useEffect(() => {
    if (!slug) return;

    loadEventBySlug(slug);

    // We intentionally only reload when the slug changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  /* =====================================================
     LOAD MY REGISTRATION
  ===================================================== */

  useEffect(() => {
    if (
      !isAuthenticated ||
      !selectedEvent?._id ||
      typeof loadMyRegistration !== "function"
    ) {
      return;
    }

    loadMyRegistration(selectedEvent._id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEvent?._id, isAuthenticated]);

  /* =====================================================
     REGISTER
  ===================================================== */

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: `/events/${slug}`,
        },
      });

      return;
    }

    try {
      await register(selectedEvent._id);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to register for this event."
      );
    }
  };

  /* =====================================================
     CANCEL REGISTRATION
  ===================================================== */

  const handleCancelRegistration = async () => {
    try {
      await cancelEventRegistration(
        selectedEvent._id
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to cancel registration."
      );
    }
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading && !selectedEvent) {
    return (
      <div className="event-page-loading">
        <div className="loader"></div>
        <p>Loading event...</p>
      </div>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error && !selectedEvent) {
    return (
      <div className="event-page-error">
        <h2>Unable to load event</h2>
        <p>
          {error?.response?.data?.message ||
            error?.message ||
            "Something went wrong."}
        </p>
      </div>
    );
  }

  /* =====================================================
     NOT FOUND
  ===================================================== */

  if (!loading && !selectedEvent) {
    return <Navigate to="/events" replace />;
  }

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main className="event-page">
      <EventDetails
        event={selectedEvent}
        loading={submitting}
        registration={myRegistration}
        currentUser={member}
        onRegister={handleRegister}
        onCancelRegistration={
          handleCancelRegistration
        }
      />
    </main>
  );
}