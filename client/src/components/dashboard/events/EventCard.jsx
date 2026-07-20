import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  CheckCircle2,
  Star,
  Tag,
} from "lucide-react";

import "./EventCard.css";

const EventCard = ({
  event,
  registration = null,
}) => {
  if (!event) return null;

  const {
    title,
    slug,
    category,
    featured,
    coverImage,
    venue,
    startDate,
    endDate,
    registration: registrationSettings = {},
  } = event;

  const image =
    coverImage?.url ||
    "https://placehold.co/600x400?text=JVP+Connect";

  const capacity =
    registrationSettings.capacity || 0;

  const registered =
    registrationSettings.registeredCount || 0;

  const available =
    capacity > 0
      ? Math.max(capacity - registered, 0)
      : null;

  const progress =
    capacity > 0
      ? Math.min(
          (registered / capacity) * 100,
          100
        )
      : 0;

  const countdown = useMemo(() => {
    if (!startDate) return null;

    const now = new Date();

    const start = new Date(startDate);

    const diff =
      start.getTime() - now.getTime();

    if (diff <= 0)
      return "Event Started";

    const days = Math.ceil(
      diff / (1000 * 60 * 60 * 24)
    );

    return `Starts in ${days} day${
      days !== 1 ? "s" : ""
    }`;
  }, [startDate]);

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString(
          undefined,
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )
      : "TBA";

  const formatTime = (date) =>
    date
      ? new Date(date).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )
      : "--";

  const registrationStatus =
    registration?.registrationStatus;

  return (
    <article className="dashboard-event-card">

      <div className="event-image">

        <img
          src={image}
          alt={title}
          loading="lazy"
        />

        {featured && (
          <span className="featured-ribbon">
            <Star size={14} />
            Featured
          </span>
        )}

      </div>

      <div className="event-body">

        <div className="event-category">
          <Tag size={15} />
          {category}
        </div>

        <h3>{title}</h3>

        <div className="event-countdown">
          {countdown}
        </div>

        <div className="event-meta">

          <span>
            <CalendarDays size={15} />
            {formatDate(startDate)}
          </span>

          <span>
            <Clock size={15} />
            {formatTime(startDate)}
            {endDate &&
              ` - ${formatTime(endDate)}`}
          </span>

          {venue?.name && (
            <span>
              <MapPin size={15} />
              {venue.name}
            </span>
          )}

        </div>

        {capacity > 0 && (
          <>
            <div className="capacity-row">

              <span>
                <Users size={15} />
                {registered}/{capacity}
              </span>

              <span>
                {available} seats left
              </span>

            </div>

            <div className="capacity-bar">
              <div
                className="capacity-fill"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </>
        )}

        {registrationStatus && (
          <div
            className={`registration-status ${registrationStatus}`}
          >
            <CheckCircle2 size={15} />
            {registrationStatus}
          </div>
        )}

        <div className="event-actions">

          <Link
            to={`/events/${slug}`}
            className="btn-primary"
          >
            View Details
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>

    </article>
  );
};

export default EventCard;