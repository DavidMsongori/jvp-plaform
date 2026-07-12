import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import * as authService from "../services/auth.service";

import {
  hasPermission as checkPermission,
} from "../utils/permissions";

const AuthContext = createContext();

/* ==========================================================
   AUTH PROVIDER
========================================================== */

export function AuthProvider({ children }) {

  const [token, setToken] = useState(null);

  const [user, setUser] = useState(null);

  const [member, setMember] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ==========================================
     INITIALIZE AUTH
  ========================================== */

  useEffect(() => {

    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedMember = localStorage.getItem("member");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {

      try {

        setUser(JSON.parse(storedUser));

      } catch {

        localStorage.removeItem("user");

      }

    }

    if (storedMember) {

      try {

        setMember(JSON.parse(storedMember));

      } catch {

        localStorage.removeItem("member");

      }

    }

    setLoading(false);

  }, []);

  /* ==========================================
     LOGIN
  ========================================== */

  const login = async (credentials) => {

    const response =
      await authService.login(credentials);

    const data = response.data;

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    localStorage.setItem(
      "member",
      JSON.stringify(data.member)
    );

    setToken(data.token);
    setUser(data.user);
    setMember(data.member);

    return data;

  };

  /* ==========================================
     LOGOUT
  ========================================== */

  const logout = async () => {

    try {

      await authService.logout();

    } catch {

      // Ignore logout API errors

    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("member");

    setToken(null);
    setUser(null);
    setMember(null);

  };

  /* ==========================================
     REFRESH MEMBER
  ========================================== */

  const refreshMember = async () => {

    try {

      const response =
        await authService.getCurrentMember();

      const data = response.data;

      if (data.user) {

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setUser(data.user);

      }

      if (data.member) {

        localStorage.setItem(
          "member",
          JSON.stringify(data.member)
        );

        setMember(data.member);

      }

    } catch (error) {

      console.error(error);

    }

  };

  /* ==========================================
     UPDATE USER
  ========================================== */

  const updateUser = (userData) => {

    const updatedUser = {

      ...user,

      ...userData,

    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

  };

  /* ==========================================
     UPDATE MEMBER
  ========================================== */

  const updateMember = (memberData) => {

    const updatedMember = {

      ...member,

      ...memberData,

    };

    localStorage.setItem(
      "member",
      JSON.stringify(updatedMember)
    );

    setMember(updatedMember);

  };

  /* ==========================================
     PERMISSIONS
  ========================================== */

  const hasPermission = (permission) => {

    if (!user?.role) {

      return false;

    }

    return checkPermission(

      user.role,

      permission

    );

  };

  /* ==========================================
     AUTH STATE
  ========================================== */

  const role =
    user?.role ?? "member";

  const isAuthenticated =
    Boolean(token) &&
    Boolean(user);

  const isAdmin =
    role !== "member";

  /* ==========================================
     MEMBERSHIP STATE
  ========================================== */

  const membershipStatus =
    member?.membershipStatus ||
    "inactive";

  const membershipType =
    member?.membershipType ||
    "ordinary";

  const membershipNumber =
    member?.memberNumber || "";

  const membershipActive =
    membershipStatus === "active";

  const needsPayment =
    membershipStatus === "pending_payment";

  const membershipExpired =
    membershipStatus === "expired";

  const membershipInactive =
    membershipStatus === "inactive";

  const membershipFeePaid =
    member?.membershipFeePaid ?? false;

  /* ==========================================
     PROVIDER
  ========================================== */

  return (

    <AuthContext.Provider

      value={{

        /* Authentication */

        token,
        user,
        member,

        loading,

        role,

        isAuthenticated,
        isAdmin,

        /* Membership */

        membershipStatus,
        membershipType,
        membershipNumber,

        membershipFeePaid,

        membershipActive,
        membershipInactive,
        membershipExpired,
        needsPayment,

        /* Permissions */

        hasPermission,

        /* Actions */

        login,
        logout,

        refreshMember,

        updateUser,
        updateMember,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

}

/* ==========================================================
   USE AUTH
========================================================== */

export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(

      "useAuth must be used inside an AuthProvider."

    );

  }

  return context;

}

export default AuthContext;