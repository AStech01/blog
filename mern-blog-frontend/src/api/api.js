import axios from "axios";

const rawBase =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE) ||
  (typeof process !== "undefined" && process.env.VITE_API_BASE) ||
  "http://localhost:5000";

const baseURL = rawBase.replace(/\/$/, "") + "/api";

const API = axios.create({
  baseURL,
  // withCredentials: true, // enable if you use cookie auth
});

// Attach JWT automatically if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  return config;
});

export default API;
