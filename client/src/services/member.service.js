import api from "./api";

/* ==========================================
   MEMBER PROFILE
========================================== */

export const getMyProfile = async () => {
  const response = await api.get("/members/me");
  return response.data;
};

export const updateMyProfile = async (profileData) => {
  const response = await api.put(
    "/members/me",
    profileData
  );

  return response.data;
};

/* ==========================================
   PROFILE PHOTO
========================================== */

export const uploadProfilePhoto = async (formData) => {
  const response = await api.post(
    "/members/photo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

/* ==========================================
   DASHBOARD
========================================== */

export const getDashboard = async () => {
  const response = await api.get("/members/dashboard");
  return response.data;
};

/* ==========================================
   MEMBERSHIP CARD
========================================== */

export const getMembershipCard = async () => {
  const response = await api.get("/members/card");
  return response.data;
};

/* ==========================================
   EVENTS
========================================== */

export const getMyEvents = async () => {
  const response = await api.get("/members/events");
  return response.data;
};

/* ==========================================
   PROGRAMS
========================================== */

export const getMyPrograms = async () => {
  const response = await api.get("/members/programs");
  return response.data;
};

/* ==========================================
   CERTIFICATES
========================================== */

export const getMyCertificates = async () => {
  const response = await api.get("/members/certificates");
  return response.data;
};