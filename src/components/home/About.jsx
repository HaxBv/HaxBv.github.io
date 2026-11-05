import { site } from '../../data/site';
import { PixelSprite } from '../ui/PixelSprite';
import { SectionHeading } from '../ui/SectionHeading';
import styles from './About.module.css';

export function About() {
  const { about } = site;

  return (
    <section aria-labelledby="about-title" className="section" id="about">
      <div className={`${styles.inner} container`}>
        <div className={styles.copy}>
          <SectionHeading
            index="03"
            label="Player profile"
            title="Built at the intersection of systems and play."
          />

          <div className={styles.paragraphs}>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <p className={styles.note}>
            <span aria-hidden="true" className={styles.noteDot} />
            Profile details are intentionally left open until they can be written for real.
          </p>
        </div>

        <aside aria-label="Profile card" className={styles.cardWrap}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span>PLAYER CARD</span>
              <span>ID / HAXBV</span>
            </div>

            <div className={styles.avatar}>
              <div aria-hidden="true" className={styles.avatarHalo} />
              <PixelSprite className={styles.avatarSprite} variant="cross" />
              <span className={styles.avatarLabel}>READY</span>
            </div>

            <dl className={styles.stats}>
              <div>
                <dt>Name</dt>
                <dd>{about.card.name}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{about.card.role}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{about.card.status}</dd>
              </div>
              <div>
                <dt>Mode</dt>
                <dd>Creating</dd>
              </div>
            </dl>

            <div className={styles.quest}>
              <span>CURRENT QUEST</span>
              <strong>Build a world worth exploring.</strong>
              <div aria-hidden="true" className={styles.questBar}>
                <span />
                <span />
                <span />
                <span className={styles.questBarIdle} />
              </div>
            </div>
          </div>

          <PixelSprite className={styles.floating} variant="spark" />
        </aside>
      </div>
    </section>
  );
}
