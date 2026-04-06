import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 w-full glass-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Shield Base */}
              <path d="M50 5L15 20V45C15 65.5 30 83 50 95C70 83 85 65.5 85 45V20L50 5Z" fill="#2563eb" stroke="#0a0a0a" strokeWidth="6" strokeLinejoin="round"/>
              <path d="M50 15L25 26V45C25 61 35 74 50 82C65 74 75 61 75 45V26L50 15Z" fill="#FFFDF7" stroke="#0a0a0a" strokeWidth="4" strokeLinejoin="round"/>
              {/* Magnifying Glass */}
              <circle cx="45" cy="45" r="14" fill="transparent" stroke="#0a0a0a" strokeWidth="5"/>
              <line x1="55" y1="55" x2="70" y2="70" stroke="#0a0a0a" strokeWidth="6" strokeLinecap="round"/>
              <line x1="42" y1="38" x2="48" y2="44" stroke="#2563eb" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <span className="font-black text-lg tracking-tight text-[#0a0a0a]">
              DeepTrust
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden sm:flex items-center gap-6">

            {/* Home */}
            <Link to="/" className="text-slate-600 hover:text-blue-600">
              Home
            </Link>

            {/* Tools Dropdown */}
            <div className="relative group">
              
              {/* Trigger */}
              <span className="cursor-pointer text-slate-600 hover:text-blue-600">
                Tools
              </span>

              {/* Dropdown */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out animate-fadeIn z-50">

                <Link to="/text" className="block px-4 py-2 hover:bg-blue-50 rounded-lg">
                  Text Detection
                </Link>

                <Link to="/image" className="block px-4 py-2 hover:bg-blue-50 rounded-lg">
                  Image Detection
                </Link>

                <Link to="/audio" className="block px-4 py-2 hover:bg-blue-50 rounded-lg">
                  Audio Detection
                </Link>

                <Link to="/video" className="block px-4 py-2 hover:bg-blue-50 rounded-lg">
                  Video Detection
                </Link>

              </div>
            </div>

            {/* About */}
            <Link to="/about" className="text-slate-600 hover:text-blue-600">
              About
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;