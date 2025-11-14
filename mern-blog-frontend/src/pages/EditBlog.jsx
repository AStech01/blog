// // import React from 'react'
// // import { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import gsap from "gsap";
// // import API from "../api/api";

// // export default function EditBlog() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [form, setForm] = useState({
// //     title: "",
// //     description: "",
// //     category: "",
// //     coverImageUrl: "",
// //   });
// //   const [imageFile, setImageFile] = useState(null);
// //   const [preview, setPreview] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     const fetchBlog = async () => {
// //       try {
// //         const res = await API.get(`/blogs/${id}`);
// //         setForm({
// //           title: res.data.title || "",
// //           description: res.data.description || "",
// //           category: res.data.category || "",
// //           coverImageUrl: res.data.coverImageUrl || "",
// //         });
// //         // set preview to existing image url returned by backend (if any)
// //         if (res.data.coverImageUrl) setPreview(res.data.coverImageUrl);
// //       } catch (err) {
// //         console.error("Error loading blog:", err);
// //       }
// //     };
// //     fetchBlog();

// //     gsap.from(".edit-title", { opacity: 0, y: -20, duration: 0.8 });
// //   }, [id]);

// //   useEffect(() => {
// //     if (!imageFile) return;
// //     const objectUrl = URL.createObjectURL(imageFile);
// //     setPreview(objectUrl);
// //     return () => URL.revokeObjectURL(objectUrl);
// //   }, [imageFile]);

// //   const handleImageChange = (e) => {
// //     const file = e.target.files && e.target.files[0];
// //     if (file) setImageFile(file);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       const token = localStorage.getItem("token");

// //       // If user selected a new file, send FormData so file is uploaded
// //       if (imageFile) {
// //         const formData = new FormData();
// //         formData.append("title", form.title);
// //         formData.append("description", form.description);
// //         formData.append("category", form.category);
// //         formData.append("coverImage", imageFile); // backend should expect this field name
// //         // don't set Content-Type here; let the browser set multipart boundary
// //         await API.put(`/blogs/${id}`, formData, {
// //           headers: { Authorization: token ? `Bearer ${token}` : "" },
// //         });
// //       } else {
// //         // No new file: send JSON with coverImageUrl (keeps existing or new URL)
// //         await API.put(`/blogs/${id}`, form, {
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: token ? `Bearer ${token}` : "",
// //           },
// //         });
// //       }

// //       alert("Blog updated successfully");
// //       navigate(`/blogs/${id}`);
// //     } catch (err) {
// //       console.error("Update failed:", err.response?.data || err.message);
// //       alert(err.response?.data?.message || "Update failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async () => {
// //     if (!window.confirm("Are you sure you want to delete this blog?")) return;
// //     setLoading(true);
// //     try {
// //       const token = localStorage.getItem("token");
// //       await API.delete(`/blogs/${id}`, {
// //         headers: { Authorization: token ? `Bearer ${token}` : "" },
// //       });
// //       alert("Blog deleted");
// //       navigate("/blogs");
// //     } catch (err) {
// //       console.error("Delete failed:", err.response?.data || err.message);
// //       alert("Delete failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow">
// //       <motion.h1
// //         className="edit-title text-2xl font-bold mb-6 text-center text-blue-600"
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //       >
// //         Edit Blog
// //       </motion.h1>

// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <input
// //           type="text"
// //           placeholder="Blog Title"
// //           className="w-full border p-3 rounded"
// //           value={form.title}
// //           onChange={(e) => setForm({ ...form, title: e.target.value })}
// //           required
// //         />
// //         <textarea
// //           placeholder="Description"
// //           className="w-full border p-3 rounded h-40"
// //           value={form.description}
// //           onChange={(e) => setForm({ ...form, description: e.target.value })}
// //           required
// //         />
// //         <input
// //           type="text"
// //           placeholder="Category"
// //           className="w-full border p-3 rounded"
// //           value={form.category}
// //           onChange={(e) => setForm({ ...form, category: e.target.value })}
// //         />

// //         <label className="block">
// //           <span className="text-sm">Cover Image (URL or upload new)</span>
// //           <input
// //             type="text"
// //             placeholder="Cover Image URL"
// //             className="w-full border p-3 rounded mt-2"
// //             value={form.coverImageUrl}
// //             onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
// //           />
// //           <div className="mt-2">
// //             <span className="text-sm">Or upload new image (will replace existing)</span>
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={handleImageChange}
// //               className="mt-2"
// //             />
// //           </div>
// //         </label>

// //         {preview && (
// //           <div className="mt-2">
// //             <img src={preview} alt="preview" className="max-h-40 rounded" />
// //           </div>
// //         )}

// //         <div className="flex gap-2">
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
// //           >
// //             {loading ? "Updating..." : "Update Blog"}
// //           </button>

// //           <button
// //             type="button"
// //             onClick={handleDelete}
// //             disabled={loading}
// //             className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
// //           >
// //             {loading ? "..." : "Delete"}
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import gsap from "gsap";
// import API from "../api/api";

// export default function EditBlog() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     category: "",
//     coverImageUrl: "",
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // 🧠 Fetch existing blog on mount
//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await API.get(`/blogs/${id}`);
//         setForm({
//           title: res.data.title || "",
//           description: res.data.description || "",
//           category: res.data.category || "",
//           coverImageUrl: res.data.coverImageUrl || "",
//         });
//         if (res.data.coverImageUrl) setPreview(res.data.coverImageUrl);
//       } catch (err) {
//         console.error("Error loading blog:", err);
//         alert("Failed to load blog");
//       }
//     };
//     fetchBlog();
//     gsap.from(".edit-title", { opacity: 0, y: -20, duration: 0.8 });
//   }, [id]);

