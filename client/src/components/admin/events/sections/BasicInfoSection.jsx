import { FileText } from "lucide-react";

const BasicInfoSection = ({
  data,
  onChange,
}) => {
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleTitle = (e) => {
    const value = e.target.value;

    onChange("title", value);

    if (!data.slug) {
      onChange("slug", generateSlug(value));
    }
  };

  return (
    <section className="form-section">

      <div className="section-header">

        <FileText size={20} />

        <div>

          <h2>Basic Information</h2>

          <p>
            Enter the basic details for the
            event.
          </p>

        </div>

      </div>

      <div className="form-grid">

        <div className="form-group full-width">

          <label>
            Event Title *
          </label>

          <input
            type="text"
            value={data.title}
            onChange={handleTitle}
            placeholder="Coastal Youth Summit 2026"
            required
          />

        </div>

        <div className="form-group full-width">

          <label>
            Event Slug *
          </label>

          <input
            type="text"
            value={data.slug}
            onChange={(e) =>
              onChange(
                "slug",
                e.target.value
              )
            }
            placeholder="coastal-youth-summit-2026"
            required
          />

          <small>
            Used in the event URL.
          </small>

        </div>

        <div className="form-group full-width">

          <label>
            Short Description *
          </label>

          <textarea
            rows="3"
            maxLength={250}
            value={data.shortDescription}
            onChange={(e) =>
              onChange(
                "shortDescription",
                e.target.value
              )
            }
            placeholder="Brief summary shown on event cards."
            required
          />

          <small>
            {data.shortDescription.length}/250
            characters
          </small>

        </div>

        <div className="form-group full-width">

          <label>
            Full Description *
          </label>

          <textarea
            rows="8"
            value={data.description}
            onChange={(e) =>
              onChange(
                "description",
                e.target.value
              )
            }
            placeholder="Provide complete event details..."
            required
          />

        </div>

      </div>

    </section>
  );
};

export default BasicInfoSection;