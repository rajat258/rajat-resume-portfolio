import { BriefcaseBusiness, Cloud, Code2, Sparkles, Terminal } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { sectionMeta, skillGroups } from "../data/resume";

const icons = {
  code: Code2,
  briefcase: BriefcaseBusiness,
  cloud: Cloud,
  terminal: Terminal,
  sparkles: Sparkles,
};

export function Skills({ ready }) {
  return (
    <section id="skills" className="section-shell">
      <SectionHeader ready={ready} {...sectionMeta.skills} />
      <div className="skill-grid">
        {skillGroups.map((group, index) => {
          const Icon = icons[group.icon] ?? Terminal;

          return (
            <Reveal className="skill-card" key={group.title} delay={index * 0.055} ready={ready} variant="scale">
              <div className="card-icon">
                <Icon size={18} />
              </div>
              <h3>{group.title}</h3>
              <div className="chip-list">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    data-nano={group.chipLines?.[skill] ?? group.nano?.line}
                    data-nano-mood={group.nano?.mood}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
