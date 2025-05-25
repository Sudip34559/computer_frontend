import axios from "axios";
import { baseUrl } from "@/utils/config";
import { refreshAccessTokenAPI } from "./services/authService";

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
    if (error.response?.status === 410) {
      console.error("Unauthorized. Logging out...");
      refreshAccessTokenAPI().then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("token");
          localStorage.setItem("token", res.data.data.accessToken);
        }
      });
    }
    return Promise.reject(error);
  }
);

export default api;
