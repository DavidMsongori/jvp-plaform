import { Link } from "react-router-dom";

import {
  CalendarDays,
  BookOpen,
  Bell,
  CreditCard,
  User,
  Award,
  ArrowRight,
} from "lucide-react";

import { useDashboard } from "../../context/DashboardContext";

import "./QuickActions.css";

function QuickActions() {

  const { dashboard, loading, error } = useDashboard();

  if (loading) {
    return (
      <section className="quick-actions dashboard-card">
        <div className="empty-state">
          Loading quick actions...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="quick-actions dashboard-card">
        <div className="empty-state">
          {error}
        </div>
      </section>
    );
  }

  if (!dashboard?.summary) {
    return (
      <section className="quick-actions dashboard-card">
        <div className="empty-state">
          Quick actions unavailable.
        </div>
      </section>
    );
  }

  const { summary } = dashboard;

  const actions = [

    {
      title: "Complete Profile",
      description: `${summary.profileCompletion}% completed`,
      icon: User,
      link: "/dashboard/profile",
      color: "green",
    },

    {
      title: "My Events",
      description: `${summary.registeredEvents} registered`,
      icon: CalendarDays,
      link: "/dashboard/events",
      color: "blue",
    },

    {
      title: "My Programs",
      description: `${summary.activePrograms} active`,
      icon: BookOpen,
      link: "/dashboard/programs",
      color: "orange",
    },

    {
      title: "Membership Card",
      description: "View Digital Card",
      icon: CreditCard,
      link: "/dashboard/membership-card",
      color: "purple",
    },

    {
      title: "Certificates",
      description: `${summary.certificates} earned`,
      icon: Award,
      link: "/dashboard/certificates",
      color: "teal",
    },

    {
      title: "Notifications",
      description: `${summary.unreadNotifications} unread`,
      icon: Bell,
      link: "/dashboard/notifications",
      color: "red",
    },

  ];

  return (

    <section className="quick-actions dashboard-card">

      <div className="panel-header">

        <div className="panel-title">

          <h2>

            Quick Actions

          </h2>

          <p>

            Frequently used shortcuts

          </p>

        </div>

      </div>

      <div className="quick-actions-grid">

        {

          actions.map((action) => {

            const Icon = action.icon;

            return (

              <Link

                key={action.title}

                to={action.link}

                className={`quick-action-card hover-lift ${action.color}`}

              >

                <div
                  className={`quick-action-icon ${action.color}`}
                >

                  <Icon size={26} />

                </div>

                <div className="quick-action-content">

                  <h3>

                    {action.title}

                  </h3>

                  <p>

                    {action.description}

                  </p>

                </div>

                <ArrowRight
                  size={18}
                  className="quick-action-arrow"
                />

              </Link>

            );

          })

        }

      </div>

    </section>

  );

}

export default QuickActions;