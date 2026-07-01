import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AmbientBackground } from "./components/AmbientBackground";
import { Navigation } from "./components/Navigation";
import { ScrollProgress } from "./components/ScrollProgress";
import { TypewriterLoader } from "./components/TypewriterLoader";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Credentials } from "./sections/Credentials";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Work } from "./sections/Work";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    if (loading || introReady) {
      return undefined;
    }

    const timer = window.setTimeout(() => setIntroReady(true), 80);
    return () => window.clearTimeout(timer);
  }, [introReady, loading]);

  function handleLoaderDone() {
    setLoading(false);
  }

  return (
    <>
      {loading && <TypewriterLoader onDone={handleLoaderDone} />}
      <div className={`app${introReady ? " is-ready" : ""}`}>
        <AmbientBackground />
        <ScrollProgress />
        <Navigation ready={introReady} />
        <main>
          <Hero ready={introReady} />
          <About ready={introReady} />
          <Skills ready={introReady} />
          <Work ready={introReady} />
          <Projects ready={introReady} />
          <Credentials ready={introReady} />
          <Contact ready={introReady} />
        </main>
      </div>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
