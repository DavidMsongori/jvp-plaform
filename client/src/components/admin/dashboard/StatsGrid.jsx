import {
  Users,
  UserCheck,
  Clock3,
  UserX,
  CreditCard,
  Banknote,
  CalendarDays,
  MapPinned,
} from "lucide-react";

import StatCard from "../common/StatCard";

import "./StatsGrid.css";

const StatsGrid = ({ statistics = {} }) => {
  const cards = [
    {
      title: "Total Members",
      value: statistics.totalMembers ?? 0,
      icon: Users,
      color: "primary",
      subtitle: "Registered members",
    },
    {
      title: "Active Members",
      value: statistics.activeMembers ?? 0,
      icon: UserCheck,
      color: "success",
      subtitle: "Currently active",
    },
    {
      title: "Pending Members",
      value: statistics.pendingMembers ?? 0,
      icon: Clock3,
      color: "warning",
      subtitle: "Awaiting approval",
    },
    {
      title: "Expired Members",
      value: statistics.expiredMembers ?? 0,
      icon: UserX,
      color: "danger",
      subtitle: "Membership expired",
    },
    {
      title: "Revenue",
      value: `KES ${(statistics.totalRevenue ?? 0).toLocaleString()}`,
      icon: Banknote,
      color: "success",
      subtitle: "Total revenue",
    },
    {
      title: "Payments",
      value: statistics.totalPayments ?? 0,
      icon: CreditCard,
      color: "info",
      subtitle: "Payments received",
    },
    {
      title: "Events",
      value: statistics.totalEvents ?? 0,
      icon: CalendarDays,
      color: "primary",
      subtitle: "Created events",
    },
    {
      title: "Counties",
      value: statistics.countyStatistics?.length ?? 0,
      icon: MapPinned,
      color: "secondary",
      subtitle: "Active counties",
    },
  ];

  return (
    <div className="stats-grid">

      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          subtitle={card.subtitle}
          icon={card.icon}
          color={card.color}
        />
      ))}

    </div>
  );
};

export default StatsGrid;