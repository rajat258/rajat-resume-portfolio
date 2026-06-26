import { Reveal } from "../components/Reveal";
import { aboutContent } from "../data/resume";

export function About({ ready }) {
  return (
    <section id="about" className="section-shell narrow-section">
      <Reveal className="readme-card" ready={ready} variant="scale">
        <span className="section-kicker">{aboutContent.kicker}</span>
        <p>{aboutContent.copy}</p>
        <code>{aboutContent.code}</code>
      </Reveal>
    </section>
  );
}
