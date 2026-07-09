import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {

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
     NOT AN ADMIN
  ========================================== */

  if (

    !member ||

    ![

      "admin",

      "super_admin",

    ].includes(member.role)

  ) {

    return (

      <Navigate

        to="/dashboard"

        replace

      />

    );

  }

  /* ==========================================
     AUTHORIZED
  ========================================== */

  return children;

}

export default AdminRoute;