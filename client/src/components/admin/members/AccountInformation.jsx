import "./MemberProfile.css";

function AccountInformation({
  account,
}) {
  if (!account) {
    return (
      <div className="profile-card">
        <div className="card-header">
          <h3>
            Account Information
          </h3>
        </div>

        <div className="empty-state">
          <p>
            This member has not yet
            activated an account.
          </p>
        </div>
      </div>
    );
  }

  const formatRole = (role) => {
    if (!role) return "-";

    return role
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  const rows = [
    {
      label: "Email",
      value: account.email,
    },
    {
      label: "Role",
      value: formatRole(account.role),
    },
    {
      label: "Email Verified",
      value: account.emailVerified
        ? "Yes"
        : "No",
      badge: true,
      className:
        account.emailVerified
          ? "verified"
          : "not-verified",
    },
    {
      label: "Account Status",
      value: account.isActive
        ? "Active"
        : "Inactive",
      badge: true,
      className:
        account.isActive
          ? "active"
          : "inactive",
    },
    {
      label: "Account Created",
      value: account.createdAt
        ? new Date(
            account.createdAt
          ).toLocaleString()
        : "-",
    },
    {
      label: "Last Updated",
      value: account.updatedAt
        ? new Date(
            account.updatedAt
          ).toLocaleString()
        : "-",
    },
  ];

  return (
    <div className="profile-card">
      <div className="card-header">
        <h3>
          Account Information
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

export default AccountInformation;