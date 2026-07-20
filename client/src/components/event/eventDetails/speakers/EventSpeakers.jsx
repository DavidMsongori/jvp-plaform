import React from "react";
import {
  Briefcase,
  Building2,
  Mail,
  Globe,
} from "lucide-react";

import {
  FaLinkedinIn,
} from "react-icons/fa";

import "./EventSpeakers.css";

const EventSpeakers = ({ event }) => {
  if (!event?.speakers?.length) return null;

  return (
    <section className="event-speakers">
      <div className="speakers-header">
        <h2>Meet Our Speakers</h2>

        <p>
          Learn from experienced leaders, innovators and
          professionals who will be sharing their knowledge
          during the event.
        </p>
      </div>

      <div className="speakers-grid">
        {event.speakers.map((speaker, index) => {
          const image =
            speaker.photo?.url ||
            "https://placehold.co/500x500?text=Speaker";

          return (
            <article
              className="speaker-card"
              key={speaker._id || index}
            >
              <div className="speaker-image">
                <img
                  src={image}
                  alt={speaker.name}
                  loading="lazy"
                />
              </div>

              <div className="speaker-content">
                <h3>{speaker.name}</h3>

                {speaker.title && (
                  <p className="speaker-title">
                    <Briefcase size={16} />
                    <span>{speaker.title}</span>
                  </p>
                )}

                {speaker.organization && (
                  <p className="speaker-company">
                    <Building2 size={16} />
                    <span>{speaker.organization}</span>
                  </p>
                )}

                {speaker.bio && (
                  <p className="speaker-bio">
                    {speaker.bio}
                  </p>
                )}

                {(speaker.email ||
                  speaker.linkedin ||
                  speaker.website) && (
                  <div className="speaker-links">
                    {speaker.email && (
                      <a
                        href={`mailto:${speaker.email}`}
                        aria-label={`Email ${speaker.name}`}
                        title="Email"
                      >
                        <Mail size={18} />
                      </a>
                    )}

                    {speaker.linkedin && (
                      <a
                        href={speaker.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${speaker.name} LinkedIn`}
                        title="LinkedIn"
                      >
                        <FaLinkedinIn size={18} />
                      </a>
                    )}

                    {speaker.website && (
                      <a
                        href={speaker.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${speaker.name} Website`}
                        title="Website"
                      >
                        <Globe size={18} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default EventSpeakers;