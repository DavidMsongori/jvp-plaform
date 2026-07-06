import api from "./api";

/* ==========================================
   ACTIVATE MEMBERSHIP
========================================== */

export const activateMembership = async (payload) => {
  const { data } = await api.post("/auth/activate", payload);
  return data;
};

/* ==========================================
   VERIFY OTP
========================================== */

export const verifyOTP = async (payload) => {
  const { data } = await api.post("/auth/verify-otp", payload);
  return data;
};

/* ==========================================
   RESEND OTP
========================================== */

export const resendOTP = async (payload) => {
  const { data } = await api.post("/auth/resend-otp", payload);
  return data;
};

/* ==========================================
   CREATE PASSWORD
========================================== */

export const createPassword = async (payload) => {
  const { data } = await api.post("/auth/create-password", payload);

  if (data?.data?.token) {
    localStorage.setItem("token", data.data.token);
  }

  if (data?.data?.member) {
    localStorage.setItem(
      "member",
      JSON.stringify(data.data.member)
    );
  }

  return data;
};

/* ==========================================
   LOGIN
========================================== */

export const login = async (payload) => {
  const { data } = await api.post("/auth/login", payload);

  if (data?.data?.token) {
    localStorage.setItem("token", data.data.token);
  }

  if (data?.data?.member) {
    localStorage.setItem(
      "member",
      JSON.stringify(data.data.member)
    );
  }

  return data;
};

/* ==========================================
   CURRENT MEMBER
========================================== */

export const getCurrentMember = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

/* ==========================================
   FORGOT PASSWORD
========================================== */

export const forgotPassword = async (payload) => {
  const { data } = await api.post("/auth/forgot-password", payload);
  return data;
};

/* ==========================================
   RESET PASSWORD
========================================== */

export const resetPassword = async (payload) => {
  const { data } = await api.post("/auth/reset-password", payload);
  return data;
};

/* ==========================================
   LOGOUT
========================================== */

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("member");
};

/* ==========================================
   HELPERS
========================================== */

export const isAuthenticated = () => {
  return Boolean(localStorage.getItem("token"));
};

export const getStoredMember = () => {
  try {
    return JSON.parse(localStorage.getItem("member"));
  } catch {
    return null;
  }
};

export default {
  activateMembership,
  verifyOTP,
  resendOTP,
  createPassword,
  login,
  getCurrentMember,
  forgotPassword,
  resetPassword,
  logout,
  isAuthenticated,
  getStoredMember,
};