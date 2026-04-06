import React, { useCallback, useRef, useEffect } from 'react';

interface GeometricBackgroundProps {
  variant?: 'text' | 'image' | 'audio' | 'video';
}

/* ─── Interactive Grid (single cell highlight) ─── */
const CELL = 48;

const InteractiveGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cells = useRef<Map<string, { alpha: number; color: string }>>(new Map());
  const animFrame = useRef<number>(0);

  const palette = ['#FBBF24', '#60A5FA', '#A78BFA', '#F472B6', '#34D399', '#FB923C', '#67E8F9'];
  const getColor = () => palette[Math.floor(Math.random() * palette.length)];

  const handleMouse = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor(x / CELL);
    const row = Math.floor(y / CELL);
    const key = `${col},${row}`;

    // Only light up the single cell under cursor
    if (!cells.current.has(key)) {
      cells.current.set(key, { alpha: 0.5, color: getColor() });
    } else {
      const cell = cells.current.get(key)!;
      cell.alpha = 0.5;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = 'rgba(180, 175, 165, 0.35)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= canvas.width; x += CELL) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += CELL) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Highlighted cells
      const toDelete: string[] = [];
      cells.current.forEach((cell, key) => {
        const [col, row] = key.split(',').map(Number);
        ctx.fillStyle = cell.color;
        ctx.globalAlpha = cell.alpha;
        ctx.fillRect(col * CELL, row * CELL, CELL, CELL);
        ctx.globalAlpha = 1;
        cell.alpha -= 0.008;
        if (cell.alpha <= 0) toDelete.push(key);
      });
      toDelete.forEach(k => cells.current.delete(k));

      animFrame.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      onMouseMove={handleMouse}
      style={{ pointerEvents: 'auto' }}
    />
  );
};

/* ─── Drifting Shape (moves across the whole page) ─── */
interface DriftingShapeProps {
  children: React.ReactNode;
  duration: number;  // seconds for one full cycle
  pathIndex: number; // which path pattern to use
}

const paths = [
  // Each path is a set of keyframe percentages with x%, y% positions
  { name: 'drift-a', keyframes: `
    0%   { transform: translate(5vw, 8vh) rotate(0deg); }
    20%  { transform: translate(75vw, 15vh) rotate(45deg); }
    40%  { transform: translate(60vw, 70vh) rotate(90deg); }
    60%  { transform: translate(10vw, 55vh) rotate(180deg); }
    80%  { transform: translate(40vw, 5vh) rotate(270deg); }
    100% { transform: translate(5vw, 8vh) rotate(360deg); }
  `},
  { name: 'drift-b', keyframes: `
    0%   { transform: translate(80vw, 10vh) rotate(0deg); }
    25%  { transform: translate(15vw, 35vh) rotate(-60deg); }
    50%  { transform: translate(70vw, 65vh) rotate(-120deg); }
    75%  { transform: translate(25vw, 10vh) rotate(-240deg); }
    100% { transform: translate(80vw, 10vh) rotate(-360deg); }
  `},
  { name: 'drift-c', keyframes: `
    0%   { transform: translate(50vw, 5vh) rotate(0deg); }
    20%  { transform: translate(85vw, 40vh) rotate(30deg); }
    45%  { transform: translate(55vw, 80vh) rotate(80deg); }
    65%  { transform: translate(8vw, 45vh) rotate(150deg); }
    85%  { transform: translate(30vw, 10vh) rotate(280deg); }
    100% { transform: translate(50vw, 5vh) rotate(360deg); }
  `},
  { name: 'drift-d', keyframes: `
    0%   { transform: translate(10vw, 70vh) rotate(0deg); }
    30%  { transform: translate(65vw, 8vh) rotate(60deg); }
    50%  { transform: translate(85vw, 55vh) rotate(120deg); }
    70%  { transform: translate(20vw, 80vh) rotate(200deg); }
    100% { transform: translate(10vw, 70vh) rotate(360deg); }
  `},
  { name: 'drift-e', keyframes: `
    0%   { transform: translate(90vw, 50vh) rotate(0deg); }
    25%  { transform: translate(30vw, 75vh) rotate(-45deg); }
    50%  { transform: translate(5vw, 20vh) rotate(-90deg); }
    75%  { transform: translate(60vw, 5vh) rotate(-200deg); }
    100% { transform: translate(90vw, 50vh) rotate(-360deg); }
  `},
  { name: 'drift-f', keyframes: `
    0%   { transform: translate(40vw, 80vh) rotate(0deg); }
    20%  { transform: translate(80vw, 30vh) rotate(50deg); }
    50%  { transform: translate(15vw, 10vh) rotate(130deg); }
    75%  { transform: translate(55vw, 60vh) rotate(250deg); }
    100% { transform: translate(40vw, 80vh) rotate(360deg); }
  `},
  { name: 'drift-g', keyframes: `
    0%   { transform: translate(20vw, 20vh) rotate(0deg); }
    30%  { transform: translate(70vw, 60vh) rotate(70deg); }
    60%  { transform: translate(90vw, 15vh) rotate(160deg); }
    80%  { transform: translate(35vw, 75vh) rotate(260deg); }
    100% { transform: translate(20vw, 20vh) rotate(360deg); }
  `},
];

