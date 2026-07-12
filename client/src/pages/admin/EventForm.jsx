import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CalendarDays,
  Save,
  ArrowLeft,
} from "lucide-react";

import {
  createEvent,
  getEvent,
  updateEvent,
} from "../../services/admin.service";

const initialState = {
  title: "",
  category: "",
  description: "",
  location: "",
  startDate: "",
  endDate: "",
  capacity: "",
  registrationDeadline: "",
  status: "UPCOMING",
};

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const editing = Boolean(id);

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!editing) return;

    const loadEvent = async () => {
      try {
        const res = await getEvent(id);

        setForm({
          ...initialState,
          ...res.data.data,
        });
      } catch (err) {
        console.error(err);
      }
    };

    loadEvent();
  }, [editing, id]);

  const handleChange = ({ target }) => {
    setForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editing) {
        await updateEvent(id, form);
      } else {
        await createEvent(form);
      }

      navigate("/admin/events");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">

      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} className="me-2" />
        Back
      </button>

      <div className="card border-0 shadow-sm">

        <div className="card-header bg-white">
          <h4 className="mb-0">
            <CalendarDays className="me-2" />
            {editing ? "Edit Event" : "Create Event"}
          </h4>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">Event Title</label>

                <input
                  className="form-control"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Category</label>

                <select
                  className="form-select"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose...</option>
                  <option>Conference</option>
                  <option>Summit</option>
                  <option>Training</option>
                  <option>Workshop</option>
                  <option>Community Service</option>
                  <option>Sports</option>
                  <option>Meeting</option>
                </select>
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Description</label>

                <textarea
                  rows="5"
                  className="form-control"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Location</label>

                <input
                  className="form-control"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Capacity</label>

                <input
                  type="number"
                  className="form-control"
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Start Date</label>

                <input
                  type="datetime-local"
                  className="form-control"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">End Date</label>

                <input
                  type="datetime-local"
                  className="form-control"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Registration Deadline
                </label>

                <input
                  type="datetime-local"
                  className="form-control"
                  name="registrationDeadline"
                  value={form.registrationDeadline}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label">Status</label>

                <select
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="UPCOMING">Upcoming</option>
                  <option value="OPEN">Open</option>
                  <option value="CLOSED">Closed</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

            </div>

            <button
              className="btn btn-primary"
              disabled={loading}
            >
              <Save size={18} className="me-2" />
              {loading
                ? "Saving..."
                : editing
                ? "Update Event"
                : "Create Event"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EventForm;