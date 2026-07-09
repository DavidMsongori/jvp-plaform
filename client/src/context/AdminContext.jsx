import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getDashboard,
} from "../services/admin.service";

const AdminContext = createContext();

export function AdminProvider({

  children,

}) {

  /* ==========================================
     STATE
  ========================================== */

  const [

    dashboard,

    setDashboard,

  ] = useState(null);

  const [

    loading,

    setLoading,

  ] = useState(true);

  const [

    error,

    setError,

  ] = useState("");

  /* ==========================================
     LOAD DASHBOARD
  ========================================== */

  const loadDashboard = async () => {

    try {

      setLoading(true);

      setError("");

      const response =

        await getDashboard();

      setDashboard(

        response.data

      );

    } catch (err) {

      console.error(err);

      setError(

        err.response?.data?.message ||

        "Unable to load admin dashboard."

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

  const statistics =

    dashboard?.statistics || {};

  const summary =

    dashboard?.summary || {};

  const recentMembers =

    dashboard?.recentMembers || [];

  const recentActivity =

    dashboard?.recentActivity || [];

  const countyStatistics =

    dashboard?.countyStatistics || [];

  const quickActions =

    dashboard?.quickActions || [];

  const notifications =

    dashboard?.notifications || [];

  const charts =

    dashboard?.charts || {};

  /* ==========================================
     CONTEXT
  ========================================== */

  return (

    <AdminContext.Provider

      value={{

        /* Raw */

        dashboard,

        /* Dashboard */

        statistics,

        summary,

        recentMembers,

        recentActivity,

        countyStatistics,

        quickActions,

        notifications,

        charts,

        /* Status */

        loading,

        error,

        /* Actions */

        reloadDashboard:

          loadDashboard,

      }}

    >

      {children}

    </AdminContext.Provider>

  );

}

export function useAdmin() {

  const context =

    useContext(

      AdminContext

    );

  if (!context) {

    throw new Error(

      "useAdmin must be used inside AdminProvider."

    );

  }

  return context;

}