const DriftingShape: React.FC<DriftingShapeProps> = ({ children, duration, pathIndex }) => {
  const path = paths[pathIndex % paths.length];
  return (
    <>
      <style>{`@keyframes ${path.name} { ${path.keyframes} }`}</style>
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          animation: `${path.name} ${duration}s ease-in-out infinite`,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </>
  );
};

/* ─── Main Component ─── */
const GeometricBackground: React.FC<GeometricBackgroundProps> = ({ variant = 'text' }) => {

  // Shared pool of shapes, each variant picks slightly different durations
  const baseDurations: Record<string, number[]> = {
    text:  [28, 35, 22, 40, 32, 26, 38],
    image: [32, 25, 38, 30, 28, 42, 34],
    audio: [26, 38, 30, 34, 22, 36, 28],
    video: [34, 28, 42, 26, 36, 30, 24],
  };

  const durations = baseDurations[variant];

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Interactive Grid Canvas */}
      <InteractiveGrid />

      {/* Drifting shapes layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Yellow diamond */}
        <DriftingShape duration={durations[0]} pathIndex={0}>
          <div className="w-14 h-14 bg-[#FBBF24] border-[3px] border-[#0a0a0a] rotate-45 opacity-50 shadow-[3px_3px_0_#0a0a0a]" />
        </DriftingShape>

        {/* Purple rounded square */}
        <DriftingShape duration={durations[1]} pathIndex={1}>
          <div className="w-12 h-12 bg-[#A78BFA] border-[3px] border-[#0a0a0a] rounded-lg opacity-45 shadow-[3px_3px_0_#0a0a0a]" />
        </DriftingShape>

        {/* Blue triangle */}
        <DriftingShape duration={durations[2]} pathIndex={2}>
          <div style={{
            width: 0, height: 0,
            borderLeft: '24px solid transparent',
            borderRight: '24px solid transparent',
            borderBottom: '42px solid #60A5FA',
            filter: 'drop-shadow(3px 3px 0 #0a0a0a)',
            opacity: 0.5,
          }} />
        </DriftingShape>

        {/* Pink parallelogram */}
        <DriftingShape duration={durations[3]} pathIndex={3}>
          <div className="w-16 h-10 bg-[#F472B6] border-[3px] border-[#0a0a0a] -skew-x-12 opacity-45 shadow-[3px_3px_0_#0a0a0a] rounded-sm" />
        </DriftingShape>

        {/* Green cross */}
        <DriftingShape duration={durations[4]} pathIndex={4}>
          <div className="relative w-10 h-10 opacity-50">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-10 bg-[#34D399] border-[2px] border-[#0a0a0a] rounded-sm" />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-10 h-3 bg-[#34D399] border-[2px] border-[#0a0a0a] rounded-sm" />
          </div>
        </DriftingShape>

        {/* Yellow star */}
        <DriftingShape duration={durations[5]} pathIndex={5}>
          <div className="text-[#FBBF24] opacity-50 text-3xl font-black" style={{ textShadow: '2px 2px 0 #0a0a0a' }}>✦</div>
        </DriftingShape>

        {/* Orange circle */}
        <DriftingShape duration={durations[6]} pathIndex={6}>
          <div className="w-8 h-8 bg-[#FB923C] border-[2px] border-[#0a0a0a] rounded-full opacity-40 shadow-[2px_2px_0_#0a0a0a]" />
        </DriftingShape>
      </div>
    </div>
  );
};

export default GeometricBackground;
