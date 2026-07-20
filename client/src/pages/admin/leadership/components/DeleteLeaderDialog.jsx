import { AlertTriangle } from "lucide-react";

export default function DeleteLeaderDialog({
  open,
  leader,
  loading = false,
  onCancel,
  onConfirm,
}) {
  if (!open || !leader) return null;

  const leaderName = leader.member
    ? [
        leader.member.firstName,
        leader.member.middleName,
        leader.member.lastName,
      ]
        .filter(Boolean)
        .join(" ")
    : leader.patron?.name || "Unknown Leader";

  return (
    <div className="modal-overlay">

      <div className="delete-dialog">

        <div className="delete-icon">

          <AlertTriangle size={42} />

        </div>

        <h2>Remove Leadership Assignment</h2>

        <p>
          Are you sure you want to remove the leadership assignment for
          <strong> {leaderName}</strong>?
        </p>

        <div className="delete-summary">

          <div>
            <span>Position</span>
            <strong>{leader.position}</strong>
          </div>

          <div>
            <span>Category</span>
            <strong>
              {leader.category
                ?.replaceAll("_", " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </strong>
          </div>

          {leader.county && (
            <div>
              <span>County</span>
              <strong>{leader.county}</strong>
            </div>
          )}
        </div>

        <div className="delete-warning">

          This action will permanently remove this leadership assignment.
          The member account will remain active.

        </div>

        <div className="modal-actions">

          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn-danger"
            disabled={loading}
            onClick={() => onConfirm(leader)}
          >
            {loading ? "Removing..." : "Remove Leader"}
          </button>

        </div>

      </div>

    </div>
  );
}