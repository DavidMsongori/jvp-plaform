import { Link } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Users,
  Clock3,
  ArrowRight,
  Tag,
  Monitor,
  Globe,
} from "lucide-react";

import "./EventCard.css";

/* ===========================================================
   HELPERS
=========================================================== */

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-KE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getEventTypeIcon = (type) => {
  switch (type) {
    case "virtual":
      return <Monitor size={16} />;

    case "hybrid":
      return <Globe size={16} />;

    default:
      return <MapPin size={16} />;
  }
};

/* ===========================================================
   COMPONENT
=========================================================== */

const EventCard = ({ event }) => {
  if (!event) return null;

  const registration = event.registration || {};

  const isFree =
    !registration.fee ||
    Number(registration.fee) === 0;

  const remainingSeats =
    registration.capacity
      ? Math.max(
          registration.capacity -
            (registration.totalRegistrations || 0),
          0
        )
      : null;

  const registrationOpen =
    registration.enabled &&
    (!registration.opensAt ||
      new Date(registration.opensAt) <= new Date()) &&
    (!registration.closesAt ||
      new Date(registration.closesAt) >= new Date());

  return (
    <article className="event-card">
      {/* ==========================================
          COVER IMAGE
      ========================================== */}

      <div className="event-card-image">
        <img
          src={
            event.coverImage?.secureUrl ||
            "/placeholder-event.jpg"
          }
          alt={
            event.coverImage?.alt ||
            event.title
          }
        />

        <span className="event-category">
          {event.category}
        </span>

        {event.isFeatured && (
          <span className="event-featured">
            Featured
          </span>
        )}
      </div>

      {/* ==========================================
          BODY
      ========================================== */}

      <div className="event-card-body">
        <h3>{event.title}</h3>

        <p>{event.summary}</p>

        <div className="event-meta">
          <div>
            <CalendarDays size={16} />
            <span>
              {formatDate(event.startDate)}
            </span>
          </div>

          <div>
            {getEventTypeIcon(
              event.eventType
            )}

            <span
              style={{
                textTransform:
                  "capitalize",
              }}
            >
              {event.eventType}
            </span>
          </div>

          <div>
            <MapPin size={16} />

            <span>
              {event.venue?.name ||
                "Venue TBA"}
            </span>
          </div>

          <div>
            <Users size={16} />

            <span>
              {registration.capacity
                ? `${remainingSeats} / ${registration.capacity} Seats Left`
                : "Unlimited Seats"}
            </span>
          </div>
        </div>
      </div>

      {/* ==========================================
          FOOTER
      ========================================== */}

      <div className="event-card-footer">
        <div className="event-price">
          {isFree ? (
            <span className="free">
              FREE
            </span>
          ) : (
            <>
              <Tag size={16} />

              <span>
                KES{" "}
                {Number(
                  registration.fee
                ).toLocaleString()}
              </span>
            </>
          )}
        </div>

        <Link
          to={`/dashboard/events/${event._id}`}
          className="event-button"
        >
          {registrationOpen
            ? "View Event"
            : "View Details"}

          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
};

export default EventCard;