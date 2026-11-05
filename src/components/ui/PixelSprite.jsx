const sprites = {
  star: (
    <>
      <rect x="7" y="1" width="2" height="3" />
      <rect x="6" y="4" width="4" height="2" />
      <rect x="3" y="6" width="10" height="2" />
      <rect x="4" y="8" width="8" height="2" />
      <rect x="2" y="10" width="4" height="2" />
      <rect x="10" y="10" width="4" height="2" />
      <rect x="1" y="12" width="3" height="3" />
      <rect x="12" y="12" width="3" height="3" />
    </>
  ),
  heart: (
    <>
      <rect x="2" y="3" width="4" height="2" />
      <rect x="10" y="3" width="4" height="2" />
      <rect x="1" y="5" width="14" height="3" />
      <rect x="2" y="8" width="12" height="2" />
      <rect x="3" y="10" width="10" height="2" />
      <rect x="5" y="12" width="6" height="2" />
      <rect x="7" y="14" width="2" height="2" />
    </>
  ),
  coin: (
    <>
      <rect x="5" y="1" width="6" height="2" />
      <rect x="3" y="3" width="10" height="2" />
      <rect x="2" y="5" width="12" height="6" />
      <rect x="3" y="11" width="10" height="2" />
      <rect x="5" y="13" width="6" height="2" />
    </>
  ),
  diamond: (
    <>
      <rect x="7" y="1" width="2" height="2" />
      <rect x="5" y="3" width="6" height="2" />
      <rect x="3" y="5" width="10" height="2" />
      <rect x="1" y="7" width="14" height="2" />
      <rect x="3" y="9" width="10" height="2" />
      <rect x="5" y="11" width="6" height="2" />
      <rect x="7" y="13" width="2" height="2" />
    </>
  ),
  rune: (
    <>
      <rect x="7" y="1" width="2" height="14" />
      <rect x="3" y="4" width="10" height="2" />
      <rect x="4" y="9" width="8" height="2" />
      <rect x="2" y="6" width="2" height="3" />
      <rect x="12" y="6" width="2" height="3" />
      <rect x="5" y="12" width="2" height="2" />
      <rect x="9" y="12" width="2" height="2" />
    </>
  ),
  spark: (
    <>
      <rect x="7" y="1" width="2" height="14" />
      <rect x="1" y="7" width="14" height="2" />
      <rect x="4" y="4" width="2" height="2" />
      <rect x="10" y="10" width="2" height="2" />
    </>
  ),
  cross: (
    <>
      <rect x="6" y="2" width="4" height="12" />
      <rect x="2" y="6" width="12" height="4" />
    </>
  ),
  block: (
    <>
      <rect x="4" y="2" width="3" height="3" />
      <rect x="9" y="2" width="3" height="3" />
      <rect x="2" y="5" width="12" height="9" />
      <rect x="5" y="8" width="2" height="2" fill="var(--bg)" />
      <rect x="9" y="8" width="2" height="2" fill="var(--bg)" />
    </>
  ),
};

export function PixelSprite({ variant = 'star', className = '', style }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      focusable="false"
      shapeRendering="crispEdges"
      style={style}
      viewBox="0 0 16 16"
    >
      {sprites[variant] || sprites.star}
    </svg>
  );
}
