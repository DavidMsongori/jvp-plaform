import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard">

      <DashboardSidebar />

      <div className="dashboard-main">

        <DashboardHeader />

        <main>

          {children}

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;