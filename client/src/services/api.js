import axios from "axios";

console.log(
  "API URL:",
  import.meta.env.VITE_API_URL
);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {

    console.log("================================");
    console.log(config.method?.toUpperCase(), config.baseURL + config.url);
    console.log("Payload:", config.data);
    console.log("================================");

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {

    console.log("Response:", response.data);

    return response;
  },
  (error) => {

    console.log("API Error:", error.response?.data);

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("member");
    }

    return Promise.reject(error);
  }
);

export default api;