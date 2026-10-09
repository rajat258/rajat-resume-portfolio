import { Github, Linkedin, Mail, Phone, Terminal } from "lucide-react";
import { ContactLink } from "../components/ContactLink";
import { Reveal } from "../components/Reveal";
import { SayHiForm } from "../components/SayHiForm";
import { nanoContent, profile, sayHiContent, sectionMeta } from "../data/resume";

export function Contact({ ready }) {
  return (
    <section id="contact" className="section-shell contact-section">
      <Reveal className="contact-card" delay={0.08} ready={ready} variant="scale">
        <span className="section-kicker">{sectionMeta.contact.kicker}</span>
        <h2>Connect with {profile.handle.replace("258", "_258")}</h2>
        <div className="contact-list">
          <ContactLink
            icon={<Phone size={18} />}
            href={profile.phoneHref}
            label={profile.phone}
            nano={sayHiContent.links.phone}
            nanoMood="happy"
          />
          <ContactLink
            icon={<Mail size={18} />}
            href={profile.emailHref}
            label={profile.email}
            nano={sayHiContent.links.email}
            nanoMood="happy"
            celebrate
          />
          <ContactLink
            icon={<Linkedin size={18} />}
            href={profile.linkedinHref}
            label={profile.linkedin}
            nano={sayHiContent.links.linkedin}
            nanoMood="happy"
            celebrate
          />
          <ContactLink
            icon={<Github size={18} />}
            href={profile.githubHref}
            label={profile.github}
            nano={sayHiContent.links.github}
            nanoMood="happy"
          />
          <ContactLink
            icon={<Terminal size={18} />}
            href={profile.mediumHref}
            label={profile.medium}
            nano={sayHiContent.links.medium}
            nanoMood="happy"
          />
        </div>
        <SayHiForm />
      </Reveal>
      <p className="site-credit">
        <a href={nanoContent.credit.href} target="_blank" rel="noreferrer">
          {nanoContent.credit.label}
        </a>
        <span aria-hidden="true">/</span>
        <span>{nanoContent.credit.licenseLabel}</span>
        <span aria-hidden="true">/</span>
        <a href={nanoContent.credit.sourceHref} target="_blank" rel="noreferrer">
          {nanoContent.credit.sourceLabel}
        </a>
      </p>
    </section>
  );
}
