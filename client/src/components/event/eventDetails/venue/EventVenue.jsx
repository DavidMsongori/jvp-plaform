import React from "react";
import {
  MapPin,
  Navigation,
  Globe,
  Phone,
  Mail,
  Clock,
  Building2,
  Video,
} from "lucide-react";

import "./EventVenue.css";

const EventVenue = ({ event }) => {
  if (!event) return null;

  const { venue, eventType } = event;

  if (!venue) return null;

  return (
    <section className="event-venue">

      <div className="venue-header">
        <h2>Venue & Location</h2>
        <p>
          Everything you need to know about where this event will take place.
        </p>
      </div>

      <div className="venue-grid">

        {/* ==========================================
            VENUE INFORMATION
        =========================================== */}

        <div className="venue-card">

          <div className="venue-title">
            <Building2 size={22} />
            <h3>{venue.name || "Venue To Be Announced"}</h3>
          </div>

          {venue.description && (
            <p className="venue-description">
              {venue.description}
            </p>
          )}

          <div className="venue-details">

            {venue.address?.street && (
              <div>
                <MapPin size={18} />
                <span>
                  {venue.address.street}
                  {venue.address.city && `, ${venue.address.city}`}
                  {venue.address.county && `, ${venue.address.county}`}
                </span>
              </div>
            )}

            {venue.contact?.phone && (
              <div>
                <Phone size={18} />
                <span>{venue.contact.phone}</span>
              </div>
            )}

            {venue.contact?.email && (
              <div>
                <Mail size={18} />
                <span>{venue.contact.email}</span>
              </div>
            )}

            {venue.openingHours && (
              <div>
                <Clock size={18} />
                <span>{venue.openingHours}</span>
              </div>
            )}

          </div>

          {venue.googleMapsLink && (
            <a
              href={venue.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="venue-map-btn"
            >
              <Navigation size={18} />
              Open in Google Maps
            </a>
          )}

        </div>

        {/* ==========================================
            EVENT TYPE
        =========================================== */}

        <div className="venue-card">

          <div className="venue-title">

            {eventType === "virtual" ? (
              <Video size={22} />
            ) : (
              <Globe size={22} />
            )}

            <h3>Event Format</h3>

          </div>

          <div className="event-format">

            <span className="format-badge">
              {eventType || "Physical"}
            </span>

            {eventType === "virtual" && (
              <p>
                This event will be held online. Registered
                participants will receive joining instructions
                before the event begins.
              </p>
            )}

            {eventType === "physical" && (
              <p>
                This event will be held at the venue above.
                Please arrive at least 30 minutes before the
                scheduled start time.
              </p>
            )}

            {eventType === "hybrid" && (
              <p>
                This is a hybrid event. You may attend in
                person or participate virtually.
              </p>
            )}

          </div>

        </div>

      </div>

    </section>
  );
};

export default EventVenue;