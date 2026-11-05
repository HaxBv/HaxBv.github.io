import { Link } from 'react-router-dom';
import { scrollToSection } from '../../lib/motion';
import { PixelButton } from '../ui/PixelButton';
import { StatusBadge } from '../ui/StatusBadge';
import styles from './ProjectHero.module.css';

export function ProjectHero({ index, project, total }) {
  const projectNumber = String(index + 1).padStart(2, '0');
  const totalNumber = String(total).padStart(2, '0');

  return (
    <section
      aria-labelledby="project-title"
      className={styles.hero}
      data-frame={project.theme.frameVariant}
    >
      <div className={styles.kicker}>
        <Link className={styles.backLink} to="/projects">
          <span aria-hidden="true">←</span> All projects
        </Link>
        <span className={styles.index}>
          Project {projectNumber} / {totalNumber}
        </span>
      </div>

      <div className={styles.meta}>
        <StatusBadge status={project.status} statusKey={project.statusKey} />
        <span aria-hidden="true" className={styles.metaDivider} />
        <span className={styles.genre}>{project.genre}</span>
      </div>

      <h1 aria-label={project.title} className={styles.title} id="project-title">
        {project.titleLines.map((line) => (
          <span aria-hidden="true" className={styles.titleLine} key={line}>
            {line}
          </span>
        ))}
      </h1>

      <p className={styles.tagline}>{project.tagline}</p>
      <p className={styles.intro}>{project.intro}</p>

      <div className={styles.actions}>
        <PixelButton onClick={() => scrollToSection('about')}>Explore the project</PixelButton>
        <PixelButton onClick={() => scrollToSection('links')} variant="secondary">
          Project links
        </PixelButton>
      </div>

      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt>Genre</dt>
          <dd>{project.genre}</dd>
        </div>
        <div className={styles.fact}>
          <dt>Stack</dt>
          <dd>
            {project.technologies.length
              ? project.technologies.join(' / ')
              : 'Stack details pending'}
          </dd>
        </div>
        <div className={styles.fact}>
          <dt>Build</dt>
          <dd>{project.links.some((link) => link.href) ? 'Build available' : 'Playable build pending'}</dd>
        </div>
      </dl>

      <div aria-hidden="true" className={styles.scrollCue}>
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
