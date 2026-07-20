import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  RotateCcw,
} from "lucide-react";

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "conference", label: "Conference" },
  { value: "summit", label: "Summit" },
  { value: "training", label: "Training" },
  { value: "workshop", label: "Workshop" },
  { value: "forum", label: "Forum" },
  { value: "webinar", label: "Webinar" },
  { value: "networking", label: "Networking" },
  { value: "competition", label: "Competition" },
  { value: "sports", label: "Sports" },
  { value: "tree_planting", label: "Tree Planting" },
  { value: "community_service", label: "Community Service" },
  { value: "career_fair", label: "Career Fair" },
  { value: "meeting", label: "Meeting" },
  { value: "leadership", label: "Leadership" },
  { value: "other", label: "Other" },
];

const EVENT_TYPES = [
  { value: "", label: "All Types" },
  { value: "physical", label: "Physical" },
  { value: "virtual", label: "Virtual" },
  { value: "hybrid", label: "Hybrid" },
];

const SORT_OPTIONS = [
  { value: "", label: "Sort By" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "upcoming", label: "Upcoming" },
  { value: "featured", label: "Featured" },
];

const Filters = ({
  filters,
  onChange,
}) => {
  const [values, setValues] = useState(filters);

  useEffect(() => {
    setValues(filters);
  }, [filters]);

  const handleChange = (field, value) => {
    const updated = {
      ...values,
      [field]: value,
    };

    setValues(updated);
    onChange(updated);
  };

  const handleReset = () => {
    const reset = {
      search: "",
      category: "",
      eventType: "",
      featured: "",
      sort: "",
    };

    setValues(reset);
    onChange(reset);
  };

  return (
    <section className="event-filters">

      <div className="event-filters__header">

        <div className="event-filters__title">
          <Filter size={18} />
          <span>Filter Events</span>
        </div>

        <button
          type="button"
          className="event-filters__reset"
          onClick={handleReset}
        >
          <RotateCcw size={16} />
          Reset
        </button>

      </div>

      <div className="event-filters__grid">

        <div className="event-filter">

          <Search
            size={18}
            className="event-filter__icon"
          />

          <input
            type="text"
            placeholder="Search events..."
            value={values.search}
            onChange={(e) =>
              handleChange(
                "search",
                e.target.value
              )
            }
          />

        </div>

        <select
          value={values.category}
          onChange={(e) =>
            handleChange(
              "category",
              e.target.value
            )
          }
        >
          {CATEGORIES.map((item) => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>

        <select
          value={values.eventType}
          onChange={(e) =>
            handleChange(
              "eventType",
              e.target.value
            )
          }
        >
          {EVENT_TYPES.map((item) => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>

        <select
          value={values.featured}
          onChange={(e) =>
            handleChange(
              "featured",
              e.target.value
            )
          }
        >
          <option value="">
            All Events
          </option>

          <option value="true">
            Featured Only
          </option>
        </select>

        <select
          value={values.sort || ""}
          onChange={(e) =>
            handleChange(
              "sort",
              e.target.value
            )
          }
        >
          {SORT_OPTIONS.map((item) => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>

      </div>

    </section>
  );
};

export default Filters;