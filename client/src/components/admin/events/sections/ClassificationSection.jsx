import { Tag } from "lucide-react";

const categories = [
  "Leadership",
  "Conference",
  "Summit",
  "Workshop",
  "Training",
  "Community",
  "Sports",
  "Networking",
  "Innovation",
  "Environment",
  "Entrepreneurship",
];

const eventTypes = [
  "Physical",
  "Virtual",
  "Hybrid",
];

const statuses = [
  "draft",
  "published",
  "ongoing",
  "completed",
  "cancelled",
  "archived",
];

const ClassificationSection = ({
  data,
  onChange,
}) => {
  return (
    <section className="form-section">

      <div className="section-header">

        <Tag size={20} />

        <div>

          <h2>Classification</h2>

          <p>
            Configure how this event is categorized and displayed.
          </p>

        </div>

      </div>

      <div className="form-grid">

        <div className="form-group">

          <label>Category *</label>

          <select
            value={data.category || ""}
            onChange={(e) =>
              onChange("category", e.target.value)
            }
            required
          >
            <option value="">
              Select Category
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

        </div>

        <div className="form-group">

          <label>Event Type *</label>

          <select
            value={data.eventType || ""}
            onChange={(e) =>
              onChange("eventType", e.target.value)
            }
            required
          >
            <option value="">
              Select Event Type
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

        </div>

        <div className="form-group">

          <label>Status *</label>

          <select
            value={data.status || "draft"}
            onChange={(e) =>
              onChange("status", e.target.value)
            }
          >
            {statuses.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status.charAt(0).toUpperCase() +
                  status.slice(1)}
              </option>
            ))}
          </select>

        </div>

        <div className="form-group">

          <label>Visibility</label>

          <select
            value={data.visibility || "public"}
            onChange={(e) =>
              onChange(
                "visibility",
                e.target.value
              )
            }
          >
            <option value="public">
              Public
            </option>

            <option value="members">
              Members Only
            </option>

            <option value="private">
              Private
            </option>

          </select>

        </div>

      </div>

      <div className="checkbox-grid">

        <label className="checkbox-item">

          <input
            type="checkbox"
            checked={data.featured || false}
            onChange={(e) =>
              onChange(
                "featured",
                e.target.checked
              )
            }
          />

          <span>Featured Event</span>

        </label>

        <label className="checkbox-item">

          <input
            type="checkbox"
            checked={
              data.registrationRequired ??
              true
            }
            onChange={(e) =>
              onChange(
                "registrationRequired",
                e.target.checked
              )
            }
          />

          <span>
            Registration Required
          </span>

        </label>

      </div>

    </section>
  );
};

export default ClassificationSection;