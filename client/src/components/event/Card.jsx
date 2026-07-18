import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Briefcase,
  Handshake,
  Clock,
} from "lucide-react";

import "./Event.css";

const Card = ({ event }) => {
  const {
    slug,
    title,
    shortDescription,
    startDate,
    endDate,
    coverImage,
    category,
    eventType,
    featured,
    venue,
    registration,
    registeredParticipants = 0,
    speakers = [],
    partners = [],
    status,
  } = event;

  const image =
    coverImage?.secureUrl ||
    coverImage?.url ||
    "/images/event-placeholder.jpg";

  const eventDate = new Date(startDate).toLocaleDateString(
    "en-KE",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  const capacity = registration?.capacity || 0;

  const percentage =
    capacity > 0
      ? Math.min(
          (registeredParticipants / capacity) * 100,
          100
        )
      : 0;

  const fee = registration?.paymentRequired
    ? `KES ${registration.registrationFee.toLocaleString()}`
    : "Free";

  const getStatus = () => {
    const now = new Date();

    if (status === "cancelled") {
      return {
        text: "Cancelled",
        className: "cancelled",
      };
    }

    if (new Date(endDate) < now) {
      return {
        text: "Completed",
        className: "completed",
      };
    }

    if (
      new Date(startDate) <= now &&
      new Date(endDate) >= now
    ) {
      return {
        text: "Ongoing",
        className: "ongoing",
      };
    }

    return {
      text: "Upcoming",
      className: "upcoming",
    };
  };

  const eventStatus = getStatus();

  return (
    <article className="event-card">

      <div className="event-card-image">

        <img
          src={image}
          alt={title}
          loading="lazy"
        />

        <div className="event-badges">

          {featured && (
            <span className="badge featured">
              Featured
            </span>
          )}

          <span
            className={`badge ${eventStatus.className}`}
          >
            {eventStatus.text}
          </span>

          <span className="badge category">
            {category}
          </span>

        </div>

      </div>

      <div className="event-card-body">

        <div className="event-type">
          {eventType}
        </div>

        <h3>{title}</h3>

        <p>{shortDescription}</p>

        <div className="event-details">

          <div>
            <Calendar size={16} />

            <span>{eventDate}</span>
          </div>

          <div>
            <MapPin size={16} />

            <span>
              {venue?.name || "Venue TBA"}
            </span>
          </div>

          <div>
            <Clock size={16} />

            <span>
              {venue?.address?.county ||
                "Coast Region"}
            </span>
          </div>

        </div>

        <div className="event-progress">

          <div className="progress-header">

            <span>
              Registration
            </span>

            <span>
              {registeredParticipants}
              {capacity > 0 &&
                ` / ${capacity}`}
            </span>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

        </div>

        <div className="event-stats">

          <div>
            <Users size={18} />
            <span>
              {registeredParticipants}
            </span>
          </div>

          <div>
            <Briefcase size={18} />
            <span>
              {speakers.length}
            </span>
          </div>

          <div>
            <Handshake size={18} />
            <span>
              {partners.length}
            </span>
          </div>

        </div>

        <div className="event-footer">

          <div className="event-price">
            {fee}
          </div>

          <Link
            to={`/events/${slug}`}
            className="event-btn"
          >
            View Details
          </Link>

        </div>

      </div>

    </article>
  );
};

export default Card;