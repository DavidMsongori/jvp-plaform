import api from "./api";

/* ==========================================================
   GET ALL LEADERS
========================================================== */

export const getLeaders = async (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "all"
    ) {
      params.append(key, value);
    }
  });

  const query = params.toString();

  const response = await api.get(
    `/leaders${query ? `?${query}` : ""}`
  );

  return response.data;
};

/* ==========================================================
   GET SINGLE LEADER
========================================================== */

export const getLeader = async (id) => {
  const response = await api.get(`/leaders/${id}`);

  return response.data;
};

/* ==========================================================
   CREATE LEADER
========================================================== */

export const createLeader = async (leaderData) => {
  const response = await api.post(
    "/leaders",
    leaderData
  );

  return response.data;
};

/* ==========================================================
   UPDATE LEADER
========================================================== */

export const updateLeader = async (
  id,
  leaderData
) => {
  const response = await api.put(
    `/leaders/${id}`,
    leaderData
  );

  return response.data;
};

/* ==========================================================
   DELETE LEADER
========================================================== */

export const deleteLeader = async (id) => {
  const response = await api.delete(
    `/leaders/${id}`
  );

  return response.data;
};

/* ==========================================================
   EXPORT
========================================================== */

const leaderService = {
  getLeaders,
  getLeader,
  createLeader,
  updateLeader,
  deleteLeader,
};

export default leaderService;