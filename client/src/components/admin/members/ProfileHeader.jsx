import {
  FaUser,
  FaUserEdit,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import "./MemberProfile.css";

function ProfileHeader({
  member,
  account,
  onEdit,
  onToggleStatus,
  processing,
}) {
  if (!member) return null;

  const fullName = [
    member.firstName,
    member.middleName,
    member.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const initials = [
    member.firstName?.[0],
    member.lastName?.[0],
  ]
    .filter(Boolean)
    .join("")
    .toUpperCase();

  const status = member.accountActivated
    ? "Activated"
    : member.source === "imported"
    ? "Imported"
    : "New";

  const membershipType = member.membershipType
    ? member.membershipType
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) =>
          char.toUpperCase()
        )
    : "Ordinary Member";

  return (
    <div className="profile-header">

      <div className="profile-header-left">

        {member.profilePhoto ? (
          <img
            src={member.profilePhoto}
            alt={fullName}
            className="profile-avatar"
          />
        ) : (
          <div className="profile-avatar placeholder">
            {initials || <FaUser />}
          </div>
        )}

        <div className="profile-info">

          <h2>{fullName}</h2>

          {account?.email && (
            <p className="profile-email">
              {account.email}
            </p>
          )}

          <p className="member-number">
            {member.memberNumber ||
              "Member Number Not Assigned"}
          </p>

          <div className="profile-tags">

            <span className="membership-type">
              {membershipType}
            </span>

            <span
              className={`status-badge ${status.toLowerCase()}`}
            >
              {status}
            </span>

            {account?.role && (
              <span className="role-badge">
                {account.role
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                  )}
              </span>
            )}

          </div>

        </div>

      </div>

      <div className="profile-actions">

        <button
          className="btn-primary"
          onClick={onEdit}
          disabled={processing}
        >
          <FaUserEdit />
          Edit
        </button>

        <button
          className={
            member.accountActivated
              ? "btn-danger"
              : "btn-success"
          }
          disabled={processing}
          onClick={onToggleStatus}
        >
          {member.accountActivated ? (
            <>
              <FaTimesCircle />
              Deactivate
            </>
          ) : (
            <>
              <FaCheckCircle />
              Activate
            </>
          )}
        </button>

      </div>

    </div>
  );
}

export default ProfileHeader;