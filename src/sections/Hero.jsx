import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { ContributionGraph } from "../components/ContributionGraph";
import { Reveal } from "../components/Reveal";
import { useNanoReactions } from "../components/useNanoReactions";
import { ease } from "../config/animations";
import { heroContent, nanoContent, profile, stats } from "../data/resume";

const NanoAvatar = lazy(() => import("../components/NanoAvatar"));

const WAKE_DELAY_MS = 900;
const HELLO_MS = 2600;

// Nano sleeps on the photo until the intro has finished and the badge is in
// view (below the fold on phones), then wakes up, says hello, and answers
// hovers while it stays on screen. Off screen the companion does the talking.
function NanoBadge({ ready }) {
  const [base, setBase] = useState("sleeping");
  const [hovering, setHovering] = useState(false);
  const [hello, setHello] = useState(null);
  const badgeRef = useRef(null);
  const inView = useInView(badgeRef, { amount: 0.6 });
  const latestReaction = useNanoReactions();
  const reaction = inView ? latestReaction : null;

  useEffect(() => {
    if (!ready || !inView || base !== "sleeping") return undefined;
    const timer = window.setTimeout(() => {
      setBase("waking");
      setHello(nanoContent.helloLine);
    }, WAKE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [ready, inView, base]);

  useEffect(() => {
    if (!hello) return undefined;
    const timer = window.setTimeout(() => setHello(null), HELLO_MS);
    return () => window.clearTimeout(timer);
  }, [hello]);

  const awake = base !== "sleeping" && base !== "waking";
  const mood = (awake && reaction?.mood) || (awake && hovering ? "curious" : base);
  const line = reaction?.line ?? hello;

  return (
    <>
      <button
        ref={badgeRef}
        type="button"
        className={`nano-badge${ready ? " is-ready" : ""}`}
        aria-label={nanoContent.label}
        onPointerEnter={(event) => event.pointerType === "mouse" && setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        onClick={() => awake && setBase("celebrate")}
      >
        {ready && (
          <Suspense fallback={null}>
            <NanoAvatar mood={mood} size="100%" label={nanoContent.label} onAnimationEnd={() => setBase("idle")} />
          </Suspense>
        )}
      </button>
      <AnimatePresence mode="wait">
        {ready && line && (
          <motion.p
            key={line}
            className="nano-bubble nano-badge-bubble"
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
    </>
  );
}

export function Hero({ ready }) {
  return (
    <section id="hero" className="hero section-shell">
      <Reveal className="hero-copy" ready={ready} variant="slideLeft" amount={0.1} eager>
        <div className="meta-row">
          <span>{profile.handle}</span>
          <span>{heroContent.roleLabel}</span>
          <span>{heroContent.locationLabel}</span>
        </div>
        <h1>{profile.name}</h1>
        <h2>{profile.headline}</h2>
        <p>{profile.summary}</p>
        <div className="button-row">
          <a
            className="button button-primary"
            href="/Rajat_Nanavati_RN.pdf"
            download="Rajat_Nanavati_RN.pdf"
            data-nano={heroContent.nano.download}
            data-nano-mood="happy"
            data-nano-celebrate=""
          >
            <Download size={16} aria-hidden="true" />
            {heroContent.downloadLabel}
          </a>
          <a
            className="button button-ghost"
            href={profile.emailHref}
            data-nano={heroContent.nano.contact}
            data-nano-mood="happy"
            data-nano-celebrate=""
          >
            <Mail size={16} aria-hidden="true" />
            {heroContent.contactLabel}
          </a>
          <a className="button button-ghost" href="#projects" data-nano={heroContent.nano.projects} data-nano-mood="excited">
            {heroContent.projectsLabel}
          </a>
        </div>
      </Reveal>

      <Reveal className="rn-card" delay={0.12} ready={ready} variant="scale" amount={0.1} eager>
        <div className="repo-top">
          <span>{heroContent.portfolioRepo}</span>
          <span>{heroContent.repoVisibility}</span>
        </div>
        <div className="profile-photo-wrap">
          <div className="profile-photo-frame">
            <img src={heroContent.photo} alt={heroContent.photoAlt} />
          </div>
          <NanoBadge ready={ready} />
        </div>
        <ContributionGraph ready={ready} />
        <p>{heroContent.cardCopy}</p>
        <div className="stats-grid">
          {stats.slice(0, 2).map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
