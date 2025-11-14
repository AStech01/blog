


import React, { useEffect, useState } from "react";
import API from "../api/api";
import BlogCard from "../components/BlogCard";
import gsap from "gsap";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();

    gsap.from(".title", { opacity: 0, y: -30, duration: 1, ease: "power3.out" });
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="title text-4xl font-extrabold mb-10 text-center text-blue-600 tracking-wide">
        ✨ Latest Blogs
      </h1>

     
      {loading && <p className="text-center text-gray-500 text-lg">Loading blogs...</p>}

   
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}


      {!loading && blogs.length === 0 && !error && (
        <p className="text-center text-gray-500 text-lg">No blogs found yet.</p>
      )}

   
      {!loading && blogs.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((b, i) => (
            <div key={b._id} className="opacity-0" id={`card-${i}`}>
              <BlogCard blog={b} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
