import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

import "./dashboard-theme.css";
import "./dashboard-responsive.css";
import "./dashboard-animations.css";
import "./DashboardLayout.css";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">

      <DashboardSidebar />

      <div className="dashboard-content">

        <DashboardHeader />

        <main className="dashboard-main">

          {children}

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;