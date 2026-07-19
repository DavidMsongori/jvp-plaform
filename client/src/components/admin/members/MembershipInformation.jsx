import "./MemberProfile.css";

function MembershipInformation({
  member,
  summary,
}) {
  if (!member) return null;

  const formatText = (value) => {
    if (!value) return "-";

    return value
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  const rows = [
    {
      label: "Member Number",
      value:
        member.memberNumber ||
        "Not Assigned",
    },
    {
      label: "Membership Type",
      value: formatText(
        member.membershipType
      ),
    },
    {
      label: "Membership Status",
      value: formatText(
        member.membershipStatus
      ),
      badge: true,
      className:
        member.membershipStatus ||
        "unknown",
    },
    {
      label: "Membership Fee Paid",
      value: member.membershipFeePaid
        ? "Yes"
        : "No",
      badge: true,
      className:
        member.membershipFeePaid
          ? "paid"
          : "unpaid",
    },
    {
      label: "Account Activated",
      value: member.accountActivated
        ? "Yes"
        : "No",
      badge: true,
      className:
        member.accountActivated
          ? "activated"
          : "pending",
    },
    {
      label: "Registration Source",
      value: formatText(member.source),
    },
    {
      label: "Member Since",
      value: summary?.memberSince
        ? new Date(
            summary.memberSince
          ).toLocaleDateString()
        : member.createdAt
        ? new Date(
            member.createdAt
          ).toLocaleDateString()
        : "-",
    },
    {
      label: "Membership Expiry",
      value:
        member.membershipExpiry
          ? new Date(
              member.membershipExpiry
            ).toLocaleDateString()
          : "Not Set",
    },
  ];

  return (
    <div className="profile-card">
      <div className="card-header">
        <h3>
          Membership Information
        </h3>
      </div>

      <div className="info-grid">
        {rows.map((row) => (
          <div
            key={row.label}
            className="info-item"
          >
            <label>{row.label}</label>

            {row.badge ? (
              <span
                className={`info-badge ${row.className}`}
              >
                {row.value}
              </span>
            ) : (
              <span>{row.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MembershipInformation;