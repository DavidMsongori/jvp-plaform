import {
  FaUser,
  FaUserCheck,
  FaUserSlash,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaHandshake,
  FaBullhorn,
  FaCog,
  FaFileAlt,
  FaEdit,
  FaTrash,
  FaPlus,
  FaLock,
  FaKey,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaHistory,
} from "react-icons/fa";

import "./MemberProfile.css";

const getActivityIcon = (activity) => {
  const action = activity.action?.toLowerCase() || "";
  const module = activity.module?.toLowerCase() || "";

  if (action.includes("register")) return <FaUser />;
  if (action.includes("activate")) return <FaUserCheck />;
  if (action.includes("deactivate")) return <FaUserSlash />;
  if (action.includes("login")) return <FaLock />;
  if (action.includes("password")) return <FaKey />;
  if (action.includes("create")) return <FaPlus />;
  if (action.includes("update")) return <FaEdit />;
  if (action.includes("delete")) return <FaTrash />;

  switch (module) {
    case "payments":
      return <FaMoneyBillWave />;

    case "events":
      return <FaCalendarAlt />;

    case "venues":
      return <FaMapMarkerAlt />;

    case "partners":
      return <FaHandshake />;

    case "news":
    case "blogs":
      return <FaBullhorn />;

    case "settings":
      return <FaCog />;

    case "reports":
      return <FaFileAlt />;

    default:
      return <FaHistory />;
  }
};

const getStatusClass = (status = "") => {
  switch (status.toLowerCase()) {
    case "success":
      return "success";

    case "failed":
      return "failed";

    case "warning":
      return "warning";

    default:
      return "info";
  }
};

const getStatusIcon = (status = "") => {
  switch (status.toLowerCase()) {
    case "success":
      return <FaCheckCircle />;

    case "failed":
      return <FaTimesCircle />;

    default:
      return <FaClock />;
  }
};

function ActivityTimeline({
  activities = [],
}) {
  return (
    <div className="profile-card activity-card">

      <div className="card-header">
        <h3>
          Activity Timeline
        </h3>
      </div>

      {activities.length === 0 ? (
        <div className="empty-state">
          <p>
            No activity has been recorded for this member.
          </p>
        </div>
      ) : (
        <div className="timeline">

          {activities.map((activity) => (

            <div
              key={activity._id}
              className="timeline-item"
            >

              <div className="timeline-icon">
                {getActivityIcon(activity)}
              </div>

              <div className="timeline-content">

                <div className="timeline-header">

                  <h4>
                    {activity.title ||
                      activity.action ||
                      "Activity"}
                  </h4>

                  <span
                    className={`info-badge ${getStatusClass(
                      activity.status
                    )}`}
                  >
                    {getStatusIcon(
                      activity.status
                    )}

                    <span>
                      {activity.status ||
                        "Success"}
                    </span>

                  </span>

                </div>

                {activity.description && (
                  <p>
                    {activity.description}
                  </p>
                )}

                <div className="timeline-meta">

                  {activity.module && (
                    <span>
                      <strong>Module:</strong>{" "}
                      {activity.module}
                    </span>
                  )}

                  {activity.user?.name && (
                    <span>
                      <strong>By:</strong>{" "}
                      {activity.user.name}
                    </span>
                  )}

                  <span>
                    {new Date(
                      activity.createdAt
                    ).toLocaleString()}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default ActivityTimeline;