const themeVariableMap = {
  background: '--bg',
  surface: '--surface',
  surfaceStrong: '--surface-strong',
  accent: '--accent',
  accentSecondary: '--accent-secondary',
  text: '--text',
  textMuted: '--text-muted',
};

export function themeToCssVars(theme) {
  const variables = {};

  Object.entries(themeVariableMap).forEach(([themeKey, cssVariable]) => {
    if (theme[themeKey]) {
      variables[cssVariable] = theme[themeKey];
    }
  });

  variables['--line'] = `color-mix(in srgb, ${theme.accent} 22%, transparent)`;
  variables['--line-strong'] = `color-mix(in srgb, ${theme.accent} 46%, transparent)`;
  variables['--glow'] = `color-mix(in srgb, ${theme.accent} 25%, transparent)`;
  variables['--glow-strong'] = `color-mix(in srgb, ${theme.accent} 45%, transparent)`;
  variables['--header-bg'] = `color-mix(in srgb, ${theme.background} 82%, transparent)`;
  variables['--backdrop-gradient'] = theme.backdropGradient || 'none';
  variables['--backdrop-image'] = theme.backdropImage
    ? `url("${theme.backdropImage}")`
    : 'none';

  return variables;
}
