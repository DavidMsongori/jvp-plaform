import { Link } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Users,
  ArrowRight,
  Star,
} from "lucide-react";

import "./FeaturedEvent.css";

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const FeaturedEvent = ({ event }) => {
  if (!event) return null;

  return (
    <section className="featured-event">

      <div className="featured-event-image">

        <img
          src={
            event.coverImage?.secureUrl ||
            "/placeholder-event.jpg"
          }
          alt={event.title}
        />

        <div className="featured-overlay">

          <span className="featured-label">
            <Star size={15} />
            Featured Event
          </span>

        </div>

      </div>

      <div className="featured-content">

        <span className="featured-category">
          {event.category}
        </span>

        <h2>{event.title}</h2>

        <p>
          {event.summary}
        </p>

        <div className="featured-meta">

          <span>
            <CalendarDays size={18} />
            {formatDate(event.startDate)}
          </span>

          <span>
            <MapPin size={18} />
            {event.venue?.name}
          </span>

          <span>
            <Users size={18} />
            {event.registration?.capacity
              ? `${event.registration.capacity} Seats`
              : "Unlimited Seats"}
          </span>

        </div>

        <div className="featured-actions">

          <Link
            to={`/dashboard/events/${event._id}`}
            className="btn-primary"
          >
            View Event
            <ArrowRight size={18} />
          </Link>

          {!event.registration?.fee ? (
            <span className="event-price free">
              FREE
            </span>
          ) : (
            <span className="event-price">
              KES{" "}
              {event.registration.fee.toLocaleString()}
            </span>
          )}

        </div>

      </div>

    </section>
  );
};

export default FeaturedEvent;