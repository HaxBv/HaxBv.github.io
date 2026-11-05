import { projects } from '../../data/projects';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from './ProjectCard';
import styles from './FeaturedProjects.module.css';

export function FeaturedProjects() {
  return (
    <section aria-labelledby="projects-title" className="section" id="projects">
      <div className="container">
        <div className={styles.headingRow}>
          <SectionHeading
            index="01"
            label="Selected work"
            title="Three worlds, currently in development."
          >
            Each project carries its own palette, atmosphere, and interface rules. Open one to
            step into its environment.
          </SectionHeading>

          <p className={styles.counter}>
            <span>{String(projects.length).padStart(2, '0')}</span>
            worlds in the workshop
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ProjectCard index={index} key={project.slug} project={project} />
          ))}
        </div>

        <p className={styles.loadingLine}>
          <span aria-hidden="true" className={styles.loadingDot} />
          More worlds loading
          <span aria-hidden="true" className={styles.cursor}>
            _
          </span>
        </p>
      </div>
    </section>
  );
}
