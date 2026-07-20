import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Monitor,
  Star,
  ArrowRight,
} from "lucide-react";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-KE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatTime = (date) =>
  new Date(date).toLocaleTimeString("en-KE", {
    hour: "2-digit",
    minute: "2-digit",
  });

const formatCurrency = (
  amount = 0,
  currency = "KES"
) => {
  if (!amount) return "Free";

  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

const capitalize = (text = "") =>
  text.charAt(0).toUpperCase() + text.slice(1);

const EventCard = ({ event }) => {
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

  const registrationOpen =
    event.isRegistrationOpen ??
    event.registration?.enabled;

  return (
    <article className="event-card">

      {/* IMAGE */}

      <div className="event-card__image">

        <img
          src={image}
          alt={
            event.coverImage?.alt ||
            event.title
          }
          loading="lazy"
        />

        {event.featured && (
          <div className="event-card__featured">
            <Star size={14} />
            Featured
          </div>
        )}

        <span className="event-card__category">
          {capitalize(
            event.category?.replaceAll("_", " ")
          )}
        </span>

      </div>

      {/* BODY */}

      <div className="event-card__body">

        <h3 className="event-card__title">
          {event.title}
        </h3>

        <p className="event-card__summary">
          {event.summary ||
            event.shortDescription}
        </p>

        <div className="event-card__meta">

          <div>
            <CalendarDays size={16} />
            <span>
              {formatDate(event.startDate)}
            </span>
          </div>

          <div>
            <Clock3 size={16} />
            <span>
              {formatTime(event.startDate)}
            </span>
          </div>

          <div>
            <MapPin size={16} />
            <span>
              {event.venue?.name}
            </span>
          </div>

          <div>
            <Monitor size={16} />
            <span>
              {capitalize(
                event.eventType
              )}
            </span>
          </div>

        </div>

        {/* REGISTRATION */}

        <div className="event-card__footer">

          <div>

            <div className="event-card__price">
              {formatCurrency(
                event.registration
                  ?.registrationFee,
                event.registration
                  ?.currency
              )}
            </div>

            {availableSeats !== null && (
              <div className="event-card__capacity">
                <Users size={15} />

                {availableSeats} seats left
              </div>
            )}

          </div>

          <div
            className={`event-card__status ${
              registrationOpen
                ? "open"
                : "closed"
            }`}
          >
            {registrationOpen
              ? "Registration Open"
              : "Registration Closed"}
          </div>

        </div>

        <Link
          to={`/events/${
            event.slug || event._id
          }`}
          className="event-card__button"
        >
          View Details

          <ArrowRight size={18} />
        </Link>

      </div>

    </article>
  );
};

export default EventCard;