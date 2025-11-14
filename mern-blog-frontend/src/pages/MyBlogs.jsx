import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import BlogCard from "../components/BlogCard";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function MyBlogs() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Fetching /blogs/myblogs, token present:", !!token);
        const res = await API.get("/blogs/myblogs", {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        console.log("MyBlogs response:", res.data);
        setBlogs(res.data);
      } catch (err) {
        console.error(
          "Failed to load my blogs:",
          err.response?.status,
          err.response?.data || err.message
        );
        if (err.response?.status === 401) navigate("/login");
      }
    };
    fetchMyBlogs();
   
  }, [user, navigate, location.state?.refresh, location.pathname]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">My Blogs</h1>
      {blogs.length === 0 ? (
        <p className="text-gray-600">You haven't written any blogs yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((b) => (
            <BlogCard key={b._id} blog={b} />
          ))}
        </div>
      )}
    </div>
  );
}
