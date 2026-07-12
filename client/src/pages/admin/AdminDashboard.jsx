import { useEffect, useState } from "react";
import {
  FaUsers,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";

import { getDashboard } from "../../services/admin.service";

import "./Dashboard.css";

function AdminDashboard() {

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* ==========================================
     LOAD DASHBOARD
  ========================================== */

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      setLoading(true);

      const response =
        await getDashboard();

      setDashboard(response.data);

    } catch (err) {

      console.error(err);

      setError(

        err.response?.data?.message ||

        "Unable to load dashboard."

      );

    } finally {

      setLoading(false);

    }

  };

  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {

    return (

      <div className="dashboard-loading">

        Loading dashboard...

      </div>

    );

  }

  /* ==========================================
     ERROR
  ========================================== */

  if (error) {

    return (

      <div className="dashboard-error">

        {error}

      </div>

    );

  }

  const stats = dashboard?.statistics || {};

  return (

    <div className="admin-dashboard">

      {/* ======================================
          HEADER
      ======================================= */}

      <div className="dashboard-header">

        <div>

          <h1>

            Dashboard

          </h1>

          <p>

            Welcome back. Here's what's happening across JVP Connect.

          </p>

        </div>

      </div>

      {/* ======================================
          STATISTICS
      ======================================= */}

      <div className="statistics-grid">

        <div className="stat-card">

          <FaUsers className="stat-icon" />

          <div>

            <span>Total Members</span>

            <h2>

              {stats.totalMembers ?? 0}

            </h2>

          </div>

        </div>

        <div className="stat-card">

          <FaUsers className="stat-icon" />

          <div>

            <span>Active Members</span>

            <h2>

              {stats.activeMembers ?? 0}

            </h2>

          </div>

        </div>

        <div className="stat-card">

          <FaMoneyBillWave className="stat-icon" />

          <div>

            <span>Total Revenue</span>

            <h2>

              KES {stats.totalRevenue ?? 0}

            </h2>

          </div>

        </div>

        <div className="stat-card">

          <FaChartLine className="stat-icon" />

          <div>

            <span>Payments</span>

            <h2>

              {stats.totalPayments ?? 0}

            </h2>

          </div>

        </div>

        <div className="stat-card">

          <FaCalendarAlt className="stat-icon" />

          <div>

            <span>Events</span>

            <h2>

              {stats.totalEvents ?? 0}

            </h2>

          </div>

        </div>

      </div>

      {/* ======================================
          PLACEHOLDERS
      ======================================= */}

      <div className="dashboard-sections">

        <div className="dashboard-panel">

          <h3>

            Quick Actions

          </h3>

          <p>

            Coming next...

          </p>

        </div>

        <div className="dashboard-panel">

          <h3>

            Upcoming Events

          </h3>

          <p>

            Coming next...

          </p>

        </div>

        <div className="dashboard-panel">

          <h3>

            Recent Members

          </h3>

          <p>

            Coming next...

          </p>

        </div>

        <div className="dashboard-panel">

          <h3>

            Recent Payments

          </h3>

          <p>

            Coming next...

          </p>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;