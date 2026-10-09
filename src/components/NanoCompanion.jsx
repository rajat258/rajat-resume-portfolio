import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ease } from "../config/animations";
import { nanoContent } from "../data/resume";
import { useNanoReactions } from "./useNanoReactions";

const NanoAvatar = lazy(() => import("./NanoAvatar"));

const glowByMood = {
  thinking: "var(--purple)",
  proud: "var(--green)",
  celebrate: "var(--green)",
  drowsy: "var(--muted-2)",
};

const LINE_MS = 3400;
const sections = nanoContent.sections;

function useActiveSection() {
  const [active, setActive] = useState("hero");
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const nodes = sections.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    const hero = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), {
      rootMargin: "0px 0px -35% 0px",
    });

    nodes.forEach((node) => spy.observe(node));
    if (nodes[0]) hero.observe(nodes[0]);

    return () => {
      spy.disconnect();
      hero.disconnect();
    };
  }, []);

  return { active, heroVisible };
}

function useDrowsy(delay) {
  const [asleep, setAsleep] = useState(false);

  useEffect(() => {
    let timer;
    const wake = () => {
      setAsleep(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setAsleep(true), delay);
    };
    const events = ["scroll", "pointermove", "keydown", "touchstart"];

    wake();
    events.forEach((name) => window.addEventListener(name, wake, { passive: true }));
    return () => {
      window.clearTimeout(timer);
      events.forEach((name) => window.removeEventListener(name, wake));
    };
  }, [delay]);

  return asleep;
}

export function NanoCompanion({ ready }) {
  const { active, heroVisible } = useActiveSection();
  const asleep = useDrowsy(nanoContent.sleepAfterMs);
  const reaction = useNanoReactions();
  const [hovering, setHovering] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [line, setLine] = useState(null);
  const lineTimer = useRef(0);
  const wasAsleep = useRef(false);

  const shown = ready && !heroVisible;
  const section = sections.find(({ id }) => id === active) ?? sections[0];
  const mood = asleep
    ? "drowsy"
    : celebrating
      ? "celebrate"
      : reaction?.mood || (hovering ? "curious" : section.mood);

  function say(text, ms = LINE_MS) {
    window.clearTimeout(lineTimer.current);
    setLine(text);
    if (ms) lineTimer.current = window.setTimeout(() => setLine(null), ms);
  }

  useEffect(() => () => window.clearTimeout(lineTimer.current), []);

  useEffect(() => {
    if (shown && section.line) say(section.line);
  }, [shown, section]);

  const shownRef = useRef(shown);
  shownRef.current = shown;

  useEffect(() => {
    if (shownRef.current && reaction?.line) say(reaction.line);
  }, [reaction]);

  useEffect(() => {
    if (asleep) {
      wasAsleep.current = true;
      say(nanoContent.sleepLine, 0);
    } else if (wasAsleep.current) {
      wasAsleep.current = false;
      say(nanoContent.wakeLine, 2200);
    }
  }, [asleep]);

  function handleClick() {
    setCelebrating(true);
    say(nanoContent.celebrateLine);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleEnter(event) {
    if (event.pointerType !== "mouse") return;
    setHovering(true);
    if (!line) say(nanoContent.hoverLine, 1800);
  }

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          className="nano-companion"
          style={{ "--nano-glow": glowByMood[mood] ?? "var(--blue)" }}
          initial={{ opacity: 0, y: 28, scale: 0.72 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.72 }}
          transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.7 }}
        >
          <AnimatePresence mode="wait">
            {line && (
              <motion.p
                key={line}
                className="nano-bubble"
                role="status"
                initial={{ opacity: 0, y: 6, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.96 }}
                transition={{ duration: 0.32, ease }}
              >
                {line}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="button"
            className="nano-companion-button"
            aria-label={nanoContent.companionLabel}
            onClick={handleClick}
            onPointerEnter={handleEnter}
            onPointerLeave={() => setHovering(false)}
          >
            <span className="nano-glow" aria-hidden="true" />
            <span className="nano-float">
              <Suspense fallback={null}>
                <NanoAvatar
                  mood={mood}
                  size="100%"
                  label={nanoContent.label}
                  onAnimationEnd={() => setCelebrating(false)}
                />
              </Suspense>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
