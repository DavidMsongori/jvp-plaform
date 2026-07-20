import EventCard from "./EventCard";
import EmptyState from "./EmptyState";
import Skeleton from "./Skeleton";

const Grid = ({
  events = [],
  loading = false,
  error = "",
  onRetry,
}) => {
  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {
    return (
      <section className="events-grid-section">
        <div className="events-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  /* ==========================================
     ERROR
  ========================================== */

  if (error) {
    return (
      <section className="events-grid-section">

        <div className="events-error">

          <h3>
            Unable to load events
          </h3>

          <p>{error}</p>

          {onRetry && (
            <button
              type="button"
              className="events-button"
              onClick={onRetry}
            >
              Try Again
            </button>
          )}

        </div>

      </section>
    );
  }

  /* ==========================================
     EMPTY
  ========================================== */

  if (!events.length) {
    return (
      <section className="events-grid-section">
        <EmptyState />
      </section>
    );
  }

  /* ==========================================
     SUCCESS
  ========================================== */

  return (
    <section className="events-grid-section">

      <div className="events-grid-header">

        <h2>
          Upcoming Events
        </h2>

        <span>
          {events.length}{" "}
          {events.length === 1
            ? "event"
            : "events"}
        </span>

      </div>

      <div className="events-grid">

        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
          />
        ))}

      </div>

    </section>
  );
};

export default Grid;