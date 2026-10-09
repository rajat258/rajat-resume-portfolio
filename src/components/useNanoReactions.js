import { useEffect, useRef, useState } from "react";
import { NANO_EVENT } from "./nanoBus";

const HOVER_SETTLE_MS = 220;
const HOLD_MS = 2600;
const CELEBRATE_MS = 2300;

// Turns data-nano hovers, taps, focus and clicks, plus nanoReact() calls,
// into one { line, mood, key } reaction. Hovers wait for the pointer to
// settle so sweeping across a grid never makes Nano chatter.
export function useNanoReactions() {
  const [reaction, setReaction] = useState(null);
  const settleTimer = useRef(0);
  const clearTimer = useRef(0);
  const lastTarget = useRef(null);

  useEffect(() => {
    let counter = 0;

    const show = ({ line, mood, holdMs = HOLD_MS }) => {
      window.clearTimeout(clearTimer.current);
      counter += 1;
      setReaction({ line: line || null, mood: mood || null, key: counter });
      clearTimer.current = window.setTimeout(() => setReaction(null), holdMs);
    };

    const fromElement = (element, extra) => ({
      line: element.dataset.nano,
      mood: element.dataset.nanoMood,
      ...extra,
    });

    const handleOver = (event) => {
      const element = event.target.closest?.("[data-nano]");
      if (!element || element === lastTarget.current) return;
      lastTarget.current = element;
      window.clearTimeout(settleTimer.current);
      const delay = event.pointerType === "mouse" ? HOVER_SETTLE_MS : 0;
      settleTimer.current = window.setTimeout(() => show(fromElement(element)), delay);
    };

    const handleOut = (event) => {
      const element = event.target.closest?.("[data-nano]");
      if (!element || element.contains(event.relatedTarget)) return;
      if (element === lastTarget.current) lastTarget.current = null;
      window.clearTimeout(settleTimer.current);
    };

    const handleFocus = (event) => {
      const element = event.target.closest?.("[data-nano]");
      if (element && event.target.matches(":focus-visible")) show(fromElement(element));
    };

    const handleClick = (event) => {
      const element = event.target.closest?.("[data-nano-celebrate]");
      if (!element) return;
      window.clearTimeout(settleTimer.current);
      show(fromElement(element, { mood: "celebrate", holdMs: CELEBRATE_MS }));
    };

    const handleBus = (event) => show(event.detail);

    document.addEventListener("pointerover", handleOver, { passive: true });
    document.addEventListener("pointerout", handleOut, { passive: true });
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("click", handleClick);
    window.addEventListener(NANO_EVENT, handleBus);

    return () => {
      window.clearTimeout(settleTimer.current);
      window.clearTimeout(clearTimer.current);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerout", handleOut);
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("click", handleClick);
      window.removeEventListener(NANO_EVENT, handleBus);
    };
  }, []);

  return reaction;
}
