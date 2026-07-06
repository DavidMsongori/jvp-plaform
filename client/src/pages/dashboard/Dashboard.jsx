import DashboardLayout from "../../components/dashboard/DashboardLayout";
import DashboardOverview from "../../components/dashboard/DashboardOverview";

import {
  DashboardProvider,
} from "../../context/DashboardContext";

function Dashboard() {
  return (
    <DashboardProvider>

      <DashboardLayout>

        <DashboardOverview />

      </DashboardLayout>

    </DashboardProvider>
  );
}

export default Dashboard;