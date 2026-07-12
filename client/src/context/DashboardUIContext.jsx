import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

/* ==========================================
   CONTEXT
========================================== */

const DashboardUIContext = createContext(null);

/* ==========================================
   PROVIDER
========================================== */

export function DashboardUIProvider({
  children,
}) {

  /* ======================================
     SIDEBAR
  ====================================== */

  const [sidebarOpen, setSidebarOpen] =
    useState(() => window.innerWidth >= 1200);

  /* ======================================
     THEME
  ====================================== */

  const [theme, setTheme] = useState(() =>
    localStorage.getItem("dashboard-theme") ||
    "light"
  );

  /* ======================================
     SEARCH
  ====================================== */

  const [search, setSearch] =
    useState("");

  /* ======================================
     NOTIFICATIONS
  ====================================== */

  const [

    notificationsOpen,

    setNotificationsOpen,

  ] = useState(false);

  /* ======================================
     RESPONSIVE SIDEBAR
  ====================================== */

  useEffect(() => {

    const handleResize = () => {

      setSidebarOpen(

        window.innerWidth >= 1200

      );

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

  /* ======================================
     APPLY THEME
  ====================================== */

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

  /* ======================================
     ACTIONS
  ====================================== */

  const toggleSidebar = () =>

    setSidebarOpen((prev) => !prev);

  const openSidebar = () =>

    setSidebarOpen(true);

  const closeSidebar = () =>

    setSidebarOpen(false);

  const toggleTheme = () =>

    setTheme((prev) =>

      prev === "light"

        ? "dark"

        : "light"

    );

  const toggleNotifications = () =>

    setNotificationsOpen(

      (prev) => !prev

    );

  /* ======================================
     CONTEXT VALUE
  ====================================== */

  const value = {

    /* Sidebar */

    sidebarOpen,

    toggleSidebar,

    openSidebar,

    closeSidebar,

    /* Theme */

    theme,

    toggleTheme,

    /* Search */

    search,

    setSearch,

    /* Notifications */

    notificationsOpen,

    toggleNotifications,

  };

  return (

    <DashboardUIContext.Provider

      value={value}

    >

      {children}

    </DashboardUIContext.Provider>

  );

}

/* ==========================================
   HOOK
========================================== */

export function useDashboardUI() {

  const context =

    useContext(

      DashboardUIContext

    );

  if (!context) {

    throw new Error(

      "useDashboardUI must be used inside DashboardUIProvider."

    );

  }

  return context;

}

export default DashboardUIContext;