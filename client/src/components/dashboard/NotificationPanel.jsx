import {
  Bell,
  CalendarDays,
  CheckCircle2,
  Info,
  Megaphone,
} from "lucide-react";

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
      <section className="notification-panel dashboard-card">
        <div className="empty-state">
          Loading notifications...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="notification-panel dashboard-card">
        <div className="empty-state">
          {error}
        </div>
      </section>
    );
  }

  if (!dashboard?.notifications) {
    return (
      <section className="notification-panel dashboard-card">
        <div className="empty-state">
          Notifications unavailable.
        </div>
      </section>
    );
  }

  const { notifications } = dashboard;

  const getIcon = (type) => {

    switch (type) {

      case "success":
        return <CheckCircle2 size={18} />;

      case "event":
        return <CalendarDays size={18} />;

      case "announcement":
        return <Megaphone size={18} />;

      default:
        return <Info size={18} />;

    }

  };

  return (

    <section className="notification-panel dashboard-card">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="panel-header">

        <div className="panel-title">

          <Bell size={22} />

          <div>

            <h2>

              Notifications

            </h2>

            <p>

              Your latest updates and alerts.

            </p>

          </div>

        </div>

        <span className="badge badge-success">

          {notifications.length}

        </span>

      </div>

      {/* ==========================================
          EMPTY STATE
      ========================================== */}

      {

        notifications.length === 0 ? (

          <div className="empty-state">

            <h3>

              No Notifications

            </h3>

            <p>

              You're all caught up.

            </p>

          </div>

        ) : (

          <div className="notification-list">

            {

              notifications.map((notification) => (

                <article

                  key={notification.id}

                  className="notification-item hover-lift"

                >

                  <div
                    className={`notification-icon ${notification.type}`}
                  >

                    {

                      getIcon(
                        notification.type
                      )

                    }

                  </div>

                  <div className="notification-content">

                    <h4>

                      {notification.title}

                    </h4>

                    <p>

                      {notification.message}

                    </p>

                    <small>

                      {notification.date}

                    </small>

                  </div>

                </article>

              ))

            }

          </div>

        )

      }

    </section>

  );

}

export default NotificationPanel;