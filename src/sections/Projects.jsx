import { ExternalLink } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { projectGroups, sectionMeta } from "../data/resume";

export function Projects({ ready }) {
  return (
    <section id="projects" className="section-shell">
      <SectionHeader ready={ready} {...sectionMeta.projects} />
      {projectGroups.map((group) => (
        <div className="project-group" key={group.title}>
          <Reveal className="project-group-head" ready={ready} variant="slideLeft">
            <h3>{group.title}</h3>
            <span>{group.items.length}</span>
          </Reveal>
          <div className="project-grid">
            {group.items.map((project, index) => (
              <Reveal
                className="project-card"
                key={project.title}
                delay={index * 0.045}
                ready={ready}
                variant={index % 2 === 0 ? "slideLeft" : "slideRight"}
              >
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  data-nano={project.nano}
                  data-nano-mood="excited"
                >
                  <div className="project-head">
                    <h3>{project.title}</h3>
                    <ExternalLink size={18} aria-hidden="true" />
                  </div>
                  <span>{project.meta}</span>
                  <p>{project.description}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
