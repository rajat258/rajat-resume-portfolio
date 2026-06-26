import { ExternalLink } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { projects, sectionMeta } from "../data/resume";

export function Projects({ ready }) {
  return (
    <section id="projects" className="section-shell">
      <SectionHeader ready={ready} {...sectionMeta.projects} />
      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal
            className="project-card"
            key={project.title}
            delay={index * 0.045}
            ready={ready}
            variant={index % 2 === 0 ? "slideLeft" : "slideRight"}
          >
            <a href={project.href} target="_blank" rel="noreferrer">
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
    </section>
  );
}
