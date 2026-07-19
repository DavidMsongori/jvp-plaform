import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Globe,
  Monitor,
  Star,
  Tag,
  CheckCircle2,
  AlertCircle,
  Loader2,
  XCircle,
} from "lucide-react";

import eventService from "../../services/event.service";

import "./EventDetails.css";

/* ===========================================================
   HELPERS
=========================================================== */

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-KE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleTimeString("en-KE", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDateTime = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleString("en-KE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatCurrency = (amount) => {
  const value = Number(amount || 0);

  if (value <= 0) return "FREE";

  return `KES ${value.toLocaleString()}`;
};

const capitalize = (text = "") =>
  text
    .replaceAll("_", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

/* ===========================================================
   COMPONENT
=========================================================== */

const EventDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  /* ===========================================================
     STATE
  =========================================================== */

  const [event, setEvent] = useState(null);

  const [registration, setRegistration] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [registering, setRegistering] =
    useState(false);

  const [cancelling, setCancelling] =
    useState(false);

  const [error, setError] = useState("");

  /* ===========================================================
     DERIVED VALUES
  =========================================================== */

  const registrationConfig =
    event?.registration || {};

  const capacity =
    registrationConfig.capacity || 0;

  const totalRegistrations =
    registrationConfig.totalRegistrations || 0;

  const seatsLeft =
    capacity > 0
      ? Math.max(
          capacity - totalRegistrations,
          0
        )
      : null;

  const registrationOpen =
    registrationConfig.enabled === true;

  const isFree =
    !registrationConfig.fee ||
    Number(registrationConfig.fee) === 0;

  const eventType =
    event?.eventType || "physical";

  /* ===========================================================
     LOAD EVENT
  =========================================================== */

  const loadEvent = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await eventService.getEventById(id);

      const loadedEvent =
        response.data || response;

      setEvent(loadedEvent);

      try {
        const registrationResponse =
          await eventService.getMyRegistration(
            id
          );

        setRegistration(
          registrationResponse.data ||
            registrationResponse
        );
      } catch {
        setRegistration(null);
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load this event."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  /* ===========================================================
     EFFECTS
  =========================================================== */

  useEffect(() => {
    loadEvent();
  }, [loadEvent]);

  /* ===========================================================
     REGISTER
  =========================================================== */

  const handleRegister = async () => {
    try {
      setRegistering(true);

      const response =
        await eventService.registerForEvent(
          id
        );

      if (response?.data) {
        setRegistration(response.data);
      }

      await loadEvent();

      alert(
        response?.message ||
          "Registration successful."
      );
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to register."
      );
    } finally {
      setRegistering(false);
    }
  };

  /* ===========================================================
     CANCEL REGISTRATION
  =========================================================== */

  const handleCancelRegistration =
    async () => {
      const confirmed =
        window.confirm(
          "Cancel your registration for this event?"
        );

      if (!confirmed) return;

      try {
        setCancelling(true);

        const response =
          await eventService.cancelRegistration(
            id
          );

        setRegistration(null);

        await loadEvent();

        alert(
          response?.message ||
            "Registration cancelled."
        );
      } catch (err) {
        console.error(err);

        alert(
          err.response?.data?.message ||
            "Unable to cancel registration."
        );
      } finally {
        setCancelling(false);
      }
    };

  /* ===========================================================
     LOADING
  =========================================================== */

  if (loading) {
    return (
      <div className="event-details-loading">
        <div className="spinner" />

        <h2>Loading Event...</h2>
      </div>
    );
  }

  /* ===========================================================
     ERROR
  =========================================================== */

  if (error || !event) {
    return (
      <div className="event-details-error">
        <AlertCircle size={60} />

        <h2>Unable to Load Event</h2>

        <p>{error}</p>

        <button
          onClick={() =>
            navigate("/dashboard/events")
          }
        >
          Back to Events
        </button>
      </div>
    );
  };
  return (
    <div className="event-details-page">
      {/* ===========================================================
          BACK BUTTON
      =========================================================== */}

      <Link
        to="/dashboard/events"
        className="back-button"
      >
        <ArrowLeft size={18} />
        <span>Back to Events</span>
      </Link>

      {/* ===========================================================
          HERO
      =========================================================== */}

      <section className="event-hero">
        <div className="event-hero-image">
          <img
            src={
              event.coverImage?.secureUrl ||
              event.coverImage?.url ||
              "/placeholder-event.jpg"
            }
            alt={event.title}
          />

          {event.isFeatured && (
            <div className="featured-badge">
              <Star size={16} />
              Featured Event
            </div>
          )}
        </div>

        <div className="event-hero-content">
          <span className="event-category">
            {event.category}
          </span>

          <h1>{event.title}</h1>

          <p>{event.summary}</p>

          <div className="event-meta">

            <div>
              <CalendarDays size={18} />
              <span>{formatDate(event.startDate)}</span>
            </div>

            <div>
              <Clock3 size={18} />
              <span>{formatTime(event.startDate)}</span>
            </div>

            <div>
              <MapPin size={18} />
              <span>
                {event.venue?.name ||
                  "Venue To Be Announced"}
              </span>
            </div>

            <div>
              {eventType === "virtual" ? (
                <Monitor size={18} />
              ) : eventType === "hybrid" ? (
                <Globe size={18} />
              ) : (
                <MapPin size={18} />
              )}

              <span
                style={{
                  textTransform: "capitalize",
                }}
              >
                {eventType}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ===========================================================
          CONTENT
      =========================================================== */}

      <div className="event-details-grid">

        {/* =======================================================
            MAIN CONTENT
        ======================================================== */}

        <div className="event-main">

          {/* ABOUT */}

          <section className="event-section">
            <h2>About this Event</h2>

            <div className="event-description">
              {event.description}
            </div>
          </section>

          {/* EVENT DETAILS */}

          <section className="event-section">

            <h2>Event Information</h2>

            <div className="event-information-grid">

              <div className="info-card">
                <CalendarDays size={22} />

                <div>
                  <h4>Start Date</h4>

                  <p>
                    {formatDateTime(
                      event.startDate
                    )}
                  </p>
                </div>
              </div>

              <div className="info-card">
                <Clock3 size={22} />

                <div>
                  <h4>End Date</h4>

                  <p>
                    {formatDateTime(
                      event.endDate
                    )}
                  </p>
                </div>
              </div>

              <div className="info-card">
                <Tag size={22} />

                <div>
                  <h4>Category</h4>

                  <p>{event.category}</p>
                </div>
              </div>

              <div className="info-card">
                <Users size={22} />

                <div>
                  <h4>Event Type</h4>

                  <p>{capitalize(eventType)}</p>
                </div>
              </div>

            </div>

          </section>

          {/* VENUE */}

          <section className="event-section">

            <h2>Venue Information</h2>

            <div className="venue-card">

              <MapPin size={24} />

              <div>

                <h4>
                  {event.venue?.name ||
                    "Venue To Be Confirmed"}
                </h4>

                {event.venue?.address
                  ?.street && (
                  <p>
                    {
                      event.venue.address
                        .street
                    }
                  </p>
                )}

                <p>
                  {event.venue?.address
                    ?.city || ""}

                  {event.venue?.address
                    ?.county &&
                    `, ${event.venue.address.county}`}
                </p>

                {event.venue?.address
                  ?.country && (
                  <p>
                    {
                      event.venue.address
                        .country
                    }
                  </p>
                )}

                {event.virtualLink && (
                  <div
                    style={{
                      marginTop: "1rem",
                    }}
                  >
                    <strong>
                      Virtual Link
                    </strong>

                    <br />

                    <a
                      href={
                        event.virtualLink
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      Join Meeting
                    </a>
                  </div>
                )}

              </div>

            </div>

          </section>

        </div>

        {/* =======================================================
            SIDEBAR
        ======================================================== */}

        <aside className="registration-sidebar">

          <div className="registration-card">

            <h3>Registration</h3>

            <div className="price">
              {formatCurrency(
                registrationConfig.fee
              )}
            </div>

            <div className="registration-info">

              <div>
                <Users size={18} />

                <span>
                  {capacity > 0
                    ? `${seatsLeft} of ${capacity} seats available`
                    : "Unlimited Capacity"}
                </span>
              </div>

              <div>
                <Tag size={18} />

                <span>
                  {registrationOpen
                    ? "Registration Open"
                    : "Registration Closed"}
                </span>
              </div>

            </div>

            <div className="event-statistics">

              <div>
                <strong>
                  {totalRegistrations}
                </strong>

                <span>Registered</span>
              </div>

              <div>
                <strong>
                  {capacity || "∞"}
                </strong>

                <span>Capacity</span>
              </div>

              <div>
                <strong>
                  {capacity
                    ? seatsLeft
                    : "∞"}
                </strong>

                <span>Remaining</span>
              </div>

            </div>

            {registration ? (
              <>
                <div className="registered-status">

                  <CheckCircle2
                    size={20}
                  />

                  <div>

                    <strong>
                      You're Registered
                    </strong>

                    <p>
                      Status:{" "}
                      {capitalize(
                        registration.registrationStatus
                      )}
                    </p>

                  </div>

                </div>

                <div className="registration-actions">

                  <button
                    className="registered-button"
                    disabled
                  >
                    <CheckCircle2
                      size={18}
                    />
                    Registered
                  </button>

                  {registration.registrationStatus !==
                    "attended" && (
                    <button
                      className="cancel-registration-button"
                      disabled={
                        cancelling
                      }
                      onClick={
                        handleCancelRegistration
                      }
                    >
                      {cancelling ? (
                        <>
                          <Loader2
                            size={18}
                            className="spin"
                          />
                          Cancelling...
                        </>
                      ) : (
                        <>
                          <XCircle
                            size={18}
                          />
                          Cancel Registration
                        </>
                      )}
                    </button>
                  )}

                </div>
              </>
            ) : (
              <button
                className="register-button"
                disabled={
                  !registrationOpen ||
                  registering
                }
                onClick={
                  handleRegister
                }
              >
                {registering ? (
                  <>
                    <Loader2
                      size={18}
                      className="spin"
                    />
                    Registering...
                  </>
                ) : (
                  <>
                    <Users
                      size={18}
                    />
                    Register Now
                  </>
                )}
              </button>
            )}

          </div>
        </aside>

      </div>
    </div>
  );
};

export default EventDetails;