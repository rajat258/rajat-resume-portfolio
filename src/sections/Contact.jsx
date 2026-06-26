import { Github, Linkedin, Mail, Phone, Terminal } from "lucide-react";
import { ContactLink } from "../components/ContactLink";
import { Reveal } from "../components/Reveal";
import { profile, sectionMeta } from "../data/resume";

export function Contact({ ready }) {
  return (
    <section id="contact" className="section-shell contact-section">
      <Reveal className="contact-card" delay={0.08} ready={ready} variant="scale">
        <span className="section-kicker">{sectionMeta.contact.kicker}</span>
        <h2>Connect with {profile.handle.replace("258", "_258")}</h2>
        <div className="contact-list">
          <ContactLink icon={<Phone size={18} />} href={profile.phoneHref} label={profile.phone} />
          <ContactLink icon={<Mail size={18} />} href={profile.emailHref} label={profile.email} />
          <ContactLink icon={<Linkedin size={18} />} href={profile.linkedinHref} label={profile.linkedin} />
          <ContactLink icon={<Github size={18} />} href={profile.githubHref} label={profile.github} />
          <ContactLink icon={<Terminal size={18} />} href={profile.mediumHref} label={profile.medium} />
        </div>
      </Reveal>
    </section>
  );
}
