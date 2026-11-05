import { site } from '../../data/site';
import { PixelSprite } from '../ui/PixelSprite';
import { SectionHeading } from '../ui/SectionHeading';
import styles from './Skills.module.css';

export function Skills() {
  const { groups, intro } = site.skills;

  return (
    <section aria-labelledby="skills-title" className="section" id="skills">
      <div className="container">
        <SectionHeading index="02" label="Toolkit" title="Skills and tools.">
          {intro}
        </SectionHeading>

        {groups.length ? (
          <div className={styles.grid}>
            {groups.map((group) => (
              <article className={styles.group} key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div aria-hidden="true" className={styles.visual}>
              <span className={styles.visualLabel}>SKILL_MATRIX / EMPTY SLOT</span>
              <PixelSprite className={styles.visualSprite} variant="rune" />
              <div className={styles.visualGrid} />
            </div>

            <div className={styles.copy}>
              <p className="eyebrow">Inventory loading</p>
              <h3>The toolkit is being curated.</h3>
              <p>
                Engines, languages, art tools, and workflow notes will appear here as the
                portfolio grows, focused on the real process behind the work.
              </p>

              <ul className={styles.slots}>
                <li>
                  <span>01</span>
                  Engines
                </li>
                <li>
                  <span>02</span>
                  Languages
                </li>
                <li>
                  <span>03</span>
                  Art & audio
                </li>
                <li>
                  <span>04</span>
                  Workflow
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
