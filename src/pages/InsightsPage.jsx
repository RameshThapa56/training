import { Link } from 'react-router-dom';
import { Badge, Card } from '../components/ui/index.js';
import { ArrowRightIcon } from '../components/home/HomeIcons.jsx';
import { CtaBand } from '../components/CtaBand.jsx';
import { Seo } from '../components/Seo.jsx';
import { insightPosts } from '../content/insights.js';

/**
 * Route: `/insights`
 *
 * Insights/blog index. `docs/brief.md` supplies no articles or content
 * topics for this page (see `src/content/insights.js`'s header note), so
 * this renders the structure per docs/sitemap.md's content hierarchy —
 * intro above the fold, a post grid below it — over 2 clearly-flagged
 * placeholder posts rather than inventing real-looking editorial content.
 */
export default function InsightsPage() {
  return (
    <>
      <Seo
        title="Insights | Bhutan IT Solutions"
        description="Technology guidance on networking, security, and IT infrastructure for businesses and individuals in Bhutan."
        path="/insights"
      />

      <section className="border-b border-border bg-surface py-section">
        <div className="mx-auto max-w-content px-6">
          <div className="max-w-narrow">
            <p className="text-caption font-medium uppercase tracking-wide text-brand-600">Insights</p>
            <h1 className="mt-2 font-display text-h1 text-fg">Technology guidance, in plain language</h1>
            <p className="mt-5 text-body-lg text-fg-muted">
              Practical notes on networking, security, and IT infrastructure — the kind of thing we&rsquo;d
              tell a client before they ask.
            </p>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-lg border border-dashed border-border bg-surface-sunken p-4">
            <span className="mt-0.5 text-body-sm font-medium text-warning-800">Note</span>
            <p className="text-body-sm text-fg-muted">
              This section is structural scaffolding — the posts below are clearly-labeled placeholders.
              Real articles need to be written before this page goes live.
            </p>
          </div>
        </div>
      </section>

      <section className="py-section">
        <div className="mx-auto max-w-content px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {insightPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/insights/${post.slug}`}
                className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <Card interactive elevation="raised" className="flex h-full flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="brand">{post.category}</Badge>
                    {post.isPlaceholder && <Badge tone="warning">Placeholder</Badge>}
                  </div>
                  <h2 className="mt-3 font-display text-h4 text-fg group-hover:text-brand-600">{post.title}</h2>
                  <p className="mt-2 flex-1 text-body-sm text-fg-muted">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-caption text-fg-muted">
                    <span>
                      {post.publishedLabel} &middot; {post.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium text-brand-600">
                      Read
                      <ArrowRightIcon className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Have a specific question?"
        subtext="Skip the reading and talk to us directly."
        secondaryTo="/services"
        secondaryLabel="Browse services"
      />
    </>
  );
}
