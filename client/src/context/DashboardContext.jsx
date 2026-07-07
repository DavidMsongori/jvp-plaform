import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getDashboard,
} from "../services/member.service";

const DashboardContext = createContext();

export function DashboardProvider({

  children,

}) {

  /* ==========================================
     STATE
  ========================================== */

  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* ==========================================
     LOAD DASHBOARD
  ========================================== */

  const loadDashboard = async () => {

    try {

      setLoading(true);

      setError("");

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
     INITIAL LOAD
  ========================================== */

  useEffect(() => {

    loadDashboard();

  }, []);

  /* ==========================================
     DERIVED DATA
  ========================================== */

  const member =
    dashboard?.member || null;

  const summary =
    dashboard?.summary || {};

  const statistics =
    dashboard?.statistics || {};

  const completion =
    dashboard?.completion || {};

  const events =
    dashboard?.events || [];

  const notifications =
    dashboard?.notifications || [];

  const news =
    dashboard?.news || [];

  const recentActivity =
    dashboard?.recentActivity || [];

  /* ==========================================
     CONTEXT
  ========================================== */

  return (

    <DashboardContext.Provider

      value={{

        /* Raw */

        dashboard,

        /* Member */

        member,

        /* Dashboard */

        summary,

        statistics,

        completion,

        events,

        notifications,

        news,

        recentActivity,

        /* Status */

        loading,

        error,

        /* Actions */

        reloadDashboard:
          loadDashboard,

      }}

    >

      {children}

    </DashboardContext.Provider>

  );

}

export function useDashboard() {

  const context =
    useContext(DashboardContext);

  if (!context) {

    throw new Error(

      "useDashboard must be used inside DashboardProvider."

    );

  }

  return context;

}