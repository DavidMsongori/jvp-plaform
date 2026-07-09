import {
  Users,
  UserPlus,
  CalendarDays,
  Briefcase,
  Award,
  Bell,
} from "lucide-react";

import { useAdmin } from "../../context/AdminContext";

import "./StatisticsCards.css";

function StatisticsCards() {

  const {

    summary,

    statistics,

  } = useAdmin();

  const cards = [

    {
      title: "Total Members",
      value:
        summary?.totalMembers ??
        statistics?.totalMembers ??
        0,
      icon: Users,
      color: "green",
    },

    {
      title: "Pending Applications",
      value:
        summary?.pendingApplications ??
        statistics?.pendingApplications ??
        0,
      icon: UserPlus,
      color: "orange",
    },

    {
      title: "Active Events",
      value:
        summary?.activeEvents ??
        statistics?.activeEvents ??
        0,
      icon: CalendarDays,
      color: "blue",
    },

    {
      title: "Active Programs",
      value:
        summary?.activePrograms ??
        statistics?.activePrograms ??
        0,
      icon: Briefcase,
      color: "purple",
    },

    {
      title: "Certificates Issued",
      value:
        summary?.certificates ??
        statistics?.certificates ??
        0,
      icon: Award,
      color: "gold",
    },

    {
      title: "Unread Notifications",
      value:
        summary?.unreadNotifications ??
        statistics?.unreadNotifications ??
        0,
      icon: Bell,
      color: "red",
    },

  ];

  return (

    <section className="statistics-grid">

      {

        cards.map((card) => {

          const Icon = card.icon;

          return (

            <article

              key={card.title}

              className={`stat-card ${card.color}`}

            >

              <div className="stat-icon">

                <Icon size={28} />

              </div>

              <div className="stat-content">

                <span>

                  {card.title}

                </span>

                <h2>

                  {card.value}

                </h2>

              </div>

            </article>

          );

        })

      }

    </section>

  );

}

export default StatisticsCards;