//   // 🖼️ Preview selected image
//   useEffect(() => {
//     if (!imageFile) return;
//     const objectUrl = URL.createObjectURL(imageFile);
//     setPreview(objectUrl);
//     return () => URL.revokeObjectURL(objectUrl);
//   }, [imageFile]);

//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setImageFile(file);
//   };

//   // ✏️ Update blog handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Please login to update this blog!");
//       navigate("/login");
//       return;
//     }

//     setLoading(true);
//     try {
//       if (imageFile) {
//         // Upload with new image
//         const formData = new FormData();
//         formData.append("title", form.title);
//         formData.append("description", form.description);
//         formData.append("category", form.category);
//         formData.append("coverImage", imageFile);

//         await API.put(`/blogs/${id}`, formData, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       } else {
//         // Update without new image
//         await API.put(`/blogs/${id}`, form, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//       }

//       alert("✅ Blog updated successfully!");
//       navigate(`/blogs/${id}`);
//     } catch (err) {
//       console.error("Update failed:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ❌ Delete blog
//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this blog?")) return;

//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Please login first!");
//       navigate("/login");
//       return;
//     }

//     setLoading(true);
//     try {
//       await API.delete(`/blogs/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("🗑️ Blog deleted successfully!");
//       navigate("/myblogs");
//     } catch (err) {
//       console.error("Delete failed:", err.response?.data || err.message);
//       alert("Failed to delete blog");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
//       <motion.h1
//         className="edit-title text-3xl font-bold mb-8 text-center text-blue-600"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         ✏️ Edit Blog
//       </motion.h1>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <input
//           type="text"
//           placeholder="Blog Title"
//           className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg outline-none"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           required
//         />

//         <textarea
//           placeholder="Blog Description..."
//           className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg h-40 outline-none"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Category (optional)"
//           className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg outline-none"
//           value={form.category}
//           onChange={(e) => setForm({ ...form, category: e.target.value })}
//         />

//         <div>
//           <label className="block text-sm font-medium text-gray-600">
//             Cover Image (URL or Upload New)
//           </label>
//           <input
//             type="text"
//             placeholder="Cover Image URL"
//             className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg mt-2 outline-none"
//             value={form.coverImageUrl}
//             onChange={(e) =>
//               setForm({ ...form, coverImageUrl: e.target.value })
//             }
//           />

//           <div className="mt-3">
//             <span className="text-sm text-gray-600">
//               Or upload new image (replaces current)
//             </span>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="mt-2 block w-full text-sm text-gray-700"
//             />
//           </div>
//         </div>

//         {preview && (
//           <div className="mt-3">
//             <img
//               src={
//                 preview.startsWith('http')
//                   ? preview
//                   : `http://localhost:5000${preview}`
//               }
//               alt="Preview"
//               className="rounded-lg max-h-52 w-full object-cover shadow-md"
//             />
//           </div>
//         )}

//         <div className="flex gap-3 mt-5">
//           <button
//             type="submit"
//             disabled={loading}
//             className={`flex-1 py-3 rounded-lg text-white font-semibold transition ${
//               loading
//                 ? "bg-blue-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading ? "Updating..." : "Update Blog"}
//           </button>

//           <button
//             type="button"
//             onClick={handleDelete}
//             disabled={loading}
//             className={`px-5 py-3 rounded-lg text-white font-semibold transition ${
//               loading
//                 ? "bg-red-400 cursor-not-allowed"
//                 : "bg-red-600 hover:bg-red-700"
//             }`}
//           >
//             Delete
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/api";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    coverImageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch blog details
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          category: res.data.category || "",
          coverImageUrl: res.data.coverImageUrl || "",
        });

        if (res.data.coverImageUrl) {
          setPreview(res.data.coverImageUrl.startsWith("http")
            ? res.data.coverImageUrl
            : `http://localhost:5000${res.data.coverImageUrl}`);
        }
      } catch (err) {
        console.error("Error loading blog:", err);
        alert("Failed to load blog");
        navigate("/myblogs");
      }
    };
    fetchBlog();
  }, [id, navigate]);

  // Preview uploaded image
  useEffect(() => {
    if (!imageFile) return;
    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  // Update blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login first!");

      if (imageFile) {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("category", form.category);
        formData.append("coverImage", imageFile);

        await API.put(`/blogs/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await API.put(`/blogs/${id}`, form, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      alert("✅ Blog updated successfully!");
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Delete blog
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Blog deleted successfully!");
      navigate("/myblogs");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to delete blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <motion.h1
        className="text-3xl font-bold mb-8 text-center text-blue-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        ✏️ Edit Blog
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full border p-3 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Blog Description..."
          className="w-full border p-3 rounded-lg h-40 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category (optional)"
          className="w-full border p-3 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Cover Image (URL or Upload New)
          </label>
          <input
            type="text"
            placeholder="Cover Image URL"
            className="w-full border p-3 rounded-lg mt-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            value={form.coverImageUrl}
            onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
          />

          <div className="mt-3">
            <span className="text-sm text-gray-600">
              Or upload new image (replaces current)
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 block w-full text-sm text-gray-700"
            />
          </div>
        </div>

        {preview && (
          <div className="mt-3">
            <img
              src={preview.startsWith("http") ? preview : `http://localhost:5000${preview}`}
              alt="Preview"
              className="rounded-lg max-h-52 w-full object-cover shadow-md"
            />
          </div>
        )}

        <div className="flex gap-3 mt-5">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-3 rounded-lg text-white font-semibold transition ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className={`px-5 py-3 rounded-lg text-white font-semibold transition ${
              loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
