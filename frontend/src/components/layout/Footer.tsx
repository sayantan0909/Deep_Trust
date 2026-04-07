import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFFDF7] border-t-[3px] border-[#0a0a0a] w-full mt-auto py-10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-2 w-max">
               <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 5L15 20V45C15 65.5 30 83 50 95C70 83 85 65.5 85 45V20L50 5Z" fill="#2563eb" stroke="#0a0a0a" strokeWidth="6" strokeLinejoin="round"/>
                <path d="M50 15L25 26V45C25 61 35 74 50 82C65 74 75 61 75 45V26L50 15Z" fill="#FFFDF7" stroke="#0a0a0a" strokeWidth="4" strokeLinejoin="round"/>
                <circle cx="45" cy="45" r="14" fill="transparent" stroke="#0a0a0a" strokeWidth="5"/>
                <line x1="55" y1="55" x2="70" y2="70" stroke="#0a0a0a" strokeWidth="6" strokeLinecap="round"/>
                <line x1="42" y1="38" x2="48" y2="44" stroke="#2563eb" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              <span className="font-black tracking-tight text-[#0a0a0a] text-xl">
                DeepTrust
              </span>
            </Link>
            <p className="font-bold text-[#0a0a0a] text-sm md:text-base max-w-sm">
              DeepTrust - AI-powered authenticity detection platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-black text-[#0a0a0a] text-lg mb-2">Quick Links</h3>
            <Link to="/" className="font-bold text-[#374151] hover:text-[#2563eb] hover:translate-x-1 transition-transform w-max">Home</Link>
            <Link to="/about" className="font-bold text-[#374151] hover:text-[#2563eb] hover:translate-x-1 transition-transform w-max">About Us</Link>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t-[3px] border-[#0a0a0a] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-bold text-[#0a0a0a] text-sm">
            &copy; {new Date().getFullYear()} DeepTrust Platform. All rights reserved.
          </p>
          <a 
            href="https://github.com/sayantan0909/Deep_Trust" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center w-10 h-10 rounded-full border-[2px] border-[#0a0a0a] bg-white hover:bg-[#D6EEFF] hover:-translate-y-1 hover:shadow-[2px_2px_0_#0a0a0a] transition-all"
            aria-label="GitHub Repository"
          >
            <svg className="w-6 h-6 text-[#0a0a0a]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
