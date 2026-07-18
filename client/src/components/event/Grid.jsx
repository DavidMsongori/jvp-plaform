import Card from "./Card";
import "./Event.css";

const Grid = ({
  events,
  loading,
  error,
}) => {

  if (loading) {
    return (
      <section className="event-grid">

        <div className="event-loading">
          Loading events...
        </div>

      </section>
    );
  }

  if (error) {
    return (
      <section className="event-grid">

        <div className="event-error">
          {error}
        </div>

      </section>
    );
  }

  if (!events.length) {
    return (
      <section className="event-grid">

        <div className="event-empty">

          <h2>
            No events found
          </h2>

          <p>
            Try changing your search or
            filters.
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="event-grid">

      {events.map((event) => (
        <Card
          key={event._id}
          event={event}
        />
      ))}

    </section>
  );
};

export default Grid;