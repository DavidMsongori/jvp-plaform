import { Outlet } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import {
  DashboardProvider,
} from "../../context/DashboardContext";

import {
  DashboardUIProvider,
} from "../../context/DashboardUIContext";

function DashboardShell() {

  return (

    <DashboardProvider>

      <DashboardUIProvider>

        <DashboardLayout>

          <Outlet />

        </DashboardLayout>

      </DashboardUIProvider>

    </DashboardProvider>

  );

}

export default DashboardShell;