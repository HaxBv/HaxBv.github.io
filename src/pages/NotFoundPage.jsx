import { PixelButton } from '../components/ui/PixelButton';
import { PixelSprite } from '../components/ui/PixelSprite';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <section className={`${styles.notFound} section`}>
      <div className={`${styles.inner} container`}>
        <div className={styles.copy}>
          <p className="eyebrow">Error / 404</p>
          <p aria-hidden="true" className={styles.code}>
            404
          </p>
          <h1>This path is not in the map.</h1>
          <p className={styles.body}>
            The route may have moved, or the link may belong to a world that has not been built
            yet.
          </p>

          <div className={styles.actions}>
            <PixelButton to="/">Return home</PixelButton>
            <PixelButton to="/projects" variant="secondary">
              Browse projects
            </PixelButton>
          </div>
        </div>

        <div aria-hidden="true" className={styles.visual}>
          <PixelSprite className={styles.sprite} variant="rune" />
          <div className={styles.rings} />
          <span className={styles.visualLabel}>SIGNAL LOST</span>
        </div>
      </div>
    </section>
  );
}
