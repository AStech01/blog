// import React from 'react'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Navbar from "./components/Navbar";
// import Blogs from "./pages/Blogs";
// import CreateBlog from "./pages/CreateBlog";
// import BlogDetail from "./pages/BlogDetail";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import EditBlog from "./pages/EditBlog";

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Blogs />} />
//           <Route path="/blogs/:id" element={<BlogDetail />} />
//           <Route path="/create" element={<CreateBlog />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/edit/:id" element={<EditBlog />} />
//           {/* If you use /blogs/edit/:id instead, add that too: */}
//           {/* <Route path="/blogs/edit/:id" element={<EditBlog />} /> */}
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }




import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import MyBlogs from "./pages/MyBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetail from "./pages/BlogDetail";
import EditBlog from "./pages/EditBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";

// ProtectedRoute component for routes that require login
function ProtectedRoute({ children }) {
  const { user } = React.useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/myblogs"
            element={
              <ProtectedRoute>
                <MyBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditBlog />
              </ProtectedRoute>
            }
          />
          <Route path="/blogs/:id" element={<BlogDetail />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Navbar from "./components/Navbar";
// import Blogs from "./pages/Blogs";
// import CreateBlog from "./pages/CreateBlog";
// import BlogDetail from "./pages/BlogDetail";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import EditBlog from "./pages/EditBlog";
// import Home from "./pages/Home";

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home/>} />
//           <Route path="/blogs" element={<Blogs />} />
//           <Route path="/blogs/:id" element={<BlogDetail />} />
//           <Route path="/create" element={<CreateBlog />} />
//           <Route path="/edit/:id" element={<EditBlog />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }
