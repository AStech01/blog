import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 mt-20 relative overflow-hidden">
    
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-8 py-10">
        
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 border-b border-gray-800 pb-10">
          
          
          <div className="col-span-2">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tracking-wider">
              MyBlog
            </h1>
            <p className="mt-4 text-base text-gray-400 max-w-sm">
              Exploring the latest in tech, development, and creative thinking. Join our community!
            </p>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-white uppercase tracking-wider">Navigate</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-cyan-400 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-400 hover:text-cyan-400 transition duration-300">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-cyan-400 transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-cyan-400 transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

         
          <div className="hidden md:block">
            <h2 className="text-lg font-bold mb-4 text-white uppercase tracking-wider">Resources</h2>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition duration-300">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition duration-300">Terms of Service</a></li>
            </ul>
          </div>
          
         
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-lg font-bold mb-4 text-white uppercase tracking-wider">Connect</h2>
            <div className="flex space-x-4">
              
              {[
                { Icon: FaGithub, href: "https://github.com/", color: "hover:text-white" },
                { Icon: FaLinkedin, href: "https://linkedin.com/", color: "hover:text-blue-500" },
                { Icon: FaTwitter, href: "https://twitter.com/", color: "hover:text-cyan-400" },
              ].map(({ Icon, href, color }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full border border-gray-700 text-gray-400 text-xl transition duration-300 ease-in-out transform hover:scale-110 ${color}`}
                  aria-label={`Link to ${Icon.name.replace('Fa', '')}`}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        
        <div className="mt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} MyBlog. All rights reserved. Built with React and Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}