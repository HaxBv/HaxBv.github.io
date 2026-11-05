import { Link } from 'react-router-dom';
import { PixelButton } from '../ui/PixelButton';
import { PixelSprite } from '../ui/PixelSprite';
import { StatusBadge } from '../ui/StatusBadge';
import styles from './ProjectHeader.module.css';

const paletteKeys = [
  ['Background', 'background'],
  ['Surface', 'surface'],
  ['Accent', 'accent'],
  ['Secondary', 'accentSecondary'],
  ['Text', 'text'],
];

export function ProjectHeader({ project }) {
  const { theme } = project;

  return (
    <>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/projects">Projects</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{project.title}</span>
      </nav>

      <header className={styles.header}>
        <div className={styles.copy}>
          <p className="eyebrow">Project environment</p>
          <h1 className={styles.title}>{project.title}</h1>

          <div className={styles.statusRow}>
            <StatusBadge status={project.status} statusKey={project.statusKey} />
            <span className={styles.modeChip}>Visual environment online</span>
          </div>

          <p className={styles.note}>
            The themed environment is live while the case study is being assembled. Screenshots,
            features, and production notes will follow when they are ready.
          </p>

          <div className={styles.actions}>
            <PixelButton to="/projects">
              <span aria-hidden="true">←</span> Back to projects
            </PixelButton>
            <PixelButton to="/" variant="secondary">
              Home
            </PixelButton>
          </div>
        </div>

        <aside aria-label={`${project.title} theme signature`} className={styles.signature}>
          <div className={styles.signatureHeader}>
            <span>Theme signature</span>
            <span>LIVE</span>
          </div>

          <div className={styles.motif}>
            <PixelSprite variant={theme.motif} />
          </div>

          <div className={styles.palette}>
            {paletteKeys.map(([label, key]) => (
              <div key={key}>
                <span
                  aria-hidden="true"
                  className={styles.swatch}
                  style={{ background: theme[key] }}
                />
                <span className={styles.swatchLabel}>{label}</span>
              </div>
            ))}
          </div>

          <div className={styles.effects}>
            {theme.effects.map((effect) => (
              <span key={effect}>{effect}</span>
            ))}
          </div>
        </aside>
      </header>
    </>
  );
}
