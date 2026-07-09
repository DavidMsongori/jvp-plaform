import { Outlet } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import {
  DashboardProvider,
} from "../../context/DashboardContext";

import {
  DashboardUIProvider,
} from "../../context/DashboardUIContext";

import {
  ProfileProvider,
} from "../../context/ProfileContext";

function DashboardShell() {

  return (

    <DashboardProvider>

      <ProfileProvider>

        <DashboardUIProvider>

          <DashboardLayout>

            <Outlet />

          </DashboardLayout>

        </DashboardUIProvider>

      </ProfileProvider>

    </DashboardProvider>

  );

}

export default DashboardShell;