export function ContactLink({ icon, href, label, nano, nanoMood, celebrate }) {
  const nanoProps = {};
  if (nano) nanoProps["data-nano"] = nano;
  if (nanoMood) nanoProps["data-nano-mood"] = nanoMood;
  if (celebrate) nanoProps["data-nano-celebrate"] = "";

  return (
    <a className="contact-link" href={href} target="_blank" rel="noreferrer" {...nanoProps}>
      {icon}
      <span>{label}</span>
    </a>
  );
}
