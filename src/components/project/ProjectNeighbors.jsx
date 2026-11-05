import { Link } from 'react-router-dom';
import { themeToCssVars } from '../../lib/theme';
import { PixelSprite } from '../ui/PixelSprite';
import { StatusBadge } from '../ui/StatusBadge';
import { ProjectBackdrop } from './ProjectBackdrop';
import styles from './ProjectNeighbors.module.css';

function NeighborCard({ direction, project }) {
  const isNext = direction === 'next';

  return (
    <Link
      className={`${styles.card} ${isNext ? styles.next : styles.previous}`}
      data-frame={project.theme.frameVariant}
      style={themeToCssVars(project.theme)}
      to={`/projects/${project.slug}`}
    >
      <div aria-hidden="true" className={styles.preview}>
        <ProjectBackdrop compact project={project} />
        <span className={styles.sigil}>
          <PixelSprite variant={project.theme.motif} />
        </span>
      </div>

      <div className={styles.body}>
        <span className={styles.topline}>
          <span className={styles.direction}>
            <span aria-hidden="true">{isNext ? '→' : '←'}</span>{' '}
            {isNext ? 'Next project' : 'Previous project'}
          </span>
          <StatusBadge status={project.status} statusKey={project.statusKey} />
        </span>

        <span className={styles.title}>{project.title}</span>
        <span className={styles.tagline}>{project.tagline}</span>

        <span className={styles.cta}>
          {isNext ? 'Continue onward' : 'Step back'}{' '}
          <span aria-hidden="true">{isNext ? '→' : '←'}</span>
        </span>
      </div>
    </Link>
  );
}

function AllProjectsCard() {
  return (
    <Link className={`${styles.card} ${styles.allCard}`} to="/projects">
      <div aria-hidden="true" className={styles.allPreview}>
        <span className={styles.allGrid} />
        <span className={styles.allSigil}>
          <PixelSprite variant="star" />
        </span>
      </div>

      <div className={styles.body}>
        <span className={styles.topline}>
          <span className={styles.direction}>Project index</span>
        </span>
        <span className={styles.title}>All projects</span>
        <span className={styles.tagline}>Return to the full list of game worlds and case studies.</span>
        <span className={styles.cta}>
          Browse projects <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

export function ProjectNeighbors({ next, previous }) {
  return (
    <section aria-labelledby="more-projects-title" className={styles.section} id="more-projects">
      <header className={styles.head}>
        <div className={styles.eyebrow}>
          <span aria-hidden="true" className={styles.eyebrowMark} />
          <span>Continue</span>
        </div>
        <h2 id="more-projects-title">More worlds.</h2>
      </header>

      <div className={styles.grid}>
        {previous ? <NeighborCard direction="previous" project={previous} /> : <AllProjectsCard />}
        {next ? <NeighborCard direction="next" project={next} /> : <AllProjectsCard />}
      </div>
    </section>
  );
}
