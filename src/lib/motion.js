export function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

export function scrollBehavior() {
  return prefersReducedMotion() ? 'auto' : 'smooth';
}

export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: scrollBehavior(),
    block: 'start',
  });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: scrollBehavior() });
}
