import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  CalendarDays,
  MapPin,
  Loader2,
  AlertTriangle,
  Star,
  Eye,
  EyeOff,
} from "lucide-react";

import eventService from "../../../services/event.service";
import "./ViewEvent.css";

/* ===========================================================
   HELPERS
=========================================================== */

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleString("en-KE", {
    dateStyle: "long",
    timeStyle: "short",
  });
};

const formatDateOnly = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-KE", {
    dateStyle: "long",
  });
};

/* ===========================================================
   COMPONENT
=========================================================== */

const ViewEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ===========================================================
     LOAD EVENT
  =========================================================== */

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);

      const response =
        await eventService.getEventById(id);

      setEvent(response.data);
      setError("");

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load event."
      );

    } finally {

      setLoading(false);

    }
  };

  /* ===========================================================
     LOADING
  =========================================================== */

  if (loading) {
    return (
      <div className="event-view-loading">
        <Loader2
          className="spinner"
          size={42}
        />

        <h2>Loading Event...</h2>
      </div>
    );
  }

  /* ===========================================================
     ERROR
  =========================================================== */

  if (error || !event) {
    return (
      <div className="event-view-error">
        <AlertTriangle size={50} />

        <h2>{error || "Event not found."}</h2>

        <button
          className="primary-btn"
          onClick={() =>
            navigate("/admin/events")
          }
        >
          Back to Events
        </button>
      </div>
    );
  }

  /* ===========================================================
     PAGE
  =========================================================== */

  return (
    <div className="view-event-page">

      {/* ==========================================
          HEADER
      ========================================== */}

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

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="event-hero">

        <img
          src={
            event.coverImage?.secureUrl ||
            "/placeholder-event.jpg"
          }
          alt={event.title}
        />

        <div className="event-overlay">

          <div className="event-badges">

            <span className="badge">
              {event.category}
            </span>

            <span className="badge">
              {event.eventType}
            </span>

            <span
              className={
                event.isPublished
                  ? "badge success"
                  : "badge warning"
              }
            >
              {event.isPublished
                ? "Published"
                : "Draft"}
            </span>

            {event.isFeatured && (
              <span className="badge featured">
                <Star size={14} />
                Featured
              </span>
            )}

          </div>

          <h1>{event.title}</h1>

          <p className="event-summary">
            {event.summary}
          </p>

          <div className="hero-meta">

            <span>
              <CalendarDays size={16} />
              {formatDateOnly(
                event.startDate
              )}
            </span>

            <span>
              <MapPin size={16} />
              {event.venue?.name}
            </span>

            <span>
              {event.isPublished ? (
                <>
                  <Eye size={16} />
                  Public
                </>
              ) : (
                <>
                  <EyeOff size={16} />
                  Hidden
                </>
              )}
            </span>

          </div>

        </div>

      </section>
            {/* ==========================================
          STATISTICS
      ========================================== */}

      <section className="view-stats">

        <div className="stat-card">
          <h3>
            {event.registration?.registeredCount ?? 0}
          </h3>
          <span>Registered</span>
        </div>

        <div className="stat-card">
          <h3>
            {event.registration?.capacity || "Unlimited"}
          </h3>
          <span>Capacity</span>
        </div>

        <div className="stat-card">
          <h3>
            {event.registration?.availableSlots ??
              "Unlimited"}
          </h3>
          <span>Available</span>
        </div>

        <div className="stat-card">
          <h3>
            {event.registration?.fee
              ? `KES ${event.registration.fee.toLocaleString()}`
              : "FREE"}
          </h3>
          <span>Registration Fee</span>
        </div>

      </section>

      {/* ==========================================
          EVENT OVERVIEW
      ========================================== */}

      <section className="view-section">

        <h2>Event Overview</h2>

        <div className="info-grid">

          <div className="info-item">
            <label>Title</label>
            <p>{event.title}</p>
          </div>

          <div className="info-item">
            <label>Slug</label>
            <p>{event.slug}</p>
          </div>

          <div className="info-item">
            <label>Category</label>
            <p>{event.category}</p>
          </div>

          <div className="info-item">
            <label>Event Type</label>
            <p>{event.eventType}</p>
          </div>

          <div className="info-item">
            <label>Visibility</label>
            <p>
              {event.isPublished
                ? "Published"
                : "Draft"}
            </p>
          </div>

          <div className="info-item">
            <label>Featured</label>
            <p>
              {event.isFeatured
                ? "Yes"
                : "No"}
            </p>
          </div>

        </div>

      </section>

      {/* ==========================================
          DESCRIPTION
      ========================================== */}

      <section className="view-section">

        <h2>Description</h2>

        <div className="description-box">

          <p>{event.description}</p>

        </div>

      </section>

      {/* ==========================================
          EVENT SCHEDULE
      ========================================== */}

      <section className="view-section">

        <h2>Schedule</h2>

        <div className="info-grid">

          <div className="info-item">
            <label>Start Date</label>
            <p>
              {formatDate(event.startDate)}
            </p>
          </div>

          <div className="info-item">
            <label>End Date</label>
            <p>
              {formatDate(event.endDate)}
            </p>
          </div>

          <div className="info-item">
            <label>Registration Opens</label>
            <p>
              {formatDate(
                event.registration
                  ?.registrationOpens
              )}
            </p>
          </div>

          <div className="info-item">
            <label>Registration Closes</label>
            <p>
              {formatDate(
                event.registration
                  ?.registrationDeadline
              )}
            </p>
          </div>

        </div>

      </section>

      {/* ==========================================
          VENUE
      ========================================== */}

      <section className="view-section">

        <h2>Venue</h2>

        <div className="info-grid">

          <div className="info-item">
            <label>Venue Name</label>
            <p>
              {event.venue?.name ||
                "Not specified"}
            </p>
          </div>

          <div className="info-item">
            <label>County</label>
            <p>
              {event.venue?.county ||
                "N/A"}
            </p>
          </div>

          <div className="info-item">
            <label>City</label>
            <p>
              {event.venue?.city ||
                "N/A"}
            </p>
          </div>

          <div className="info-item">
            <label>Address</label>
            <p>
              {event.venue?.address ||
                "N/A"}
            </p>
          </div>

        </div>

        {event.venue?.googleMapsLink && (

          <a
            href={event.venue.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-btn"
          >
            <MapPin size={18} />
            Open in Google Maps
          </a>

        )}

      </section>
            {/* ==========================================
          REGISTRATION
      ========================================== */}

      <section className="view-section">

        <h2>Registration Settings</h2>

        <div className="info-grid">

          <div className="info-item">
            <label>Registration Required</label>
            <p>
              {event.registration?.required
                ? "Yes"
                : "No"}
            </p>
          </div>

          <div className="info-item">
            <label>Capacity</label>
            <p>
              {event.registration?.capacity ||
                "Unlimited"}
            </p>
          </div>

          <div className="info-item">
            <label>Fee</label>
            <p>
              {event.registration?.fee
                ? `KES ${event.registration.fee.toLocaleString()}`
                : "Free"}
            </p>
          </div>

          <div className="info-item">
            <label>Walk-ins</label>
            <p>
              {event.registration?.allowWalkIns
                ? "Allowed"
                : "Not Allowed"}
            </p>
          </div>

          <div className="info-item">
            <label>Waiting List</label>
            <p>
              {event.registration?.allowWaitlist
                ? "Enabled"
                : "Disabled"}
            </p>
          </div>

          <div className="info-item">
            <label>Approval Required</label>
            <p>
              {event.registration?.requireApproval
                ? "Yes"
                : "No"}
            </p>
          </div>

        </div>

      </section>

      {/* ==========================================
          SPEAKERS
      ========================================== */}

      <section className="view-section">

        <h2>Speakers</h2>

        {!event.speakers?.length ? (

          <div className="empty-state">
            No speakers assigned.
          </div>

        ) : (

          <div className="speaker-grid">

            {event.speakers.map((speaker) => (

              <div
                key={speaker._id}
                className="speaker-card"
              >

                {speaker.photo?.secureUrl && (
                  <img
                    src={speaker.photo.secureUrl}
                    alt={speaker.name}
                  />
                )}

                <h3>{speaker.name}</h3>

                <p>{speaker.title}</p>

                <small>
                  {speaker.organization}
                </small>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* ==========================================
          PARTNERS
      ========================================== */}

      <section className="view-section">

        <h2>Partners</h2>

        {!event.partners?.length ? (

          <div className="empty-state">
            No partners assigned.
          </div>

        ) : (

          <div className="partner-grid">

            {event.partners.map((partner) => (

              <div
                key={partner._id}
                className="partner-card"
              >

                {partner.logo?.secureUrl && (
                  <img
                    src={partner.logo.secureUrl}
                    alt={partner.name}
                  />
                )}

                <h3>{partner.name}</h3>

                <span>
                  {partner.category}
                </span>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* ==========================================
          GALLERY
      ========================================== */}

      {!!event.gallery?.length && (

        <section className="view-section">

          <h2>Gallery</h2>

          <div className="gallery-grid">

            {event.gallery.map(
              (image, index) => (

                <img
                  key={
                    image.publicId || index
                  }
                  src={image.secureUrl}
                  alt={
                    image.alt ||
                    `Gallery ${index + 1}`
                  }
                />

              )
            )}

          </div>

        </section>

      )}

      {/* ==========================================
          SEO
      ========================================== */}

      {event.seo && (

        <section className="view-section">

          <h2>SEO</h2>

          <div className="info-grid">

            <div className="info-item">
              <label>Meta Title</label>
              <p>
                {event.seo.metaTitle ||
                  "Not set"}
              </p>
            </div>

            <div className="info-item">
              <label>Meta Description</label>
              <p>
                {event.seo.metaDescription ||
                  "Not set"}
              </p>
            </div>

            <div className="info-item">
              <label>Canonical URL</label>
              <p>
                {event.seo.canonicalUrl ||
                  "Not set"}
              </p>
            </div>

            <div className="info-item">
              <label>Index Page</label>
              <p>
                {event.seo.indexPage
                  ? "Yes"
                  : "No"}
              </p>
            </div>

          </div>

        </section>

      )}

      {/* ==========================================
          SYSTEM INFORMATION
      ========================================== */}

      <section className="view-section">

        <h2>System Information</h2>

        <div className="info-grid">

          <div className="info-item">
            <label>Created</label>
            <p>
              {formatDate(
                event.createdAt
              )}
            </p>
          </div>

          <div className="info-item">
            <label>Last Updated</label>
            <p>
              {formatDate(
                event.updatedAt
              )}
            </p>
          </div>

          <div className="info-item">
            <label>Slug</label>
            <p>{event.slug}</p>
          </div>

          <div className="info-item">
            <label>ID</label>
            <p>{event._id}</p>
          </div>

        </div>

      </section>

    </div>
  );
};

export default ViewEvent;