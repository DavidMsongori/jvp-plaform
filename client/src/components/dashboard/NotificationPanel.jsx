import { Link } from "react-router-dom";

import { useDashboard } from "../../context/DashboardContext";

import "./NotificationPanel.css";

function NotificationPanel() {

  const {
    dashboard,
    loading,
    error,
  } = useDashboard();

  if (loading) {
    return (
      <section className="notification-panel">
        <p>Loading notifications...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="notification-panel">
        <p>{error}</p>
      </section>
    );
  }

  const notifications =
    dashboard?.notifications || [];

  const getIcon = (type) => {

    switch (type) {

      case "success":
        return "✅";

      case "warning":
        return "⚠️";

      case "primary":
        return "⭐";

      case "info":
        return "ℹ️";

      default:
        return "🔔";

    }

  };

  return (

    <section className="notification-panel">

      <div className="widget-header">

        <div>

          <h2>Notifications</h2>

          <p>
            Stay updated with your latest activity.
          </p>

        </div>

        <Link
          to="/dashboard/notifications"
          className="view-all-link"
        >
          View All
        </Link>

      </div>

      {notifications.length === 0 ? (

        <div className="empty-state">

          <h3>No Notifications</h3>

          <p>
            You're all caught up.
          </p>

        </div>

      ) : (

        <div className="notification-list">

          {notifications.map((notification) => (

            <div
              key={notification.id}
              className={`notification-item ${notification.type}`}
            >

              <div className="notification-icon">

                {getIcon(notification.type)}

              </div>

              <div className="notification-content">

                <h4>

                  {notification.title}

                </h4>

                <p>

                  {notification.message}

                </p>

                <small>

                  {notification.time}

                </small>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>

  );

}

export default NotificationPanel;