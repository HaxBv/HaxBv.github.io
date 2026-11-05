import { useParams } from 'react-router-dom';
import { ProjectContent } from '../components/project/ProjectContent';
import { ProjectHeader } from '../components/project/ProjectHeader';
import { getProjectBySlug } from '../data/projects';
import { NotFoundPage } from './NotFoundPage';
import styles from './ProjectPage.module.css';

export function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <ProjectHeader project={project} />
        <ProjectContent project={project} />
      </div>
    </div>
  );
}
