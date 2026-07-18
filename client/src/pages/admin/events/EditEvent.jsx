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
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await eventService.getEventById(id);

      setEvent(response.data);

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load the event."
      );

    } finally {

      setLoading(false);

    }
  };

  const handleSubmit = async (formData) => {
    try {

      setSaving(true);

      setError("");

      await eventService.updateEvent(
        id,
        formData
      );

      navigate(`/admin/events/${id}`);

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
      <div className="admin-create-event-page">

        <div className="loading-state">

          <Loader2
            size={40}
            className="spinner"
          />

          <h2>Loading Event...</h2>

        </div>

      </div>
    );
  }

  return (
    <div className="admin-create-event-page">

      <div className="page-header">

        <div>

          <button
            className="back-button"
            onClick={() =>
              navigate("/admin/events")
            }
          >
            <ArrowLeft size={18} />
            Back to Events
          </button>

          <h1>

            <Pencil size={28} />

            Edit Event

          </h1>

          <p>
            Update event information,
            speakers, venue, registration
            and publishing settings.
          </p>

        </div>

      </div>

      {error && (

        <div className="form-alert error">

          <AlertTriangle size={18} />

          <span>{error}</span>

        </div>

      )}

      <EventForm
        mode="edit"
        initialValues={event}
        loading={saving}
        onSubmit={handleSubmit}
        onCancel={() =>
          navigate(`/admin/events/${id}`)
        }
      />

    </div>
  );
};

export default EditEvent;