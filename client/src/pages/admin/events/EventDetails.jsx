import {
  CalendarDays,
  Clock3,
  DollarSign,
  Globe,
  Handshake,
  MapPin,
  Mic2,
  Tag,
  Users,
} from "lucide-react";

import EventHero from "./EventHero";

const formatDate = (date) => {
  if (!date) return "Not specified";

  return new Date(date).toLocaleString("en-KE", {
    dateStyle: "full",
    timeStyle: "short",
  });
};

const EventDetails = ({
  event,
  children,
}) => {
  if (!event) return null;

  return (
    <div className="event-details">

      {/* =======================================
          HERO
      ======================================== */}

      <EventHero event={event}>
        {children}
      </EventHero>

      {/* =======================================
          QUICK STATS
      ======================================== */}

      <section className="details-stats">

        <div className="stat-card">

          <Users />

          <h3>
            {event.registrationCount || 0}
          </h3>

          <span>Registered</span>

        </div>

        <div className="stat-card">

          <Tag />

          <h3>
            {event.registration?.capacity ||
              "Unlimited"}
          </h3>

          <span>Capacity</span>

        </div>

        <div className="stat-card">

          <DollarSign />

          <h3>
            KES {event.registration?.fee || 0}
          </h3>

          <span>Registration Fee</span>

        </div>

      </section>

      {/* =======================================
          DESCRIPTION
      ======================================== */}

      <section className="details-section">

        <h2>Description</h2>

        <p>{event.description}</p>

      </section>

      {/* =======================================
          SCHEDULE
      ======================================== */}

      <section className="details-section">

        <h2>

          <CalendarDays size={20} />

          Schedule

        </h2>

        <div className="details-grid">

          <div>

            <strong>Start Date</strong>

            <p>
              {formatDate(
                event.startDate
              )}
            </p>

          </div>

          <div>

            <strong>End Date</strong>

            <p>
              {formatDate(
                event.endDate
              )}
            </p>

          </div>

          <div>

            <strong>
              Registration Opens
            </strong>

            <p>
              {formatDate(
                event.registrationStart
              )}
            </p>

          </div>

          <div>

            <strong>
              Registration Closes
            </strong>

            <p>
              {formatDate(
                event.registrationDeadline
              )}
            </p>

          </div>

          <div>

            <strong>Timezone</strong>

            <p>{event.timezone}</p>

          </div>

        </div>

      </section>

      {/* =======================================
          VENUE
      ======================================== */}

      <section className="details-section">

        <h2>

          <MapPin size={20} />

          Venue

        </h2>

        <div className="details-grid">

          <div>

            <strong>Venue</strong>

            <p>
              {event.venue?.name}
            </p>

          </div>

          <div>

            <strong>County</strong>

            <p>
              {event.venue?.county}
            </p>

          </div>

          <div>

            <strong>Town / City</strong>

            <p>
              {event.venue?.city}
            </p>

          </div>

          <div>

            <strong>Address</strong>

            <p>
              {event.venue?.address}
            </p>

          </div>

          {event.venue?.googleMaps && (

            <div>

              <strong>

                <Globe size={16} />

                Google Maps

              </strong>

              <a
                href={
                  event.venue.googleMaps
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                View Location
              </a>

            </div>

          )}

        </div>

      </section>

      {/* =======================================
          REGISTRATION
      ======================================== */}

      <section className="details-section">

        <h2>

          <Clock3 size={20} />

          Registration

        </h2>

        <div className="details-grid">

          <div>

            <strong>Required</strong>

            <p>
              {event.registration
                ?.required
                ? "Yes"
                : "No"}
            </p>

          </div>

          <div>

            <strong>Capacity</strong>

            <p>
              {event.registration
                ?.capacity ||
                "Unlimited"}
            </p>

          </div>

          <div>

            <strong>Fee</strong>

            <p>

              KES{" "}

              {event.registration
                ?.fee || 0}

            </p>

          </div>

          <div>

            <strong>Walk-ins</strong>

            <p>

              {event.registration
                ?.allowWalkIns
                ? "Allowed"
                : "Not Allowed"}

            </p>

          </div>

          <div>

            <strong>Waiting List</strong>

            <p>

              {event.registration
                ?.allowWaitlist
                ? "Enabled"
                : "Disabled"}

            </p>

          </div>

          <div>

            <strong>Approval</strong>

            <p>

              {event.registration
                ?.requireApproval
                ? "Required"
                : "Not Required"}

            </p>

          </div>

        </div>

      </section>

      {/* =======================================
          SPEAKERS
      ======================================== */}

      {event.speakers?.length > 0 && (

        <section className="details-section">

          <h2>

            <Mic2 size={20} />

            Speakers

          </h2>

          <div className="speaker-grid">

            {event.speakers.map(
              (
                speaker,
                index
              ) => (

                <div
                  className="speaker-card"
                  key={index}
                >

                  <h3>
                    {speaker.name}
                  </h3>

                  <p>
                    {speaker.title}
                  </p>

                  <small>
                    {
                      speaker.organization
                    }
                  </small>

                </div>

              )
            )}

          </div>

        </section>

      )}

      {/* =======================================
          PARTNERS
      ======================================== */}

      {event.partners?.length > 0 && (

        <section className="details-section">

          <h2>

            <Handshake size={20} />

            Partners

          </h2>

          <div className="partner-grid">

            {event.partners.map(
              (
                partner,
                index
              ) => (

                <div
                  className="partner-card"
                  key={index}
                >

                  <h3>
                    {partner.name}
                  </h3>

                  <p>
                    {partner.role}
                  </p>

                  {partner.website && (

                    <a
                      href={
                        partner.website
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </a>

                  )}

                </div>

              )
            )}

          </div>

        </section>

      )}

      {/* =======================================
          GALLERY
      ======================================== */}

      {event.media?.gallery?.length >
        0 && (

        <section className="details-section">

          <h2>Gallery</h2>

          <div className="gallery-grid">

            {event.media.gallery.map(
              (
                image,
                index
              ) => (

                <img
                  key={index}
                  src={
                    image.preview
                  }
                  alt={`Gallery ${
                    index + 1
                  }`}
                />

              )
            )}

          </div>

        </section>

      )}

    </div>
  );
};

export default EventDetails;