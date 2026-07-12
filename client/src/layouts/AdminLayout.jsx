import { Outlet } from "react-router-dom";
import { useState } from "react";

import AdminSidebar from "../components/admin/AdminSidebar";
import Topbar from "../components/admin/Topbar";

import "./AdminLayout.css";

function AdminLayout() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  /* ==========================================
     TOGGLE SIDEBAR
  ========================================== */

  const toggleSidebar = () => {

    setSidebarOpen((previous) => !previous);

  };

  /* ==========================================
     CLOSE SIDEBAR
  ========================================== */

  const closeSidebar = () => {

    setSidebarOpen(false);

  };

  return (

    <div className="admin-layout">

      {/* ======================================
          SIDEBAR
      ======================================= */}

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {/* ======================================
          MAIN CONTENT
      ======================================= */}

      <div className="admin-main">

        <Topbar
          onMenuClick={toggleSidebar}
        />

        <main className="admin-content">

          <Outlet />

        </main>

      </div>

      {/* ======================================
          MOBILE OVERLAY
      ======================================= */}

      {sidebarOpen && (

        <div
          className="admin-overlay"
          onClick={closeSidebar}
        />

      )}

    </div>

  );

}

export default AdminLayout;