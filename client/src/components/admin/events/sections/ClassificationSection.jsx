import { Tag } from "lucide-react";

const categories = [
  {
    value: "leadership",
    label: "Leadership",
  },
  {
    value: "conference",
    label: "Conference",
  },
  {
    value: "summit",
    label: "Summit",
  },
  {
    value: "workshop",
    label: "Workshop",
  },
  {
    value: "training",
    label: "Training",
  },
  {
    value: "community",
    label: "Community",
  },
  {
    value: "networking",
    label: "Networking",
  },
  {
    value: "innovation",
    label: "Innovation",
  },
  {
    value: "entrepreneurship",
    label: "Entrepreneurship",
  },
  {
    value: "environment",
    label: "Environment",
  },
  {
    value: "sports",
    label: "Sports",
  },
  {
    value: "other",
    label: "Other",
  },
];

const eventTypes = [
  {
    value: "physical",
    label: "Physical",
  },
  {
    value: "virtual",
    label: "Virtual",
  },
  {
    value: "hybrid",
    label: "Hybrid",
  },
];

const ClassificationSection = ({
  data,
  onChange,
}) => {
  return (
    <section className="event-section">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="section-header">

        <div className="section-title">

          <Tag size={20} />

          <div>

            <h2>Classification</h2>

            <p>
              Categorize your event to help
              participants discover it.
            </p>

          </div>

        </div>

      </div>

      {/* ==========================================
          FORM
      ========================================== */}

      <div className="form-grid">

        <div className="form-group">

          <label>
            Category
            <span className="required">
              *
            </span>
          </label>

          <select
            value={data.category}
            onChange={(e) =>
              onChange(
                "category",
                e.target.value
              )
            }
            required
          >
            {categories.map((category) => (
              <option
                key={category.value}
                value={category.value}
              >
                {category.label}
              </option>
            ))}
          </select>

        </div>

        <div className="form-group">

          <label>
            Event Type
            <span className="required">
              *
            </span>
          </label>

          <select
            value={data.eventType}
            onChange={(e) =>
              onChange(
                "eventType",
                e.target.value
              )
            }
            required
          >
            {eventTypes.map((type) => (
              <option
                key={type.value}
                value={type.value}
              >
                {type.label}
              </option>
            ))}
          </select>

        </div>

      </div>

      {/* ==========================================
          FEATURED EVENT
      ========================================== */}

      <div className="checkbox-grid">

        <label className="checkbox-item">

          <input
            type="checkbox"
            checked={data.featured}
            onChange={(e) =>
              onChange(
                "featured",
                e.target.checked
              )
            }
          />

          <div>

            <strong>
              Featured Event
            </strong>

            <small>
              Featured events appear on the
              homepage and are highlighted
              across the platform.
            </small>

          </div>

        </label>

      </div>

    </section>
  );
};

export default ClassificationSection;