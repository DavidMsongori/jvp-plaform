import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

/* ==========================================================
   PROTECTED ROUTE
========================================================== */

function ProtectedRoute({ children }) {

  const {

    loading,

    isAuthenticated,

    isAdmin,

    needsPayment,

    membershipExpired,

    membershipInactive,

  } = useAuth();

  const location = useLocation();

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
     ADMINS BYPASS MEMBER CHECKS
  ========================================== */

  if (isAdmin) {

    return children;

  }

  /* ==========================================
     PAYMENT REQUIRED
  ========================================== */

  if (

    needsPayment &&

    location.pathname !== "/payment"

  ) {

    return (

      <Navigate

        to="/payment"

        replace

      />

    );

  }

  /* ==========================================
     MEMBERSHIP EXPIRED
  ========================================== */

  if (

    membershipExpired &&

    location.pathname !== "/membership/renew"

  ) {

    return (

      <Navigate

        to="/membership/renew"

        replace

      />

    );

  }

  /* ==========================================
     MEMBERSHIP INACTIVE
  ========================================== */

  if (

    membershipInactive &&

    location.pathname !== "/membership/inactive"

  ) {

    return (

      <Navigate

        to="/membership/inactive"

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