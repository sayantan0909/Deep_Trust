import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

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

  return (
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
      {/* 
        Stage 1: Logo SVG
      */}
      <div 
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: stage === 1 ? logoOpacity : 0,
          transform: `scale(${stage === 1 ? scale : 0.8})`,
          transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out'
        }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shield Base */}
          <path d="M50 5L15 20V45C15 65.5 30 83 50 95C70 83 85 65.5 85 45V20L50 5Z" fill="#2563eb" stroke="#0a0a0a" strokeWidth="6" strokeLinejoin="round"/>
          <path d="M50 15L25 26V45C25 61 35 74 50 82C65 74 75 61 75 45V26L50 15Z" fill="#FFFDF7" stroke="#0a0a0a" strokeWidth="4" strokeLinejoin="round"/>
          {/* Magnifying Glass */}
          <circle cx="45" cy="45" r="14" fill="transparent" stroke="#0a0a0a" strokeWidth="5"/>
          <line x1="55" y1="55" x2="70" y2="70" stroke="#0a0a0a" strokeWidth="6" strokeLinecap="round"/>
          <line x1="42" y1="38" x2="48" y2="44" stroke="#2563eb" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>

      {/* 
        Stage 2: Welcome Text
      */}
      <div
        style={{
          position: 'absolute',
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
  );
};

export default SplashScreen;
