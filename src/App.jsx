import { useEffect, useMemo } from 'react';
import {
  HashRouter,
  matchPath,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { ScrollManager } from './components/layout/ScrollManager';
import { ProjectArtworkStage } from './components/project/ProjectArtwork';
import { ProjectBackdrop } from './components/project/ProjectBackdrop';
import { getProjectBySlug } from './data/projects';
import { siteTheme } from './data/site';
import { themeToCssVars } from './lib/theme';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectPage } from './pages/ProjectPage';
import styles from './App.module.css';

const pageTitles = {
  '/': 'Home',
  '/projects': 'Projects',
  '/skills': 'Skills',
  '/about': 'About',
  '/contact': 'Contact',
};

function getPageTitle(pathname, project) {
  if (project) {
    return `${project.title} — HaxBv`;
  }

  return `${pageTitles[pathname] || 'Not found'} — HaxBv`;
}

function AppShell() {
  const location = useLocation();
  const projectMatch = matchPath({ path: '/projects/:slug', end: true }, location.pathname);
  const project = projectMatch ? getProjectBySlug(projectMatch.params.slug) : null;
  const theme = project?.theme || siteTheme;
  const themeVariables = useMemo(() => themeToCssVars(theme), [theme]);
  const pageTitle = getPageTitle(location.pathname, project);

  useEffect(() => {
    document.title = pageTitle;

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    themeMeta?.setAttribute('content', theme.background);
    document.documentElement.style.setProperty('--page-bg', theme.background);
  }, [pageTitle, theme.background]);

  function handleSkipLink(event) {
    event.preventDefault();
    const main = document.getElementById('main-content');
    main?.focus();
    main?.scrollIntoView({ block: 'start' });
  }

  return (
    <div className={styles.appShell} style={themeVariables}>
      <div aria-hidden="true" className={styles.ambient} />
      {project ? <ProjectBackdrop project={project} /> : null}
      <ProjectArtworkStage project={project} />

      <a className={styles.skipLink} href="#main-content" onClick={handleSkipLink}>
        Skip to content
      </a>

      <Navbar project={project} />
      <ScrollManager />

      <main className={styles.main} id="main-content" tabIndex={-1}>
        <div className={styles.routeFrame} key={location.pathname}>
          <Routes location={location}>
            <Route element={<HomePage />} path="/" />
            <Route element={<HomePage />} path="/projects" />
            <Route element={<HomePage />} path="/skills" />
            <Route element={<HomePage />} path="/about" />
            <Route element={<HomePage />} path="/contact" />
            <Route element={<ProjectPage />} path="/projects/:slug" />
            <Route element={<NotFoundPage />} path="*" />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}
