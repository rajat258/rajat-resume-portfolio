import { Reveal } from "./Reveal";

export function SectionHeader({ kicker, title, copy, ready }) {
  return (
    <Reveal className="section-header" ready={ready} variant="slideLeft">
      <span className="section-kicker">{kicker}</span>
      <div>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
    </Reveal>
  );
}
