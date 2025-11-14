

// import React, { createContext, useState, useEffect } from "react";
// import API from "../api/api";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);


//   const login = async (email, password) => {
//     const res = await API.post("/auth/login", { email, password });
//     localStorage.setItem("token", res.data.token);
//     setUser(res.data.user);
//   };


//   const register = async (name, email, password) => {
//     await API.post("/auth/register", { name, email, password });
//   };


//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   // Load user on refresh
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       (async () => {
//         try {
//           const res = await API.get("/auth/me");
//           setUser(res.data);
//         } catch (err) {
//           console.error("Auth check failed:", err.response?.data || err.message);
//           localStorage.removeItem("token");
//         } finally {
//           setLoading(false);
//         }
//       })();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useState, useEffect } from "react";
import API from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const register = async (name, email, password) => {
    await API.post("/auth/register", { name, email, password });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Check token on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Auth check failed:", err.response?.data || err.message);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
