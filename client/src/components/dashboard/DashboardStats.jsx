import { useDashboard } from "../../context/DashboardContext";

import "./DashboardStats.css";

function DashboardStats() {

  const {
    dashboard,
    loading,
    error,
  } = useDashboard();

  if (loading) {
    return (
      <div className="dashboard-stats">
        <p>Loading statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-stats">
        <p>{error}</p>
      </div>
    );
  }

  const stats = dashboard?.stats;

  if (!stats) {
    return (
      <div className="dashboard-stats">
        <p>No statistics available.</p>
      </div>
    );
  }

  const statCards = [

    {
      title: "Profile Completion",
      value: `${stats.profileCompletion || 0}%`,
      icon: "👤",
      color: "green",
    },

    {
      title: "Events",
      value: stats.events || 0,
      icon: "📅",
      color: "blue",
    },

    {
      title: "Programs",
      value: stats.programs || 0,
      icon: "🎓",
      color: "purple",
    },

    {
      title: "Certificates",
      value: stats.certificates || 0,
      icon: "📜",
      color: "orange",
    },

    {
      title: "Volunteer Hours",
      value: stats.volunteerHours || 0,
      icon: "🤝",
      color: "teal",
    },

    {
      title: "Login Count",
      value: stats.loginCount || 0,
      icon: "🔐",
      color: "indigo",
    },

  ];

  return (

    <div className="dashboard-stats">

      <div className="dashboard-section-title">

        <h2>Your Statistics</h2>

        <p>
          A summary of your participation and activity within JVP Connect.
        </p>

      </div>

      <div className="stats-grid">

        {statCards.map((stat) => (

          <div
            key={stat.title}
            className={`stat-card ${stat.color}`}
          >

            <div className="stat-icon">
              {stat.icon}
            </div>

            <div className="stat-number">
              {stat.value}
            </div>

            <div className="stat-title">
              {stat.title}
            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default DashboardStats;