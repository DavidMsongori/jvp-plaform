import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarPlus,
} from "lucide-react";

import EventForm from "../../../components/admin/events/EventForm";

import eventService from "../../../services/event.service";
import venueService from "../../../services/venue.service";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [venues, setVenues] = useState([]);

  const [loading, setLoading] = useState(false);

  const [loadingVenues, setLoadingVenues] =
    useState(true);

  const [error, setError] = useState("");

  /* =====================================================
     LOAD VENUES
  ===================================================== */

  useEffect(() => {
    loadVenues();
  }, []);

  const loadVenues = async () => {
    try {
      setLoadingVenues(true);

      const response =
        await venueService.getAllVenues();

      setVenues(response.venues || []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load venues."
      );
    } finally {
      setLoadingVenues(false);
    }
  };

  /* =====================================================
     CREATE EVENT
  ===================================================== */

  const handleCreate = async (
    eventData
  ) => {
    try {
      setLoading(true);

      setError("");

      const response =
        await eventService.createEvent(
          eventData
        );

      const createdEvent =
        response.event || response;

      navigate(
        `/admin/events/${createdEvent._id}`
      );
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

  /* =====================================================
     CREATE VENUE
  ===================================================== */

  const handleCreateVenue = () => {
    navigate("/admin/venues/create");
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

          <h1>

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
          ERROR
      ========================================== */}

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {/* ==========================================
          FORM
      ========================================== */}

      <EventForm
        mode="create"
        loading={loading}
        venues={venues}
        loadingVenues={loadingVenues}
        onSubmit={handleCreate}
        onCancel={() =>
          navigate("/admin/events")
        }
        onCreateVenue={
          handleCreateVenue
        }
      />

    </div>
  );
};

export default CreateEvent;