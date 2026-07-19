import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarPlus,
} from "lucide-react";

import EventForm from "../../../components/admin/events/EventForm";
import eventService from "../../../services/event.service";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =====================================================
     CREATE EVENT
  ===================================================== */

  const handleCreate = async (eventData) => {
    try {
      setLoading(true);
      setError("");

      const response =
        await eventService.createEvent(eventData);

      /*
       * Supports both:
       * {
       *   success: true,
       *   data: {...}
       * }
       *
       * and
       *
       * {...event}
       */
      const createdEvent =
        response?.data || response;

      // Redirect to event details if available,
      // otherwise go back to the events list.
      if (createdEvent?._id) {
        navigate(
          `/admin/events/${createdEvent._id}`
        );
      } else {
        navigate("/admin/events");
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to create event."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div className="page-header">

        <button
          type="button"
          className="back-button"
          onClick={() =>
            navigate("/admin/events")
          }
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div>

          <h1 className="page-title">
            <CalendarPlus size={30} />
            Create Event
          </h1>

          <p>
            Fill in the details below to
            create a new event.
          </p>

        </div>

      </div>

      {/* ==========================================
          ERROR MESSAGE
      ========================================== */}

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {/* ==========================================
          EVENT FORM
      ========================================== */}

      <EventForm
        mode="create"
        loading={loading}
        onSubmit={handleCreate}
        onCancel={() =>
          navigate("/admin/events")
        }
      />

    </div>
  );
};

export default CreateEvent;