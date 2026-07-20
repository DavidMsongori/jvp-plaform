import React from "react";
import "./EventDetails.css";

// Sections
import EventHero from "./hero/EventHero";
import EventOverview from "./overview/EventOverview";
import EventSchedule from "./schedule/EventSchedule";
import EventVenue from "./venue/EventVenue";
import EventRegistration from "./registration/EventRegistration";
import EventSpeakers from "./speakers/EventSpeakers";
import EventPartners from "./partners/EventPartners";
import EventGallery from "./gallery/EventGallery";
import EventShare from "./share/EventShare";
import EventRelated from "./related/EventRelated";

// Admin Only
import EventSEO from "./SEO/EventSEO";
import EventSystemInfo from "./system/EventSystemInfo";

const EventDetails = ({
  event = null,
  mode = "public",
  loading = false,
  error = null,
  registration = null,
  currentUser = null,
  permissions = {},
  onRegister,
  onCancelRegistration,
}) => {
  /* ======================================================
     Loading State
  ====================================================== */

  if (loading) {
    return (
      <div className="event-details">
        <div className="event-loading">
          <div className="event-spinner"></div>
          <p>Loading event...</p>
        </div>
      </div>
    );
  }

  /* ======================================================
     Error State
  ====================================================== */

  if (error) {
    return (
      <div className="event-details">
        <div className="event-error">
          <h2>Unable to Load Event</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  /* ======================================================
     Not Found
  ====================================================== */

  if (!event) {
    return (
      <div className="event-details">
        <div className="event-empty">
          <h2>Event Not Found</h2>
          <p>The requested event does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <main className={`event-details event-mode-${mode}`}>

      {/* ===================================================
          HERO
      =================================================== */}
      <EventHero
  event={event}
  mode={mode}
  currentUser={currentUser}
  registration={registration}
  onRegister={onRegister}
  onCancelRegistration={onCancelRegistration}
/>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div className="event-content">

        {/* Main Content */}

        <section className="event-main">

          <EventOverview
            event={event}
            mode={mode}
          />

          {event.sessions?.length > 0 && (
            <EventSchedule
              event={event}
              mode={mode}
            />
          )}

          {event.venue && (
            <EventVenue
              event={event}
              mode={mode}
            />
          )}

          {event.speakers?.length > 0 && (
            <EventSpeakers
              event={event}
              mode={mode}
            />
          )}

          {event.partners?.length > 0 && (
            <EventPartners
              event={event}
              mode={mode}
            />
          )}

          {event.gallery?.length > 0 && (
            <EventGallery
              event={event}
              mode={mode}
            />
          )}

          <EventShare
            event={event}
            mode={mode}
          />

          {mode === "public" && (
            <EventRelated
              event={event}
            />
          )}

        </section>

        {/* Sidebar */}

        <aside className="event-sidebar">

          <EventRegistration
            event={event}
            mode={mode}
            registration={registration}
            currentUser={currentUser}
            permissions={permissions}
            onRegister={onRegister}
            onCancelRegistration={onCancelRegistration}
          />

          {mode === "admin" && (
            <>
              <EventSEO event={event} />

              <EventSystemInfo event={event} />
            </>
          )}

        </aside>

      </div>

    </main>
  );
};

export default EventDetails;