import { Award, BriefcaseBusiness } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { credentials, sectionMeta } from "../data/resume";

export function Credentials({ ready }) {
  return (
    <section id="credentials" className="section-shell credentials-section">
      <SectionHeader ready={ready} {...sectionMeta.credentials} />
      <div className="credentials-grid">
        {credentials.map((credential, index) => {
          const Icon = credential.label === "Education" ? BriefcaseBusiness : Award;
          const content = (
            <>
              <Icon size={19} aria-hidden="true" />
              <span>{credential.label}</span>
              <strong>{credential.title}</strong>
              {credential.description && <p>{credential.description}</p>}
            </>
          );

          return (
            <Reveal className="credential-card" key={credential.title} delay={index * 0.08} ready={ready} variant="scale">
              {credential.href ? (
                <a href={credential.href} target="_blank" rel="noreferrer">
                  {content}
                </a>
              ) : (
                <div>{content}</div>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
