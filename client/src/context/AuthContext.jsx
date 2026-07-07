import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import * as authService from "../services/auth.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [member, setMember] = useState(null);

  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ==========================================
     INITIALIZE AUTH
  ========================================== */

  useEffect(() => {

    const storedToken =
      localStorage.getItem("token");

    const storedMember =
      localStorage.getItem("member");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedMember) {

      try {

        setMember(
          JSON.parse(storedMember)
        );

      } catch (error) {

        console.error(
          "Invalid stored member:",
          error
        );

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

    const jwt =
      response.data.token;

    const memberData =
      response.data.member;

    localStorage.setItem(
      "token",
      jwt
    );

    localStorage.setItem(
      "member",
      JSON.stringify(memberData)
    );

    setToken(jwt);

    setMember(memberData);

    return response;

  };

  /* ==========================================
     LOGOUT
  ========================================== */

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("member");

    setToken(null);

    setMember(null);

  };

  /* ==========================================
     REFRESH CURRENT MEMBER
  ========================================== */

  const refreshMember = async () => {

    try {

      const response =
        await authService.getCurrentMember();

      const updatedMember =
        response.data;

      localStorage.setItem(
        "member",
        JSON.stringify(updatedMember)
      );

      setMember(updatedMember);

    } catch (error) {

      console.error(error);

    }

  };

  /* ==========================================
     UPDATE MEMBER
  ========================================== */

  const updateMember = (memberData) => {

    localStorage.setItem(
      "member",
      JSON.stringify(memberData)
    );

    setMember(memberData);

  };

  /* ==========================================
     AUTH STATE
  ========================================== */

  const isAuthenticated =
    !!token;

  return (

    <AuthContext.Provider
      value={{

        member,

        token,

        loading,

        isAuthenticated,

        login,

        logout,

        refreshMember,

        updateMember,

      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used within an AuthProvider."
    );

  }

  return context;

}