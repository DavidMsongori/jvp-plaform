import api from "./api";

/* ==========================================
   ADMIN DASHBOARD
========================================== */

export const getDashboard = async () => {

  const response = await api.get("/admin/dashboard");

  return response.data;

};

/* ==========================================
   MEMBERS
========================================== */

export const getMembers = async (params = {}) => {

  const response = await api.get(

    "/admin/members",

    {

      params,

    }

  );

  return response.data;

};

export const getMember = async (id) => {

  const response = await api.get(

    `/admin/members/${id}`

  );

  return response.data;

};

export const updateMember = async (

  id,

  memberData

) => {

  const response = await api.put(

    `/admin/members/${id}`,

    memberData

  );

  return response.data;

};

export const deleteMember = async (id) => {

  const response = await api.delete(

    `/admin/members/${id}`

  );

  return response.data;

};

/* ==========================================
   MEMBER APPLICATIONS
========================================== */

export const getApplications = async () => {

  const response = await api.get(

    "/admin/applications"

  );

  return response.data;

};

export const approveApplication = async (id) => {

  const response = await api.patch(

    `/admin/applications/${id}/approve`

  );

  return response.data;

};

export const rejectApplication = async (id) => {

  const response = await api.patch(

    `/admin/applications/${id}/reject`

  );

  return response.data;

};

/* ==========================================
   EVENTS
========================================== */

export const getEvents = async () => {

  const response = await api.get(

    "/admin/events"

  );

  return response.data;

};

export const createEvent = async (eventData) => {

  const response = await api.post(

    "/admin/events",

    eventData

  );

  return response.data;

};

export const updateEvent = async (

  id,

  eventData

) => {

  const response = await api.put(

    `/admin/events/${id}`,

    eventData

  );

  return response.data;

};

export const deleteEvent = async (id) => {

  const response = await api.delete(

    `/admin/events/${id}`

  );

  return response.data;

};

/* ==========================================
   PROGRAMS
========================================== */

export const getPrograms = async () => {

  const response = await api.get(

    "/admin/programs"

  );

  return response.data;

};

export const createProgram = async (programData) => {

  const response = await api.post(

    "/admin/programs",

    programData

  );

  return response.data;

};

export const updateProgram = async (

  id,

  programData

) => {

  const response = await api.put(

    `/admin/programs/${id}`,

    programData

  );

  return response.data;

};

export const deleteProgram = async (id) => {

  const response = await api.delete(

    `/admin/programs/${id}`

  );

  return response.data;

};

/* ==========================================
   REPORTS
========================================== */

export const getReports = async () => {

  const response = await api.get(

    "/admin/reports"

  );

  return response.data;

};

/* ==========================================
   NOTIFICATIONS
========================================== */

export const getNotifications = async () => {

  const response = await api.get(

    "/admin/notifications"

  );

  return response.data;

};

export const sendNotification = async (

  notificationData

) => {

  const response = await api.post(

    "/admin/notifications",

    notificationData

  );

  return response.data;

};

/* ==========================================
   NEWS
========================================== */

export const getNews = async () => {

  const response = await api.get(

    "/admin/news"

  );

  return response.data;

};

export const publishNews = async (

  newsData

) => {

  const response = await api.post(

    "/admin/news",

    newsData

  );

  return response.data;

};

/* ==========================================
   SETTINGS
========================================== */

export const getSettings = async () => {

  const response = await api.get(

    "/admin/settings"

  );

  return response.data;

};

export const updateSettings = async (

  settings

) => {

  const response = await api.put(

    "/admin/settings",

    settings

  );

  return response.data;

};