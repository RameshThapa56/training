import { Link, useParams } from 'react-router-dom';
import { Badge } from '../components/ui/index.js';
import { buttonStyles } from '../components/ui/Button.jsx';
import { ArrowRightIcon } from '../components/home/HomeIcons.jsx';
import { CtaBand } from '../components/CtaBand.jsx';
import { Seo } from '../components/Seo.jsx';
import { getInsightPost } from '../content/insights.js';

/**
 * Route: `/insights/:slug`
 *
 * Blog post template. Renders whichever `src/content/insights.js` entry
 * matches the slug — see that file's header note on why every post here
 * is placeholder content. An unknown slug gets a lightweight not-found
 * state (mirrors `CaseStudyPage`'s pattern) rather than the app-wide 404.
 */
export default function InsightsPostPage() {
  const { slug } = useParams();
  const post = getInsightPost(slug);

  if (!post) {
    return (
      <>
        <Seo
          title="Post Not Found | Bhutan IT Solutions"
          description="This post may have been renamed or moved. Browse the full Insights list instead."
          path="/insights"
          noindex
        />
        <section className="py-section">
          <div className="mx-auto max-w-content px-6 text-center">
            <h1 className="font-display text-h1 text-fg">We couldn&rsquo;t find that post</h1>
            <p className="mx-auto mt-3 max-w-md text-body-lg text-fg-muted">
              It may have been renamed or moved. Browse the full Insights list instead.
            </p>
            <Link to="/insights" className={buttonStyles({ intent: 'primary', size: 'lg', className: 'mt-8' })}>
              Back to Insights
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Seo
        title={`${post.title} | Insights — Bhutan IT Solutions`}
        description={post.excerpt}
        path={`/insights/${post.slug}`}
        type="article"
        noindex={post.isPlaceholder}
      />

      <article className="py-section">
        <div className="mx-auto max-w-narrow px-6">
          <Link
            to="/insights"
            className="inline-flex items-center gap-1.5 text-body-sm font-medium text-fg-muted hover:text-fg"
          >
            <ArrowRightIcon className="size-4 rotate-180" aria-hidden="true" />
            Back to Insights
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge tone="brand">{post.category}</Badge>
            {post.isPlaceholder && <Badge tone="warning">Placeholder — not yet published</Badge>}
          </div>

          <h1 className="mt-4 font-display text-h1 text-fg">{post.title}</h1>
          <p className="mt-3 text-body-sm text-fg-muted">
            {post.publishedLabel} &middot; {post.readTime}
          </p>

          <div className="mt-10 space-y-5">
            {post.body.map((paragraph) => (
              <p key={paragraph} className="text-body-lg text-fg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      <CtaBand heading="Prefer to just ask us directly?" secondaryTo="/insights" secondaryLabel="More Insights" />
    </>
  );
}
