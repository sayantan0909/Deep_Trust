import { useState, useEffect } from "react";

export function useNavbarScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isIdle, setIsIdle] = useState(true);

  useEffect(() => {
    let lastY = 0;
    let idleTimer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      const current = window.scrollY;
      const direction = current > lastY ? "down" : "up";
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (current / totalHeight) * 100 : 0;

      setScrollY(current);
      setScrollDirection(direction);
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      
      if (direction === "down" && current > 300) {
        setIsHidden(true);
      } else if (direction === "up" && current > 200) {
        setIsHidden(false);
      } else if (current <= 200) {
        setIsHidden(false);
      }
      
      lastY = current;

      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIsIdle(true);
      }, 1500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    idleTimer = setTimeout(() => {
      setIsIdle(true);
    }, 1500);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idleTimer);
    };
  }, []);

  return { scrollY, scrollDirection, scrollProgress, isHidden, activeSection, isIdle };
}
