import { useAdmin } from "../../context/AdminContext";

import StatisticsCards from "./StatisticsCards";
import QuickActions from "./QuickActions";
import RecentMembers from "./RecentMembers";
import ActivityFeed from "./ActivityFeed";
import CountyOverview from "./CountyOverview";

import "./DashboardOverview.css";

function DashboardOverview() {

  const {

    loading,

    error,

  } = useAdmin();

  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {

    return (

      <div className="admin-loading">

        <h2>

          Loading Admin Dashboard...

        </h2>

      </div>

    );

  }

  /* ==========================================
     ERROR
  ========================================== */

  if (error) {

    return (

      <div className="admin-error">

        <h2>

          {error}

        </h2>

      </div>

    );

  }

  /* ==========================================
     DASHBOARD
  ========================================== */

  return (

    <section className="admin-dashboard">

      {/* ======================================
          PAGE HEADER
      ======================================= */}

      <div className="dashboard-page-header">

        <div>

          <h1>

            Administration Dashboard

          </h1>

          <p>

            Welcome to the JVP Connect Administration Portal.

          </p>

        </div>

      </div>

      {/* ======================================
          STATISTICS
      ======================================= */}

      <StatisticsCards />

      {/* ======================================
          SECOND ROW
      ======================================= */}

      <div className="dashboard-grid two-columns">

        <CountyOverview />

        <QuickActions />

      </div>

      {/* ======================================
          THIRD ROW
      ======================================= */}

      <div className="dashboard-grid two-columns">

        <RecentMembers />

        <ActivityFeed />

      </div>

    </section>

  );

}

export default DashboardOverview;