import { useEffect, useMemo, useState } from "react";
import { Search, CalendarDays } from "lucide-react";

import { useEvent } from "../../context/EventContext";

import EventStatistics from "../../components/dashboard/events/EventStatistics";
import FeaturedEvent from "../../components/dashboard/events/FeaturedEvent";
import EventCard from "../../components/dashboard/events/EventCard";
import RegistrationCard from "../../components/dashboard/events/RegistrationCard";

import "./Events.css";

const Events = () => {
  const {
    events = [],
    registrations = [],

    loading,
    error,

    loadEvents,
    loadMyRegistrations,
  } = useEvent();

  const [search, setSearch] = useState("");

  /* ===========================================================
     LOAD PAGE DATA
  =========================================================== */

  useEffect(() => {
    const initialize = async () => {
      try {
        await Promise.all([
          loadEvents({
            isPublished: true,
            limit: 100,
          }),
          loadMyRegistrations(),
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    initialize();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ===========================================================
     FEATURED EVENT
  =========================================================== */

  const featuredEvent = useMemo(() => {
    if (!events.length) return null;

    return (
      events.find(
        (event) =>
          event.featured || event.isFeatured
      ) ||
      [...events].sort(
        (a, b) =>
          new Date(a.startDate) -
          new Date(b.startDate)
      )[0]
    );
  }, [events]);

  /* ===========================================================
     FILTER EVENTS
  =========================================================== */

  const filteredEvents = useMemo(() => {
    const keyword = search
      .trim()
      .toLowerCase();

    if (!keyword) return events;

    return events.filter((event) => {
      return (
        event.title
          ?.toLowerCase()
          .includes(keyword) ||
        event.summary
          ?.toLowerCase()
          .includes(keyword) ||
        event.description
          ?.toLowerCase()
          .includes(keyword) ||
        event.category
          ?.toLowerCase()
          .includes(keyword) ||
        event.venue?.name
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [events, search]);

  /* ===========================================================
     SORT EVENTS
  =========================================================== */

  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort(
      (a, b) =>
        new Date(a.startDate) -
        new Date(b.startDate)
    );
  }, [filteredEvents]);

  /* ===========================================================
     LOADING
  =========================================================== */

  if (loading) {
    return (
      <div className="events-loading">
        <div className="spinner"></div>
        <h3>Loading Events...</h3>
      </div>
    );
  }

  /* ===========================================================
     ERROR
  =========================================================== */

  if (error) {
    return (
      <div className="events-loading">
        <h3>
          {error?.response?.data?.message ||
            error?.message ||
            "Unable to load events."}
        </h3>
      </div>
    );
  }

  return (
    <div className="member-events-page">

      {/* =======================================================
          HEADER
      ======================================================= */}

      <div className="events-header">
        <div>
          <h1>My Events</h1>

          <p>
            Discover upcoming events, register,
            and manage your participation.
          </p>

          <p className="events-summary">
            {events.length} event
            {events.length !== 1 ? "s" : ""}
            {" • "}
            {registrations.length}
            {" "}
            registration
            {registrations.length !== 1
              ? "s"
              : ""}
          </p>
        </div>
      </div>

      {/* =======================================================
          STATISTICS
      ======================================================= */}

      <EventStatistics
        events={events}
        registrations={registrations}
      />

      {/* =======================================================
          SEARCH
      ======================================================= */}

      <div className="events-search">
        <Search size={20} />

        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* =======================================================
          FEATURED EVENT
      ======================================================= */}

      {featuredEvent && (
        <FeaturedEvent
          event={featuredEvent}
        />
      )}

      {/* =======================================================
          UPCOMING EVENTS
      ======================================================= */}

      <section className="events-section">

        <div className="section-title">
          <CalendarDays size={22} />
          <h2>Upcoming Events</h2>
        </div>

        {sortedEvents.length === 0 ? (
          <div className="empty-state">
            No events found.
          </div>
        ) : (
          <div className="events-grid">

            {sortedEvents.map((event) => {
              const registration =
                registrations.find(
                  (item) =>
                    item.event?._id ===
                      event._id ||
                    item.event === event._id
                );

              return (
                <EventCard
                  key={event._id}
                  event={event}
                  registration={registration}
                />
              );
            })}

          </div>
        )}

      </section>

      {/* =======================================================
          MY REGISTRATIONS
      ======================================================= */}

      <section className="events-section">

        <div className="section-title">
          <h2>My Registrations</h2>
        </div>

        {registrations.length === 0 ? (
          <div className="empty-state">
            You haven't registered for any
            events yet.
          </div>
        ) : (
          <div className="registrations-list">

            {registrations.map(
              (registration) => (
                <RegistrationCard
                  key={registration._id}
                  registration={registration}
                />
              )
            )}

          </div>
        )}

      </section>

    </div>
  );
};

export default Events;