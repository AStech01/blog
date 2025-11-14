// import axios from "axios";

// const rawBase =
//   (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE) ||
//   (typeof process !== "undefined" && process.env.VITE_API_BASE) ||
//   "http://localhost:5000";

// const baseURL = rawBase.replace(/\/$/, "") + "/api";

// const API = axios.create({
//   baseURL,

// });


// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
//   return config;
// });
// // API.interceptors.request.use((config) => {
// //   const token = localStorage.getItem("token");
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // });

// export default API;


// import axios from "axios";

// // Base URL — from Vite or fallback to your live backend
// const base =
//   import.meta.env?.VITE_API_BASE ||
//   "https://blog-3pxf.onrender.com"; // Render backend default

// const baseURL = base.replace(/\/$/, "") + "/api";

// const API = axios.create({
//   baseURL,
// });

// // Add Authorization token automatically
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;


// import axios from "axios";

// const rawBase =
//   import.meta.env.VITE_API_BASE ||
//   "https://blog-3pxf.onrender.com";

// const baseURL = rawBase.replace(/\/$/, "") + "/api";

// const API = axios.create({
//   baseURL,
// });

// // Inject token
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;


import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-3pxf.onrender.com/api",
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
