import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getDashboard } from "../../../server/src/services/member.service";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

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

  return (

    <DashboardContext.Provider
      value={{
        dashboard,
        loading,
        error,
        reloadDashboard: loadDashboard,
      }}
    >

      {children}

    </DashboardContext.Provider>

  );

}

export function useDashboard() {

  return useContext(
    DashboardContext
  );

}