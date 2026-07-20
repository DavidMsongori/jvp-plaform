import React from "react";
import {
  Target,
  Users,
  Sparkles,
  Tag,
  CalendarDays,
  Clock3,
 MapPin,
} from "lucide-react";

import "./EventOverview.css";

const EventOverview = ({ event }) => {
  if (!event) return null;

  const {
    description,
    theme,
    objectives = [],
    targetAudience,
    highlights = [],
    tags = [],
    venue,
    startDate,
    endDate,
    capacity,
    registrationDeadline,
  } = event;

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString(undefined, {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "TBA";

  const duration = (() => {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diff = Math.ceil(
      (end - start) / (1000 * 60 * 60 * 24)
    );

    return diff <= 0 ? "1 Day" : `${diff + 1} Days`;
  })();

  return (
    <section className="event-overview">

      <div className="section-header">
        <h2>Event Overview</h2>
        <p>Everything you need to know about this event.</p>
      </div>

      {/* ======================================
          DESCRIPTION
      ====================================== */}

      {description && (
        <div className="overview-card">

          <h3>About this Event</h3>

          <p>{description}</p>

        </div>
      )}

      {/* ======================================
          GRID
      ====================================== */}

      <div className="overview-grid">

        {theme && (
          <div className="overview-card">
            <h3>
              <Sparkles size={20} />
              Theme
            </h3>

            <p>{theme}</p>
          </div>
        )}

        {targetAudience && (
          <div className="overview-card">
            <h3>
              <Users size={20} />
              Target Audience
            </h3>

            <p>{targetAudience}</p>
          </div>
        )}

        {(objectives?.length ?? 0) > 0 && (
          <div className="overview-card">
            <h3>
              <Target size={20} />
              Objectives
            </h3>

            <ul>
              {objectives.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {(highlights?.length ?? 0) > 0 && (
          <div className="overview-card">
            <h3>
              <Sparkles size={20} />
              Highlights
            </h3>

            <ul>
              {highlights.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* ======================================
          QUICK FACTS
      ====================================== */}

      <div className="overview-card">

        <h3>Quick Facts</h3>

        <div className="quick-facts">

          <div>
            <CalendarDays size={18} />
            <span>Starts</span>
            <strong>{formatDate(startDate)}</strong>
          </div>

          {duration && (
            <div>
              <Clock3 size={18} />
              <span>Duration</span>
              <strong>{duration}</strong>
            </div>
          )}

          {venue?.name && (
            <div>
              <MapPin size={18} />
              <span>Venue</span>
              <strong>{venue.name}</strong>
            </div>
          )}

          {capacity && (
            <div>
              <Users size={18} />
              <span>Capacity</span>
              <strong>{capacity}</strong>
            </div>
          )}

          {registrationDeadline && (
            <div>
              <CalendarDays size={18} />
              <span>Registration Ends</span>
              <strong>{formatDate(registrationDeadline)}</strong>
            </div>
          )}

        </div>

      </div>

      {/* ======================================
          TAGS
      ====================================== */}

      {(tags?.length ?? 0) > 0 && (
        <div className="overview-card">

          <h3>
            <Tag size={20} />
            Tags
          </h3>

          <div className="overview-tags">

            {tags.map((tag) => (
              <span key={tag}>
                {tag}
              </span>
            ))}

          </div>

        </div>
      )}

    </section>
  );
};

export default EventOverview;