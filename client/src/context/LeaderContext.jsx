import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import leaderService from "../services/leader.service";

const LeaderContext = createContext(null);

/* ==========================================================
   PROVIDER
========================================================== */

export function LeaderProvider({ children }) {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    county: "",
    active: "true",
  });

  /* ==========================================================
     LOAD LEADERS
  ========================================================== */

  const loadLeaders = useCallback(async (currentFilters) => {
    try {
      setLoading(true);
      setError(null);

      const response = await leaderService.getLeaders(currentFilters);

      setLeaders(response.data || []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load leadership."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /* ==========================================================
     CREATE
  ========================================================== */

  const createLeader = useCallback(async (data) => {
    try {
      setLoading(true);

      const response = await leaderService.createLeader(data);

      if (response?.data) {
        setLeaders((prev) => [
          response.data,
          ...prev,
        ]);
      }

      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  /* ==========================================================
     UPDATE
  ========================================================== */

  const updateLeader = useCallback(async (id, data) => {
    try {
      setLoading(true);

      const response =
        await leaderService.updateLeader(id, data);

      if (response?.data) {
        setLeaders((prev) =>
          prev.map((leader) =>
            leader._id === id
              ? response.data
              : leader
          )
        );
      }

      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  /* ==========================================================
     DELETE
  ========================================================== */

  const deleteLeader = useCallback(async (id) => {
    try {
      setLoading(true);

      const response =
        await leaderService.deleteLeader(id);

      setLeaders((prev) =>
        prev.filter(
          (leader) => leader._id !== id
        )
      );

      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  /* ==========================================================
     FILTERS
  ========================================================== */

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: "",
      category: "",
      county: "",
      active: "true",
    });
  }, []);

  /* ==========================================================
     INITIAL LOAD
  ========================================================== */

  useEffect(() => {
    loadLeaders(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ==========================================================
     DEBOUNCED FILTER SEARCH
  ========================================================== */

  useEffect(() => {
    const timer = setTimeout(() => {
      loadLeaders(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, loadLeaders]);

  /* ==========================================================
     CONTEXT VALUE
  ========================================================== */

  const value = useMemo(
    () => ({
      leaders,
      loading,
      error,

      filters,

      loadLeaders,

      createLeader,

      updateLeader,

      deleteLeader,

      updateFilters,

      resetFilters,
    }),
    [
      leaders,
      loading,
      error,
      filters,
      loadLeaders,
      createLeader,
      updateLeader,
      deleteLeader,
      updateFilters,
      resetFilters,
    ]
  );

  return (
    <LeaderContext.Provider value={value}>
      {children}
    </LeaderContext.Provider>
  );
}

/* ==========================================================
   CUSTOM HOOK
========================================================== */

export function useLeaders() {
  const context = useContext(LeaderContext);

  if (!context) {
    throw new Error(
      "useLeaders must be used inside LeaderProvider."
    );
  }

  return context;
}

export default LeaderContext;