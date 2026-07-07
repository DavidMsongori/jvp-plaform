import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  User,
  CreditCard,
  CalendarDays,
  BookOpen,
  Award,
  Bell,
  Settings,
  Handshake,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useDashboardUI } from "../../context/DashboardUIContext";

import "./DashboardSidebar.css";

function DashboardSidebar() {

  const navigate = useNavigate();

  const { member, logout } = useAuth();

  const {
    sidebarOpen,
    closeSidebar,
  } = useDashboardUI();

  const initials =
    `${member?.firstName?.[0] || ""}${member?.lastName?.[0] || ""}`;

  const handleLogout = () => {

    logout();

    navigate("/login", {
      replace: true,
    });

  };

  const handleNavigation = () => {

    if (window.innerWidth < 1200) {

      closeSidebar();

    }

  };

  const navigation = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "My Profile",
      path: "/dashboard/profile",
      icon: User,
    },

    {
      name: "Membership Card",
      path: "/dashboard/membership-card",
      icon: CreditCard,
    },

    {
      name: "Events",
      path: "/dashboard/events",
      icon: CalendarDays,
    },

    {
      name: "Programs",
      path: "/dashboard/programs",
      icon: BookOpen,
    },

    {
      name: "Volunteer",
      path: "/dashboard/volunteer",
      icon: Handshake,
    },

    {
      name: "Certificates",
      path: "/dashboard/certificates",
      icon: Award,
    },

    {
      name: "Notifications",
      path: "/dashboard/notifications",
      icon: Bell,
    },

    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },

  ];

  return (

    <aside

      className={`dashboard-sidebar ${
        sidebarOpen ? "open" : ""
      }`}

    >

      {/* ==========================================
          BRAND
      ========================================== */}

      <div className="sidebar-brand">

        <div className="brand-logo">

          {initials || "J"}

        </div>

        <div>

          <h2>JVP Connect</h2>

          <p>Digital Member Portal</p>

        </div>

      </div>

      {/* ==========================================
          MEMBER
      ========================================== */}

      <div className="sidebar-member">

        <div className="member-avatar">

          {

            member?.profilePhoto

              ? (

                <img

                  src={member.profilePhoto}

                  alt="Profile"

                />

              )

              : (

                initials || "J"

              )

          }

        </div>

        <h3>

          {member?.firstName} {member?.lastName}

        </h3>

        <span className="member-role">

          {member?.role?.replaceAll("_", " ")}

        </span>

        <small>

          {member?.membershipNumber}

        </small>

      </div>

      {/* ==========================================
          NAVIGATION
      ========================================== */}

      <nav className="sidebar-nav">

        {

          navigation.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink

                key={item.path}

                to={item.path}

                end={item.path === "/dashboard"}

                onClick={handleNavigation}

              >

                <Icon size={20} />

                <span>

                  {item.name}

                </span>

              </NavLink>

            );

          })

        }

      </nav>

      {/* ==========================================
          FOOTER
      ========================================== */}

      <div className="sidebar-footer">

        <button

          className="logout-btn"

          onClick={handleLogout}

        >

          <LogOut size={18} />

          <span>

            Logout

          </span>

        </button>

      </div>

    </aside>

  );

}

export default DashboardSidebar;