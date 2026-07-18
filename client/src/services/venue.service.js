import api from "./api";

const BASE_URL = "/venues";

const venueService = {
  /* =====================================================
     GET ALL VENUES
  ===================================================== */

  async getAllVenues(params = {}) {
    const response = await api.get(BASE_URL, {
      params,
    });

    return response.data;
  },

  /* =====================================================
     GET VENUE BY ID
  ===================================================== */

  async getVenueById(id) {
    const response = await api.get(
      `${BASE_URL}/${id}`
    );

    return response.data;
  },

  /* =====================================================
     CREATE VENUE
  ===================================================== */

  async createVenue(data) {
    const response = await api.post(
      BASE_URL,
      data
    );

    return response.data;
  },

  /* =====================================================
     UPDATE VENUE
  ===================================================== */

  async updateVenue(id, data) {
    const response = await api.put(
      `${BASE_URL}/${id}`,
      data
    );

    return response.data;
  },

  /* =====================================================
     DELETE VENUE
  ===================================================== */

  async deleteVenue(id) {
    const response = await api.delete(
      `${BASE_URL}/${id}`
    );

    return response.data;
  },

  /* =====================================================
     SEARCH VENUES
  ===================================================== */

  async searchVenues(search) {
    const response = await api.get(BASE_URL, {
      params: {
        search,
      },
    });

    return response.data;
  },

  /* =====================================================
     GET ACTIVE VENUES
  ===================================================== */

  async getActiveVenues() {
    const response = await api.get(BASE_URL, {
      params: {
        active: true,
      },
    });

    return response.data;
  },
};

export default venueService;