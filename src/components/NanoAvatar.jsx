import { useEffect, useRef } from "react";
import { Avatar } from "@bible-strong/avatar-react";
import "@bible-strong/avatar-react/styles.css";
import definition from "../data/nano.avatar.json";

const EYE_REACH = 9;
const EYE_RANGE_PX = 320;

// Plays one of Nano's animations and pauses whenever the avatar is off screen
// or the tab is hidden, so idle loops never cost frames nobody can see.
// The eye group also drifts toward a mouse pointer; the renderer rewrites the
// eye paths every frame but never touches the group's transform.
export default function NanoAvatar({ mood = "idle", size = 72, className = "", label = "Nano", onAnimationEnd }) {
  const avatarRef = useRef(null);
  const wrapRef = useRef(null);
  const moodRef = useRef(mood);
  const visibleRef = useRef(true);
  const mountedMood = useRef(mood);

  useEffect(() => {
    moodRef.current = mood;
    if (mood === mountedMood.current) {
      mountedMood.current = null;
      return;
    }
    if (visibleRef.current) {
      avatarRef.current?.play(mood);
    }
  }, [mood]);

  useEffect(() => {
    const node = wrapRef.current;
    let inView = true;

    const sync = () => {
      const visible = inView && document.visibilityState === "visible";
      if (visible === visibleRef.current) return;
      visibleRef.current = visible;
      if (visible) {
        avatarRef.current?.play(moodRef.current);
      } else {
        avatarRef.current?.pause();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    const node = wrapRef.current;
    const eyes = node.querySelector(".bs-avatar__svg > g[clip-path]");
    if (!eyes || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame = 0;
    let pointer = null;

    const update = () => {
      frame = 0;
      if (!pointer || !visibleRef.current) {
        eyes.style.transform = "";
        return;
      }
      const rect = node.getBoundingClientRect();
      const dx = pointer.x - (rect.left + rect.width / 2);
      const dy = pointer.y - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy) || 1;
      const reach = EYE_REACH * Math.min(1, distance / EYE_RANGE_PX);
      eyes.style.transform = `translate(${(dx / distance) * reach}px, ${(dy / distance) * reach}px)`;
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const handleMove = (event) => {
      if (event.pointerType !== "mouse") return;
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };

    const handleLeave = () => {
      pointer = null;
      schedule();
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`nano-avatar ${className}`.trim()}>
      <Avatar
        ref={avatarRef}
        definition={definition}
        defaultAnimation={mood}
        size={size}
        ariaLabel={label}
        onAnimationEnd={onAnimationEnd}
      />
    </div>
  );
}
