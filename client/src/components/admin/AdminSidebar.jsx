import {
  LayoutDashboard,
  Users,
  UserCheck,
  CalendarDays,
  Briefcase,
  CreditCard,
  Award,
  Bell,
  Newspaper,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  Building2,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useAdminUI } from "../../context/AdminUIContext";

import "./AdminSidebar.css";

function AdminSidebar() {

  const {

    sidebarOpen,

    toggleSidebar,

  } = useAdminUI();

  const menu = [

    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },

    {
      title: "Members",
      icon: Users,
      path: "/admin/members",
    },

    {
      title: "Applications",
      icon: UserCheck,
      path: "/admin/applications",
    },

    {
      title: "Leadership",
      icon: Shield,
      path: "/admin/leadership",
    },

    {
      title: "Events",
      icon: CalendarDays,
      path: "/admin/events",
    },

    {
      title: "Programs",
      icon: Briefcase,
      path: "/admin/programs",
    },

    {
      title: "Counties",
      icon: Building2,
      path: "/admin/counties",
    },

    {
      title: "Payments",
      icon: CreditCard,
      path: "/admin/payments",
    },

    {
      title: "Certificates",
      icon: Award,
      path: "/admin/certificates",
    },

    {
      title: "News",
      icon: Newspaper,
      path: "/admin/news",
    },

    {
      title: "Notifications",
      icon: Bell,
      path: "/admin/notifications",
    },

    {
      title: "Reports",
      icon: BarChart3,
      path: "/admin/reports",
    },

    {
      title: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },

  ];

  return (

    <aside

      className={`admin-sidebar ${

        sidebarOpen

          ? "open"

          : "collapsed"

      }`}

    >

      {/* ==========================================
          LOGO
      ========================================== */}

      <div className="admin-logo">

        <div>

          <h2>

            JVP Connect

          </h2>

          <small>

            Administration

          </small>

        </div>

        <button

          className="sidebar-toggle"

          onClick={toggleSidebar}

        >

          {

            sidebarOpen

              ? <ChevronLeft size={18} />

              : <ChevronRight size={18} />

          }

        </button>

      </div>

      {/* ==========================================
          MENU
      ========================================== */}

      <nav className="admin-nav">

        {

          menu.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink

                key={item.path}

                to={item.path}

                className={({ isActive }) =>

                  isActive

                    ? "admin-link active"

                    : "admin-link"

                }

              >

                <Icon size={20} />

                {

                  sidebarOpen && (

                    <span>

                      {item.title}

                    </span>

                  )

                }

              </NavLink>

            );

          })

        }

      </nav>

      {/* ==========================================
          FOOTER
      ========================================== */}

      <div className="admin-sidebar-footer">

        <button className="logout-btn">

          <LogOut size={18} />

          {

            sidebarOpen && (

              <span>

                Logout

              </span>

            )

          }

        </button>

      </div>

    </aside>

  );

}

export default AdminSidebar;