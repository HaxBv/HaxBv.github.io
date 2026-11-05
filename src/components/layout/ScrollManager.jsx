import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { navigation } from '../../data/site';

const sectionByPath = Object.fromEntries(
  navigation.filter((item) => item.sectionId).map((item) => [item.to, item.sectionId]),
);

function scrollToRoute(pathname) {
  if (pathname.startsWith('/projects/')) {
    window.scrollTo({ top: 0, behavior: 'auto' });
    return;
  }

  const sectionId = sectionByPath[pathname];

  if (sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'auto',
      block: 'start',
    });
    return;
  }

  window.scrollTo({ top: 0, behavior: 'auto' });
}

export function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map());
  const previousKey = useRef(null);

  useLayoutEffect(() => {
    const currentKey = location.key || location.pathname;

    if (previousKey.current && previousKey.current !== currentKey) {
      positions.current.set(previousKey.current, window.scrollY);
    }

    previousKey.current = currentKey;

    const savedPosition = positions.current.get(currentKey);

    if (navigationType === 'POP' && savedPosition != null) {
      window.scrollTo({ top: savedPosition, behavior: 'auto' });
      return;
    }

    scrollToRoute(location.pathname);

    if (navigationType !== 'POP') {
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }
  }, [location.key, location.pathname, navigationType]);

  return null;
}
