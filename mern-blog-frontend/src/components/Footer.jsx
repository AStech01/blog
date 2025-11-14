
import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-start">
        
     
        <div className="mb-6 md:mb-0">
          <h1 className="text-2xl font-bold text-blue-400">MyBlog</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Sharing ideas, tips, and tutorials.
          </p>
        </div>

   
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          <div>
            <h2 className="font-semibold mb-2">Pages</h2>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="hover:text-blue-400">Home</Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-blue-400">Blogs</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400">About</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400">Contact</Link>
              </li>
            </ul>
          </div>

   
          <div>
            <h2 className="font-semibold mb-2">Follow Me</h2>
            <div className="flex space-x-4 text-xl">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} MyBlog. All rights reserved.
      </div>
    </footer>
  );
}
