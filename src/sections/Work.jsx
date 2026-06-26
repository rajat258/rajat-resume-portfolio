import { ExternalLink, MapPin } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { experience, sectionMeta } from "../data/resume";

export function Work({ ready }) {
  return (
    <section id="work" className="section-shell">
      <SectionHeader ready={ready} {...sectionMeta.work} />
      <div className="timeline">
        {experience.map((job, index) => (
          <Reveal className="timeline-item" key={job.company} delay={index * 0.1} ready={ready} variant="slideRight">
            <div className="timeline-dot" />
            <article className="timeline-card">
              <div className="timeline-head">
                <div>
                  <h3>
                    {job.href ? (
                      <a className="company-link" href={job.href} target="_blank" rel="noreferrer">
                        {job.company}
                        <ExternalLink size={16} aria-hidden="true" />
                      </a>
                    ) : (
                      job.company
                    )}
                  </h3>
                  <p>{job.role}</p>
                </div>
                <span>{job.period}</span>
              </div>
              <div className="inline-location">
                <MapPin size={15} aria-hidden="true" />
                {job.location}
              </div>
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
