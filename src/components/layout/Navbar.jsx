import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { projects } from '../../data/projects';
import { navigation } from '../../data/site';
import { scrollToSection, scrollToTop } from '../../lib/motion';
import { PixelSprite } from '../ui/PixelSprite';
import styles from './Navbar.module.css';

function isActive(pathname, item) {
  if (item.to === '/') {
    return pathname === '/';
  }

  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}

export function Navbar({ project }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const projectsGroupRef = useRef(null);
  const projectsMenuRef = useRef(null);
  const projectsToggleRef = useRef(null);
  const menuButtonRef = useRef(null);
  const focusFirstProjectRef = useRef(false);

  useEffect(() => {
    setMenuOpen(false);
    setProjectsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== 'Escape') {
        return;
      }

      setMenuOpen(false);

      if (projectsOpen) {
        setProjectsOpen(false);
        projectsToggleRef.current?.focus();
      }

      if (menuOpen) {
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, projectsOpen]);

  useEffect(() => {
    if (!projectsOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!projectsGroupRef.current?.contains(event.target)) {
        setProjectsOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [projectsOpen]);

  useEffect(() => {
    if (projectsOpen && focusFirstProjectRef.current) {
      projectsMenuRef.current?.querySelector('a')?.focus();
      focusFirstProjectRef.current = false;
    }
  }, [projectsOpen]);

  function handleBrandClick(event) {
    setMenuOpen(false);
    setProjectsOpen(false);

    if (location.pathname === '/') {
      event.preventDefault();
      scrollToTop();
    }
  }

  function handleNavClick(event, item) {
    setMenuOpen(false);
    setProjectsOpen(false);

    if (location.pathname === item.to) {
      event.preventDefault();

      if (item.sectionId) {
        scrollToSection(item.sectionId);
      } else {
        scrollToTop();
      }
    }
  }

  function handleProjectsKeyDown(event) {
    if (event.key !== 'ArrowDown') {
      return;
    }

    event.preventDefault();

    if (projectsOpen) {
      projectsMenuRef.current?.querySelector('a')?.focus();
    } else {
      focusFirstProjectRef.current = true;
      setProjectsOpen(true);
    }
  }

  function handleProjectsMenuKeyDown(event) {
    const links = Array.from(projectsMenuRef.current?.querySelectorAll('a') ?? []);

    if (!links.length) {
      return;
    }

    const currentIndex = links.indexOf(document.activeElement);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      links[(currentIndex + 1) % links.length].focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      links[(currentIndex - 1 + links.length) % links.length].focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      links[0].focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      links[links.length - 1].focus();
    }
  }

  function renderProjectMenu() {
    return (
      <div
        aria-label="Project worlds"
        className={styles.projectsMenu}
        hidden={!projectsOpen}
        id="projects-menu"
        onKeyDown={handleProjectsMenuKeyDown}
        ref={projectsMenuRef}
        role="group"
      >
        <span className={styles.projectsMenuLabel}>Project worlds</span>

        {projects.map((projectItem, index) => {
          const isCurrentProject = location.pathname === `/projects/${projectItem.slug}`;

          return (
            <Link
              aria-current={isCurrentProject ? 'page' : undefined}
              className={`${styles.projectMenuLink} ${
                isCurrentProject ? styles.projectMenuLinkActive : ''
              }`}
              key={projectItem.slug}
              onClick={() => setProjectsOpen(false)}
              to={`/projects/${projectItem.slug}`}
            >
              <span
                aria-hidden="true"
                className={styles.projectMenuSymbol}
                style={{ color: projectItem.theme.accent }}
              >
                <PixelSprite variant={projectItem.theme.motif} />
              </span>
              <span className={styles.projectMenuCopy}>
                <span className={styles.projectMenuTitle}>{projectItem.title}</span>
                <span className={styles.projectMenuGenre}>{projectItem.genre}</span>
              </span>
              <span aria-hidden="true" className={styles.projectMenuIndex}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </Link>
          );
        })}

        <Link
          className={styles.allProjectsLink}
          onClick={() => setProjectsOpen(false)}
          to="/projects"
        >
          All projects <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
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

            if (item.to === '/projects') {
              return (
                <div className={styles.projectsGroup} key={item.to} ref={projectsGroupRef}>
                  <Link
                    aria-current={active ? 'page' : undefined}
                    className={`${styles.navLink} ${styles.projectsLink} ${
                      active ? styles.navLinkActive : ''
                    }`}
                    onClick={(event) => handleNavClick(event, item)}
                    onKeyDown={handleProjectsKeyDown}
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                  <button
                    aria-controls="projects-menu"
                    aria-expanded={projectsOpen}
                    aria-label={projectsOpen ? 'Close project menu' : 'Open project menu'}
                    className={`${styles.dropdownToggle} ${
                      projectsOpen ? styles.dropdownToggleOpen : ''
                    }`}
                    onClick={() => setProjectsOpen((open) => !open)}
                    onKeyDown={handleProjectsKeyDown}
                    ref={projectsToggleRef}
                    type="button"
                  >
                    <span aria-hidden="true" className={styles.chevron}>
                      ▾
                    </span>
                  </button>
                  {renderProjectMenu()}
                </div>
              );
            }

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
          ref={menuButtonRef}
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

        <div className={styles.mobileProjects}>
          <span className={styles.mobileProjectsLabel}>Project worlds</span>
          <div className={styles.mobileProjectList}>
            {projects.map((projectItem, index) => {
              const isCurrentProject = location.pathname === `/projects/${projectItem.slug}`;

              return (
                <Link
                  aria-current={isCurrentProject ? 'page' : undefined}
                  className={`${styles.mobileProjectLink} ${
                    isCurrentProject ? styles.mobileProjectLinkActive : ''
                  }`}
                  key={projectItem.slug}
                  onClick={() => setMenuOpen(false)}
                  to={`/projects/${projectItem.slug}`}
                >
                  <span aria-hidden="true" className={styles.mobileProjectIndex}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    aria-hidden="true"
                    className={styles.mobileProjectSymbol}
                    style={{ color: projectItem.theme.accent }}
                  >
                    <PixelSprite variant={projectItem.theme.motif} />
                  </span>
                  <span className={styles.mobileProjectName}>{projectItem.title}</span>
                </Link>
              );
            })}
          </div>
          <Link className={styles.mobileAllProjects} to="/projects" onClick={() => setMenuOpen(false)}>
            All projects <span aria-hidden="true">→</span>
          </Link>
        </div>

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
