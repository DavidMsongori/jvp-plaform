import React from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
} from "lucide-react";

import "./EventSchedule.css";

const EventSchedule = ({ event }) => {
  if (!event || !event.sessions?.length) return null;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <section className="event-schedule">

      <div className="schedule-header">
        <h2>Event Schedule</h2>
        <p>
          Explore the complete programme and session timeline.
        </p>
      </div>

      <div className="schedule-timeline">

        {event.sessions.map((session, index) => (

          <div
            className="schedule-item"
            key={session._id || index}
          >

            <div className="schedule-number">
              {index + 1}
            </div>

            <div className="schedule-card">

              <div className="schedule-top">

                <h3>
                  {session.title}
                </h3>

                {session.type && (
                  <span className="session-type">
                    {session.type}
                  </span>
                )}

              </div>

              {session.description && (
                <p className="session-description">
                  {session.description}
                </p>
              )}

              <div className="session-meta">

                {session.startTime && (
                  <div>
                    <Clock size={18} />
                    <span>
                      {formatTime(session.startTime)}
                      {session.endTime &&
                        ` - ${formatTime(session.endTime)}`}
                    </span>
                  </div>
                )}

                {session.date && (
                  <div>
                    <CalendarDays size={18} />
                    <span>
                      {formatDate(session.date)}
                    </span>
                  </div>
                )}

                {session.venue?.name && (
                  <div>
                    <MapPin size={18} />
                    <span>
                      {session.venue.name}
                    </span>
                  </div>
                )}

                {session.speaker?.name && (
                  <div>
                    <User size={18} />
                    <span>
                      {session.speaker.name}
                    </span>
                  </div>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default EventSchedule;