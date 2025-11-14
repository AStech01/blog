import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const uploadsBase =
  (import.meta.env.VITE_UPLOADS_BASE && String(import.meta.env.VITE_UPLOADS_BASE).replace(/\/$/, '')) ||
  (import.meta.env.VITE_API_BASE && String(import.meta.env.VITE_API_BASE).replace(/\/$/, '') + '/uploads') ||
  'http://localhost:5000/uploads';

const buildImgSrc = (cover) => {
  if (!cover) return '/default-image.png';
  const s = String(cover);
  if (s.startsWith('http')) return s;
  if (s.startsWith('/')) return `${uploadsBase}${s}`; // uploadsBase already has no trailing slash
  return `${uploadsBase}/${s}`;
};

export default function BlogCard({ blog, showActions, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl overflow-hidden transition transform hover:-translate-y-1">
      <Link to={`/blogs/${blog._id}`} className="no-underline">
        <img
          src={buildImgSrc(blog.coverImageUrl)}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />

        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
          <p className="text-gray-600 mb-3 line-clamp-3">{blog.description}</p>
          <p className="text-sm text-gray-400">By {blog.author?.name || "Anonymous"}</p>
        </div>
      </Link>

      {/* Show Edit/Delete buttons only if current user owns this blog */}
      {showActions && (
        <div className="flex gap-2 p-5 pt-0">
          <Link
            to={`/edit-blog/${blog._id}`}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(blog._id)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
