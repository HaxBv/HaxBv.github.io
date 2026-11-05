import { site } from '../../data/site';
import { PixelSprite } from '../ui/PixelSprite';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.brand}>
          <PixelSprite className={styles.mark} variant="star" />
          <div>
            <p className={styles.name}>{site.handle}</p>
            <p className={styles.note}>Built with React, Vite, and a healthy respect for the pixel.</p>
          </div>
        </div>

        <div className={styles.meta}>
          <p>© {new Date().getFullYear()} {site.name}</p>
          <button
            className={styles.topButton}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            type="button"
          >
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
