import {
  Save,
  Send,
  Loader2,
} from "lucide-react";

const PublishSection = ({
  mode = "create",
  loading = false,
  isPublished = false,
  onPublishChange,
  onCancel,
}) => {
  return (
    <section className="event-section">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="section-header">

        <div className="section-title">

          <Send size={20} />

          <div>

            <h2>Publishing</h2>

            <p>
              Choose whether this event
              should be published
              immediately or saved as a
              draft.
            </p>

          </div>

        </div>

      </div>

      {/* ==========================================
          PUBLISH SWITCH
      ========================================== */}

      <div className="publish-card">

        <div>

          <h4>Publish Event</h4>

          <p>
            Turn this on if you want the
            event to be visible on the
            public website immediately.
          </p>

        </div>

        <label className="switch">

          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) =>
              onPublishChange(
                e.target.checked
              )
            }
          />

          <span className="slider"></span>

        </label>

      </div>

      {/* ==========================================
          ACTIONS
      ========================================== */}

      <div className="publish-actions">

        <button
          type="button"
          className="cancel-btn"
          disabled={loading}
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="publish-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2
                size={18}
                className="spinner"
              />

              Saving...

            </>
          ) : (
            <>
              {isPublished ? (
                <>
                  <Send size={18} />

                  {mode === "create"
                    ? "Create & Publish"
                    : "Update & Publish"}
                </>
              ) : (
                <>
                  <Save size={18} />

                  {mode === "create"
                    ? "Save Draft"
                    : "Save Changes"}
                </>
              )}
            </>
          )}
        </button>

      </div>

    </section>
  );
};

export default PublishSection;