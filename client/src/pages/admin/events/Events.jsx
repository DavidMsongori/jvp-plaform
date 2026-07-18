import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import eventService from "../../../services/event.service";

import EventStats from "../../../components/admin/events/EventStats";
import EventToolbar from "../../../components/admin/events/EventToolbar";
import EventTable from "../../../components/admin/events/EventTable";
import EventPagination from "../../../components/admin/events/EventPagination";

const Events = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  /* ==========================================
     STATE
  ========================================== */

  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [statistics, setStatistics] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    ongoingEvents: 0,
    completedEvents: 0,
    featuredEvents: 0,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  /* ==========================================
     FILTERS
  ========================================== */

  const filters = {
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    status: searchParams.get("status") || "",
    featured: searchParams.get("featured") || "",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
  };

  /* ==========================================
     LOAD EVENTS
  ========================================== */

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [eventsResponse, statsResponse] =
        await Promise.all([
          eventService.getEvents(filters),
          eventService.getDashboardStatistics(),
        ]);

      setEvents(
        eventsResponse.events ||
          eventsResponse.data?.events ||
          []
      );

      setPagination(
        eventsResponse.pagination ||
          eventsResponse.data?.pagination ||
          {}
      );

      setStatistics(
        statsResponse.statistics ||
          statsResponse.data?.statistics ||
          {}
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load events."
      );
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  /* ==========================================
     FILTERS
  ========================================== */

  const handleFilterChange = (values) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.set("page", "1");

    setSearchParams(params);
  };

  /* ==========================================
     PAGINATION
  ========================================== */

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page);

    setSearchParams(params);
  };

  /* ==========================================
     ACTIONS
  ========================================== */

  const handleCreate = () => {
    navigate("/admin/events/create");
  };

  const handleView = (event) => {
    navigate(`/admin/events/${event._id}`);
  };

  const handleEdit = (event) => {
    navigate(`/admin/events/${event._id}/edit`);
  };

  const handleDelete = async (event) => {
    if (
      !window.confirm(
        `Delete "${event.title}"?`
      )
    ) {
      return;
    }

    try {
      await eventService.deleteEvent(event._id);

      loadEvents();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to delete event."
      );
    }
  };

  /* ==========================================
     RENDER
  ========================================== */

  return (
    <div className="admin-events-page">

      <EventStats
        statistics={statistics}
      />

      <EventToolbar
        filters={filters}
        onChange={handleFilterChange}
        onCreate={handleCreate}
      />

      <EventTable
        events={events}
        loading={loading}
        error={error}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EventPagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />

    </div>
  );
};

export default Events;