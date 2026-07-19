import "./MemberProfile.css";

function EventRegistrations({
  registrations = [],
  summary = {},
}) {
  return (
    <div className="profile-card">

      <div className="card-header">
        <h3>Event Registrations</h3>
      </div>

      <div className="profile-summary-grid">

        <div className="summary-item">
          <span>Total Events</span>
          <strong>
            {summary.totalEvents ??
              registrations.length}
          </strong>
        </div>

        <div className="summary-item">
          <span>Upcoming</span>
          <strong>
            {summary.upcomingEvents ?? 0}
          </strong>
        </div>

        <div className="summary-item">
          <span>Completed</span>
          <strong>
            {summary.completedEvents ?? 0}
          </strong>
        </div>

      </div>

      {registrations.length === 0 ? (
        <div className="empty-state">
          <p>
            This member has not registered
            for any events.
          </p>
        </div>
      ) : (
        <div className="event-list">

          {registrations.map(
            (registration) => {

              const event =
                registration.event ||
                registration;

              return (

                <div
                  key={registration._id}
                  className="event-card"
                >

                  <div className="event-content">

                    <h4>
                      {event.title ||
                        event.name ||
                        "Untitled Event"}
                    </h4>

                    <p>
                      {event.location ||
                        event.venue ||
                        "-"}
                    </p>

                    <small>

                      {event.startDate
                        ? new Date(
                            event.startDate
                          ).toLocaleDateString()
                        : "-"}

                    </small>

                  </div>

                  <span
                    className={`info-badge registration-${(
                      registration.status ||
                      "registered"
                    ).toLowerCase()}`}
                  >
                    {registration.status ||
                      "Registered"}
                  </span>

                </div>

              );
            }
          )}

        </div>
      )}

    </div>
  );
}

export default EventRegistrations;