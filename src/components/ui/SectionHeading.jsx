export function SectionHeading({ index, label, title, children }) {
  return (
    <header>
      <p className="eyebrow">
        {index ? `${index} / ` : ''}
        {label}
      </p>
      <h2 className="sectionTitle">{title}</h2>
      {children ? <p className="sectionLead">{children}</p> : null}
    </header>
  );
}
