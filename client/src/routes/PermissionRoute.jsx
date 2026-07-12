import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

/* ==========================================================
   PERMISSION ROUTE
========================================================== */

function PermissionRoute({

  children,

  permission,

  redirectTo = "/dashboard",

}) {

  const {

    loading,

    isAuthenticated,

    hasPermission,

  } = useAuth();

  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {

    return (

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#1d3557",
        }}
      >

        Loading...

      </div>

    );

  }

  /* ==========================================
     NOT LOGGED IN
  ========================================== */

  if (!isAuthenticated) {

    return (

      <Navigate

        to="/login"

        replace

      />

    );

  }

  /* ==========================================
     PERMISSION CHECK
  ========================================== */

  if (

    permission &&

    !hasPermission(permission)

  ) {

    return (

      <Navigate

        to={redirectTo}

        replace

      />

    );

  }

  /* ==========================================
     AUTHORIZED
  ========================================== */

  return children;

}

export default PermissionRoute;