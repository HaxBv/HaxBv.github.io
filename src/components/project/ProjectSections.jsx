import { PixelButton } from '../ui/PixelButton';
import { PixelSprite } from '../ui/PixelSprite';
import { MediaGallery } from './MediaGallery';
import styles from './ProjectSections.module.css';

function Section({ children, description, id, index, kicker, title }) {
  return (
    <section aria-labelledby={`${id}-title`} className={styles.section} id={id}>
      <header className={styles.sectionHead}>
        <div className={styles.eyebrow}>
          <span className={styles.number}>{index}</span>
          <span className={styles.kicker}>{kicker}</span>
        </div>
        <h2 className={styles.heading} id={`${id}-title`}>
          {title}
        </h2>
        {description ? <p className={styles.lead}>{description}</p> : null}
      </header>
      {children}
    </section>
  );
}

function DetailList({ emptyLabel, items }) {
  if (!items.length) {
    return <p className={styles.pendingText}>{emptyLabel}</p>;
  }

  return (
    <ul className={styles.detailList}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ContributionPanel({ contribution }) {
  const groups = [
    {
      label: 'Responsibilities',
      items: contribution.responsibilities,
      emptyLabel: 'Responsibilities have not been published yet.',
    },
    {
      label: 'Skills',
      items: contribution.skills,
      emptyLabel: 'Skill notes have not been published yet.',
    },
    {
      label: 'Challenges',
      items: contribution.challenges,
      emptyLabel: 'Challenge notes have not been published yet.',
    },
  ];

  return (
    <div className={styles.contributionGrid}>
      <article className={`${styles.contributionCard} ${styles.roleCard}`}>
        <span className={styles.panelLabel}>Role</span>
        <p className={styles.roleValue}>
          {contribution.role || 'Role details are pending documentation.'}
        </p>
        {contribution.summary ? (
          <p className={styles.roleSummary}>{contribution.summary}</p>
        ) : null}
      </article>

      {groups.map((group) => (
        <article className={styles.contributionCard} key={group.label}>
          <span className={styles.panelLabel}>{group.label}</span>
          <DetailList emptyLabel={group.emptyLabel} items={group.items} />
        </article>
      ))}
    </div>
  );
}

function ProcessTimeline({ process }) {
  return (
    <ol className={styles.timeline}>
      {process.stages.map((stage) => (
        <li className={styles.timelineItem} key={stage.title}>
          <span aria-hidden="true" className={styles.timelineMarker} data-status={stage.status} />
          <div className={styles.timelineBody}>
            <div className={styles.timelineTop}>
              <h3>{stage.title}</h3>
              <span className={styles.stageStatus}>
                {stage.status === 'pending' ? 'Pending' : stage.status}
              </span>
            </div>
            <p>{stage.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ProjectSections({ project }) {
  const { about, contribution, features, gameplay, gallery, links, process, sections, theme } =
    project;
  const hasLinks = links.some((link) => link.href);
  let sectionCount = 0;

  const nextNumber = () => String((sectionCount += 1)).padStart(2, '0');
  const content = [];

  if (about && sections.about !== false) {
    content.push(
      <Section
        description={about.lead}
        id="about"
        index={nextNumber()}
        key="about"
        kicker="Overview"
        title={about.title}
      >
        <div className={styles.aboutGrid}>
          <div className={styles.prose}>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className={styles.factsPanel}>
            <div className={styles.factsTop}>
              <span aria-hidden="true" className={styles.factsIcon}>
                <PixelSprite variant={theme.motif} />
              </span>
              <span className={styles.panelLabel}>Project facts</span>
            </div>
            <dl className={styles.factList}>
              {about.facts.map((fact) => (
                <div className={styles.fact} key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>,
    );
  }

  if (gameplay && features.length && sections.gameplay !== false) {
    content.push(
      <Section
        description={gameplay.lead}
        id="gameplay"
        index={nextNumber()}
        key="gameplay"
        kicker="Gameplay"
        title={gameplay.title}
      >
        <div className={styles.featureGrid}>
          {features.map((feature, featureIndex) => (
            <article
              className={`${styles.featureCard} ${
                feature.emphasis ? styles.featureEmphasis : ''
              }`}
              key={feature.title}
            >
              <div className={styles.featureTop}>
                <span aria-hidden="true" className={styles.featureIcon}>
                  <PixelSprite variant={feature.icon} />
                </span>
                <span aria-hidden="true" className={styles.featureNumber}>
                  {String(featureIndex + 1).padStart(2, '0')}
                </span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <ul className={styles.tags}>
                {feature.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>,
    );
  }

  if (gallery.length && sections.gallery !== false) {
    content.push(
      <Section
        description="Artwork, characters, and gameplay captures will appear here as they are published."
        id="gallery"
        index={nextNumber()}
        key="gallery"
        kicker="Media"
        title="The world, frame by frame."
      >
        <MediaGallery project={project} />
      </Section>,
    );
  }

  if (process && sections.process !== false) {
    content.push(
      <Section
        description={process.lead}
        id="process"
        index={nextNumber()}
        key="process"
        kicker="Development"
        title={process.title}
      >
        <ProcessTimeline process={process} />
      </Section>,
    );
  }

  if (contribution && sections.contribution !== false) {
    content.push(
      <Section
        description={contribution.lead}
        id="contribution"
        index={nextNumber()}
        key="contribution"
        kicker="Contribution"
        title={contribution.title}
      >
        <ContributionPanel contribution={contribution} />
      </Section>,
    );
  }

  content.push(
    <Section
      description="Public builds, store pages, and project channels appear here when they are available."
      id="links"
      index={nextNumber()}
      key="links"
      kicker="Links"
      title="Builds and channels."
    >
      {hasLinks ? (
        <ul className={styles.linksList}>
          {links.map((link) => (
            <li key={link.label}>
              {link.href ? (
                <PixelButton href={link.href}>{link.label}</PixelButton>
              ) : (
                <span className={styles.linkPending}>
                  {link.label} <span>Pending</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.linksEmpty}>
          <span aria-hidden="true" className={styles.linksIcon}>
            <PixelSprite variant={theme.motif} />
          </span>
          <div>
            <h3>No public links yet</h3>
            <p>
              A playable build, store page, or project link has not been published for this game.
            </p>
          </div>
        </div>
      )}

      <div className={styles.linksFooter}>
        <PixelButton to="/projects" variant="secondary">
          All projects
        </PixelButton>
        <span className={styles.linksNote}>Status: {project.status}</span>
      </div>
    </Section>,
  );

  return (
    <div className={styles.sections} data-frame={theme.frameVariant}>
      {content}
    </div>
  );
}
