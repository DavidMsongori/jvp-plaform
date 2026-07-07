import api from "./api";

/* ==========================================
   ACTIVATE MEMBERSHIP
========================================== */

export const activateMembership = async (payload) => {

  const response = await api.post(
    "/auth/activate",
    payload
  );

  return response.data;

};

/* ==========================================
   VERIFY OTP
========================================== */

export const verifyOTP = async (payload) => {

  const response = await api.post(
    "/auth/verify-otp",
    payload
  );

  return response.data;

};

/* ==========================================
   CREATE PASSWORD
========================================== */

export const createPassword = async (payload) => {

  const response = await api.post(
    "/auth/create-password",
    payload
  );

  return response.data;

};

/* ==========================================
   LOGIN
========================================== */

export const login = async (payload) => {

  const response = await api.post(
    "/auth/login",
    payload
  );

  return response.data;

};

/* ==========================================
   CURRENT MEMBER
========================================== */

export const getCurrentMember = async () => {

  const response = await api.get(
    "/auth/me"
  );

  return response.data;

};

/* ==========================================
   FORGOT PASSWORD
========================================== */

export const forgotPassword = async (payload) => {

  const response = await api.post(
    "/auth/forgot-password",
    payload
  );

  return response.data;

};

/* ==========================================
   RESET PASSWORD
========================================== */

export const resetPassword = async (payload) => {

  const response = await api.post(
    "/auth/reset-password",
    payload
  );

  return response.data;

};

/* ==========================================
   RESEND OTP
========================================== */

export const resendOTP = async (payload) => {

  const response = await api.post(
    "/auth/resend-otp",
    payload
  );

  return response.data;

};

export default {

  activateMembership,

  verifyOTP,

  createPassword,

  login,

  getCurrentMember,

  forgotPassword,

  resetPassword,

  resendOTP,

};