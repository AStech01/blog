// import React from "react";
// import { useEffect, useState, useContext } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import gsap from "gsap";
// import API from "../api/api";
// import { AuthContext } from "../context/AuthContext";

// export default function BlogDetail() {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await API.get(`/blogs/${id}`);
//         setBlog(res.data);
//       } catch (err) {
//         console.error("Error fetching blog:", err);
//       }
//     };
//     fetchBlog();

//     gsap.from(".blog-title", { opacity: 0, y: -20, duration: 0.8 });
//   }, [id]);

//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete this blog?")) {
//       try {
//         await API.delete(`/blogs/${id}`);
//         alert("Blog deleted successfully");
//         navigate("/");
//       } catch (err) {
//         alert("Failed to delete blog");
//       }
//     }
//   };

//   if (!blog) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {blog.coverImageUrl && (
//         <motion.img
//           src={blog.coverImageUrl}
//           alt={blog.title}
//           className="w-full h-80 object-cover rounded-lg mb-6 shadow"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         />
//       )}

//       <h1 className="blog-title text-4xl font-bold mb-3 text-blue-600">
//         {blog.title}
//       </h1>
//       <p className="text-gray-500 mb-1">
//         Category: <span className="font-medium">{blog.category}</span>
//       </p>
//       <p className="text-gray-400 mb-5">
//         Author: {blog.author?.name || "Anonymous"} •{" "}
//         {new Date(blog.createdAt).toLocaleDateString()}
//       </p>

//       <motion.p
//         className="text-gray-800 leading-relaxed bg-white p-6 rounded-lg shadow"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.3 }}
//       >
//         {blog.description}
//       </motion.p>

//       {user && (
//         <div className="flex justify-end mt-6 space-x-3">
//           <Link
//             to={`/edit/${blog._id}`}
//             className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//           >
//             Edit
//           </Link>
//           <button
//             onClick={handleDelete}
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


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

  // Simple check: if user is logged in AND blog exists, allow edit/delete
  // (Backend will validate ownership on PUT/DELETE)
  const canEdit = !!user;

  // determine img src (handle full URL or relative path from backend)
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

      {/* Edit & Delete buttons */}
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
