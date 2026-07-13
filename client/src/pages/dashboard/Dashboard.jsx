import { useEffect, useState } from "react";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import { getDashboard } from "../../services/member.service";

import "./Dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await getDashboard();

      setDashboard(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-error">
          {error}
        </div>
      </div>
    );
  }

  const member = dashboard?.member || {};

  return (
    <div className="dashboard-page">

      {/* ==========================================
          WELCOME BANNER
      ========================================== */}

      <WelcomeBanner member={member} />

      {/* ==========================================
          PLACEHOLDERS FOR NEXT PARTS
      ========================================== */}

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Membership Overview</h3>
          <p>
            Statistics cards will be added
            in Part 2.
          </p>
        </div>

        <div className="dashboard-card">
          <h3>Membership Card</h3>
          <p>
            Digital membership card preview
            coming next.
          </p>
        </div>

        <div className="dashboard-card">
          <h3>Upcoming Events</h3>
          <p>
            Registered events and upcoming
            opportunities will appear here.
          </p>
        </div>

        <div className="dashboard-card">
          <h3>Notifications</h3>
          <p>
            Recent notifications will appear
            here.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;