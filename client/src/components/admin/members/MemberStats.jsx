import {
  Users,
  UserCheck,
  UserMinus,
  Clock,
  UserX,
} from "lucide-react";

import { useAdmin } from "../../../context/AdminContext";

import "./MemberStats.css";

function MemberStats() {

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
      title: "Active Members",
      value:
        summary?.activeMembers ??
        statistics?.activeMembers ??
        0,
      icon: UserCheck,
      color: "blue",
    },

    {
      title: "Pending Approval",
      value:
        summary?.pendingMembers ??
        statistics?.pendingMembers ??
        0,
      icon: Clock,
      color: "orange",
    },

    {
      title: "Suspended",
      value:
        summary?.suspendedMembers ??
        statistics?.suspendedMembers ??
        0,
      icon: UserMinus,
      color: "red",
    },

    {
      title: "Expired",
      value:
        summary?.expiredMembers ??
        statistics?.expiredMembers ??
        0,
      icon: UserX,
      color: "purple",
    },

  ];

  return (

    <section className="member-stats">

      {

        cards.map((card) => {

          const Icon = card.icon;

          return (

            <article

              key={card.title}

              className={`member-stat-card ${card.color}`}

            >

              <div className="member-stat-icon">

                <Icon size={28} />

              </div>

              <div className="member-stat-content">

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

export default MemberStats;