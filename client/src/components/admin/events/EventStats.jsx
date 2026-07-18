import {
  CalendarDays,
  Clock3,
  PlayCircle,
  CheckCircle2,
  Star,
} from "lucide-react";

import "./Event.css";

const EventStats = ({ statistics }) => {
  const stats = [
    {
      title: "Total Events",
      value: statistics?.totalEvents || 0,
      icon: <CalendarDays size={22} />,
      className: "primary",
    },
    {
      title: "Upcoming",
      value: statistics?.upcomingEvents || 0,
      icon: <Clock3 size={22} />,
      className: "info",
    },
    {
      title: "Ongoing",
      value: statistics?.ongoingEvents || 0,
      icon: <PlayCircle size={22} />,
      className: "success",
    },
    {
      title: "Completed",
      value: statistics?.completedEvents || 0,
      icon: <CheckCircle2 size={22} />,
      className: "secondary",
    },
    {
      title: "Featured",
      value: statistics?.featuredEvents || 0,
      icon: <Star size={22} />,
      className: "warning",
    },
  ];

  return (
    <section className="event-stats-grid">
      {stats.map((item) => (
        <article
          key={item.title}
          className={`event-stat-card ${item.className}`}
        >
          <div className="event-stat-icon">
            {item.icon}
          </div>

          <div className="event-stat-content">
            <h2>{item.value}</h2>
            <p>{item.title}</p>
          </div>
        </article>
      ))}
    </section>
  );
};

export default EventStats;