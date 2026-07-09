import {
  AlertTriangle,
  Trash2,
  X,
} from "lucide-react";

import "./DeleteMemberModal.css";

function DeleteMemberModal({

  open,

  member,

  loading = false,

  onClose,

  onConfirm,

}) {

  if (!open) return null;

  const fullName = member

    ? [

        member.firstName,

        member.middleName,

        member.lastName,

      ]
        .filter(Boolean)
        .join(" ")

    : "";

  return (

    <div className="delete-member-overlay">

      <div className="delete-member-modal">

        {/* ==========================================
            CLOSE
        ========================================== */}

        <button

          className="modal-close"

          onClick={onClose}

          disabled={loading}

        >

          <X size={20} />

        </button>

        {/* ==========================================
            ICON
        ========================================== */}

        <div className="delete-icon">

          <AlertTriangle size={42} />

        </div>

        {/* ==========================================
            CONTENT
        ========================================== */}

        <h2>

          Delete Member

        </h2>

        <p>

          You are about to permanently delete

        </p>

        <h3>

          {fullName || "this member"}

        </h3>

        <p className="warning-text">

          This action cannot be undone.

          The member profile, membership history,

          leadership records and linked data may

          also be removed.

        </p>

        {/* ==========================================
            ACTIONS
        ========================================== */}

        <div className="delete-actions">

          <button

            className="cancel-btn"

            onClick={onClose}

            disabled={loading}

          >

            Cancel

          </button>

          <button

            className="delete-btn"

            onClick={onConfirm}

            disabled={loading}

          >

            <Trash2 size={18} />

            {

              loading

                ? "Deleting..."

                : "Delete Member"

            }

          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteMemberModal;