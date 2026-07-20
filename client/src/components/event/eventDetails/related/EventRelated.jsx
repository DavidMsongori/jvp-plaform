import React from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Star,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./EventRelated.css";

const EventRelated = ({ relatedEvents = [] }) => {
  if (!relatedEvents.length) return null;

  const formatDate = (date) => {
    if (!date) return "Date TBA";

    return new Date(date).toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="event-related">
      <div className="related-header">
        <h2>Related Events</h2>

        <p>
          Explore other events that may interest you and continue your learning,
          networking and leadership journey.
        </p>
      </div>

      <div className="related-grid">
        {relatedEvents.map((event) => {
          const image =
            event.coverImage?.url ||
            "https://placehold.co/800x600?text=JVP+Connect";

          return (
            <article
              className="related-card"
              key={event._id}
            >
              <div className="related-image">
                <img
                  src={image}
                  alt={event.title}
                />

                {event.featured && (
                  <span className="featured-badge">
                    <Star size={14} />
                    Featured
                  </span>
                )}

                {event.category && (
                  <span className="category-badge">
                    {event.category}
                  </span>
                )}
              </div>

              <div className="related-content">
                <h3>{event.title}</h3>

                {event.shortDescription && (
                  <p>
                    {event.shortDescription}
                  </p>
                )}

                <div className="related-meta">
                  <span>
                    <CalendarDays size={16} />
                    {formatDate(event.startDate)}
                  </span>

                  <span>
                    <Clock size={16} />
                    {formatTime(event.startDate)}
                  </span>

                  {event.venue?.name && (
                    <span>
                      <MapPin size={16} />
                      {event.venue.name}
                    </span>
                  )}

                  {event.registration?.registeredCount !==
                    undefined && (
                    <span>
                      <Users size={16} />
                      {event.registration.registeredCount} Registered
                    </span>
                  )}

                  {event.eventType && (
                    <span>
                      <Globe size={16} />
                      {event.eventType}
                    </span>
                  )}
                </div>

                <div className="related-footer">
                  <span
                    className={`status ${
                      event.isRegistrationOpen
                        ? "open"
                        : "closed"
                    }`}
                  >
                    {event.isRegistrationOpen
                      ? "Registration Open"
                      : "Registration Closed"}
                  </span>

                  <Link
                    to={`/events/${event.slug}`}
                    className="view-event-btn"
                  >
                    View Event
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default EventRelated;