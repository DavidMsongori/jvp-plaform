import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({

  children,

  allowedRoles = [],

}) {

  const {

    loading,

    isAuthenticated,

    member,

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

          fontSize: "1.2rem",

          color: "#1d3557",

          fontWeight: 600,

        }}

      >

        Loading...

      </div>

    );

  }

  /* ==========================================
     NOT AUTHENTICATED
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
     ROLE AUTHORIZATION
  ========================================== */

  if (

    allowedRoles.length > 0 &&

    !allowedRoles.includes(member?.role)

  ) {

    return (

      <Navigate

        to="/dashboard"

        replace

      />

    );

  }

  /* ==========================================
     ACCESS GRANTED
  ========================================== */

  return children;

}

export default ProtectedRoute;