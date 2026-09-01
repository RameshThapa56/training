import { Link } from 'react-router-dom';
import { buttonStyles } from '../components/ui/Button.jsx';
import { Seo } from '../components/Seo.jsx';

/** Catch-all 404 route. */
export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found | Bhutan IT Solutions"
        description="The page you're looking for may have been renamed or moved."
        path="/404"
        noindex
      />
      <section className="py-section">
        <div className="mx-auto max-w-content px-6 text-center">
          <h1 className="font-display text-h1 text-fg">Page not found</h1>
          <p className="mx-auto mt-3 max-w-md text-body-lg text-fg-muted">
            It may have been renamed or moved. Head back to the homepage instead.
          </p>
          <Link to="/" className={buttonStyles({ intent: 'primary', size: 'lg', className: 'mt-8' })}>
            Back to home
          </Link>
        </div>
      </section>
    </>
  );
}
