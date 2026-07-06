import { Link } from "react-router-dom";

import { useDashboard } from "../../context/DashboardContext";

import "./MemberCard.css";

function MemberCard() {

  const {
    dashboard,
    loading,
    error,
  } = useDashboard();

  if (loading) {
    return (
      <div className="member-card">
        <p>Loading member information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="member-card">
        <p>{error}</p>
      </div>
    );
  }

  const member = dashboard?.member;

  if (!member) {
    return (
      <div className="member-card">
        <p>Member information unavailable.</p>
      </div>
    );
  }

  const fullName = [
    member.firstName,
    member.middleName,
    member.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="member-card">

      <div className="member-card-header">

        <div className="member-avatar">

          {member.profilePhoto ? (

            <img
              src={member.profilePhoto}
              alt={fullName}
            />

          ) : (

            <span>
              {member.firstName?.charAt(0)}
              {member.lastName?.charAt(0)}
            </span>

          )}

        </div>

        <div>

          <h2>{fullName}</h2>

          <p className="member-role">
            {member.role || "Member"}
          </p>

        </div>

      </div>

      <div className="member-details">

        <div className="detail">
          <span>Membership No.</span>
          <strong>
            {member.membershipNumber || "Pending"}
          </strong>
        </div>

        <div className="detail">
          <span>County</span>
          <strong>{member.county}</strong>
        </div>

        <div className="detail">
          <span>Constituency</span>
          <strong>{member.constituency}</strong>
        </div>

        <div className="detail">
          <span>Ward</span>
          <strong>{member.ward}</strong>
        </div>

        <div className="detail">
          <span>Profile Completion</span>
          <strong>
            {member.profileCompleted || 0}%
          </strong>
        </div>

        <div className="detail">
          <span>Status</span>

          <strong className="status-active">
            {member.membershipStatus}
          </strong>
        </div>

      </div>

      <div className="member-actions">

        <Link
          to="/dashboard/profile"
          className="btn-outline"
        >
          View Profile
        </Link>

        <Link
          to="/dashboard/membership-card"
          className="btn-primary"
        >
          Membership Card
        </Link>

      </div>

    </div>
  );

}

export default MemberCard;