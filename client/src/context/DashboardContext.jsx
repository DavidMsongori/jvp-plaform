import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  getDashboard,
} from "../services/member.service";

/* ==========================================
   CONTEXT
========================================== */

const DashboardContext = createContext(null);

/* ==========================================
   PROVIDER
========================================== */

export function DashboardProvider({
  children,
}) {

  /* ======================================
     STATE
  ====================================== */

  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* ======================================
     LOAD DASHBOARD
  ====================================== */

  const loadDashboard = useCallback(async () => {

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

  }, []);

  /* ======================================
     INITIAL LOAD
  ====================================== */

  useEffect(() => {

    loadDashboard();

  }, [loadDashboard]);

  /* ======================================
     DERIVED DATA
  ====================================== */

  const profile =
    dashboard?.profile || null;

  const statistics =
    dashboard?.statistics || {};

  const recentPayments =
    dashboard?.recentPayments || [];

  const upcomingEvents =
    dashboard?.upcomingEvents || [];

  /* ======================================
     CONTEXT VALUE
  ====================================== */

  const value = {

    /* Raw Dashboard */

    dashboard,

    /* Profile */

    profile,

    /* Statistics */

    statistics,

    /* Dashboard Data */

    recentPayments,

    upcomingEvents,

    /* Status */

    loading,

    error,

    /* Actions */

    reloadDashboard:
      loadDashboard,

  };

  return (

    <DashboardContext.Provider

      value={value}

    >

      {children}

    </DashboardContext.Provider>

  );

}

/* ==========================================
   HOOK
========================================== */

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

export default DashboardContext;