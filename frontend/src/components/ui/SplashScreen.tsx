import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const RingExpand = ({ delay }: { delay: number }) => (
  <div style={{
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    border: '2px solid #60A5FA', borderRadius: '50%',
    animation: `ringExpand 2s ease-out infinite ${delay}s`, pointerEvents: 'none'
  }} />
);

const OrbitDot = ({ startAngle, color, delay }: { startAngle: number, color: string, delay: number }) => (
  <div style={{
    position: 'absolute', top: '50%', left: '50%', width: 8, height: 8, marginTop: -4, marginLeft: -4,
    backgroundColor: color, borderRadius: '50%', boxShadow: `0 0 6px ${color}`,
    animation: `orbitDot 3s linear infinite ${delay}s`, pointerEvents: 'none',
    '--start-angle': `${startAngle}deg`
  } as React.CSSProperties} />
);

const ScanPulse = ({ angle, delay, color }: { angle: number, delay: number, color: string }) => (
  <div style={{
    position: 'absolute', top: '50%', left: '50%', height: 2, marginTop: -1, marginLeft: 0,
    transformOrigin: 'left center', transform: `rotate(${angle}deg)`, pointerEvents: 'none'
  }}>
    <div style={{ width: 40, height: 2, backgroundColor: color, borderRadius: 2, transformOrigin: 'left center', animation: `scanPulse 1.2s ease-out infinite ${delay}s` }} />
  </div>
);

const Sparkle = ({ size = 12, top, left, right, bottom, color, delay, duration }: any) => (
  <svg width={size} height={size} viewBox="0 0 12 12" style={{
    position: 'absolute', top, left, right, bottom, color,
    animation: `sparkle ${duration}s ease-in-out infinite ${delay}s`, pointerEvents: 'none'
  }}>
    <path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" fill="currentColor" />
  </svg>
);

const DriftIcon = ({ children, top, left, right, bottom, delay, duration }: any) => (
  <div style={{
    position: 'absolute', top, left, right, bottom,
    animation: `driftUp ${duration}s ease-in infinite ${delay}s`, pointerEvents: 'none'
  }}>
    {children}
  </div>
);

// --- Vibrant Background Decorations --- //
const SplashCloud = ({ top, left, right, bottom, speed, reverse }: any) => (
  <svg style={{ position: 'absolute', top, left, right, bottom, animation: `${reverse ? 'bgCloudRev' : 'bgCloud'} ${speed}s linear infinite`, opacity: 0.9, pointerEvents: 'none', zIndex: -1 }} width="100" height="60" viewBox="0 0 100 60">
    <ellipse cx="30" cy="35" rx="20" ry="20" fill="#FFFFFF" opacity="0.9" />
    <ellipse cx="60" cy="28" rx="25" ry="25" fill="#FFFFFF" opacity="0.9" />
    <ellipse cx="80" cy="40" rx="15" ry="15" fill="#FFFFFF" opacity="0.8" />
    <rect x="25" cy="30" width="60" height="15" rx="5" fill="#FFFFFF" y="32" opacity="0.9" />
    <ellipse cx="60" cy="30" rx="20" ry="20" fill="#EAF4FB" opacity="0.6" />
    <ellipse cx="30" cy="35" rx="10" ry="10" fill="#FAE8F0" opacity="0.5" />
  </svg>
);

const SplashRocket = () => (
  <svg style={{ position: 'absolute', top: '15%', right: '15%', animation: 'bgRocket 12s ease-in-out infinite', opacity: 0.95, pointerEvents: 'none', zIndex: -1 }} width="48" height="72" viewBox="0 0 32 48">
    {/* Body */}
    <rect x="10" y="14" width="12" height="22" rx="4" fill="#60A5FA"/>
    {/* Nose */}
    <polygon points="16,2 10,14 22,14" fill="#1D4ED8"/>
    {/* Fins */}
    <polygon points="10,28 4,38 10,36" fill="#EF4444"/>
    <polygon points="22,28 28,38 22,36" fill="#EF4444"/>
    {/* Flame */}
    <ellipse cx="16" cy="38" rx="5" ry="8" fill="#FBBF24" style={{animation:"flameFicker 0.3s infinite"}}/>
    <ellipse cx="16" cy="40" rx="3" ry="5" fill="#EF4444" style={{animation:"flameFicker 0.3s 0.1s infinite"}}/>
  </svg>
);

const SplashGlobe = () => (
  <svg style={{ position: 'absolute', bottom: '15%', left: '10%', animation: 'bgGlobe 15s ease-in-out infinite', opacity: 0.85, pointerEvents: 'none', zIndex: -1 }} width="60" height="60" viewBox="0 0 30 30" fill="none" stroke="#22D3EE" strokeWidth="1.5">
    <circle cx="15" cy="15" r="14" fill="#D4F3F7" stroke="#34D399" />
    <ellipse cx="15" cy="15" rx="6" ry="14" stroke="#60A5FA" />
    <ellipse cx="15" cy="15" rx="14" ry="4" stroke="#A78BFA" />
  </svg>
);

