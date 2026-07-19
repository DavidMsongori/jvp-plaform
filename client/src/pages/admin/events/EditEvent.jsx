import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Loader2,
  AlertTriangle,
} from "lucide-react";

import EventForm from "../../../components/admin/events/EventForm";
import eventService from "../../../services/event.service";

const EditEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      loadEvent();
    }
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await eventService.getEventById(id);

      const eventData =
        response?.data || response;

      setEvent(eventData);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load event."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    formData
  ) => {
    try {
      setSaving(true);
      setError("");

      await eventService.updateEvent(
        id,
        formData
      );

      navigate("/admin/events");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to update event."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-state">

        <Loader2
          size={40}
          className="spinner"
        />

        <h2>
          Loading Event...
        </h2>

      </div>
    );
  }

  if (!event) {
    return (
      <div className="loading-state">

        <AlertTriangle size={40} />

        <h2>
          Event not found.
        </h2>

      </div>
    );
  }

  return (
    <div className="create-event-page">

      <div className="page-header">

        <button
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

            <Pencil size={30} />

            Edit Event

          </h1>

          <p>
            Update the event
            information.
          </p>

        </div>

      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <EventForm
        mode="edit"
        initialValues={event}
        loading={saving}
        onSubmit={handleSubmit}
        onCancel={() =>
          navigate("/admin/events")
        }
      />

    </div>
  );
};

export default EditEvent;