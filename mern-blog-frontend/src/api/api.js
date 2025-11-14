import axios from "axios";

const API = axios.create({
  // Prefer env var in production; fallback to local server + /api prefix
  baseURL:
    (typeof process !== "undefined" &&
      process.env.REACT_APP_API_BASE &&
      process.env.REACT_APP_API_BASE.replace(/\/$/, "")) ||
    "http://localhost:5000/api",
  // include credentials if you rely on cookies (optional)
  // withCredentials: true,
});

export default API;
