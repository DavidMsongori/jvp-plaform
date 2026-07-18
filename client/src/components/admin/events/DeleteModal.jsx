import { AlertTriangle, Loader2 } from "lucide-react";

import "./Event.css";

const DeleteModal = ({
  open,
  event,
  loading = false,
  onClose,
  onConfirm,
}) => {
  if (!open || !event) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="delete-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <div className="delete-modal-icon">
          <AlertTriangle size={55} />
        </div>

        <h2>Delete Event</h2>

        <p>
          Are you sure you want to delete
          <strong> "{event.title}"</strong>?
        </p>

        <p className="delete-warning">
          This action performs a <strong>soft delete</strong>.
          The event will be hidden from users but can still be
          recovered by a Super Administrator if needed.
        </p>

        <div className="delete-modal-actions">
          <button
            className="cancel-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="delete-confirm-btn"
            onClick={() => onConfirm(event)}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="spin"
                />
                Deleting...
              </>
            ) : (
              "Delete Event"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;