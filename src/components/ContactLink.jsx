export function ContactLink({ icon, href, label }) {
  return (
    <a className="contact-link" href={href} target="_blank" rel="noreferrer">
      {icon}
      <span>{label}</span>
    </a>
  );
}
