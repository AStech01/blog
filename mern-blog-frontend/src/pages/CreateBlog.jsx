// import React, { useState, useEffect } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";

// export default function CreateBlog() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!image) {
//       setPreview(null);
//       return;
//     }
//     const objectUrl = URL.createObjectURL(image);
//     setPreview(objectUrl);
//     return () => URL.revokeObjectURL(objectUrl);
//   }, [image]);

//   const handleImageChange = (e) => {
//     const file = e.target.files && e.target.files[0];
//     if (file) setImage(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("description", description);
//       formData.append("category", category);
//       if (image) formData.append("coverImage", image);

//       // Get token from localStorage (set after login)
//       const token = localStorage.getItem("token");

//       await API.post("/blogs", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//       });

//       alert("✅ Blog created successfully!");
//       navigate("/blogs");
//     } catch (err) {
//       console.error("❌ Upload failed:", err.response?.data || err.message);
//       alert(
//         err.response?.data?.errors?.[0]?.msg ||
//           err.response?.data?.message ||
//           "Something went wrong"
//       );
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow">
//       <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
//         Create New Blog
//       </h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Blog Title"
//           className="w-full border p-3 rounded"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />

//         <textarea
//           placeholder="Description"
//           className="w-full border p-3 rounded h-40"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Category"
//           className="w-full border p-3 rounded"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         />

//         <label className="block">
//           <span className="text-sm">Cover Image (optional)</span>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="mt-2"
//           />
//         </label>

//         {preview && (
//           <div className="mt-2">
//             <img src={preview} alt="preview" className="max-h-40 rounded" />
//           </div>
//         )}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Publish
//         </button>
//       </form>
//     </div>
// }



import React, { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔒 Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to create a blog!");
      navigate("/login");
    }
  }, [navigate]);

  // 🖼️ Generate image preview
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    if (!title.trim() || !description.trim()) {
      alert("Title and Description are required!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      if (image) formData.append("coverImage", image);

      const res = await API.post("/blogs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // notify user and navigate to My Blogs (ask MyBlogs to refresh)
      alert("✅ Blog published successfully!");
      navigate("/myblogs", { state: { refresh: true } });

      // optional: console log created blog
      console.log("Created blog:", res.data);
    } catch (err) {
      console.error("Publish failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong while publishing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        ✍️ Create New Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Blog Description..."
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg h-40 outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category (optional)"
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Cover Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 block w-full text-sm text-gray-700"
          />
        </div>

        {preview && (
          <div className="mt-3">
            <img
              src={preview}
              alt="Preview"
              className="rounded-lg max-h-52 w-full object-cover shadow-md"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}