const SplashBgStar = ({ top, left, right, bottom, speed, size = 16, delay, color = '#FBBF24' }: any) => (
  <svg width={size} height={size} viewBox="0 0 12 12" style={{ position: 'absolute', top, left, right, bottom, opacity: 0.9, color: color, animation: `bgStar ${speed}s ease-in-out infinite ${delay}s`, filter: `drop-shadow(0 0 4px ${color})`, pointerEvents: 'none', zIndex: -1 }}>
    <path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" fill="currentColor" />
  </svg>
);

const SplashDiamond = ({ top, left, right, bottom, speed, color = '#A78BFA' }: any) => (
  <svg style={{ position: 'absolute', top, left, right, bottom, opacity: 0.85, animation: `bgDiamond ${speed}s linear infinite`, pointerEvents: 'none', zIndex: -1 }} width="30" height="30" viewBox="0 0 40 40">
    <polygon points="20,0 40,20 20,40 0,20" fill={color} />
  </svg>
);

const SplashBlob = ({ top, left, right, bottom, speed, color }: any) => (
  <svg style={{ position: 'absolute', top, left, right, bottom, opacity: 0.65, animation: `bgDiamond ${speed}s ease-in-out infinite`, pointerEvents: 'none', zIndex: -1 }} width="60" height="60" viewBox="0 0 60 60">
    <circle cx="30" cy="30" r="25" fill={color} filter="blur(2px)"/>
  </svg>
);

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [logoVisible,    setLogoVisible]    = useState(false);
  const [textVisible,    setTextVisible]    = useState(false);
  const [screenOpacity,  setScreenOpacity]  = useState(1);

  useEffect(() => {
    const t0 = setTimeout(() => setLogoVisible(true),   50);
    const t1 = setTimeout(() => setTextVisible(true),   900);
    const t2 = setTimeout(() => setScreenOpacity(0),    3400); // 3.4 seconds fade trigger
    const t3 = setTimeout(() => onComplete(),           4000); // 4.0 seconds unmount
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const orbitDots = [
    { startAngle: 0, color: '#2563eb', delay: 0 },
    { startAngle: 60, color: '#FBBF24', delay: 0.5 },
    { startAngle: 120, color: '#34D399', delay: 1.0 },
    { startAngle: 180, color: '#F472B6', delay: 1.5 },
    { startAngle: 240, color: '#60A5FA', delay: 2.0 },
    { startAngle: 300, color: '#A78BFA', delay: 2.5 }
  ];
  const scanLines = [
    { angle: 45, color: '#2563eb', delay: 0 },
    { angle: 135, color: '#60A5FA', delay: 0.15 },
    { angle: 225, color: '#7C3AED', delay: 0.3 },
    { angle: 315, color: '#06B6D4', delay: 0.45 }
  ];
  const stage1Sparkles = [
    { top: -20, left: 10, color: '#FBBF24', duration: 1.2, delay: 0.2 },
    { top: 10, right: -10, color: '#60A5FA', duration: 0.9, delay: 0.5 },
    { bottom: -10, left: 20, color: '#F472B6', duration: 1.4, delay: 0.1 },
    { bottom: 30, right: -25, color: '#22D3EE', duration: 1.1, delay: 0.8 },
    { top: -15, right: 20, color: '#34D399', duration: 1.3, delay: 1.2 },
    { bottom: -20, right: 10, color: '#FBBF24', duration: 0.8, delay: 1.5 },
    { top: 40, left: -25, color: '#A78BFA', duration: 1.0, delay: 0.4 },
    { top: 80, right: -30, color: '#60A5FA', duration: 1.2, delay: 1.7 }
  ];
  const driftIcons = [
    { top: -10, left: -10, delay: 0.2, duration: 2.5, children: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg> },
    { bottom: 10, right: -20, delay: 0.8, duration: 2.8, children: <svg width="16" height="8" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5v14M7 8v8M22 9v6M2 9v6"/></svg> },
    { top: 5, right: -15, delay: 1.4, duration: 2.2, children: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
    { bottom: 5, left: -25, delay: 0, duration: 3.0, children: <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#A78BFA' }}>01</span> }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(135deg, #FDF7E4 0%, #EAF4FB 50%, #F5F0F8 100%)',
      zIndex: 9999,
      opacity: screenOpacity,
      transition: 'opacity 0.6s ease-out',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
        
        @keyframes scanPulse {
          0%   { transform: scale(0) translateX(0); opacity: 1; }
          60%  { opacity: 0.8; }
          100% { transform: scale(1) translateX(50px); opacity: 0; }
        }
        @keyframes orbitDot {
          from { transform: rotate(var(--start-angle)) translateX(70px) rotate(calc(-1 * var(--start-angle))); }
          to   { transform: rotate(calc(var(--start-angle) + 360deg)) translateX(70px) rotate(calc(-1 * (var(--start-angle) + 360deg))); }
        }
        @keyframes sparkle {
          0%   { transform: scale(0) rotate(0deg);   opacity: 0; }
          40%  { transform: scale(1) rotate(45deg);  opacity: 1; }
          100% { transform: scale(0) rotate(90deg);  opacity: 0; }
        }
        @keyframes ringExpand {
          0%   { width: 60px;  height: 60px;  opacity: 0.7; }
          100% { width: 180px; height: 180px; opacity: 0;   }
        }
        @keyframes driftUp {
          0%   { transform: translateY(0px);  opacity: 1; }
          100% { transform: translateY(-35px); opacity: 0; }
        }
        
        /* Vibrant Floating Background Animations */
        @keyframes flameFicker {
          0%,100% { transform: scaleY(1);   opacity: 1;   }
          50%     { transform: scaleY(0.7); opacity: 0.7; }
        }
        @keyframes bgCloud {
          0%   { transform: translateX(0px) translateY(0px); }
          50%  { transform: translateX(80px) translateY(-10px); }
          100% { transform: translateX(0px) translateY(0px); }
        }
        @keyframes bgCloudRev {
          0%   { transform: translateX(0px) translateY(0px); }
          50%  { transform: translateX(-60px) translateY(15px); }
          100% { transform: translateX(0px) translateY(0px); }
        }
        @keyframes bgGlobe {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-30px) rotate(15deg); }
        }
        @keyframes bgRocket {
          0%, 100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
          50%      { transform: translateX(-40px) translateY(-60px) rotate(8deg); }
        }
        @keyframes bgStar {
          0%, 100% { transform: scale(0.6) rotate(0deg); opacity: 0.4; }
          50%      { transform: scale(1.3) rotate(45deg); opacity: 1; }
        }
        @keyframes bgDiamond {
          0% { transform: rotate(0deg) translateY(0px); }
          50% { transform: rotate(180deg) translateY(20px); }
          100% { transform: rotate(360deg) translateY(0px); }
        }
      `}</style>
      
      {/* Absolute Vibrant Background Floating Graphics layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <SplashCloud top="15%" left="8%" speed={22} reverse={false} />
        <SplashCloud bottom="25%" right="12%" speed={28} reverse={true} />
        
        <SplashRocket />
        <SplashGlobe />
        
        {/* Vibrant scattered stars / geometric abstract loops */}
        <SplashBgStar top="15%" left="40%" speed={9} size={18} delay={0} color="#F472B6" />
        <SplashBgStar top="60%" right="20%" speed={12} size={20} delay={2} color="#22D3EE" />
        <SplashBgStar bottom="15%" left="25%" speed={14} size={24} delay={1.5} color="#FBBF24" />
        <SplashBgStar top="30%" right="28%" speed={18} size={16} delay={0.8} color="#A78BFA" />

        <SplashDiamond top="25%" right="35%" speed={15} color="#A78BFA" />
        <SplashDiamond bottom="30%" left="18%" speed={20} color="#22D3EE" />

        <SplashBlob top="40%" left="5%" speed={18} color="#F472B6" />
        <SplashBlob top="8%" right="40%" speed={23} color="#FBBF24" />
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Logo and Decorations */}
        <div style={{
          position: 'relative',
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? `scale(1) translateY(${textVisible ? '-28px' : '0px'})` : 'scale(0.88) translateY(0px)',
          transition: 'transform 700ms cubic-bezier(0.34,1.56,0.64,1), opacity 700ms ease-out',
        }}>
          <RingExpand delay={0} />
          <RingExpand delay={0.7} />
          {orbitDots.map((dot, i) => <OrbitDot key={`dot-${i}`} {...dot} />)}
          {scanLines.map((line, i) => <ScanPulse key={`scan-${i}`} {...line} />)}
          {stage1Sparkles.map((s, i) => <Sparkle key={`s1-${i}`} {...s} />)}
          {driftIcons.map((icon, i) => <DriftIcon key={`dir-${i}`} {...icon} />)}

          {/* DeepTrust Logo Solid Colors unaffected */}
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: 10, position: 'relative' }}>
            <path d="M50 5L15 20V45C15 65.5 30 83 50 95C70 83 85 65.5 85 45V20L50 5Z" fill="#2563eb" stroke="#0a0a0a" strokeWidth="6" strokeLinejoin="round"/>
            <path d="M50 15L25 26V45C25 61 35 74 50 82C65 74 75 61 75 45V26L50 15Z" fill="#FFFDF7" stroke="#0a0a0a" strokeWidth="4" strokeLinejoin="round"/>
            <circle cx="45" cy="45" r="14" fill="transparent" stroke="#0a0a0a" strokeWidth="5"/>
            <line x1="55" y1="55" x2="70" y2="70" stroke="#0a0a0a" strokeWidth="6" strokeLinecap="round"/>
            <line x1="42" y1="38" x2="48" y2="44" stroke="#2563eb" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Welcome Text */}
        <div style={{
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? "translateY(0px)" : "translateY(14px)",
          transition: "opacity 600ms ease-out, transform 600ms ease-out",
          marginTop: 24,
          position: 'relative',
          zIndex: 10
        }}>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0a0a0a] tracking-tight"
style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Welcome to DeepTrust!
          </h1>
        </div>

      </div>
    </div>
  );
};

export default SplashScreen;
