import NavBar from './NavBar.jsx';
import PageTransition from './PageTransition.jsx';

/**
 * Root layout: site header (`NavBar`) + outlet for the current route.
 *
 * The footer here is still a lightweight placeholder — the fuller footer
 * (company/offering/contact link groups, trust strip, social links) from
 * docs/sitemap.md §2 lands in a later phase; this only carries enough
 * token-based styling to not look broken next to the real header.
 */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <NavBar />
      <main id="main-content" className="flex-1">
        <PageTransition />
      </main>
      <footer className="border-t border-border bg-surface-sunken py-8">
        <p className="mx-auto max-w-content px-6 text-caption text-fg-muted">
          &copy; {new Date().getFullYear()} Bhutan IT Solutions. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
