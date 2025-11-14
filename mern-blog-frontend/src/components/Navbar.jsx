// import React from 'react'
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
//       <Link to="/" className="text-2xl font-bold text-blue-400">
//         BlogSphere
//       </Link>
//       <div className="space-x-6">
//         <Link to="/" className="hover:text-blue-400">Blogs</Link>
//         {user ? (
//           <>
//             <Link to="/create" className="hover:text-blue-400">Create</Link>
//             <button onClick={logout} className="hover:text-red-400">Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="hover:text-blue-400">Login</Link>
//             <Link to="/register" className="hover:text-blue-400">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
//       <Link to="/" className="text-2xl font-bold text-blue-400">
//         BlogSphere
//       </Link>

//       <div className="space-x-6">
//         <Link to="/" className="hover:text-blue-400">
//           Blogs
//         </Link>

//         {user ? (
//           <>
//             <Link to="/create" className="hover:text-blue-400">
//               Create
//             </Link>
//             <button
//               onClick={logout}
//               className="hover:text-red-400 transition-colors"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="hover:text-blue-400">
//               Login
//             </Link>
//             <Link to="/register" className="hover:text-blue-400">
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }



// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
//       <Link to="/" className="text-2xl font-bold text-blue-400">
//         BlogSphere
//       </Link>

//       <div className="space-x-6">
//         <Link to="/" className="hover:text-blue-400">Home</Link>
//         {user ? (
//           <>
//             <Link to="/myblogs" className="hover:text-blue-400">My Blogs</Link>
//             <Link to="/create" className="hover:text-blue-400">Create</Link>
//             <button onClick={logout} className="hover:text-red-400">Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="hover:text-blue-400">Login</Link>
//             <Link to="/register" className="hover:text-blue-400">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }


import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-2xl font-bold text-blue-400">
        BlogSphere
      </Link>

      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>

        {user && (
          <>
            <Link to="/myblogs" className="hover:text-blue-400">
              My Blogs
            </Link>
            <Link to="/create" className="hover:text-blue-400">
              Create
            </Link>
            <button
              onClick={logout}
              className="hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <Link to="/login" className="hover:text-blue-400">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
