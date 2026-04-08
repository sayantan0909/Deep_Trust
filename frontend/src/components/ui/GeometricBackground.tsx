import React, { useEffect, useRef } from 'react';
import InteractiveGridBackground from '../InteractiveGridBackground';

interface GeometricBackgroundProps {
  variant?: 'text' | 'image' | 'audio' | 'video';
}

const GeometricBackground: React.FC<GeometricBackgroundProps> = ({ variant }) => {
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const shape4Ref = useRef<HTMLDivElement>(null);
  const shape5Ref = useRef<HTMLDivElement>(null);
  const shape6Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (shape1Ref.current) shape1Ref.current.style.transform = `rotate(${15 + scrollY * 0.08}deg) translateY(${scrollY * -0.25}px)`;
      if (shape2Ref.current) shape2Ref.current.style.transform = `translateY(${scrollY * 0.18}px) translateX(${scrollY * 0.06}px)`;
      if (shape3Ref.current) shape3Ref.current.style.transform = `translateY(${scrollY * -0.15}px) rotate(${scrollY * 0.05}deg)`;
      if (shape4Ref.current) shape4Ref.current.style.transform = `translateY(${scrollY * 0.22}px) rotate(${scrollY * -0.07}deg)`;
      if (shape5Ref.current) shape5Ref.current.style.transform = `translateX(${scrollY * -0.12}px) translateY(${scrollY * 0.1}px)`;
      if (shape6Ref.current) shape6Ref.current.style.transform = `translateY(${scrollY * -0.20}px) scale(${1 + scrollY * 0.0003})`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes floatA {
          0%, 100% { margin-top: 0px; }
          50% { margin-top: -12px; }
        }
        @keyframes floatB {
          0%, 100% { margin-top: 0px; }
          50% { margin-top: 10px; }
        }
        @keyframes floatC {
          0%, 100% { margin-left: 0px; }
          50% { margin-left: -8px; }
        }
        .float-a { animation: floatA 5s ease-in-out infinite; }
        .float-b { animation: floatB 6s ease-in-out infinite 1s; }
        .float-c { animation: floatC 7s ease-in-out infinite 2s; }
      `}</style>
      
      <div className="absolute inset-0 overflow-hidden z-0">
        <InteractiveGridBackground />

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div ref={shape1Ref} className="float-a" style={{
            position: "absolute", top: "8%", left: "4%", width: 90, height: 90, background: "#FBBF24", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", opacity: 0.75, transform: "rotate(15deg)", zIndex: 1
          }} />
          <div ref={shape2Ref} className="float-b" style={{
            position: "absolute", top: "12%", right: "6%", width: 80, height: 80, background: "#60A5FA", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)", opacity: 0.70, zIndex: 1
          }} />
          <div ref={shape3Ref} className="float-c" style={{
            position: "absolute", top: "45%", left: "2%", width: 70, height: 70, background: "#A78BFA", clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)", opacity: 0.65, zIndex: 1
          }} />
          <div ref={shape4Ref} className="float-a" style={{
            position: "absolute", bottom: "15%", right: "5%", width: 60, height: 60, background: "#34D399", clipPath: "polygon(33% 0%,66% 0%,66% 33%,100% 33%,100% 66%,66% 66%,66% 100%,33% 100%,33% 66%,0% 66%,0% 33%,33% 33%)", opacity: 0.70, zIndex: 1
          }} />
          <div ref={shape5Ref} className="float-b" style={{
            position: "absolute", bottom: "10%", left: "8%", width: 100, height: 45, background: "#F472B6", clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)", opacity: 0.65, zIndex: 1
          }} />
          <div ref={shape6Ref} className="float-c" style={{
            position: "absolute", top: "60%", right: "12%", width: 65, height: 65, background: "#FCD34D", clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)", opacity: 0.72, zIndex: 1
          }} />
        </div>
      </div>
    </>
  );
};

export default GeometricBackground;
