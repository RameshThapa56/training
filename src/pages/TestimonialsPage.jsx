import { Link } from 'react-router-dom';
import { Card, Avatar } from '../components/ui/index.js';
import { QuoteIcon, ArrowRightIcon } from '../components/home/HomeIcons.jsx';
import { CtaBand } from '../components/CtaBand.jsx';
import { Seo } from '../components/Seo.jsx';
import { brief } from '../content/brief.js';

// Each testimonial's related project, inferred by matching quote content
// against `brief.projects` (e.g. Karma Dorji's "complete office
// infrastructure" -> the Corporate Office IT Infrastructure project). The
// brief doesn't state these links explicitly — this mapping is a
// presentation choice, same as `home/FeaturedTestimonials.jsx`'s featured
// selection, not a fact pulled directly from brief data. Every project
// (case-study or not) has a page at `/work/:slug`, so every link resolves.
const RELATED_PROJECT_SLUG = {
  'Karma Dorji': 'corporate-office-it-infrastructure',
  'Pema Wangchuk': 'smart-cctv-security-system',
  'Sonam Choden': 'school-computer-lab-setup',
};

const [featured, ...rest] = brief.testimonials;

/**
 * Route: `/testimonials`
 *
 * Full testimonial collection — all 3 from the brief (the Home page shows
 * only 2, per `home/FeaturedTestimonials.jsx`). Per docs/sitemap.md's
 * content hierarchy: one featured quote above the fold, the remaining
 * quotes below it, each linking to a related case study where one exists.
 */
export default function TestimonialsPage() {
  return (
    <>
      <Seo
        title="Testimonials | Bhutan IT Solutions"
        description="What organizational and individual clients say about working with us — office infrastructure, CCTV, and computer lab deployments across Bhutan."
        path="/testimonials"
      />

      {/* Above the fold: intro + 1 featured testimonial */}
      <section className="border-b border-border bg-surface py-section">
        <div className="mx-auto max-w-content px-6">
          <div className="max-w-narrow">
            <p className="text-caption font-medium uppercase tracking-wide text-brand-600">Testimonials</p>
            <h1 className="mt-2 font-display text-h1 text-fg">What clients say about working with us</h1>
          </div>

          {featured && (
            <Card interactive elevation="floating" padding="lg" className="mt-10 max-w-narrow">
              <QuoteIcon className="size-10 text-accent-500" aria-hidden="true" />
              <p className="mt-6 font-display text-h3 font-medium text-fg">&ldquo;{featured.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar name={featured.name} size="md" />
                <div>
                  <p className="text-body font-medium text-fg">{featured.name}</p>
                  <p className="text-body-sm text-fg-muted">{featured.role}</p>
                </div>
              </div>
              {RELATED_PROJECT_SLUG[featured.name] && (
                <Link
                  to={`/work/${RELATED_PROJECT_SLUG[featured.name]}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-600 hover:text-brand-700"
                >
                  See the related project
                  <ArrowRightIcon className="size-4" />
                </Link>
              )}
            </Card>
          )}
        </div>
      </section>

      {/* Remaining testimonials */}
      {rest.length > 0 && (
        <section className="py-section">
          <div className="mx-auto max-w-content px-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((testimonial) => (
                <Card key={testimonial.name} interactive elevation="raised" className="flex flex-col">
                  <QuoteIcon className="size-8 text-accent-500" aria-hidden="true" />
                  <p className="mt-4 flex-1 text-body-lg text-fg">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar name={testimonial.name} size="sm" />
                    <div>
                      <p className="text-body-sm font-medium text-fg">{testimonial.name}</p>
                      <p className="text-caption text-fg-muted">{testimonial.role}</p>
                    </div>
                  </div>
                  {RELATED_PROJECT_SLUG[testimonial.name] && (
                    <Link
                      to={`/work/${RELATED_PROJECT_SLUG[testimonial.name]}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-600 hover:text-brand-700"
                    >
                      See the related project
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand heading="Want results like these?" secondaryTo="/work" secondaryLabel="Browse all work" />
    </>
  );
}
