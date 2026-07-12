import { Outlet } from "react-router-dom";

import { DashboardProvider } from "../context/DashboardContext";
import { DashboardUIProvider } from "../context/DashboardUIContext";
import { ProfileProvider } from "../context/ProfileContext";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

import "./DashboardLayout.css";

const DashboardLayout = () => {
  return (

    <DashboardUIProvider>

      <DashboardProvider>

        <ProfileProvider>

          <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-main">

              <Topbar />

              <main className="dashboard-content">

                <Outlet />

              </main>

            </div>

          </div>

        </ProfileProvider>

      </DashboardProvider>

    </DashboardUIProvider>

  );
};

export default DashboardLayout;