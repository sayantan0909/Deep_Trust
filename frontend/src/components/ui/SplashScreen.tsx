import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

// === STAGE 1 COMPONENTS ===

const RingExpand = ({ delay }: { delay: number }) => (
  <div style={{
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    border: '2px solid #2563eb', borderRadius: '50%',
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


// === STAGE 2 COMPONENTS ===

const Rocket = () => (
  <svg style={{ position: 'absolute', top: '15%', right: '10%', animation: 'rocketPath 4s ease-in-out infinite', pointerEvents: 'none' }} width="32" height="48" viewBox="0 0 32 48">
    <rect x="10" y="14" width="12" height="22" rx="4" fill="#1D4ED8"/>
    <polygon points="16,2 10,14 22,14" fill="#2563EB"/>
    <polygon points="10,28 4,38 10,36" fill="#1E40AF"/>
    <polygon points="22,28 28,38 22,36" fill="#1E40AF"/>
    <ellipse cx="16" cy="38" rx="5" ry="8" fill="#FCD34D" style={{animation:"flameFicker 0.3s infinite"}}/>
    <ellipse cx="16" cy="40" rx="3" ry="5" fill="#EF4444" style={{animation:"flameFicker 0.3s 0.1s infinite"}}/>
  </svg>
);

const Cloud = ({ size, direction, top, delay, dur }: any) => {
  const scale = size === 'lg' ? 1.2 : size === 'md' ? 0.9 : 0.6;
  const animName = direction === 'right' ? 'cloudDriftRight' : 'cloudDriftLeft';
  return (
    <svg style={{ position: 'absolute', top, left: direction === 'right' ? '-100px' : 'auto', right: direction === 'left' ? '-100px' : 'auto', transform: `scale(${scale})`, animation: `${animName} ${dur}s linear infinite ${delay}s`, zIndex: 1, pointerEvents: 'none' }} width="70" height="36" viewBox="0 0 70 36">
      <circle cx="20" cy="26" r="14" fill="rgba(219,234,254,0.9)" />
      <circle cx="35" cy="20" r="18" fill="rgba(219,234,254,0.9)" />
      <circle cx="52" cy="26" r="13" fill="rgba(219,234,254,0.9)" />
      <rect x="6" y="26" width="58" height="10" fill="rgba(219,234,254,0.9)" rx="2"/>
    </svg>
  );
};

const MagnifyingGlass = () => (
  <svg style={{ position: 'absolute', bottom: '20%', left: '8%', animation: 'floatOval 6s ease-in-out infinite', pointerEvents: 'none' }} width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="12" cy="12" r="8" stroke="#2563eb" strokeWidth="3"/>
    <line x1="17" y1="17" x2="24" y2="24" stroke="#1E40AF" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

const ShieldIcon = ({ pos, delay }: any) => (
  <svg style={{ position: 'absolute', ...(pos === 'topLeft' ? {top: '15%', left: '15%'} : {bottom: '25%', right: '12%'}), animation: `gentleBob 3.5s ease-in-out infinite ${delay}s`, pointerEvents: 'none' }} width="20" height="20" viewBox="0 0 24 24" fill="rgba(37,99,235,0.4)">
    <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z"/>
  </svg>
);

const SignalWaves = () => (
  <svg style={{ position: 'absolute', top: '50%', left: '5%', pointerEvents: 'none' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round">
    <path d="M12 20h.01" strokeWidth="4" />
    <path d="M8.5 16.5a5 5 0 0 1 7 0" style={{animation: "signalPulse 2s infinite 0.6s"}} />
    <path d="M5 13a10 10 0 0 1 14 0" style={{animation: "signalPulse 2s infinite 0.3s"}} />
    <path d="M2 9.5a15 15 0 0 1 20 0" style={{animation: "signalPulse 2s infinite 0s"}} />
  </svg>
);

const Globe = () => (
  <svg style={{ position: 'absolute', top: '12%', left: '6%', animation: 'globeSpin 8s linear infinite', pointerEvents: 'none' }} width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#7C3AED" strokeWidth="1.5">
    <circle cx="15" cy="15" r="14" />
    <ellipse cx="15" cy="15" rx="6" ry="14" />
    <ellipse cx="15" cy="15" rx="14" ry="4" />
  </svg>
);

const BinaryDrop = ({ left, delay, dur, text }: any) => (
  <div style={{ position: 'absolute', bottom: '10%', left, fontFamily: 'monospace', fontSize: '11px', color: 'rgba(37,99,235,0.5)', animation: `binaryRise ${dur}s ease-in infinite ${delay}s`, pointerEvents: 'none' }}>
    {text}
  </div>
);


const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(0.8);
  const [logoOpacity, setLogoOpacity] = useState(0);

  useEffect(() => {
    // Initial mount - trigger stage 1 animations
    const t0 = setTimeout(() => {
      setScale(1);
      setLogoOpacity(1);
    }, 50);

    // Stage 2 starts at 1.2s -> hide logo, show text
    const t1 = setTimeout(() => {
      setStage(2);
    }, 1200);

    // Stage 3 fade out starts at 2.4s -> fade whole screen
    const t2 = setTimeout(() => {
      setOpacity(0);
    }, 2400);

    // Unmount at 2.8s
    const t3 = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  // Stage 1 configuration lists
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
    { bottom: 30, right: -25, color: 'white', duration: 1.1, delay: 0.8 },
    { top: -15, right: 20, color: '#34D399', duration: 1.3, delay: 1.2 },
    { bottom: -20, right: 10, color: '#FBBF24', duration: 0.8, delay: 1.5 },
    { top: 40, left: -25, color: 'white', duration: 1.0, delay: 0.4 },
    { top: 80, right: -30, color: '#60A5FA', duration: 1.2, delay: 1.7 }
  ];
  const driftIcons = [
    { top: -10, left: -10, delay: 0.2, duration: 2.5, children: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg> },
    { bottom: 10, right: -20, delay: 0.8, duration: 2.8, children: <svg width="16" height="8" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5v14M7 8v8M22 9v6M2 9v6"/></svg> },
    { top: 5, right: -15, delay: 1.4, duration: 2.2, children: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
    { bottom: 5, left: -25, delay: 0, duration: 3.0, children: <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#A78BFA' }}>01</span> }
  ];

  // Stage 2 configuration lists
  const stage2Sparkles = [
    { top: '10%', left: '20%', size: 16, color: '#FBBF24', duration: 2.0, delay: 0.5 },
    { top: '25%', right: '15%', size: 12, color: '#60A5FA', duration: 1.8, delay: 1.2 },
    { bottom: '15%', left: '30%', size: 20, color: '#F472B6', duration: 2.5, delay: 0.1 },
    { top: '40%', left: '5%', size: 8, color: 'white', duration: 1.5, delay: 2.0 },
    { bottom: '35%', right: '25%', size: 14, color: '#34D399', duration: 2.2, delay: 0.8 },
    { top: '15%', left: '60%', size: 10, color: 'white', duration: 1.6, delay: 3.0 },
    { top: '60%', right: '8%', size: 18, color: '#FBBF24', duration: 2.8, delay: 1.5 },
    { bottom: '45%', left: '15%', size: 12, color: '#60A5FA', duration: 1.9, delay: 0.4 },
    { bottom: '10%', right: '40%', size: 15, color: '#A78BFA', duration: 2.4, delay: 2.5 },
    { top: '50%', left: '45%', size: 9, color: 'white', duration: 1.7, delay: 1.0 },
  ];
  const binaryNodes = [
    { left: '15%', dur: 4.5, delay: 0.2, text: "01" },
    { left: '50%', dur: 3.8, delay: 1.5, text: "10" },
    { left: '82%', dur: 5.0, delay: 0.8, text: "11" }
  ];

  return (
    <>
      <style>{`
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
        @keyframes rocketPath {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          50%      { transform: translateX(-20px) translateY(-30px); }
        }
        @keyframes flameFicker {
          0%,100% { transform: scaleY(1);   opacity: 1;   }
          50%     { transform: scaleY(0.7); opacity: 0.7; }
        }
        @keyframes cloudDriftRight {
          0%   { transform: translateX(-100px); opacity: 0;   }
          10%  { opacity: 0.9; }
          90%  { opacity: 0.9; }
          100% { transform: translateX(calc(100vw + 100px)); opacity: 0; }
        }
        @keyframes cloudDriftLeft {
          0%   { transform: translateX(100px);  opacity: 0;   }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.8; }
          100% { transform: translateX(calc(-100vw - 100px)); opacity: 0; }
        }
        @keyframes floatOval {
          0%   { transform: translate(0px, 0px)    rotate(-10deg); }
          25%  { transform: translate(15px, -20px) rotate(0deg);   }
          50%  { transform: translate(0px, -35px)  rotate(10deg);  }
          75%  { transform: translate(-15px,-20px) rotate(0deg);   }
          100% { transform: translate(0px, 0px)    rotate(-10deg); }
        }
        @keyframes gentleBob {
          0%,100% { transform: translateY(0px)  rotate(-5deg); }
          50%     { transform: translateY(-16px) rotate(5deg);  }
        }
        @keyframes signalPulse {
          0%,100% { opacity: 0.2; }
          33%     { opacity: 1.0; }
          66%     { opacity: 0.6; }
        }
        @keyframes globeSpin {
          from { transform: rotateY(0deg);   }
          to   { transform: rotateY(360deg); }
        }
        @keyframes binaryRise {
          0%   { transform: translateY(40px);  opacity: 0;   }
          20%  { opacity: 0.7; }
          80%  { opacity: 0.5; }
          100% { transform: translateY(-40px); opacity: 0;   }
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: '#F5F0E8',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: opacity,
          transition: 'opacity 0.4s ease-out',
        }}
      >
        {/* Stage 1: Logo SVG + Decorative Elements */}
        {stage === 1 && (
          <div 
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: logoOpacity,
              transform: `scale(${scale})`,
              transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out'
            }}
          >
            {/* Stage 1 Elements */}
            <RingExpand delay={0} />
            <RingExpand delay={0.7} />
            {orbitDots.map((dot, i) => <OrbitDot key={`dot-${i}`} {...dot} />)}
            {scanLines.map((line, i) => <ScanPulse key={`scan-${i}`} {...line} />)}
            {stage1Sparkles.map((s, i) => <Sparkle key={`s1-${i}`} {...s} />)}
            {driftIcons.map((icon, i) => <DriftIcon key={`dir-${i}`} {...icon} />)}

            <svg style={{ position: 'relative', zIndex: 10 }} width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 5L15 20V45C15 65.5 30 83 50 95C70 83 85 65.5 85 45V20L50 5Z" fill="#2563eb" stroke="#0a0a0a" strokeWidth="6" strokeLinejoin="round"/>
              <path d="M50 15L25 26V45C25 61 35 74 50 82C65 74 75 61 75 45V26L50 15Z" fill="#FFFDF7" stroke="#0a0a0a" strokeWidth="4" strokeLinejoin="round"/>
              <circle cx="45" cy="45" r="14" fill="transparent" stroke="#0a0a0a" strokeWidth="5"/>
              <line x1="55" y1="55" x2="70" y2="70" stroke="#0a0a0a" strokeWidth="6" strokeLinecap="round"/>
              <line x1="42" y1="38" x2="48" y2="44" stroke="#2563eb" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
        )}

        {/* Stage 2: Welcome Text + Floating Illustrations */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {stage === 2 && (
            <>
              {/* Floating Background Illustrations */}
              <Rocket />
              <Cloud size="lg" direction="right" top="18%" delay={0} dur={8} />
              <Cloud size="md" direction="left" top="58%" delay={2} dur={10} />
              <Cloud size="sm" direction="right" top="38%" delay={5} dur={12} />
              <MagnifyingGlass />
              <Globe />
              <SignalWaves />
              <ShieldIcon pos="topLeft" delay={0} />
              <ShieldIcon pos="bottomRight" delay={1.8} />
              {stage2Sparkles.map((s, i) => <Sparkle key={`s2-${i}`} {...s} />)}
              {binaryNodes.map((node, i) => <BinaryDrop key={`bin-${i}`} {...node} />)}
            </>
          )}

          {/* Central Welcome Text */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              opacity: stage === 2 ? 1 : 0,
              transform: stage === 2 ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.6s ease-out',
              textAlign: 'center'
            }}
          >
            <h1 className="font-black text-4xl sm:text-5xl text-[#0a0a0a] tracking-tight">
              Welcome to DeepTrust!!
            </h1>
          </div>
        </div>

      </div>
    </>
  );
};

export default SplashScreen;
