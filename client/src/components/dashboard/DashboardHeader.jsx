import {
  Bell,
  Menu,
  Moon,
  Search,
  Sun,
  UserCircle,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useDashboardUI } from "../../context/DashboardUIContext";

import "./DashboardHeader.css";

function DashboardHeader() {

  const { member } = useAuth();

  const {

    toggleSidebar,

    toggleTheme,

    theme,

    search,

    setSearch,

    notificationsOpen,

    toggleNotifications,

  } = useDashboardUI();

  const firstName =
    member?.firstName || "Member";

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {

    greeting = "Good Morning";

  } else if (hour < 17) {

    greeting = "Good Afternoon";

  }

  return (

    <header className="dashboard-header">

      {/* ==========================================
          LEFT
      ========================================== */}

      <div className="header-left">

        <button

          className="menu-toggle"

          onClick={toggleSidebar}

          aria-label="Toggle Sidebar"

        >

          <Menu size={22} />

        </button>

        <div className="header-title">

          <h2>

            {greeting},{" "}

            <span>

              {firstName}

            </span>

            👋

          </h2>

          <p>

            Welcome back to JVP Connect.

          </p>

        </div>

      </div>

      {/* ==========================================
          SEARCH
      ========================================== */}

      <div className="header-search">

        <Search
          size={18}
          className="search-icon"
        />

        <input

          type="text"

          value={search}

          onChange={(e)=>

            setSearch(
              e.target.value
            )

          }

          placeholder="Search dashboard..."

        />

      </div>

      {/* ==========================================
          RIGHT
      ========================================== */}

      <div className="header-actions">

        {/* Theme */}

        <button

          className="header-icon-btn"

          onClick={toggleTheme}

          title="Toggle Theme"

        >

          {

            theme === "light"

              ? <Moon size={20} />

              : <Sun size={20} />

          }

        </button>

        {/* Notifications */}

        <button

          className={`header-icon-btn ${

            notificationsOpen

              ? "active"

              : ""

          }`}

          onClick={toggleNotifications}

          title="Notifications"

        >

          <Bell size={20} />

          <span

            className="notification-badge"

          >

            3

          </span>

        </button>

        {/* Profile */}

        <div className="header-profile">

          <div className="profile-avatar">

            {

              member?.profilePhoto

                ? (

                  <img

                    src={member.profilePhoto}

                    alt="Profile"

                  />

                )

                : (

                  <UserCircle

                    size={44}

                  />

                )

            }

          </div>

          <div className="profile-info">

            <strong>

              {member?.firstName}{" "}

              {member?.lastName}

            </strong>

            <span>

              {member?.role?.replaceAll(

                "_",

                " "

              )}

            </span>

          </div>

        </div>

      </div>

    </header>

  );

}

export default DashboardHeader;