import { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import {
  Calendar,
  CalendarDays,
  Plus,
  Search,
  RefreshCw,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Archive,
  Users,
  Star,
  Clock,
} from "lucide-react";

import { useEvent } from "../../../context/EventContext";

import "./Events.css";

const Events = () => {
  /* =====================================================
      EVENT CONTEXT
  ===================================================== */

  const {
    events = [],
    loading = false,
    submitting = false,

    loadEvents,

    deleteEvent,
    publishEvent,
    archiveEvent,
  } = useEvent();

  /* =====================================================
      LOCAL UI STATE
  ===================================================== */

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [categoryFilter, setCategoryFilter] = useState("all");

  /* =====================================================
      INITIAL LOAD
  ===================================================== */

  useEffect(() => {
    loadEvents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  /* =====================================================
      DASHBOARD STATISTICS
  ===================================================== */

  const statistics = useMemo(() => {
    const now = new Date();

    return {
      total: events.length,

      published: events.filter(
        (event) => event.isPublished
      ).length,

      drafts: events.filter(
        (event) => !event.isPublished
      ).length,

      featured: events.filter(
        (event) => event.isFeatured
      ).length,

      upcoming: events.filter(
        (event) =>
          event.startDate &&
          new Date(event.startDate) > now
      ).length,

      completed: events.filter(
        (event) =>
          event.endDate &&
          new Date(event.endDate) < now
      ).length,
    };
  }, [events]);

  /* =====================================================
      CATEGORY LIST
  ===================================================== */

  const categories = useMemo(() => {
    const values = events
      .map((event) => event.category)
      .filter(Boolean);

    return ["all", ...new Set(values)];
  }, [events]);

  /* =====================================================
      FILTERED EVENTS
  ===================================================== */

  const filteredEvents = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return events.filter((event) => {
      const matchesSearch =
        keyword === "" ||
        event.title?.toLowerCase().includes(keyword) ||
        event.summary?.toLowerCase().includes(keyword) ||
        event.category?.toLowerCase().includes(keyword) ||
        event.venue?.name?.toLowerCase().includes(keyword);

      let matchesStatus = true;

      switch (statusFilter) {
        case "published":
          matchesStatus = event.isPublished;
          break;

        case "draft":
          matchesStatus = !event.isPublished;
          break;

        case "featured":
          matchesStatus = event.isFeatured;
          break;

        case "archived":
          matchesStatus = event.isArchived;
          break;

        default:
          matchesStatus = true;
      }

      const matchesCategory =
        categoryFilter === "all"
          ? true
          : event.category?.toLowerCase() ===
            categoryFilter.toLowerCase();

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    events,
    search,
    statusFilter,
    categoryFilter,
  ]);

  /* =====================================================
      ACTIONS
  ===================================================== */

  const handleRefresh = useCallback(async () => {
    try {
      await loadEvents();
    } catch (error) {
      console.error(error);
    }
  }, [loadEvents]);

  const handleDelete = useCallback(
    async (id) => {
      const confirmed = window.confirm(
        "Are you sure you want to permanently delete this event?"
      );

      if (!confirmed) return;

      try {
        await deleteEvent(id);
      } catch (error) {
        console.error(error);

        alert(
          error?.response?.data?.message ||
            "Failed to delete event."
        );
      }
    },
    [deleteEvent]
  );

  const handlePublish = useCallback(
    async (id) => {
      try {
        await publishEvent(id);
      } catch (error) {
        console.error(error);

        alert(
          error?.response?.data?.message ||
            "Failed to publish event."
        );
      }
    },
    [publishEvent]
  );

  const handleArchive = useCallback(
    async (id) => {
      try {
        await archiveEvent(id);
      } catch (error) {
        console.error(error);

        alert(
          error?.response?.data?.message ||
            "Failed to archive event."
        );
      }
    },
    [archiveEvent]
  );

  /* =====================================================
      HELPERS
  ===================================================== */

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-KE",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

  const getCapacity = (event) =>
    event.registration?.capacity ?? null;

 const getRegistered = (event) =>
  event.registeredParticipants ?? 0;

  const getCapacityPercentage = (event) => {
    const capacity = getCapacity(event);

    if (!capacity) return 0;

    return Math.min(
      100,
      Math.round(
        (getRegistered(event) / capacity) * 100
      )
    );
  };
    return (
    <div className="events-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="page-header">

        <div className="page-header-content">

          <span className="page-tag">
            Event Management
          </span>

          <h1>Events</h1>

          <p>
            Create, manage, publish, archive and monitor
            all JVP Connect events from one place.
          </p>

        </div>

        <div className="page-header-actions">

          <button
            type="button"
            className="btn btn-outline"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <button
            type="button"
            className="btn btn-outline"
          >
            <Download size={18} />
            Export
          </button>

          <Link
            to="/admin/events/create"
            className="btn btn-primary"
          >
            <Plus size={18} />
            Create Event
          </Link>

        </div>

      </section>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <section className="stats-grid">

        <article className="stat-card">

          <div className="stat-icon primary">

            <CalendarDays size={22} />

          </div>

          <div className="stat-content">

            <h2>{statistics.total}</h2>

            <p>Total Events</p>

          </div>

        </article>

        <article className="stat-card">

          <div className="stat-icon success">

            <CheckCircle size={22} />

          </div>

          <div className="stat-content">

            <h2>{statistics.published}</h2>

            <p>Published</p>

          </div>

        </article>

        <article className="stat-card">

          <div className="stat-icon warning">

            <Clock size={22} />

          </div>

          <div className="stat-content">

            <h2>{statistics.drafts}</h2>

            <p>Drafts</p>

          </div>

        </article>

        <article className="stat-card">

          <div className="stat-icon info">

            <Star size={22} />

          </div>

          <div className="stat-content">

            <h2>{statistics.featured}</h2>

            <p>Featured</p>

          </div>

        </article>

        <article className="stat-card">

          <div className="stat-icon secondary">

            <Users size={22} />

          </div>

          <div className="stat-content">

            <h2>{statistics.upcoming}</h2>

            <p>Upcoming</p>

          </div>

        </article>

        <article className="stat-card">

          <div className="stat-icon dark">

            <Calendar size={22} />

          </div>

          <div className="stat-content">

            <h2>{statistics.completed}</h2>

            <p>Completed</p>

          </div>

        </article>

      </section>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <section className="events-toolbar">

        <div className="toolbar-left">

          <div className="search-box">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>

        <div className="toolbar-right">

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >

            <option value="all">
              All Status
            </option>

            <option value="published">
              Published
            </option>

            <option value="draft">
              Draft
            </option>

            <option value="featured">
              Featured
            </option>

            <option value="archived">
              Archived
            </option>

          </select>

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
          >

            {categories.map((category) => (

              <option
                key={category}
                value={category}
              >

                {category === "all"
                  ? "All Categories"
                  : category}

              </option>

            ))}

          </select>

        </div>

      </section>

      {/* =====================================================
          RESULTS
      ===================================================== */}

      <section className="results-bar">

        <p>

          Showing

          <strong>
            {" "}
            {filteredEvents.length}
            {" "}
          </strong>

          of

          <strong>
            {" "}
            {events.length}
            {" "}
          </strong>

          events

        </p>

      </section>

      {/* =====================================================
          EVENTS TABLE
      ===================================================== */}

      <div className="table-container">

        <table className="events-table">

          <thead>

            <tr>

              <th>Event</th>

              <th>Date</th>

              <th>Venue</th>

              <th>Registrations</th>

              <th>Status</th>

              <th className="actions-column">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>
                        {loading ? (

              <tr>

                <td
                  colSpan={6}
                  className="table-state"
                >
                  Loading events...
                </td>

              </tr>

            ) : filteredEvents.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="table-state"
                >
                  No events found.
                </td>

              </tr>

            ) : (

              filteredEvents.map((event) => {
                const capacity = getCapacity(event);

                const registered =
                  getRegistered(event);

                const percentage =
                  getCapacityPercentage(event);

                const isArchived =
                  Boolean(event.isArchived);

                const isPublished =
                  Boolean(event.isPublished);

                const isFeatured =
                  Boolean(event.isFeatured);

                return (

                  <tr key={event._id}>

                    {/* =====================================
                        EVENT
                    ===================================== */}

                    <td>

                      <div className="event-cell">

                        <div className="event-cover">

                          {event.coverImage?.url ? (

                            <img
                              src={event.coverImage.url}
                              alt={event.title}
                            />

                          ) : (

                            <div className="event-cover-placeholder">

                              <Calendar size={20} />

                            </div>

                          )}

                        </div>

                        <div className="event-details">

                          <div className="event-title">

                            <h4>

                              {event.title}

                            </h4>

                            {isFeatured && (

                              <span className="badge info">

                                <Star size={12} />

                                Featured

                              </span>

                            )}

                          </div>

                          <p>

                            {event.summary ||
                              "No event summary available."}

                          </p>

                          <small>

                            {event.category ||
                              "General"}

                          </small>

                        </div>

                      </div>

                    </td>

                    {/* =====================================
                        DATE
                    ===================================== */}

                    <td>

                      <div className="date-cell">

                        <strong>

                          {formatDate(
                            event.startDate
                          )}

                        </strong>

                        <span>

                          to

                        </span>

                        <strong>

                          {formatDate(
                            event.endDate
                          )}

                        </strong>

                      </div>

                    </td>

                    {/* =====================================
                        VENUE
                    ===================================== */}

                    <td>

                      <div className="venue-cell">

                        <strong>

                          {event.eventType ===
                          "virtual"
                            ? "Virtual Event"
                            : event.venue?.name ||
                              "Venue TBA"}

                        </strong>

                        <span>

                          {event.eventType ===
                          "virtual"
                            ? event.virtualPlatform ||
                              ""
                            : event.venue?.county ||
                              ""}

                        </span>

                      </div>

                    </td>

                    {/* =====================================
                        REGISTRATIONS
                    ===================================== */}

                    <td>

                      <div className="registration-cell">

                        <div className="registration-header">

                          <strong>

                            {registered}

                          </strong>

                          <span>

                            {capacity
                              ? ` / ${capacity}`
                              : " Unlimited"}

                          </span>

                        </div>

                        {capacity && (

                          <div className="capacity-bar">

                            <div
                              className="capacity-progress"
                              style={{
                                width: `${percentage}%`,
                              }}
                            />

                          </div>

                        )}

                        <small>

                          {capacity
                            ? `${percentage}% Full`
                            : "Open Registration"}

                        </small>

                      </div>

                    </td>

                    {/* =====================================
                        STATUS
                    ===================================== */}

                    <td>

                      <div className="status-stack">

                        {isPublished ? (

                          <span className="badge success">

                            Published

                          </span>

                        ) : (

                          <span className="badge warning">

                            Draft

                          </span>

                        )}

                        {isArchived && (

                          <span className="badge danger">

                            Archived

                          </span>

                        )}

                      </div>

                    </td>

                    {/* =====================================
                        ACTIONS
                    ===================================== */}

                    <td>

                      <div className="action-buttons">

                        <Link
                          to={`/admin/events/${event._id}`}
                          className="icon-button"
                          title="View Event"
                          aria-label="View Event"
                        >
                          <Eye size={18} />
                        </Link>

                        <Link
                          to={`/admin/events/edit/${event._id}`}
                          className="icon-button"
                          title="Edit Event"
                          aria-label="Edit Event"
                        >
                          <Edit size={18} />
                        </Link>

                        {!isPublished && (

                          <button
                            type="button"
                            className="icon-button success"
                            onClick={() =>
                              handlePublish(
                                event._id
                              )
                            }
                            disabled={submitting}
                            title="Publish Event"
                            aria-label="Publish Event"
                          >
                            <CheckCircle
                              size={18}
                            />
                          </button>

                        )}

                        {!isArchived && (

                          <button
                            type="button"
                            className="icon-button warning"
                            onClick={() =>
                              handleArchive(
                                event._id
                              )
                            }
                            disabled={submitting}
                            title="Archive Event"
                            aria-label="Archive Event"
                          >
                            <Archive
                              size={18}
                            />
                          </button>

                        )}

                        <button
                          type="button"
                          className="icon-button danger"
                          onClick={() =>
                            handleDelete(
                              event._id
                            )
                          }
                          disabled={submitting}
                          title="Delete Event"
                          aria-label="Delete Event"
                        >
                          <Trash2
                            size={18}
                          />
                        </button>

                      </div>

                    </td>

                  </tr>

                );

              })

            )}
                    </tbody>

        </table>

      </div>

    </div>
  );
};

export default Events;