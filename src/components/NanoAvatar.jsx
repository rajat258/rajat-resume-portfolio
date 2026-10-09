import { useEffect, useRef } from "react";
import { Avatar } from "@bible-strong/avatar-react";
import "@bible-strong/avatar-react/styles.css";
import definition from "../data/nano.avatar.json";

// Plays one of Nano's animations and pauses whenever the avatar is off screen
// or the tab is hidden, so idle loops never cost frames nobody can see.
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
