import { Link } from "react-router-dom";
import {
  UserPlus,
  CalendarPlus,
  CreditCard,
  FileBarChart2,
  Users,
  Settings,
} from "lucide-react";

import SectionCard from "../common/SectionCard";

import "./QuickActions.css";

const actions = [
  {
    title: "Add Member",
    description: "Register a new member",
    icon: UserPlus,
    color: "primary",
    to: "/admin/members/new",
  },
  {
    title: "Create Event",
    description: "Schedule a new event",
    icon: CalendarPlus,
    color: "success",
    to: "/admin/events/new",
  },
  {
    title: "Payments",
    description: "View transactions",
    icon: CreditCard,
    color: "warning",
    to: "/admin/payments",
  },
  {
    title: "Reports",
    description: "Generate reports",
    icon: FileBarChart2,
    color: "info",
    to: "/admin/reports",
  },
  {
    title: "Members",
    description: "Manage members",
    icon: Users,
    color: "secondary",
    to: "/admin/members",
  },
  {
    title: "Settings",
    description: "System settings",
    icon: Settings,
    color: "dark",
    to: "/admin/settings",
  },
];

const QuickActions = () => {
  return (
    <SectionCard
      title="Quick Actions"
      subtitle="Frequently used shortcuts."
    >
      <div className="quick-actions-grid">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.to}
              className="quick-action-card"
            >
              <div className={`quick-icon ${action.color}`}>
                <Icon size={22} />
              </div>

              <div>
                <h6>{action.title}</h6>
                <small>{action.description}</small>
              </div>
            </Link>
          );
        })}

      </div>
    </SectionCard>
  );
};

export default QuickActions;