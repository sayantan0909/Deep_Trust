import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavbarScroll } from '../../hooks/useNavbarScroll';

const NavLink: React.FC<{ to: string; children: React.ReactNode; isActive?: boolean }> = ({ to, children, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link 
      to={to} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-block',
        color: isActive ? '#1D4ED8' : (isHovered ? '#1D4ED8' : '#374151'),
        fontWeight: isActive ? 700 : 500,
        transition: 'color 0.2s ease',
        paddingBottom: '2px'
      }}
    >
      {children}
      <span style={{
        position: "absolute", bottom: -2, left: 0, height: 2,
        width: (isHovered || isActive) ? "100%" : "0%",
        background: "linear-gradient(90deg, #1D4ED8, #7C3AED)",
        transition: "width 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        borderRadius: 2
      }} />
    </Link>
  )
}

const Navbar: React.FC = () => {
  const { scrollY, scrollProgress, isHidden, isIdle } = useNavbarScroll();
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isLogoClicked, setIsLogoClicked] = useState(false);
  
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMovebtn = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - btnCenterX) * 0.18;
    const deltaY = (e.clientY - btnCenterY) * 0.18;
    btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    btn.style.transition = 'none';
  };

  const handleMouseLeavebtn = () => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0,0)";
    btn.style.transition = "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)";
  };

  const handleBtnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:8px; height:8px;
      background:rgba(255,255,255,0.6);
      left:${e.clientX - rect.left - 4}px;
      top:${e.clientY - rect.top - 4}px;
      transform:scale(0); opacity:1;
      animation: rippleOut 0.5s ease-out forwards;
      pointer-events:none;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  };

  let navBg = 'transparent';
  let navBorder = 'none';
  let navShadow = 'none';
  let navHeight = '72px';
  let logoScale = 1.0;
  let navPadding = '24px';
  let navBackdrop = 'none';

  if (scrollY >= 20 && scrollY <= 80) {
    navBg = 'rgba(245, 240, 232, 0.85)';
    navBorder = '2px solid rgba(0,0,0,0.08)';
    navShadow = '0 2px 20px rgba(0,0,0,0.06)';
    navHeight = '64px';
    logoScale = 0.92;
    navPadding = '16px';
    navBackdrop = 'blur(12px)';
  } else if (scrollY > 80) {
    navBg = 'rgba(245, 240, 232, 0.96)';
    navBorder = '2px solid rgba(0,0,0,0.12)';
    navShadow = '0 4px 32px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.8)';
    navHeight = '58px';
    logoScale = 0.88;
    navPadding = '12px';
    navBackdrop = 'blur(20px)';
  }

  return (
    <>
      <style>{`
        @keyframes logoBounce {
          0%   { transform: scale(1); }
          30%  { transform: scale(0.88) rotate(-8deg); }
          70%  { transform: scale(1.12) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .logo-bounce { animation: logoBounce 0.4s ease-out; }

        @keyframes rippleOut {
          to {
            transform: scale(25);
            opacity: 0;
          }
        }
        
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0;   }
        }
        .pulse-ring::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: 2px solid #1D4ED8;
          animation: pulseRing 2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
          pointer-events: none;
        }
      `}</style>
      <nav 
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          background: navBg,
          borderBottom: navBorder,
          boxShadow: navShadow,
          backdropFilter: navBackdrop,
          transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: `0 ${navPadding}`,
          height: navHeight,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        }}>
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            onClick={() => {
              setIsLogoClicked(true);
              setTimeout(() => setIsLogoClicked(false), 400);
            }}
          >
            <svg 
              className={isLogoClicked ? 'logo-bounce' : ''}
              style={{
                transform: isLogoHovered && !isLogoClicked ? 'rotate(15deg) scale(1.12)' : `scale(${logoScale})`,
                transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transformOrigin: 'center'
              }}
              width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M50 5L15 20V45C15 65.5 30 83 50 95C70 83 85 65.5 85 45V20L50 5Z" fill="#2563eb" stroke="#0a0a0a" strokeWidth="6" strokeLinejoin="round"/>
              <path d="M50 15L25 26V45C25 61 35 74 50 82C65 74 75 61 75 45V26L50 15Z" fill="#FFFDF7" stroke="#0a0a0a" strokeWidth="4" strokeLinejoin="round"/>
              <circle cx="45" cy="45" r="14" fill="transparent" stroke="#0a0a0a" strokeWidth="5"/>
              <line x1="55" y1="55" x2="70" y2="70" stroke="#0a0a0a" strokeWidth="6" strokeLinecap="round"/>
              <line x1="42" y1="38" x2="48" y2="44" stroke="#2563eb" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <span className="font-black tracking-tight text-[#0a0a0a]" style={{ fontSize: '1.25rem', transform: `scale(${logoScale})`, transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)', transformOrigin: 'left center' }}>
              DeepTrust
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden sm:flex items-center gap-6">
            <NavLink to="/">Home</NavLink>

            {/* Tools Dropdown */}
            <div className="relative group">
              <span className="cursor-pointer font-medium" style={{ color: '#374151', transition: 'color 0.2s ease', paddingBottom: '2px', display: 'inline-block', position: 'relative' }}>
                Tools
                <span className="absolute bottom-[-2px] left-0 h-[2px] w-0 bg-gradient-to-r from-blue-700 to-indigo-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </span>
              <div className="absolute top-full left-0 mt-3 w-52 bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-lg shadow-[4px_4px_0_#0a0a0a] p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50 flex flex-col gap-1">
                <Link to="/text" className="block px-4 py-2 text-sm font-bold text-[#0a0a0a] hover:bg-[#D6EEFF] hover:border-[#0a0a0a] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[2px_2px_0_#0a0a0a] border-[2px] border-transparent rounded transition-all">Text Detection</Link>
                <Link to="/image" className="block px-4 py-2 text-sm font-bold text-[#0a0a0a] hover:bg-[#E8E4F8] hover:border-[#0a0a0a] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[2px_2px_0_#0a0a0a] border-[2px] border-transparent rounded transition-all">Image Detection</Link>
                <Link to="/audio" className="block px-4 py-2 text-sm font-bold text-[#0a0a0a] hover:bg-[#D4F3F7] hover:border-[#0a0a0a] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[2px_2px_0_#0a0a0a] border-[2px] border-transparent rounded transition-all">Audio Detection</Link>
                <Link to="/video" className="block px-4 py-2 text-sm font-bold text-[#0a0a0a] hover:bg-[#FAE8F0] hover:border-[#0a0a0a] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[2px_2px_0_#0a0a0a] border-[2px] border-transparent rounded transition-all">Video Detection</Link>
              </div>
            </div>

            <NavLink to="/about">About</NavLink>

            {/* Magnetic CTA Button */}
            <Link
              to="/image"
              ref={btnRef}
              onMouseMove={handleMouseMovebtn}
              onMouseLeave={handleMouseLeavebtn}
              onClick={handleBtnClick}
              className={`relative font-bold text-white bg-[#0a0a0a] px-5 py-2 rounded-lg flex items-center justify-center transition-transform ${isIdle && scrollY > 0 ? 'pulse-ring' : ''}`}
              style={{
                border: '2px solid #0a0a0a',
                boxShadow: '2px 2px 0 rgba(0,0,0,1)'
              }}
            >
              Start Analyzing
            </Link>

          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0,
          height: 2,
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, #1D4ED8, #7C3AED, #06B6D4)",
          transition: "width 0.1s linear",
          zIndex: 10,
        }} />
      </nav>
    </>
  );
};

export default Navbar;