
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import BlogCard from "../components/BlogCard";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleCreate = () => {
    if (user) {
      navigate("/create");
    } else {
      navigate("/login");
    }
  };

  const handleExplore = () => {
    if (user) {
      navigate("/myblogs");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 px-6">
      
      
      <section className="flex flex-col justify-center items-center text-center py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-6 drop-shadow-lg">
           Welcome to MyBlog
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mb-8">
          Discover amazing blogs, share your ideas, and connect with fellow writers.  
          Create your own posts or explore trending topics from our community.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Create Blog
          </button>
          <button
            onClick={handleExplore}
            className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Explore Blogs
          </button>
        </div>
      </section>

 
      <section className="p-8">
        <h2 className="text-4xl font-bold mb-8 text-blue-600">📰 Latest Blogs</h2>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : blogs.length === 0 ? (
          <p className="text-gray-600">
            No blogs yet.{" "}
            <span
              onClick={handleCreate}
              className="text-blue-600 underline cursor-pointer"
            >
              Create one!
            </span>
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
