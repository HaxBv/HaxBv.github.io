import { site } from '../../data/site';
import { PixelButton } from '../ui/PixelButton';
import { PixelSprite } from '../ui/PixelSprite';
import styles from './Hero.module.css';

function HeroConsole() {
  return (
    <svg
      aria-hidden="true"
      className={styles.console}
      shapeRendering="crispEdges"
      viewBox="0 0 520 430"
    >
      <path
        d="M84 32 H436 V56 H480 V344 H436 V376 H84 V344 H40 V56 H84 Z"
        style={{ fill: 'var(--surface)', stroke: 'var(--line-strong)' }}
        strokeWidth="4"
      />
      <path
        d="M84 48 H436 V72 H456 V328 H436 V352 H84 V328 H64 V72 H84 Z"
        style={{ fill: 'var(--surface-strong)' }}
      />
      <rect x="82" y="82" width="356" height="198" style={{ fill: 'var(--bg)' }} />
      <rect
        x="98"
        y="98"
        width="324"
        height="166"
        style={{ fill: '#100d18', stroke: 'var(--line)' }}
        strokeWidth="2"
      />

      <g style={{ fill: 'var(--accent)' }}>
        <rect x="120" y="116" width="3" height="3" />
        <rect x="180" y="134" width="2" height="2" />
        <rect x="250" y="112" width="3" height="3" />
        <rect x="338" y="128" width="2" height="2" />
        <rect x="390" y="116" width="3" height="3" />
        <rect x="304" y="152" width="2" height="2" />
      </g>

      <g style={{ fill: 'var(--accent-secondary)' }}>
        <rect x="356" y="118" width="36" height="36" />
        <rect x="344" y="126" width="60" height="20" />
        <rect x="364" y="108" width="20" height="56" />
      </g>

      <g style={{ fill: 'color-mix(in srgb, var(--accent) 48%, transparent)' }}>
        <path d="M98 224 L152 174 L196 214 L246 150 L306 220 L350 184 L422 230 V264 H98 Z" />
      </g>

      <g style={{ fill: 'color-mix(in srgb, var(--accent-secondary) 38%, transparent)' }}>
        <path d="M98 246 L164 200 L214 240 L280 190 L338 244 L386 210 L422 236 V264 H98 Z" />
      </g>

      <rect x="98" y="250" width="324" height="14" style={{ fill: 'var(--surface-strong)' }} />

      <g style={{ fill: 'var(--accent)' }}>
        <rect x="246" y="222" width="28" height="10" />
        <rect x="240" y="232" width="40" height="14" />
        <rect x="244" y="246" width="32" height="5" />
        <rect x="248" y="230" width="4" height="4" style={{ fill: '#100d18' }} />
        <rect x="268" y="230" width="4" height="4" style={{ fill: '#100d18' }} />
      </g>

      <rect className={styles.scanline} x="98" y="98" width="324" height="2" style={{ fill: 'var(--accent-secondary)' }} />

      <g style={{ fill: 'var(--text)' }}>
        <rect x="104" y="286" width="24" height="8" />
        <rect x="112" y="278" width="8" height="24" />
      </g>

      <g style={{ fill: 'var(--accent-secondary)' }}>
        <rect x="346" y="282" width="22" height="12" />
        <rect x="386" y="288" width="22" height="12" />
      </g>

      <g style={{ fill: 'var(--accent)' }}>
        <rect x="212" y="300" width="32" height="8" />
        <rect x="240" y="306" width="32" height="8" />
        <rect x="268" y="312" width="32" height="8" />
        <rect x="244" y="324" width="8" height="8" />
      </g>

      <g style={{ fill: 'var(--text-muted)' }}>
        <rect x="212" y="332" width="4" height="4" />
        <rect x="224" y="332" width="4" height="4" />
        <rect x="236" y="332" width="4" height="4" />
        <rect x="248" y="332" width="4" height="4" />
        <rect x="260" y="332" width="4" height="4" />
        <rect x="272" y="332" width="4" height="4" />
        <rect x="284" y="332" width="4" height="4" />
        <rect x="296" y="332" width="4" height="4" />
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className={`${styles.hero} section`} id="home">
      <div className={`${styles.inner} container`}>
        <div className={styles.copy}>
          <p className="eyebrow">Game Developer / Portfolio</p>

          <h1 className={styles.title} id="hero-title">
            Small worlds.
            <span> Sharp mechanics.</span>
            <br />
            Big heart.
          </h1>

          <p className={styles.lead}>{site.summary}</p>

          <div className={styles.actions}>
            <PixelButton to="/projects">
              Explore projects <span aria-hidden="true">→</span>
            </PixelButton>
            <PixelButton to="/about" variant="secondary">
              About me
            </PixelButton>
          </div>

          <ul aria-label="Portfolio focus" className={styles.signals}>
            <li>
              <span>01</span>
              Playful systems
            </li>
            <li>
              <span>02</span>
              Expressive worlds
            </li>
            <li>
              <span>03</span>
              Pixel-level care
            </li>
          </ul>
        </div>

        <div className={styles.artWrap}>
          <div className={styles.artFrame}>
            <div className={styles.artHud}>
              <span>PLAYER_ONE</span>
              <span>BUILD / ACTIVE</span>
            </div>

            <HeroConsole />

            <div className={styles.artFooter}>
              <span>PRESS START TO EXPLORE</span>
              <span aria-hidden="true" className={styles.cursor}>
                _
              </span>
            </div>
          </div>

          <PixelSprite className={`${styles.floatingSprite} ${styles.spriteOne}`} variant="spark" />
          <PixelSprite className={`${styles.floatingSprite} ${styles.spriteTwo}`} variant="heart" />
          <PixelSprite className={`${styles.floatingSprite} ${styles.spriteThree}`} variant="star" />
        </div>
      </div>
    </section>
  );
}
