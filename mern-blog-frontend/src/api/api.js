


// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // make sure this matches your backend
// });

// // Add token to every request if available
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// export default API;


// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;


import axios from "axios";

// Use environment variable for backend URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // <-- use VITE_API_URL from .env
});

// Attach token to headers automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
