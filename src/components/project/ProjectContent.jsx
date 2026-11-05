import { PixelButton } from '../ui/PixelButton';
import { PixelSprite } from '../ui/PixelSprite';
import styles from './ProjectContent.module.css';

const queuedSections = [
  'Overview',
  'Screenshots & artwork',
  'Gameplay videos',
  'Main features',
  'Development process',
  'Technologies used',
  'Challenges & solutions',
];

function ProjectSection({ index, title, children }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionLabel}>
        <span>{index}</span>
        <h2>{title}</h2>
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

function DevelopmentState({ project }) {
  return (
    <div className={styles.development}>
      <div className={styles.developmentVisual}>
        <span className={styles.visualLabel}>CASE_STUDY / QUEUED</span>
        <PixelSprite className={styles.visualSprite} variant={project.theme.motif} />
        <div aria-hidden="true" className={styles.loadingBars}>
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className={styles.developmentCopy}>
        <p className="eyebrow">In development</p>
        <h2>The world is online. The story is next.</h2>
        <p>
          This project is still being built. Screenshots, gameplay videos, feature notes, process
          details, technology choices, and challenge logs will be added here when they are real.
        </p>

        <ul aria-label="Planned case study sections" className={styles.queue}>
          {queuedSections.map((section, index) => (
            <li key={section}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {section}
              <em>Queued</em>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <PixelButton to="/projects">
            <span aria-hidden="true">←</span> Explore other projects
          </PixelButton>
          <PixelButton to="/" variant="secondary">
            Back home
          </PixelButton>
        </div>
      </div>
    </div>
  );
}

export function ProjectContent({ project }) {
  const hasContent =
    Boolean(project.overview) ||
    project.screenshots.length > 0 ||
    project.videos.length > 0 ||
    project.features.length > 0 ||
    project.process.length > 0 ||
    project.technologies.length > 0 ||
    project.challenges.length > 0 ||
    project.links.length > 0;

  if (!hasContent) {
    return <DevelopmentState project={project} />;
  }

  let sectionIndex = 0;
  const nextIndex = () => String((sectionIndex += 1)).padStart(2, '0');

  return (
    <div className={styles.content}>
      {project.overview ? (
        <ProjectSection index={nextIndex()} title="Overview">
          {(Array.isArray(project.overview) ? project.overview : [project.overview]).map(
            (paragraph) => (
              <p className={styles.bodyCopy} key={paragraph}>
                {paragraph}
              </p>
            ),
          )}
        </ProjectSection>
      ) : null}

      {project.screenshots.length ? (
        <ProjectSection index={nextIndex()} title="Screenshots & artwork">
          <div className={styles.gallery}>
            {project.screenshots.map((screenshot) => (
              <figure className={styles.figure} key={screenshot.src}>
                <img
                  alt={screenshot.alt || ''}
                  loading="lazy"
                  src={screenshot.src}
                />
                {screenshot.caption ? <figcaption>{screenshot.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </ProjectSection>
      ) : null}

      {project.videos.length ? (
        <ProjectSection index={nextIndex()} title="Gameplay & video">
          <div className={styles.videos}>
            {project.videos.map((video) => (
              <figure className={styles.video} key={video.src}>
                {video.type === 'file' ? (
                  <video controls preload="metadata" src={video.src} />
                ) : (
                  <iframe
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    src={video.src}
                    title={video.title || 'Project video'}
                  />
                )}
                {video.title ? <figcaption>{video.title}</figcaption> : null}
              </figure>
            ))}
          </div>
        </ProjectSection>
      ) : null}

      {project.features.length ? (
        <ProjectSection index={nextIndex()} title="Main features">
          <ul className={styles.featureList}>
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </ProjectSection>
      ) : null}

      {project.process.length ? (
        <ProjectSection index={nextIndex()} title="Development process">
          <ol className={styles.processList}>
            {project.process.map((step) => {
              const item = typeof step === 'string' ? { title: step } : step;

              return (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  {item.description ? <p>{item.description}</p> : null}
                </li>
              );
            })}
          </ol>
        </ProjectSection>
      ) : null}

      {project.technologies.length ? (
        <ProjectSection index={nextIndex()} title="Technologies used">
          <ul className={styles.techList}>
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </ProjectSection>
      ) : null}

      {project.challenges.length ? (
        <ProjectSection index={nextIndex()} title="Challenges & solutions">
          <div className={styles.challenges}>
            {project.challenges.map((item) => {
              const challenge = typeof item === 'string' ? { challenge: item } : item;

              return (
                <article className={styles.challenge} key={challenge.challenge}>
                  <h3>{challenge.challenge}</h3>
                  {challenge.solution ? <p>{challenge.solution}</p> : null}
                </article>
              );
            })}
          </div>
        </ProjectSection>
      ) : null}

      {project.links.length ? (
        <ProjectSection index={nextIndex()} title="Project links">
          <div className={styles.actions}>
            {project.links.map((link) => (
              <PixelButton href={link.href} key={link.href} variant="secondary">
                {link.label}
              </PixelButton>
            ))}
          </div>
        </ProjectSection>
      ) : null}

      <div className={styles.actions}>
        <PixelButton to="/projects">
          <span aria-hidden="true">←</span> Back to projects
        </PixelButton>
        <PixelButton to="/" variant="secondary">
          Home
        </PixelButton>
      </div>
    </div>
  );
}
