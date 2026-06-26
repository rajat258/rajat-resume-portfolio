import { BriefcaseBusiness, Cloud, Code2, Terminal } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { sectionMeta, skillGroups } from "../data/resume";

export function Skills({ ready }) {
  return (
    <section id="skills" className="section-shell">
      <SectionHeader ready={ready} {...sectionMeta.skills} />
      <div className="skill-grid">
        {skillGroups.map((group, index) => (
          <Reveal className="skill-card" key={group.title} delay={index * 0.055} ready={ready} variant="scale">
            <div className="card-icon">
              {index === 0 && <Code2 size={18} />}
              {index === 1 && <BriefcaseBusiness size={18} />}
              {index === 2 && <Cloud size={18} />}
              {index > 2 && <Terminal size={18} />}
            </div>
            <h3>{group.title}</h3>
            <div className="chip-list">
              {group.items.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
