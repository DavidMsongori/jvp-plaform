import {
  Menu,
  Search,
  Bell,
  Moon,
  Sun,
  Plus,
  User,
} from "lucide-react";

import { useAdminUI } from "../../context/AdminUIContext";

import "./AdminHeader.css";

function AdminHeader() {

  const {

    sidebarOpen,
    toggleSidebar,

    theme,
    toggleTheme,

    search,
    setSearch,

  } = useAdminUI();

  return (

    <header className="admin-header">

      {/* ==========================================
          LEFT
      ========================================== */}

      <div className="admin-header-left">

        <button

          className="header-icon-btn"

          onClick={toggleSidebar}

        >

          <Menu size={22} />

        </button>

        <div className="admin-search">

          <Search size={18} />

          <input

            type="text"

            placeholder="Search members, events, programs..."

            value={search}

            onChange={(e) =>

              setSearch(e.target.value)

            }

          />

        </div>

      </div>

      {/* ==========================================
          RIGHT
      ========================================== */}

      <div className="admin-header-right">

        <button className="quick-create-btn">

          <Plus size={18} />

          <span>New</span>

        </button>

        <button className="header-icon-btn">

          <Bell size={20} />

          <span className="notification-dot"></span>

        </button>

        <button

          className="header-icon-btn"

          onClick={toggleTheme}

        >

          {

            theme === "light"

              ? <Moon size={20} />

              : <Sun size={20} />

          }

        </button>

        <div className="admin-user">

          <div className="admin-avatar">

            <User size={22} />

          </div>

          {

            sidebarOpen && (

              <div>

                <strong>

                  Administrator

                </strong>

                <small>

                  JVP Connect

                </small>

              </div>

            )

          }

        </div>

      </div>

    </header>

  );

}

export default AdminHeader;