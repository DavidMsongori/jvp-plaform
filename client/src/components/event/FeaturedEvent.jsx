import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  ArrowRight,
  Star,
  Monitor,
} from "lucide-react";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-KE", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const formatTime = (date) =>
  new Date(date).toLocaleTimeString("en-KE", {
    hour: "2-digit",
    minute: "2-digit",
  });

const formatCurrency = (amount = 0, currency = "KES") => {
  if (!amount) return "Free";

  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

const FeaturedEvent = ({ event }) => {
  if (!event) return null;

  const image =
    event.coverImage?.secureUrl ||
    event.coverImage?.url ||
    "/images/event-placeholder.jpg";

  const availableSeats =
    event.availableSlots ??
    (event.registration?.capacity > 0
      ? event.registration.capacity -
        (event.registeredParticipants || 0)
      : null);

  return (
    <section className="featured-event">

      <div className="featured-event__image">

        <img
          src={image}
          alt={event.coverImage?.alt || event.title}
        />

        <div className="featured-event__badge">
          <Star size={16} />
          Featured Event
        </div>

      </div>

      <div className="featured-event__content">

        <span className="featured-event__category">
          {event.category?.replaceAll("_", " ")}
        </span>

        <h2>{event.title}</h2>

        <p>
          {event.summary || event.shortDescription}
        </p>

        <div className="featured-event__meta">

          <div>
            <CalendarDays size={18} />
            <span>{formatDate(event.startDate)}</span>
          </div>

          <div>
            <Clock3 size={18} />
            <span>{formatTime(event.startDate)}</span>
          </div>

          <div>
            <MapPin size={18} />
            <span>
              {event.venue?.name}
              {event.venue?.county &&
                ` • ${event.venue.county}`}
            </span>
          </div>

          <div>
            <Monitor size={18} />
            <span>{event.eventType}</span>
          </div>

        </div>

        <div className="featured-event__registration">

          <div className="featured-event__price">
            {formatCurrency(
              event.registration?.registrationFee,
              event.registration?.currency
            )}
          </div>

          {availableSeats !== null && (
            <div className="featured-event__capacity">
              <Users size={18} />
              {availableSeats} seats left
            </div>
          )}

        </div>

        <Link
          to={`/events/${event.slug || event._id}`}
          className="featured-event__button"
        >
          View Event

          <ArrowRight size={18} />
        </Link>

      </div>

    </section>
  );
};

export default FeaturedEvent;