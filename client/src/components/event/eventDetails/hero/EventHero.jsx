import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Tag,
  Globe,
  Edit,
  Share2,
  CheckCircle2,
} from "lucide-react";

import "./EventHero.css";

const EventHero = ({
  event,
  mode = "public",
  registration = null,
  currentUser = null,
  onRegister,
  onCancelRegistration,
}) => {
  if (!event) return null;

  const {
    title,
    shortDescription,
    category,
    eventType,
    status,
    featured,
    coverImage,
    venue,
    startDate,
    endDate,
    registration: registrationSettings,
  } = event;

  const image =
    coverImage?.url ||
    "https://placehold.co/1600x700?text=JVP+Connect+Event";

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString(undefined, {
          weekday: "short",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "TBA";

  const formatTime = (date) =>
    date
      ? new Date(date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--";

  const registrationStatus =
    registration?.status ?? null;

  const isRegistered = [
    "registered",
    "confirmed",
  ].includes(registrationStatus);

  const registrationOpen =
    event.isRegistrationOpen ?? true;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shortDescription,
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled
      }
    }

    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      alert("Event link copied to clipboard.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header
      className="event-hero"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="event-hero-overlay" />

      <div className="event-hero-content">

        <div className="event-hero-badges">

          {featured && (
            <span className="hero-badge featured">
              <Star size={15} />
              Featured
            </span>
          )}

          {category && (
            <span className="hero-badge">
              <Tag size={15} />
              {category}
            </span>
          )}

          {eventType && (
            <span className="hero-badge">
              <Globe size={15} />
              {eventType}
            </span>
          )}

          {status && (
            <span className={`hero-badge status ${status}`}>
              {status}
            </span>
          )}

        </div>

        <h1>{title}</h1>

        {shortDescription && (
          <p className="hero-description">
            {shortDescription}
          </p>
        )}

        <div className="hero-meta">

          <div>
            <Calendar size={18} />
            {formatDate(startDate)}
          </div>

          <div>
            <Clock size={18} />
            {formatTime(startDate)}
            {endDate &&
              ` - ${formatTime(endDate)}`}
          </div>

          {venue?.name && (
            <div>
              <MapPin size={18} />
              {venue.name}
            </div>
          )}

          <div>
            <Users size={18} />
            {registrationSettings?.registeredCount || 0}
            {" "}Registered
          </div>

        </div>

        <div className="hero-actions">

          {mode !== "admin" && (
            <>
              {isRegistered ? (
                <button
                  className="hero-btn danger"
                  onClick={onCancelRegistration}
                >
                  <CheckCircle2 size={18} />
                  Registered
                </button>
              ) : (
                <button
                  className="hero-btn primary"
                  onClick={onRegister}
                  disabled={!registrationOpen}
                >
                  {registrationOpen
                    ? "Register Now"
                    : "Registration Closed"}
                </button>
              )}

              <button
                className="hero-btn secondary"
                onClick={handleShare}
              >
                <Share2 size={18} />
                Share
              </button>
            </>
          )}

          {mode === "admin" && (
            <>
              <button className="hero-btn primary">
                <Edit size={18} />
                Edit Event
              </button>

              <button
                className="hero-btn secondary"
                onClick={handleShare}
              >
                <Share2 size={18} />
                Share
              </button>
            </>
          )}

        </div>

      </div>
    </header>
  );
};

export default EventHero;