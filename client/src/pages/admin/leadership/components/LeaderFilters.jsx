import { Search, Filter, RotateCcw } from "lucide-react";

const CATEGORIES = [
  { label: "All Categories", value: "all" },
  { label: "Patron", value: "patron" },
  {
    label: "Regional Executive",
    value: "regional_executive",
  },
  {
    label: "Youth Assembly",
    value: "youth_assembly",
  },
  {
    label: "County Leadership",
    value: "county_leadership",
  },
];

const COUNTIES = [
  "Mombasa",
  "Kwale",
  "Kilifi",
  "Tana River",
  "Lamu",
  "Taita Taveta",
];

export default function LeaderFilters({
  search,
  category,
  county,
  active,

  onSearchChange,
  onCategoryChange,
  onCountyChange,
  onStatusChange,
  onReset,
}) {
  return (
    <div className="leader-filters">

      {/* Search */}

      <div className="filter-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search leaders..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />

      </div>

      {/* Category */}

      <div className="filter-group">

        <Filter size={16} />

        <select
          value={category}
          onChange={(e) =>
            onCategoryChange(e.target.value)
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

      </div>

      {/* County */}

      <div className="filter-group">

        <select
          value={county}
          onChange={(e) =>
            onCountyChange(e.target.value)
          }
        >
          <option value="">
            All Counties
          </option>

          {COUNTIES.map((county) => (
            <option
              key={county}
              value={county}
            >
              {county}
            </option>
          ))}
        </select>

      </div>

      {/* Status */}

      <div className="filter-group">

        <select
          value={active}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
        >
          <option value="all">
            All Status
          </option>

          <option value="true">
            Active
          </option>

          <option value="false">
            Inactive
          </option>

        </select>

      </div>

      {/* Reset */}

      <button
        className="btn-secondary"
        onClick={onReset}
      >
        <RotateCcw size={16} />

        Reset

      </button>

    </div>
  );
}