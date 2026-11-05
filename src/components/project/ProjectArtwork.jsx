import { useEffect, useState } from 'react';
import { themeToCssVars } from '../../lib/theme';
import { PixelSprite } from '../ui/PixelSprite';
import styles from './ProjectArtwork.module.css';

let artworkLayerId = 0;

function sideStyle(side) {
  return {
    '--art-width': side.width || 'min(26vw, 500px)',
    '--art-height': side.height || 'min(78vh, 920px)',
    '--art-bottom': side.bottom || '0px',
    '--art-offset-x': side.offsetX || '0px',
    '--art-scale': String(side.scale ?? 1),
    '--art-opacity': String(side.opacity ?? 1),
    '--art-rotate': `${side.rotate ?? 0}deg`,
  };
}

function ArtworkSide({ placement, project, side }) {
  if (!side) {
    return null;
  }

  const hasImage = Boolean(side.src);

  return (
    <div className={`${styles.side} ${styles[placement]}`} style={sideStyle(side)}>
      <div className={styles.aura} />

      {hasImage ? (
        <img
          alt=""
          className={`${styles.image} ${project.theme.pixelArt ? styles.pixelArt : ''}`}
          decoding="async"
          draggable="false"
          src={side.src}
        />
      ) : (
        <div className={styles.slot}>
          <PixelSprite className={styles.slotIcon} variant="image" />
          <span className={styles.slotLabel}>{side.label || 'Artwork'}</span>
          <span className={styles.slotNote}>{side.slotLabel || 'Artwork slot'}</span>
        </div>
      )}
    </div>
  );
}

export function ProjectArtworkStage({ project }) {
  const [layers, setLayers] = useState(() =>
    project
      ? [{ id: (artworkLayerId += 1), phase: 'active', project }]
      : [],
  );

  useEffect(() => {
    setLayers((current) => {
      const activeLayer = current.find((layer) => layer.phase === 'active');

      if (activeLayer?.project.slug === project?.slug) {
        return current;
      }

      const leavingLayers = current.map((layer) =>
        layer.phase === 'active' ? { ...layer, phase: 'leaving' } : layer,
      );

      if (!project) {
        return leavingLayers;
      }

      return [
        ...leavingLayers,
        { id: (artworkLayerId += 1), phase: 'active', project },
      ];
    });
  }, [project]);

  useEffect(() => {
    if (!layers.some((layer) => layer.phase === 'leaving')) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setLayers((current) => current.filter((layer) => layer.phase !== 'leaving'));
    }, 460);

    return () => window.clearTimeout(timeout);
  }, [layers]);

  if (!layers.length) {
    return null;
  }

  return (
    <div aria-hidden="true" className={styles.stage}>
      {layers.map((layer) => (
        <div
          className={`${styles.layer} ${
            layer.phase === 'leaving' ? styles.leaving : styles.entering
          }`}
          data-frame={layer.project.theme.frameVariant}
          key={layer.id}
          style={themeToCssVars(layer.project.theme)}
        >
          <ArtworkSide placement="left" project={layer.project} side={layer.project.artwork.left} />
          <ArtworkSide
            placement="right"
            project={layer.project}
            side={layer.project.artwork.right}
          />
        </div>
      ))}
    </div>
  );
}
