import {
  UserPlus,
  CalendarPlus,
  Briefcase,
  Newspaper,
  Bell,
  Award,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./QuickActions.css";

function QuickActions() {

  const navigate = useNavigate();

  const actions = [

    {
      title: "Add Member",
      description:
        "Register a new member into JVP Connect.",
      icon: UserPlus,
      color: "green",
      action: () => navigate("/admin/members/new"),
    },

    {
      title: "Create Event",
      description:
        "Publish a new event for members.",
      icon: CalendarPlus,
      color: "blue",
      action: () => navigate("/admin/events/new"),
    },

    {
      title: "New Program",
      description:
        "Launch a new youth empowerment programme.",
      icon: Briefcase,
      color: "purple",
      action: () => navigate("/admin/programs/new"),
    },

    {
      title: "Publish News",
      description:
        "Share announcements with members.",
      icon: Newspaper,
      color: "orange",
      action: () => navigate("/admin/news/new"),
    },

    {
      title: "Send Notification",
      description:
        "Notify members or leaders instantly.",
      icon: Bell,
      color: "red",
      action: () => navigate("/admin/notifications/new"),
    },

    {
      title: "Issue Certificate",
      description:
        "Generate certificates for participants.",
      icon: Award,
      color: "gold",
      action: () => navigate("/admin/certificates/new"),
    },

  ];

  return (

    <section className="quick-actions">

      <div className="section-header">

        <h2>

          Quick Actions

        </h2>

        <p>

          Frequently used administrator tasks.

        </p>

      </div>

      <div className="quick-actions-grid">

        {

          actions.map((item) => {

            const Icon = item.icon;

            return (

              <button

                key={item.title}

                className={`quick-action-card ${item.color}`}

                onClick={item.action}

              >

                <div className="quick-action-icon">

                  <Icon size={26} />

                </div>

                <div className="quick-action-content">

                  <h3>

                    {item.title}

                  </h3>

                  <p>

                    {item.description}

                  </p>

                </div>

              </button>

            );

          })

        }

      </div>

    </section>

  );

}

export default QuickActions;