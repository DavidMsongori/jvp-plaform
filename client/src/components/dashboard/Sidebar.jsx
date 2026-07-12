import {
  LayoutDashboard,
  User,
  CreditCard,
  CalendarDays,
  GraduationCap,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Sidebar.css";

const Sidebar = () => {

  const { logout } = useAuth();

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "My Profile",
      icon: User,
      path: "/dashboard/profile",
    },
    {
      name: "Membership Card",
      icon: CreditCard,
      path: "/dashboard/membership-card",
    },
    {
      name: "Events",
      icon: CalendarDays,
      path: "/dashboard/events",
    },
    {
      name: "Programs",
      icon: GraduationCap,
      path: "/dashboard/programs",
    },
    {
      name: "Notifications",
      icon: Bell,
      path: "/dashboard/notifications",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  return (
    <aside className="member-sidebar">

      <div className="sidebar-logo">

        <img
          src="/logo.png"
          alt="JVP"
        />

        <h3>JVP Connect</h3>

      </div>

      <nav>

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >

              <Icon size={20} />

              <span>{item.name}</span>

            </NavLink>

          );

        })}

      </nav>

      <button
        className="logout-btn"
        onClick={logout}
      >

        <LogOut size={18} />

        Logout

      </button>

    </aside>
  );
};

export default Sidebar;