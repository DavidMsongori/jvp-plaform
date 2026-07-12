import "./StatusBadge.css";

const STATUS_CONFIG = {
  ACTIVE: {
    className: "status-success",
    label: "Active",
  },

  PENDING: {
    className: "status-warning",
    label: "Pending",
  },

  PENDING_PAYMENT: {
    className: "status-warning",
    label: "Pending Payment",
  },

  APPROVED: {
    className: "status-success",
    label: "Approved",
  },

  REJECTED: {
    className: "status-danger",
    label: "Rejected",
  },

  SUSPENDED: {
    className: "status-danger",
    label: "Suspended",
  },

  EXPIRED: {
    className: "status-secondary",
    label: "Expired",
  },

  SUCCESS: {
    className: "status-success",
    label: "Success",
  },

  FAILED: {
    className: "status-danger",
    label: "Failed",
  },

  COMPLETED: {
    className: "status-primary",
    label: "Completed",
  },

  OPEN: {
    className: "status-success",
    label: "Open",
  },

  UPCOMING: {
    className: "status-info",
    label: "Upcoming",
  },

  CLOSED: {
    className: "status-secondary",
    label: "Closed",
  },
};

const StatusBadge = ({ status }) => {
  const config =
    STATUS_CONFIG[status] || {
      className: "status-secondary",
      label: status || "Unknown",
    };

  return (
    <span className={`status-badge ${config.className}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;