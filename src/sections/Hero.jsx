import { lazy, Suspense, useState } from "react";
import { Download, Mail } from "lucide-react";
import { ContributionGraph } from "../components/ContributionGraph";
import { Reveal } from "../components/Reveal";
import { heroContent, nanoContent, profile, stats } from "../data/resume";

const NanoAvatar = lazy(() => import("../components/NanoAvatar"));

function NanoBadge({ ready }) {
  const [mood, setMood] = useState("idle");

  return (
    <button
      type="button"
      className={`nano-badge${ready ? " is-ready" : ""}`}
      aria-label={nanoContent.label}
      onPointerEnter={(event) => event.pointerType === "mouse" && mood === "idle" && setMood("curious")}
      onPointerLeave={() => mood === "curious" && setMood("idle")}
      onClick={() => setMood("celebrate")}
    >
      {ready && (
        <Suspense fallback={null}>
          <NanoAvatar mood={mood} size="100%" label={nanoContent.label} onAnimationEnd={() => setMood("idle")} />
        </Suspense>
      )}
    </button>
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
          <a className="button button-primary" href="/Rajat_Nanavati_RN.pdf" download="Rajat_Nanavati_RN.pdf">
            <Download size={16} aria-hidden="true" />
            {heroContent.downloadLabel}
          </a>
          <a className="button button-ghost" href={profile.emailHref}>
            <Mail size={16} aria-hidden="true" />
            {heroContent.contactLabel}
          </a>
          <a className="button button-ghost" href="#projects">
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
