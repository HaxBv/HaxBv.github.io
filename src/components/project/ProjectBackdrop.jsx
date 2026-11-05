import { PixelSprite } from '../ui/PixelSprite';
import styles from './ProjectBackdrop.module.css';

const effectClasses = {
  embers: styles.embers,
  confetti: styles.confetti,
  arcane: styles.arcane,
  ink: styles.ink,
  scanlines: styles.scanlines,
  vignette: styles.vignette,
};

const toneClasses = {
  accent: styles.toneAccent,
  accentSecondary: styles.toneSecondary,
  text: styles.toneText,
};

export function ProjectBackdrop({ project, compact = false }) {
  const theme = project.theme;

  return (
    <div
      aria-hidden="true"
      className={`${styles.backdrop} ${compact ? styles.compact : styles.page}`}
    >
      <div className={styles.gradient} />
      <div className={styles.image} />

      {theme.effects.map((effect) => (
        <div className={`${styles.effect} ${effectClasses[effect] || ''}`} key={effect} />
      ))}

      <div className={styles.decorations}>
        {theme.decorations.map((decoration, index) => (
          <PixelSprite
            className={`${styles.decoration} ${toneClasses[decoration.tone] || toneClasses.accent}`}
            key={`${decoration.variant}-${index}`}
            style={{
              left: `${decoration.x}%`,
              top: `${decoration.y}%`,
              width: decoration.size,
              height: decoration.size,
              opacity: decoration.opacity,
              '--sprite-rotate': `${decoration.rotate || 0}deg`,
              '--sprite-delay': `${decoration.delay || 0}s`,
            }}
            variant={decoration.variant}
          />
        ))}
      </div>
    </div>
  );
}
