import React from "react";
import {
  CalendarDays,
  Users,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Lock,
  UserCheck,
  Clock,
  XCircle,
} from "lucide-react";

import "./EventRegistration.css";

const EventRegistration = ({
  event,
  mode = "public",
  registration = null,
  currentUser = null,
  onRegister,
  onCancelRegistration,
}) => {
  if (!event) return null;

  const registrationSettings = event.registration || {};

  const capacity =
    registrationSettings.capacity ??
    event.capacity ??
    0;

  const registered =
    registrationSettings.registeredCount ??
    0;

  const available =
    event.availableSlots ??
    (capacity > 0
      ? Math.max(capacity - registered, 0)
      : null);

  const progress =
    capacity > 0
      ? Math.min((registered / capacity) * 100, 100)
      : 0;

  const fee =
    registrationSettings.fee ??
    event.registrationFee ??
    0;

  const deadline =
  registrationSettings.registrationDeadline ??
  null;  

  const registrationOpen =
    event.isRegistrationOpen ??
    false;

  const eventStarted =
    event.hasStarted ??
    false;

  const eventEnded =
    event.hasEnded ??
    false;

  const eventCancelled =
    event.status === "cancelled";

  const membershipRequired =
    registrationSettings.membersOnly ??
    false;

  const registrationStatus =
    registration?.status ?? null;

  const isRegistered = [
    "registered",
    "confirmed",
  ].includes(registrationStatus);

  const isPending =
    registrationStatus === "pending";

  const isWaitlisted =
    registrationStatus === "waitlisted";

  const isCancelled =
    registrationStatus === "cancelled";

  const isFull =
    capacity > 0 &&
    available <= 0;

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString(undefined, {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Not specified";

  const renderButton = () => {
    if (mode === "admin") {
      return (
        <button
          className="registration-btn disabled"
          disabled
        >
          Admin View
        </button>
      );
    }

    if (eventCancelled) {
      return (
        <button
          className="registration-btn disabled"
          disabled
        >
          Event Cancelled
        </button>
      );
    }

    if (eventEnded) {
      return (
        <button
          className="registration-btn disabled"
          disabled
        >
          Event Completed
        </button>
      );
    }

    if (eventStarted) {
      return (
        <button
          className="registration-btn disabled"
          disabled
        >
          Event In Progress
        </button>
      );
    }

    if (!currentUser) {
      return (
        <button
          className="registration-btn secondary"
          disabled
        >
          Sign In to Register
        </button>
      );
    }

    if (!registrationOpen) {
      return (
        <button
          className="registration-btn disabled"
          disabled
        >
          Registration Closed
        </button>
      );
    }

    if (isRegistered) {
      return (
        <button
          className="registration-btn danger"
          onClick={onCancelRegistration}
        >
          Cancel Registration
        </button>
      );
    }

    if (isPending) {
      return (
        <button
          className="registration-btn secondary"
          disabled
        >
          Registration Pending
        </button>
      );
    }

    if (isWaitlisted) {
      return (
        <button
          className="registration-btn secondary"
          disabled
        >
          On Waiting List
        </button>
      );
    }

    if (isCancelled) {
      return (
        <button
          className="registration-btn primary"
          onClick={onRegister}
        >
          Register Again
        </button>
      );
    }

    if (isFull) {
      return (
        <button
          className="registration-btn disabled"
          disabled
        >
          Event Full
        </button>
      );
    }

    return (
      <button
        className="registration-btn primary"
        onClick={onRegister}
      >
        Register Now
      </button>
    );
  };

  return (
    <section className="event-registration">
      <div className="registration-header">
        <h2>Registration</h2>
      </div>

      <div className="registration-card">
        <div className="registration-status">
          <span
            className={`status-badge ${
              registrationOpen ? "open" : "closed"
            }`}
          >
            {registrationOpen
              ? "Registration Open"
              : "Registration Closed"}
          </span>

          {isRegistered && (
            <span className="registered-badge">
              <CheckCircle2 size={16} />
              Registered
            </span>
          )}

          {isPending && (
            <span className="registered-badge pending">
              Pending Approval
            </span>
          )}

          {isWaitlisted && (
            <span className="registered-badge waiting">
              Waiting List
            </span>
          )}
        </div>

        <div className="registration-info">
          <div>
            <CreditCard size={18} />
            <span>Registration Fee</span>
            <strong>
              {fee > 0
                ? `KES ${fee.toLocaleString()}`
                : "Free"}
            </strong>
          </div>

          {deadline && (
            <div>
              <CalendarDays size={18} />
              <span>Registration Deadline</span>
              <strong>
                {formatDate(deadline)}
              </strong>
            </div>
          )}

          {capacity > 0 && (
            <div>
              <Users size={18} />
              <span>Capacity</span>
              <strong>
                {registered} / {capacity}
              </strong>
            </div>
          )}

          {capacity > 0 && (
            <div>
              <Clock size={18} />
              <span>Available Seats</span>
              <strong>{available}</strong>
            </div>
          )}
        </div>

        {capacity > 0 && (
          <div className="capacity-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <small>
              {registered} registered • {available} seats remaining
            </small>
          </div>
        )}

        {membershipRequired && (
          <div className="registration-notice">
            <UserCheck size={18} />
            <span>
              This event is available to members only.
            </span>
          </div>
        )}

        {!membershipRequired &&
          fee === 0 && (
            <div className="registration-notice">
              <CheckCircle2 size={18} />
              <span>
                Registration for this event is free.
              </span>
            </div>
          )}

        {isPending && (
          <div className="registration-notice">
            <AlertCircle size={18} />
            <span>
              Your registration has been received and is awaiting confirmation.
            </span>
          </div>
        )}

        {isWaitlisted && (
          <div className="registration-warning">
            <Users size={18} />
            <span>
              The event is currently full. You have been placed on the waiting list.
            </span>
          </div>
        )}

        {eventCancelled && (
          <div className="registration-warning">
            <XCircle size={18} />
            <span>
              This event has been cancelled.
            </span>
          </div>
        )}

        {!registrationOpen &&
          !eventCancelled &&
          !eventEnded && (
            <div className="registration-warning">
              <AlertCircle size={18} />
              <span>
                Registration is currently closed.
              </span>
            </div>
          )}

        {membershipRequired &&
          !currentUser && (
            <div className="registration-warning">
              <Lock size={18} />
              <span>
                Please sign in with your member account to register.
              </span>
            </div>
          )}

        <div className="registration-actions">
          {renderButton()}
        </div>
      </div>
    </section>
  );
};

export default EventRegistration;