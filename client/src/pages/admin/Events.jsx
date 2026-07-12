import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Search,
  Plus,
  MapPin,
  Users,
  Loader2,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  getEvents,
  deleteEvent,
} from "../../services/admin.service";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const loadEvents = async () => {
    try {
      setLoading(true);

      const res = await getEvents();

      setEvents(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      [
        event.title,
        event.location,
        event.category,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [events, search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await deleteEvent(id);
      loadEvents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold">
            <CalendarDays className="me-2"/>
            Events
          </h2>

          <p className="text-muted">
            Manage all JVP events.
          </p>
        </div>

        <Link
          to="/admin/events/new"
          className="btn btn-primary"
        >
          <Plus size={18} className="me-2"/>
          Create Event
        </Link>

      </div>

      <div className="card border-0 shadow-sm mb-4">

        <div className="card-body">

          <div className="input-group">

            <span className="input-group-text">
              <Search size={18}/>
            </span>

            <input
              className="form-control"
              placeholder="Search events..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />

          </div>

        </div>

      </div>

      <div className="card border-0 shadow-sm">

        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-light">

              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Location</th>
                <th>Capacity</th>
                <th>Registered</th>
                <th>Status</th>
                <th width="180">Actions</th>
              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <Loader2 className="spin"/>
                  </td>
                </tr>

              ) : filteredEvents.length === 0 ? (

                <tr>
                  <td colSpan="7" className="text-center py-5">
                    No events found.
                  </td>
                </tr>

              ) : (

                filteredEvents.map((event)=>(
                  <tr key={event._id}>

                    <td>
                      <div className="fw-semibold">
                        {event.title}
                      </div>

                      <small className="text-muted">
                        {event.category}
                      </small>
                    </td>

                    <td>
                      {new Date(event.startDate).toLocaleDateString()}
                    </td>

                    <td>
                      <MapPin size={16} className="me-1"/>
                      {event.location}
                    </td>

                    <td>
                      {event.capacity}
                    </td>

                    <td>
                      <Users size={16} className="me-1"/>
                      {event.registeredCount || 0}
                    </td>

                    <td>

                      <span
                        className={`badge ${
                          event.status==="OPEN"
                          ? "bg-success"
                          : event.status==="UPCOMING"
                          ? "bg-warning text-dark"
                          : event.status==="COMPLETED"
                          ? "bg-secondary"
                          : "bg-danger"
                        }`}
                      >
                        {event.status}
                      </span>

                    </td>

                    <td>

                      <div className="d-flex gap-2">

                        <Link
                          to={`/admin/events/${event._id}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          <Eye size={16}/>
                        </Link>

                        <Link
                          to={`/admin/events/${event._id}/edit`}
                          className="btn btn-outline-warning btn-sm"
                        >
                          <Pencil size={16}/>
                        </Link>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={()=>handleDelete(event._id)}
                        >
                          <Trash2 size={16}/>
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

    </div>
  );
};

export default Events;