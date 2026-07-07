import { Link } from "react-router-dom";

import {
  CalendarDays,
  Clock3,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { useDashboard } from "../../context/DashboardContext";

import "./UpcomingEvents.css";

function UpcomingEvents() {

  const {
    dashboard,
    loading,
    error,
  } = useDashboard();

  if (loading) {
    return (
      <section className="events-panel dashboard-card">
        <div className="empty-state">
          Loading upcoming events...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="events-panel dashboard-card">
        <div className="empty-state">
          {error}
        </div>
      </section>
    );
  }

  if (!dashboard?.events) {
    return (
      <section className="events-panel dashboard-card">
        <div className="empty-state">
          No events available.
        </div>
      </section>
    );
  }

  const { events } = dashboard;

  return (

    <section className="events-panel dashboard-card">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="events-header">

        <div className="events-title">

          <CalendarDays size={22} />

          <div>

            <h2>

              Upcoming Events

            </h2>

            <p>

              Stay engaged with JVP activities.

            </p>

          </div>

        </div>

        <Link
          to="/dashboard/events"
          className="view-events-btn"
        >

          View All

          <ArrowRight size={18} />

        </Link>

      </div>

      {/* ==========================================
          EMPTY STATE
      ========================================== */}

      {events.length === 0 ? (

        <div className="empty-state">

          <h3>

            No Upcoming Events

          </h3>

          <p>

            New events will appear here once they are published.

          </p>

        </div>

      ) : (

        <div className="events-list">

          {events.map((event) => (

            <article
              key={event.id}
              className="event-card hover-lift"
            >

              {/* DATE */}

              <div className="event-date">

                <CalendarDays size={18} />

                <span>

                  {event.date}

                </span>

              </div>

              {/* BODY */}

              <div className="event-body">

                <h3>

                  {event.title}

                </h3>

                <div className="event-meta">

                  <span>

                    <Clock3 size={15} />

                    {event.time}

                  </span>

                  <span>

                    <MapPin size={15} />

                    {event.location}

                  </span>

                </div>

              </div>

              {/* FOOTER */}

              <div className="event-footer">

                <span
                  className={`status-badge ${event.statusClass}`}
                >

                  {event.status}

                </span>

                <Link
                  to="/dashboard/events"
                  className="event-link"
                >

                  View Details

                </Link>

              </div>

            </article>

          ))}

        </div>

      )}

    </section>

  );

}

export default UpcomingEvents;