// import React from "react";
// import { useEffect, useState } from "react";
// import API from "../api/api";
// import { Link } from "react-router-dom";

// export default function Home() {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       const res = await API.get("/blogs");
//       setBlogs(res.data);
//     };
//     fetchBlogs();
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto mt-6">
//       <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
//       {blogs.length === 0 ? (
//         <p>No blogs yet.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-6">
//           {blogs.map((b) => (
//             <Link to={`/blog/${b._id}`} key={b._id}>
//               <div className="border rounded-lg shadow p-4 hover:shadow-lg transition">
//                 {b.coverImageUrl && (
//                   <img src={b.coverImageUrl} alt="" className="rounded mb-3 h-48 w-full object-cover" />
//                 )}
//                 <h3 className="text-xl font-semibold">{b.title}</h3>
//                 <p className="text-sm text-gray-600 mt-1">{b.category}</p>
//                 <p className="mt-2 text-gray-700 line-clamp-3">{b.description}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import API from "../api/api";

// export default function Home() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await API.get("/blogs");
//         setBlogs(res.data);
//       } catch (err) {
//         console.error("Error fetching blogs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-blue-600 text-xl font-semibold">
//         Loading blogs...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
//       <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
//         📰 Latest Blogs
//       </h2>

//       {blogs.length === 0 ? (
//         <p className="text-center text-gray-600">No blogs published yet.</p>
//       ) : (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogs.map((b) => (
//             <Link
//               to={`/blog/${b._id}`}
//               key={b._id}
//               className="group bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
//             >
//               {b.coverImageUrl && (
//                 <img
//                   src={b.coverImageUrl}
//                   alt={b.title}
//                   className="rounded-t-xl h-48 w-full object-cover"
//                 />
//               )}

//               <div className="p-5">
//                 <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
//                   {b.title}
//                 </h3>
//                 <p className="text-sm text-gray-500 mt-1">
//                   {b.category || "General"}
//                 </p>
//                 <p className="mt-3 text-gray-700 text-sm line-clamp-3">
//                   {b.description}
//                 </p>

//                 <p className="mt-4 text-xs text-gray-400">
//                   ✍️ {b.author?.name || "Anonymous"} •{" "}
//                   {new Date(b.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import API from "../api/api";
import BlogCard from "../components/BlogCard";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">📰 Latest Blogs</h1>
      {blogs.length === 0 ? (
        <p className="text-gray-600">No blogs yet. <a href="/create" className="text-blue-600 underline">Create one!</a></p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}
