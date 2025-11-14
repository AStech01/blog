

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error loading blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Blog deleted!");
      navigate("/myblogs");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!blog) return <div className="p-8 text-center text-red-600">Not found</div>;

 
  const canEdit = !!user;


  const imgSrc =
    blog?.coverImageUrl
      ? String(blog.coverImageUrl).startsWith("http")
        ? blog.coverImageUrl
        : `http://localhost:5000${blog.coverImageUrl}`
      : null;

  return (
    <div className="max-w-3xl mx-auto p-8">
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
      ) : (
        <div className="w-full h-96 bg-gray-100 rounded-lg mb-6 flex items-center justify-center text-gray-400">
          No image
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

      <div className="text-gray-600 mb-6 text-sm">
        <p>By <strong>{blog.author?.name || "Unknown"}</strong></p>
        <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
        {blog.category && <p className="text-blue-600 font-medium">{blog.category}</p>}
      </div>

      <div className="text-gray-700 leading-relaxed mb-8 text-lg">
        {blog.description}
      </div>

    
      {canEdit && (
        <div className="flex gap-3 border-t pt-6 mb-6">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium transition"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 font-medium transition"
          >
            🗑️ Delete
          </button>
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline"
      >
        ← Back
      </button>
    </div>
  );
}
