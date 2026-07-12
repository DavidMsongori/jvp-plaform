import {
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaUserTimes,
} from "react-icons/fa";

import "./Members.css";

function MemberSummary({ summary = {} }) {
  const cards = [
    {
      title: "Total Members",
      value: summary.totalMembers || 0,
      icon: <FaUsers />,
      color: "blue",
    },
    {
      title: "Active Members",
      value: summary.activeMembers || 0,
      icon: <FaUserCheck />,
      color: "green",
    },
    {
      title: "Pending Members",
      value: summary.pendingMembers || 0,
      icon: <FaUserClock />,
      color: "orange",
    },
    {
      title: "Expired Members",
      value: summary.expiredMembers || 0,
      icon: <FaUserTimes />,
      color: "red",
    },
  ];

  return (
    <div className="member-summary">

      {cards.map((card) => (
        <div
          key={card.title}
          className={`summary-card ${card.color}`}
        >
          <div className="summary-icon">
            {card.icon}
          </div>

          <div className="summary-content">
            <h3>{card.value}</h3>
            <p>{card.title}</p>
          </div>
        </div>
      ))}

    </div>
  );
}

export default MemberSummary;