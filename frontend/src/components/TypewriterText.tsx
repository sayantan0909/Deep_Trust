import { useState, useEffect, useRef } from "react";

const WORDS     = ["moments", "milliseconds", "instantly", "quickly", "seconds!"];
const TYPE_MS   = 65;
const DELETE_MS = 38;
const PAUSE_MS  = 480;
const START_DELAY = 500;

export default function TypewriterText() {
  const [displayed,  setDisplayed]  = useState("");
  const [wordIndex,  setWordIndex]  = useState(0);
  const [isTyping,   setIsTyping]   = useState(false);
  const [done,       setDone]       = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    timer.current = setTimeout(() => setIsTyping(true), START_DELAY);
    return () => clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (!isTyping || done) return;
    const word   = WORDS[wordIndex];
    const isLast = wordIndex === WORDS.length - 1;
    const isFull = displayed === word;
    const isEmpty = displayed === "";

    if (!isFull) {
      timer.current = setTimeout(
        () => setDisplayed(word.slice(0, displayed.length + 1)), TYPE_MS
      );
    } else if (isFull && isLast) {
      setDone(true);
    } else if (isFull) {
      timer.current = setTimeout(
        () => setDisplayed(word.slice(0, displayed.length - 1)), PAUSE_MS
      );
    } else if (!isEmpty) {
      timer.current = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)), DELETE_MS
      );
    } else {
      setWordIndex(prev => prev + 1);
    }
    return () => clearTimeout(timer.current);
  }, [isTyping, displayed, wordIndex, done]);

  return (
    <span
      style={{
        display:       "inline-block",
        minWidth:      "8.2ch",
        color:         "#1D4ED8",
        fontWeight:    "inherit",
        fontSize:      "inherit",
        fontFamily:    "inherit",
        letterSpacing: "inherit",
        lineHeight:    "inherit",
        whiteSpace:    "nowrap",
      }}
      aria-label="seconds!"
      aria-live="polite"
    >
      {displayed}
      {!done && (
        <span style={{
          display:       "inline-block",
          width:         "3px",
          height:        "0.85em",
          background:    "#1D4ED8",
          marginLeft:    "2px",
          verticalAlign: "text-bottom",
          borderRadius:  "1px",
          animation:     "twCursorBlink 1s step-end infinite",
        }} />
      )}
      <style>{`
        @keyframes twCursorBlink {
          0%,100% { opacity: 1; }
          50%     { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
