import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';

/**
 * Data router (React Router). One route per top-level page from the brief,
 * plus the dynamic case-study route.
 *
 * `HomePage` is the only page imported eagerly — it's what the initial
 * request needs to paint. Every other route is code-split via the data
 * router's `lazy` field (dynamic `import()` resolved per-navigation), so a
 * visit to `/` no longer ships the JS for every other page up front — see
 * the Phase perf pass that added this (Lighthouse Performance was 55 with
 * everything in one ~530kB bundle). `lazy` takes a loader returning
 * `{ Component }` (or `{ default }`, which it treats the same); our pages
 * already default-export, so `.then((m) => ({ Component: m.default }))`
 * adapts that shape without changing every page file.
 *
 * `/dev/style-guide` renders every design-system primitive for visual
 * review (Phase 03) — deliberately outside `Layout` (no site nav/footer)
 * and deliberately absent from `Layout`'s NAV_LINKS.
 */
const lazyPage = (importer) => async () => {
  const module = await importer();
  return { Component: module.default };
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', lazy: lazyPage(() => import('./pages/AboutPage.jsx')) },
      { path: 'services', lazy: lazyPage(() => import('./pages/ServicesPage.jsx')) },
      { path: 'work', lazy: lazyPage(() => import('./pages/WorkPage.jsx')) },
      { path: 'work/:slug', lazy: lazyPage(() => import('./pages/CaseStudyPage.jsx')) },
      { path: 'testimonials', lazy: lazyPage(() => import('./pages/TestimonialsPage.jsx')) },
      { path: 'insights', lazy: lazyPage(() => import('./pages/InsightsPage.jsx')) },
      { path: 'insights/:slug', lazy: lazyPage(() => import('./pages/InsightsPostPage.jsx')) },
      { path: 'contact', lazy: lazyPage(() => import('./pages/ContactPage.jsx')) },
      { path: '*', lazy: lazyPage(() => import('./pages/NotFoundPage.jsx')) },
    ],
  },
  { path: '/dev/style-guide', lazy: lazyPage(() => import('./pages/dev/StyleGuidePage.jsx')) },
]);

export default router;
