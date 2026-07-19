import {
  Eye,
  Pencil,
  Trash2,
  Star,
  Calendar,
  Users,
} from "lucide-react";

import "./Event.css";

const EventTable = ({
  events,
  loading,
  error,
  onView,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="table-state">
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-state error">
        {error}
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="table-state">
        No events have been created yet.
      </div>
    );
  }

  return (
    <div className="event-table-wrapper">

      <table className="event-table">

        <thead>

          <tr>

            <th>Event</th>

            <th>Category</th>

            <th>Status</th>

            <th>Date</th>

            <th>Venue</th>

            <th>Registered</th>

            <th>Featured</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {events.map((event) => (

            <tr key={event._id}>

              <td>

                <div className="event-title-cell">

                  <img
                    src={
                      event.coverImage?.secureUrl ||
                      event.coverImage?.url ||
                      "/images/event-placeholder.jpg"
                    }
                    alt={event.title}
                  />

                  <div>

                    <strong>
                      {event.title}
                    </strong>

                    <span>
                      {event.eventType}
                    </span>

                  </div>

                </div>

              </td>

              <td>
                {event.category}
              </td>

              <td>

                <span
                  className={`status-badge ${event.status}`}
                >
                  {event.status}
                </span>

              </td>

              <td>

                <div className="date-cell">

                  <Calendar size={15} />

                  {new Date(
                    event.startDate
                  ).toLocaleDateString(
                    "en-KE"
                  )}

                </div>

              </td>

              <td>
                {event.venue?.name ||
                  "TBA"}
              </td>

              <td>

                <div className="registration-cell">

                  <Users size={15} />

                  {event.registeredParticipants ||
                    0}

                </div>

              </td>

              <td>

                {event.isFeatured ? (
                  <Star
                    size={18}
                    fill="gold"
                    color="gold"
                  />
                ) : (
                  "-"
                )}

              </td>

              <td>

                <div className="table-actions">

                  <button
                    className="view-btn"
                    onClick={() =>
                      onView(event)
                    }
                    title="View"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      onEdit(event)
                    }
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      onDelete(event)
                    }
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default EventTable;