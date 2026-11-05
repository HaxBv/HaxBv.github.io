import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigation } from '../../data/site';
import { PixelSprite } from '../ui/PixelSprite';
import styles from './Navbar.module.css';

function isActive(pathname, item) {
  if (item.to === '/') {
    return pathname === '/';
  }

  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}

function scrollToSection(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

export function Navbar({ project }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function handleBrandClick(event) {
    setMenuOpen(false);

    if (location.pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleNavClick(event, item) {
    setMenuOpen(false);

    if (location.pathname === item.to) {
      event.preventDefault();

      if (item.sectionId) {
        scrollToSection(item.sectionId);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  return (
    <header className={styles.header}>
      <div className={`${styles.inner} container`}>
        <Link className={styles.brand} onClick={handleBrandClick} to="/">
          <span aria-hidden="true" className={styles.mark}>
            <PixelSprite variant="star" />
          </span>
          <span className={styles.brandText}>
            <strong>HaxBv</strong>
            <small>Game Developer</small>
          </span>
        </Link>

        <nav aria-label="Primary" className={styles.desktopNav}>
          {navigation.map((item) => {
            const active = isActive(location.pathname, item);

            return (
              <Link
                aria-current={active ? 'page' : undefined}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                key={item.to}
                onClick={(event) => handleNavClick(event, item)}
                to={item.to}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.context}>
          {project ? (
            <span className={styles.projectChip}>
              <span aria-hidden="true" className={styles.projectDot} />
              <span>{project.title}</span>
            </span>
          ) : (
            <span className={styles.contextLabel}>
              Portfolio / {new Date().getFullYear()}
            </span>
          )}
        </div>

        <button
          aria-controls="primary-menu"
          aria-expanded={menuOpen}
          className={styles.menuButton}
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      <div
        className={`${styles.mobilePanel} ${menuOpen ? styles.mobilePanelOpen : ''}`}
        id="primary-menu"
      >
        <nav aria-label="Mobile primary" className={styles.mobileNav}>
          {navigation.map((item) => {
            const active = isActive(location.pathname, item);

            return (
              <Link
                aria-current={active ? 'page' : undefined}
                className={`${styles.mobileLink} ${active ? styles.mobileLinkActive : ''}`}
                key={item.to}
                onClick={(event) => handleNavClick(event, item)}
                to={item.to}
              >
                <span>{item.label}</span>
                <span aria-hidden="true" className={styles.mobileArrow}>
                  →
                </span>
              </Link>
            );
          })}
        </nav>

        {project ? (
          <div className={styles.mobileContext}>
            <span>Current environment</span>
            <strong>{project.title}</strong>
          </div>
        ) : null}
      </div>
    </header>
  );
}
