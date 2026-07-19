import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Archive,
} from "lucide-react";

import eventService from "../../../services/event.service";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);

      const response =
        await eventService.getEvents();

      setEvents(response.data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this event?"
    );

    if (!confirmed) return;

    try {
      await eventService.deleteEvent(id);

      loadEvents();
    } catch (error) {
      console.error(error);
      alert("Unable to delete event.");
    }
  };

  const handlePublish = async (id) => {
    try {
      await eventService.publishEvent(id);
      loadEvents();
    } catch (error) {
      console.error(error);
      alert("Unable to publish event.");
    }
  };

  const handleArchive = async (id) => {
    try {
      await eventService.archiveEvent(id);
      loadEvents();
    } catch (error) {
      console.error(error);
      alert("Unable to archive event.");
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      event.category
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="events-page">

      <div className="page-header">
        <div>
          <h1>Events</h1>
          <p>
            Manage all JVP Connect events.
          </p>
        </div>

        <Link
          to="/admin/events/create"
          className="btn btn-primary"
        >
          <Plus size={18} />
          New Event
        </Link>
      </div>

      <div className="events-toolbar">

        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

      </div>

      <div className="table-container">

        <table className="events-table">

          <thead>

            <tr>
              <th>Event</th>
              <th>Category</th>
              <th>Venue</th>
              <th>Start Date</th>
              <th>Status</th>
              <th width="230">
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="empty"
                >
                  Loading...
                </td>
              </tr>
            ) : filteredEvents.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="empty"
                >
                  No events found.
                </td>
              </tr>
            ) : (
              filteredEvents.map((event) => (
                <tr key={event._id}>

                  <td>

                    <div className="event-title">

                      <Calendar size={18} />

                      <div>

                        <strong>
                          {event.title}
                        </strong>

                        <span>
                          {event.summary}
                        </span>

                      </div>

                    </div>

                  </td>

                  <td>
                    {event.category}
                  </td>

                  <td>
                    {event.venue?.name}
                  </td>

                  <td>
                    {new Date(
                      event.startDate
                    ).toLocaleDateString()}
                  </td>

                  <td>

                    {event.isPublished ? (
                      <span className="badge success">
                        Published
                      </span>
                    ) : (
                      <span className="badge warning">
                        Draft
                      </span>
                    )}

                  </td>

                  <td>

                    <div className="action-buttons">

                      <Link
  to={`/admin/events/${event._id}`}
  className="icon-btn"
  title="View"
>
  <Eye size={18} />
</Link>

                      <Link
                        to={`/admin/events/edit/${event._id}`}
                        className="icon-btn"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>

                      {!event.isPublished && (
                        <button
                          className="icon-btn success"
                          onClick={() =>
                            handlePublish(
                              event._id
                            )
                          }
                          title="Publish"
                        >
                          <CheckCircle
                            size={18}
                          />
                        </button>
                      )}

                      <button
                        className="icon-btn warning"
                        onClick={() =>
                          handleArchive(
                            event._id
                          )
                        }
                        title="Archive"
                      >
                        <Archive
                          size={18}
                        />
                      </button>

                      <button
                        className="icon-btn danger"
                        onClick={() =>
                          handleDelete(
                            event._id
                          )
                        }
                        title="Delete"
                      >
                        <Trash2
                          size={18}
                        />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Events;