import {
  FaUsers,
  FaMapMarkerAlt,
  FaLeaf,
  FaHandshake,
} from "react-icons/fa";

import "./Stats.css";

function Stats() {
  const stats = [
    {
      icon: <FaUsers />,
      value: "20,000+",
      label: "Youth Reached",
    },
    {
      icon: <FaMapMarkerAlt />,
      value: "6",
      label: "Coastal Counties",
    },
    {
      icon: <FaLeaf />,
      value: "100+",
      label: "Projects Completed",
    },
    {
      icon: <FaHandshake />,
      value: "500+",
      label: "Active Volunteers",
    },
  ];

  return (
    <section className="stats-section">

      <div className="stats-container">

        {stats.map((item, index) => (
          <div className="stat-card" key={index}>

            <div className="stat-icon">
              {item.icon}
            </div>

            <div className="stat-text">
              <h2>{item.value}</h2>
              <p>{item.label}</p>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Stats;