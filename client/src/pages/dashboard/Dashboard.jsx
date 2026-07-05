import DashboardLayout from "../../components/dashboard/DashboardLayout";

import DashboardOverview from "../../components/dashboard/DashboardOverview";
import QuickActions from "../../components/dashboard/QuickActions";

function Dashboard() {
  return (
    <DashboardLayout>

      <DashboardOverview />

      <QuickActions />

    </DashboardLayout>
  );
}

export default Dashboard;