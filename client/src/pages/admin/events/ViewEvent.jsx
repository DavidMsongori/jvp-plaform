import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  CalendarDays,
  MapPin,
  Users,
  Tag,
  Clock3,
  Loader2,
  AlertTriangle,
  Star,
  DollarSign,
} from "lucide-react";

import eventService from "../../../services/event.service";

const ViewEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);

      const response =
        await eventService.getEventById(id);

      setEvent(response.data);

    } catch (err) {

      setError(
        err.response?.data?.message ||
          "Unable to load event."
      );

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="event-view-loading">

        <Loader2
          className="spinner"
          size={40}
        />

        <h2>Loading Event...</h2>

      </div>
    );
  }

  if (error) {
    return (
      <div className="event-view-error">

        <AlertTriangle size={48} />

        <h2>{error}</h2>

      </div>
    );
  }

  return (
    <div className="view-event-page">

      {/* Header */}

      <div className="page-header">

        <button
          className="back-button"
          onClick={() =>
            navigate("/admin/events")
          }
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <Link
          to={`/admin/events/${id}/edit`}
          className="primary-btn"
        >
          <Pencil size={18} />
          Edit Event
        </Link>

      </div>

      {/* Hero */}

      <div className="event-hero">

        <img
          src={
            event.media?.coverImage?.preview ||
            "/placeholder-event.jpg"
          }
          alt={event.title}
        />

        <div className="event-hero-content">

          <div className="event-badges">

            <span className="badge">
              {event.category}
            </span>

            <span className="badge">
              {event.eventType}
            </span>

            <span
              className={`status ${event.status}`}
            >
              {event.status}
            </span>

            {event.featured && (

              <span className="featured">

                <Star size={14} />

                Featured

              </span>

            )}

          </div>

          <h1>{event.title}</h1>

          <p>{event.shortDescription}</p>

        </div>

      </div>

      {/* Stats */}

      <div className="view-stats">

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
            KES{" "}
            {event.registration?.fee || 0}
          </h3>

          <span>Registration Fee</span>

        </div>

      </div>

      {/* Description */}

      <section className="view-section">

        <h2>Description</h2>

        <p>{event.description}</p>

      </section>

      {/* Schedule */}

      <section className="view-section">

        <h2>

          <CalendarDays size={18} />

          Schedule

        </h2>

        <div className="info-grid">

          <div>

            <strong>Start</strong>

            <p>{event.startDate}</p>

          </div>

          <div>

            <strong>End</strong>

            <p>{event.endDate}</p>

          </div>

          <div>

            <strong>
              Registration Closes
            </strong>

            <p>
              {event.registrationDeadline}
            </p>

          </div>

        </div>

      </section>

      {/* Venue */}

      <section className="view-section">

        <h2>

          <MapPin size={18} />

          Venue

        </h2>

        <p>

          <strong>
            {event.venue?.name}
          </strong>

        </p>

        <p>
          {event.venue?.address}
        </p>

        <p>
          {event.venue?.city},{" "}
          {event.venue?.county}
        </p>

      </section>

      {/* Registration */}

      <section className="view-section">

        <h2>

          <Clock3 size={18} />

          Registration

        </h2>

        <ul>

          <li>
            Required:
            {" "}
            {event.registration?.required
              ? "Yes"
              : "No"}
          </li>

          <li>
            Walk-ins:
            {" "}
            {event.registration
              ?.allowWalkIns
              ? "Allowed"
              : "Not Allowed"}
          </li>

          <li>
            Waiting List:
            {" "}
            {event.registration
              ?.allowWaitlist
              ? "Enabled"
              : "Disabled"}
          </li>

          <li>
            Approval:
            {" "}
            {event.registration
              ?.requireApproval
              ? "Required"
              : "Not Required"}
          </li>

        </ul>

      </section>

      {/* Speakers */}

      <section className="view-section">

        <h2>Speakers</h2>

        <div className="speaker-grid">

          {event.speakers?.length ? (

            event.speakers.map(
              (speaker, index) => (

                <div
                  className="speaker-card"
                  key={index}
                >

                  <h4>
                    {speaker.name}
                  </h4>

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
            )

          ) : (

            <p>
              No speakers added.
            </p>

          )}

        </div>

      </section>

      {/* Partners */}

      <section className="view-section">

        <h2>Partners</h2>

        <div className="partner-grid">

          {event.partners?.length ? (

            event.partners.map(
              (partner, index) => (

                <div
                  key={index}
                  className="partner-card"
                >

                  <h4>
                    {partner.name}
                  </h4>

                  <span>
                    {partner.role}
                  </span>

                </div>

              )
            )

          ) : (

            <p>
              No partners added.
            </p>

          )}

        </div>

      </section>

      {/* Gallery */}

      {event.media?.gallery?.length >
        0 && (
        <section className="view-section">

          <h2>Gallery</h2>

          <div className="gallery-grid">

            {event.media.gallery.map(
              (image, index) => (

                <img
                  key={index}
                  src={
                    image.preview
                  }
                  alt=""
                />

              )
            )}

          </div>

        </section>
      )}
    </div>
  );
};

export default ViewEvent;