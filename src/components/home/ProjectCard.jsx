import { Link } from 'react-router-dom';
import { themeToCssVars } from '../../lib/theme';
import { ProjectBackdrop } from '../project/ProjectBackdrop';
import { PixelSprite } from '../ui/PixelSprite';
import { StatusBadge } from '../ui/StatusBadge';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project, index }) {
  const projectVars = themeToCssVars(project.theme);

  return (
    <article className={styles.card}>
      <Link
        aria-label={`Open the ${project.title} project page`}
        className={styles.link}
        to={`/projects/${project.slug}`}
      >
        <div className={styles.preview} style={projectVars}>
          <ProjectBackdrop compact project={project} />
          <span aria-hidden="true" className={styles.number}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span aria-hidden="true" className={styles.sigil}>
            <PixelSprite variant={project.theme.motif} />
          </span>
          <span className={styles.previewLabel}>ENVIRONMENT PREVIEW</span>
        </div>

        <div className={styles.body}>
          <div className={styles.topline}>
            <StatusBadge status={project.status} statusKey={project.statusKey} />
            <span aria-hidden="true" className={styles.arrow}>
              ↗
            </span>
          </div>

          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.note}>{project.tagline}</p>

          <span className={styles.cta}>
            Open project <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
