import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

import "./admin-theme.css";
import "./admin-responsive.css";
import "./admin-animations.css";
import "./AdminLayout.css";

function AdminLayout() {

  return (

    <div className="admin-layout">

      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <AdminSidebar />

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <div className="admin-content">

        {/* ==========================================
            HEADER
        ========================================== */}

        <AdminHeader />

        {/* ==========================================
            PAGE CONTENT
        ========================================== */}

        <main className="admin-main">

          <Outlet />

        </main>

      </div>

    </div>

  );

}

export default AdminLayout;