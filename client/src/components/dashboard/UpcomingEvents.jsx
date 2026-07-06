import { Link } from "react-router-dom";

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
      <section className="upcoming-events">
        <p>Loading upcoming events...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="upcoming-events">
        <p>{error}</p>
      </section>
    );
  }

  const events = dashboard?.events || [];

  return (
    <section className="upcoming-events">

      <div className="widget-header">

        <div>

          <h2>Upcoming Events</h2>

          <p>
            Events available for your participation.
          </p>

        </div>

        <Link
          to="/dashboard/events"
          className="view-all-link"
        >
          View All
        </Link>

      </div>

      {events.length === 0 ? (

        <div className="empty-state">

          <h3>No Upcoming Events</h3>

          <p>
            There are currently no upcoming events.
            Check back again soon.
          </p>

        </div>

      ) : (

        <div className="events-list">

          {events.map((event) => (

            <div
              key={event.id}
              className="event-card"
            >

              <div className="event-date">

                <span>
                  {new Date(event.date).getDate()}
                </span>

                <small>

                  {new Date(event.date).toLocaleString(
                    "default",
                    {
                      month: "short",
                      year: "numeric",
                    }
                  )}

                </small>

              </div>

              <div className="event-details">

                <h3>{event.title}</h3>

                <p>{event.location}</p>

              </div>

              <div className="event-status">

                {event.registered ? (

                  <span className="status registered">
                    Registered
                  </span>

                ) : (

                  <span className="status open">
                    Open
                  </span>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );

}

export default UpcomingEvents;