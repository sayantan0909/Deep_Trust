import { useEffect, useRef } from "react";

export default function InteractiveGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CELL_SIZE = 70;
    
    let animationId: number;
    let mouseX = -999;
    let mouseY = -999;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -999;
      mouseY = -999;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const CELL_COLORS = [
      "rgba(255, 182, 193, ",  // soft light pink
      "rgba(135, 206, 250, ",  // sky blue
      "rgba(255, 160, 160, ",  // soft red
      "rgba(255, 236, 153, ",  // warm yellow
      "rgba(152, 224, 152, ",  // soft green
      "rgba(200, 162, 255, ",  // light lavender
      "rgba(255, 209, 153, ",  // peach
      "rgba(153, 230, 230, ",  // mint cyan
    ];

    function getCellColorBase(col: number, row: number): string {
      const index = (col * 3 + row * 7 + col * row) % CELL_COLORS.length;
      return CELL_COLORS[index];
    }
    
    let offsetY = 0;
    const SCROLL_SPEED = 0.2;
    
    const cellAlpha = new Map<string, number>();

    const draw = () => {
      offsetY += SCROLL_SPEED;
      if (offsetY >= CELL_SIZE) offsetY -= CELL_SIZE; // Use -= to keep smooth remainder
    
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / CELL_SIZE) + 1;
      const rows = Math.ceil(canvas.height / CELL_SIZE) + 2;
      
      const hoveredCol = Math.floor(mouseX / CELL_SIZE);
      const hoveredRow = Math.floor((mouseY - offsetY) / CELL_SIZE);

      for (let row = -1; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * CELL_SIZE;
          const y = row * CELL_SIZE + offsetY;
          
          const isHovered = col === hoveredCol && row === hoveredRow && mouseX !== -999 && mouseY !== -999;
          
          const key = `${col},${row}`;
          const targetAlpha = isHovered ? 1 : 0;
          const currentAlpha = cellAlpha.get(key) ?? 0;
          const newAlpha = currentAlpha + (targetAlpha - currentAlpha) * 0.18;
          cellAlpha.set(key, newAlpha);

          if (newAlpha > 0.01) {
            // Apply newAlpha as multiplier to base color opacity
            const baseColor = getCellColorBase(col, row);
            ctx.fillStyle = `${baseColor}${(0.55 * newAlpha).toFixed(3)})`;
            ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.18 + 0.17 * newAlpha})`; 
          } else {
            ctx.fillStyle = `rgba(0,0,0,0)`;
            ctx.strokeStyle = `rgba(0, 0, 0, 0.18)`;
          }
          
          ctx.lineWidth = 0.8;
          ctx.strokeRect(x + 0.5, y + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });
    
    resizeObserver.observe(canvas);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0,
        transition: "opacity 1.2s ease",
      }}
    />
  );
}
