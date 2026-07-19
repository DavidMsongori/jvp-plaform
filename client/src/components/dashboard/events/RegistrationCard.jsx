import { Link } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Clock3,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

import "./RegistrationCard.css";

/* ===========================================================
   HELPERS
=========================================================== */

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const statusConfig = {
  pending: {
    label: "Pending",
    icon: AlertCircle,
    className: "pending",
  },

  approved: {
    label: "Approved",
    icon: CheckCircle2,
    className: "approved",
  },

  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    className: "approved",
  },

  attended: {
    label: "Attended",
    icon: CheckCircle2,
    className: "attended",
  },

  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "cancelled",
  },
};

/* ===========================================================
   COMPONENT
=========================================================== */

const RegistrationCard = ({ registration }) => {
  if (!registration?.event) return null;

  const event = registration.event;

  const config =
    statusConfig[
      registration.status
    ] || statusConfig.pending;

  const StatusIcon = config.icon;

  return (
    <article className="registration-card">

      <img
        src={
          event.coverImage?.secureUrl ||
          "/placeholder-event.jpg"
        }
        alt={event.title}
      />

      <div className="registration-content">

        <div className="registration-top">

          <h3>{event.title}</h3>

          <span
            className={`registration-status ${config.className}`}
          >
            <StatusIcon size={15} />

            {config.label}
          </span>

        </div>

        <p>{event.summary}</p>

        <div className="registration-meta">

          <span>
            <CalendarDays size={16} />
            {formatDate(event.startDate)}
          </span>

          <span>
            <MapPin size={16} />
            {event.venue?.name}
          </span>

          <span>
            <Clock3 size={16} />
            {event.eventType}
          </span>

        </div>

        <div className="registration-footer">

          <small>
            Registered on{" "}
            {formatDate(
              registration.createdAt
            )}
          </small>

          <Link
            to={`/dashboard/events/${event._id}`}
          >
            View Event

            <ArrowRight size={16} />
          </Link>

        </div>

      </div>

    </article>
  );
};

export default RegistrationCard;