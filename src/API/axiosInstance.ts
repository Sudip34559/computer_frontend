import axios from "axios";
import { baseUrl } from "@/utils/config";

const api = axios.create({
  baseURL: baseUrl || "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Optional: Attach token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized
    if (error.response?.status === 401) {
      console.error("Unauthorized. Logging out...");
    }
    return Promise.reject(error);
  }
);

export default api;
