import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const DashboardUIContext = createContext();

export function DashboardUIProvider({ children }) {

  /* ==========================================
     SIDEBAR
  ========================================== */

  const [sidebarOpen, setSidebarOpen] = useState(
    window.innerWidth > 1200
  );

  /* ==========================================
     THEME
  ========================================== */

  const [theme, setTheme] = useState(() => {

    return (
      localStorage.getItem("dashboard-theme") ||
      "light"
    );

  });

  /* ==========================================
     SEARCH
  ========================================== */

  const [search, setSearch] = useState("");

  /* ==========================================
     NOTIFICATIONS PANEL
  ========================================== */

  const [
    notificationsOpen,
    setNotificationsOpen,
  ] = useState(false);

  /* ==========================================
     RESPONSIVE
  ========================================== */

  useEffect(() => {

    const handleResize = () => {

      if (window.innerWidth >= 1200) {

        setSidebarOpen(true);

      } else {

        setSidebarOpen(false);

      }

    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);

  /* ==========================================
     APPLY THEME
  ========================================== */

  useEffect(() => {

    document.documentElement.setAttribute(

      "data-theme",

      theme

    );

    localStorage.setItem(

      "dashboard-theme",

      theme

    );

  }, [theme]);

  /* ==========================================
     ACTIONS
  ========================================== */

  const toggleSidebar = () => {

    setSidebarOpen((prev) => !prev);

  };

  const closeSidebar = () => {

    setSidebarOpen(false);

  };

  const openSidebar = () => {

    setSidebarOpen(true);

  };

  const toggleTheme = () => {

    setTheme((prev) =>

      prev === "light"

        ? "dark"

        : "light"

    );

  };

  const toggleNotifications = () => {

    setNotificationsOpen(

      (prev) => !prev

    );

  };

  return (

    <DashboardUIContext.Provider

      value={{

        /* Sidebar */

        sidebarOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,

        /* Theme */

        theme,
        toggleTheme,

        /* Search */

        search,
        setSearch,

        /* Notifications */

        notificationsOpen,
        toggleNotifications,

      }}

    >

      {children}

    </DashboardUIContext.Provider>

  );

}

export function useDashboardUI() {

  return useContext(

    DashboardUIContext

  );

}