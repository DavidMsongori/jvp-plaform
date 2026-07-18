import {
  Save,
  Send,
  Loader2,
} from "lucide-react";

const PublishSection = ({
  mode = "create",
  loading = false,
  onCancel,
  onAction,
}) => {
  return (
    <section className="form-section">

      <div className="section-header">

        <Send size={20} />

        <div>

          <h2>Publish Event</h2>

          <p>
            Save this event as a draft or publish it immediately.
          </p>

        </div>

      </div>

      <div className="publish-actions">

        <button
          type="button"
          className="cancel-btn"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="draft-btn"
          disabled={loading}
          onClick={() => onAction("draft")}
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
              <Save size={18} />
              {mode === "create"
                ? "Save Draft"
                : "Save Changes"}
            </>
          )}
        </button>

        <button
          type="submit"
          className="publish-btn"
          disabled={loading}
          onClick={() => onAction("publish")}
        >
          {loading ? (
            <>
              <Loader2
                size={18}
                className="spinner"
              />
              Publishing...
            </>
          ) : (
            <>
              <Send size={18} />
              {mode === "create"
                ? "Publish Event"
                : "Update & Publish"}
            </>
          )}
        </button>

      </div>

    </section>
  );
};

export default PublishSection;