import { useEffect, useMemo, useState } from "react";
import { Search, CalendarDays } from "lucide-react";

import eventService from "../../services/event.service";

import FeaturedEvent from "../../components/dashboard/events/FeaturedEvent";
import EventCard from "../../components/dashboard/events/EventCard";
import RegistrationCard from "../../components/dashboard/events/RegistrationCard";

import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  /* ===========================================================
     LOAD EVENTS
  =========================================================== */

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        eventsResponse,
        registrationsResponse,
      ] = await Promise.all([
        eventService.getEvents({
          isPublished: true,
          limit: 100,
        }),
        eventService.getMyRegistrations(),
      ]);

      setEvents(eventsResponse.data || []);

      setRegistrations(
        registrationsResponse.data || []
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to load events."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ===========================================================
     FEATURED EVENT
  =========================================================== */

  const featuredEvent = useMemo(() => {
    if (!events.length) return null;

    return (
      events.find(
        (event) => event.isFeatured
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
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div className="member-events-page">
      {/* Header */}

      <div className="events-header">
        <div>
          <h1>Events</h1>

          <p>
            Discover upcoming events, register and
            manage your participation.
          </p>

          <p className="events-summary">
            {events.length} event
            {events.length !== 1 ? "s" : ""} available
            {" • "}
            {registrations.length} registration
            {registrations.length !== 1
              ? "s"
              : ""}
          </p>
        </div>
      </div>

      {/* Search */}

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

      {/* Featured Event */}

      {featuredEvent && (
        <FeaturedEvent
          event={featuredEvent}
        />
      )}

      {/* Upcoming Events */}

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
            {sortedEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
              />
            ))}
          </div>
        )}
      </section>

      {/* My Registrations */}

      <section className="events-section">
        <div className="section-title">
          <h2>My Registrations</h2>
        </div>

        {registrations.length === 0 ? (
          <div className="empty-state">
            You haven't registered for any
            event yet.
          </div>
        ) : (
          <div className="registrations-list">
            {registrations.map(
              (registration) => (
                <RegistrationCard
                  key={registration._id}
                  registration={
                    registration
                  }
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