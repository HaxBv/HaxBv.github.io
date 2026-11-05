import { useParams } from 'react-router-dom';
import { ProjectHero } from '../components/project/ProjectHero';
import { ProjectNeighbors } from '../components/project/ProjectNeighbors';
import { ProjectSections } from '../components/project/ProjectSections';
import { getProjectBySlug, getProjectNeighbors, projects } from '../data/projects';
import { NotFoundPage } from './NotFoundPage';
import styles from './ProjectPage.module.css';

export function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <NotFoundPage />;
  }

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const { next, previous } = getProjectNeighbors(project.slug);

  return (
    <article className={styles.page} data-frame={project.theme.frameVariant}>
      <div className={styles.content}>
        <ProjectHero index={projectIndex} project={project} total={projects.length} />
        <ProjectSections project={project} />
        {project.sections.moreProjects !== false ? (
          <ProjectNeighbors next={next} previous={previous} />
        ) : null}
      </div>
    </article>
  );
}
