import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";

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

const statuses = [
  "draft",
  "published",
  "ongoing",
  "completed",
  "cancelled",
  "archived",
];

const EventToolbar = ({
  filters,
  onChange,
  onCreate,
}) => {
  const [search, setSearch] = useState(
    filters.search
  );

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

  const handleSelect = (e) => {
    onChange({
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="event-toolbar">

      <div className="toolbar-left">

        <div className="search-box">

          <Search size={18} />

          <input
            type="search"
            placeholder="Search events..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

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
          name="status"
          value={filters.status}
          onChange={handleSelect}
        >
          <option value="">
            All Status
          </option>

          {statuses.map((status) => (
            <option
              key={status}
              value={status}
            >
              {status}
            </option>
          ))}
        </select>

      </div>

      <button
        className="create-event-btn"
        onClick={onCreate}
      >
        <Plus size={18} />

        Create Event
      </button>

    </div>
  );
};

export default EventToolbar;