import { useState, useEffect, useRef } from "react";

const WORDS = ["Secntrd", "Secopvr", "Secjlsd", "Secnnkf", "Secndso", "Seconds!"];

type Phase = "idle" | "entering" | "visible" | "exiting";

export default function CyclingText() {
  const [index, setIndex]   = useState(0);
  const [phase, setPhase]   = useState<Phase>("idle");
  const [done, setDone]     = useState(false);
  const timerRef            = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    // Initial delay before starting
    timerRef.current = setTimeout(() => {
      setPhase("entering");
    }, 400);

    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (phase === "idle" || done) return;

    if (phase === "entering") {
      // After enter transition completes → go to visible
      timerRef.current = setTimeout(() => setPhase("visible"), 280);
    }

    if (phase === "visible") {
      if (index === WORDS.length - 1) {
        // Last word — stay forever, mark as done
        setDone(true);
        return;
      }
      // Stay visible for WORD_DURATION then exit
      timerRef.current = setTimeout(() => setPhase("exiting"), 520);
    }

    if (phase === "exiting") {
      // After exit transition → advance to next word and enter
      timerRef.current = setTimeout(() => {
        setIndex(prev => prev + 1);
        setPhase("entering");
      }, 280);
    }

    return () => clearTimeout(timerRef.current);
  }, [phase, index, done]);

  // Compute inline styles based on phase
  const getStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: "inline-block",
      transition: "opacity 280ms cubic-bezier(0.22,1,0.36,1), transform 280ms cubic-bezier(0.22,1,0.36,1), filter 280ms ease",
      minWidth: "250px",        // Wider to adapt for 'Seconds!' and font scale
      textAlign: "left",
      whiteSpace: "nowrap",
    };

    if (phase === "idle") return { ...base, opacity: 0, transform: "translateY(18px)", filter: "blur(4px)" };
    if (phase === "entering") return { ...base, opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" };
    if (phase === "visible")  return { ...base, opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" };
    if (phase === "exiting")  return {
      ...base,
      opacity: 0,
      transform: "translateY(-14px)",
      filter: "blur(3px)",
      transition: "opacity 280ms cubic-bezier(0.55,0,1,0.45), transform 280ms cubic-bezier(0.55,0,1,0.45), filter 280ms ease",
    };
    return base;
  };

  // Color for each word — cycling through brand palette, "Seconds" gets hero accent
  const WORD_COLORS: Record<string, string> = {
    "Years":   "#059669",   // emerald
    "Months":  "#7C3AED",   // violet
    "Days":    "#0891B2",   // cyan
    "Hours":   "#D97706",   // amber
    "Minutes": "#DC2626",   // red
    "Seconds!": "#1D4ED8",  // strong blue
  };

  const currentWord = WORDS[index];

  return (
    <span style={getStyle()}>
      <span style={{
        color: WORD_COLORS[currentWord],
        fontWeight: "inherit",
        fontSize: "inherit",
        letterSpacing: "inherit",
        fontFamily: "inherit",
      }}>
        {currentWord}
      </span>
    </span>
  );
}
