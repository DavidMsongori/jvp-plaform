import React, { useMemo } from "react";
import {
  CalendarDays,
  ClipboardCheck,
  Award,
  CheckCircle2,
} from "lucide-react";

import "./EventStatistics.css";

const EventStatistics = ({
  events = [],
  registrations = [],
}) => {
  const statistics = useMemo(() => {
    const now = new Date();

    const upcomingEvents = events.filter(
      (event) =>
        new Date(event.startDate) >= now
    ).length;

    const confirmedRegistrations =
      registrations.filter((registration) =>
        ["confirmed", "registered"].includes(
          registration.registrationStatus
        )
      ).length;

    const attendedEvents =
      registrations.filter(
        (registration) =>
          registration.attendanceStatus ===
          "attended"
      ).length;

    const certificates =
      registrations.filter(
        (registration) =>
          registration.certificateIssued
      ).length;

    return {
      upcomingEvents,
      confirmedRegistrations,
      attendedEvents,
      certificates,
    };
  }, [events, registrations]);

  const cards = [
    {
      title: "Upcoming Events",
      value: statistics.upcomingEvents,
      icon: CalendarDays,
      color: "blue",
    },
    {
      title: "My Registrations",
      value:
        statistics.confirmedRegistrations,
      icon: ClipboardCheck,
      color: "green",
    },
    {
      title: "Events Attended",
      value: statistics.attendedEvents,
      icon: CheckCircle2,
      color: "orange",
    },
    {
      title: "Certificates",
      value: statistics.certificates,
      icon: Award,
      color: "purple",
    },
  ];

  return (
    <section className="event-statistics">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`stat-card ${card.color}`}
          >
            <div className="stat-icon">
              <Icon size={26} />
            </div>

            <div className="stat-content">
              <h3>{card.value}</h3>
              <p>{card.title}</p>
            </div>
          </div>
        );
      })}

    </section>
  );
};

export default EventStatistics;