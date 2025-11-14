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
//           Home
//         </Link>

//         {user && (
//           <>
//             <Link to="/myblogs" className="hover:text-blue-400">
//               My Blogs
//             </Link>
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
//         )}

//         {!user && (
//           <Link to="/login" className="hover:text-blue-400">
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// }


import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { HiMenu, HiX } from "react-icons/hi"; // hamburger icons

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-400">
            BlogSphere
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            {user && (
              <>
                <Link to="/myblogs" className="hover:text-blue-400 transition-colors">
                  My Blogs
                </Link>
                <Link to="/create" className="hover:text-blue-400 transition-colors">
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
              <Link to="/login" className="hover:text-blue-400 transition-colors">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <HiX className="w-6 h-6 text-white" />
              ) : (
                <HiMenu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-4 space-y-2">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-white hover:text-blue-400"
          >
            Home
          </Link>
          {user && (
            <>
              <Link
                to="/myblogs"
                onClick={() => setMenuOpen(false)}
                className="block text-white hover:text-blue-400"
              >
                My Blogs
              </Link>
              <Link
                to="/create"
                onClick={() => setMenuOpen(false)}
                className="block text-white hover:text-blue-400"
              >
                Create
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="block text-white hover:text-red-400 w-full text-left"
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-white hover:text-blue-400"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
