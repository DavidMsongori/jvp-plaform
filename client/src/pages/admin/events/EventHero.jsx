import {
  CalendarDays,
  Clock3,
  MapPin,
  Star,
  Tag,
  Users,
} from "lucide-react";

const formatDate = (date) => {
  if (!date) return "TBA";

  return new Date(date).toLocaleString("en-KE", {
    dateStyle: "long",
    timeStyle: "short",
  });
};

const EventHero = ({
  event,
  children,
}) => {
  if (!event) return null;

  return (
    <section className="event-hero">

      {/* Cover */}

      <div className="event-hero-image">

        <img
          src={
            event.media?.coverImage?.preview ||
            "/placeholder-event.jpg"
          }
          alt={event.title}
        />

      </div>

      {/* Overlay */}

      <div className="event-hero-overlay">

        <div className="event-hero-content">

          {/* Badges */}

          <div className="event-badges">

            <span className="badge">

              {event.category}

            </span>

            <span className="badge">

              {event.eventType}

            </span>

            <span
              className={`status-badge ${event.status}`}
            >
              {event.status}
            </span>

            {event.featured && (

              <span className="featured-badge">

                <Star size={15} />

                Featured

              </span>

            )}

          </div>

          {/* Title */}

          <h1>{event.title}</h1>

          {/* Summary */}

          <p className="event-summary">

            {event.shortDescription}

          </p>

          {/* Quick Information */}

          <div className="event-meta">

            <div className="meta-item">

              <CalendarDays size={18} />

              <span>

                {formatDate(event.startDate)}

              </span>

            </div>

            <div className="meta-item">

              <Clock3 size={18} />

              <span>

                {event.timezone}

              </span>

            </div>

            <div className="meta-item">

              <MapPin size={18} />

              <span>

                {event.venue?.name}

              </span>

            </div>

            <div className="meta-item">

              <Tag size={18} />

              <span>

                {event.category}

              </span>

            </div>

            <div className="meta-item">

              <Users size={18} />

              <span>

                {event.registrationCount || 0}

                {" "}Registered

              </span>

            </div>

          </div>

          {/* Optional Buttons */}

          {children && (

            <div className="event-hero-actions">

              {children}

            </div>

          )}

        </div>

      </div>

    </section>
  );
};

export default EventHero;