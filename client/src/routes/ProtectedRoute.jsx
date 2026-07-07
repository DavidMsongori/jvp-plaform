import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {

  const {

    loading,

    isAuthenticated,

  } = useAuth();

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

  if (!isAuthenticated) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  return children;

}

export default ProtectedRoute;