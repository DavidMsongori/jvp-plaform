import {
  Activity,
  CalendarDays,
  BookOpen,
  Award,
  Clock3,
  Percent,
} from "lucide-react";

import { useDashboard } from "../../context/DashboardContext";

import "./DashboardStats.css";

function DashboardStats() {

  const { dashboard, loading, error } = useDashboard();

  if (loading) {
    return (
      <section className="dashboard-stats">
        <div className="empty-state">
          Loading statistics...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard-stats">
        <div className="empty-state">
          {error}
        </div>
      </section>
    );
  }

  if (!dashboard?.statistics) {
    return (
      <section className="dashboard-stats">
        <div className="empty-state">
          Statistics unavailable.
        </div>
      </section>
    );
  }

  const stats = dashboard.statistics;

  const cards = [

    {
      title: "Profile Completion",
      value: `${stats.profileCompletion}%`,
      icon: Percent,
      color: "green",
    },

    {
      title: "Registered Events",
      value: stats.events,
      icon: CalendarDays,
      color: "blue",
    },

    {
      title: "Active Programs",
      value: stats.programs,
      icon: BookOpen,
      color: "orange",
    },

    {
      title: "Certificates",
      value: stats.certificates,
      icon: Award,
      color: "purple",
    },

    {
      title: "Volunteer Hours",
      value: stats.volunteerHours,
      icon: Activity,
      color: "teal",
    },

    {
      title: "Login Count",
      value: stats.loginCount,
      icon: Clock3,
      color: "indigo",
    },

  ];

  return (

    <section className="dashboard-stats">

      {

        cards.map((card) => {

          const Icon = card.icon;

          return (

            <div
              key={card.title}
              className="stat-card dashboard-card hover-lift"
            >

              <div
                className={`stat-icon ${card.color}`}
              >

                <Icon size={24} />

              </div>

              <div className="stat-content">

                <span>

                  {card.title}

                </span>

                <h3>

                  {card.value}

                </h3>

              </div>

            </div>

          );

        })

      }

    </section>

  );

}

export default DashboardStats;