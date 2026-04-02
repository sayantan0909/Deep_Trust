import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-900/80 border-b border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                dt
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                DeepTrust
              </span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link to="/text" className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Text</Link>
            <Link to="/image" className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Image</Link>
            <Link to="/audio" className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Audio</Link>
            <Link to="/video" className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Video</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
