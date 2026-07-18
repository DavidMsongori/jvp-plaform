import { useEffect, useState } from "react";
import "./Event.css";

const categories = [
  "Leadership",
  "Training",
  "Conference",
  "Summit",
  "Workshop",
  "Community",
  "Sports",
  "Networking",
];

const eventTypes = [
  "Physical",
  "Virtual",
  "Hybrid",
];

const Filters = ({ filters, onChange }) => {
  const [search, setSearch] = useState(filters.search);

  /* ==========================================
     DEBOUNCED SEARCH
  ========================================== */

  useEffect(() => {
    setSearch(filters.search);
  }, [filters.search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== filters.search) {
        onChange({ search });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /* ==========================================
     SELECT CHANGE
  ========================================== */

  const handleSelect = (e) => {
    onChange({
      [e.target.name]: e.target.value,
    });
  };

  /* ==========================================
     CLEAR FILTERS
  ========================================== */

  const clearFilters = () => {
    setSearch("");

    onChange({
      search: "",
      category: "",
      eventType: "",
      featured: "",
    });
  };

  return (
    <section className="event-filters">

      <div className="event-filter-container">

        <input
          type="search"
          placeholder="Search events..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          name="category"
          value={filters.category}
          onChange={handleSelect}
        >
          <option value="">
            All Categories
          </option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        <select
          name="eventType"
          value={filters.eventType}
          onChange={handleSelect}
        >
          <option value="">
            All Types
          </option>

          {eventTypes.map((type) => (
            <option
              key={type}
              value={type}
            >
              {type}
            </option>
          ))}
        </select>

        <select
          name="featured"
          value={filters.featured}
          onChange={handleSelect}
        >
          <option value="">
            All Events
          </option>

          <option value="true">
            Featured
          </option>

          <option value="false">
            Regular
          </option>
        </select>

        <button
          className="clear-filter-btn"
          onClick={clearFilters}
          type="button"
        >
          Clear Filters
        </button>

      </div>

    </section>
  );
};

export default Filters;