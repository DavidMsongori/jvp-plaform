import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AdminUIContext = createContext();

export function AdminUIProvider({ children }) {

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

      localStorage.getItem("admin-theme") ||

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
     QUICK CREATE MODAL
  ========================================== */

  const [

    quickCreateOpen,

    setQuickCreateOpen,

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

      "data-admin-theme",

      theme

    );

    localStorage.setItem(

      "admin-theme",

      theme

    );

  }, [theme]);

  /* ==========================================
     SIDEBAR
  ========================================== */

  const toggleSidebar = () => {

    setSidebarOpen(

      (prev) => !prev

    );

  };

  const openSidebar = () => {

    setSidebarOpen(true);

  };

  const closeSidebar = () => {

    setSidebarOpen(false);

  };

  /* ==========================================
     THEME
  ========================================== */

  const toggleTheme = () => {

    setTheme((prev) =>

      prev === "light"

        ? "dark"

        : "light"

    );

  };

  /* ==========================================
     NOTIFICATIONS
  ========================================== */

  const toggleNotifications = () => {

    setNotificationsOpen(

      (prev) => !prev

    );

  };

  const closeNotifications = () => {

    setNotificationsOpen(false);

  };

  /* ==========================================
     QUICK CREATE
  ========================================== */

  const toggleQuickCreate = () => {

    setQuickCreateOpen(

      (prev) => !prev

    );

  };

  const closeQuickCreate = () => {

    setQuickCreateOpen(false);

  };

  return (

    <AdminUIContext.Provider

      value={{

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

        closeNotifications,

        /* Quick Create */

        quickCreateOpen,

        toggleQuickCreate,

        closeQuickCreate,

      }}

    >

      {children}

    </AdminUIContext.Provider>

  );

}

export function useAdminUI() {

  const context =

    useContext(

      AdminUIContext

    );

  if (!context) {

    throw new Error(

      "useAdminUI must be used inside AdminUIProvider."

    );

  }

  return context;

}