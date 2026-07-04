import "./Events.css";

function Events() {
  const events = [
    {
      title: "Coastal Youth Summit 2026",
      location: "Kilifi County",
      date: "6 - 8 August 2026",
    },
    {
      title: "Blue Economy Forum",
      location: "Mombasa",
      date: "September 2026",
    },
    {
      title: "Climate Action Campaign",
      location: "Kwale",
      date: "October 2026",
    },
  ];

  return (
    <section className="events">

      <h2>Upcoming Events</h2>

      <div className="events-grid">

        {events.map((event, index) => (
          <div className="event-card" key={index}>

            <h3>{event.title}</h3>

            <p>{event.location}</p>

            <span>{event.date}</span>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Events;