import { FileText } from "lucide-react";

const MAX_SUMMARY_LENGTH = 250;

const BasicInfoSection = ({ data, onChange }) => {
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;

    onChange("title", value);

    // Auto-generate slug only if the slug hasn't been customized
    if (
      !data.slug ||
      data.slug === generateSlug(data.title)
    ) {
      onChange("slug", generateSlug(value));
    }
  };

  return (
    <section className="event-section">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="section-header">

        <div className="section-title">

          <FileText size={20} />

          <div>

            <h2>Basic Information</h2>

            <p>
              Provide the essential information
              visitors will see first.
            </p>

          </div>

        </div>

      </div>

      {/* ==========================================
          FORM
      ========================================== */}

      <div className="form-grid">

        <div className="form-group full-width">

          <label>
            Event Title <span className="required">*</span>
          </label>

          <input
            type="text"
            value={data.title}
            onChange={handleTitleChange}
            placeholder="e.g. Coastal Youth Summit 2026"
            required
          />

        </div>

        <div className="form-group full-width">

          <label>
            URL Slug <span className="required">*</span>
          </label>

          <input
            type="text"
            value={data.slug}
            onChange={(e) =>
              onChange("slug", e.target.value)
            }
            placeholder="coastal-youth-summit-2026"
            required
          />

          <small>
            This becomes part of the event URL.
          </small>

        </div>

        <div className="form-group full-width">

          <label>
            Event Summary <span className="required">*</span>
          </label>

          <textarea
            rows={4}
            maxLength={MAX_SUMMARY_LENGTH}
            value={data.summary}
            onChange={(e) =>
              onChange("summary", e.target.value)
            }
            placeholder="Write a concise summary that will appear on event cards and search results."
            required
          />

          <small>
            {data.summary.length}/{MAX_SUMMARY_LENGTH} characters
          </small>

        </div>

        <div className="form-group full-width">

          <label>
            Full Description <span className="required">*</span>
          </label>

          <textarea
            rows={10}
            value={data.description}
            onChange={(e) =>
              onChange("description", e.target.value)
            }
            placeholder="Provide the complete event description, agenda, objectives, speakers, and other relevant information."
            required
          />

          <small>
            This is the main content shown on the event details page.
          </small>

        </div>

      </div>

    </section>
  );
};

export default BasicInfoSection;