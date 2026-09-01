import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from '../ui/Card.jsx';
import { Badge } from '../ui/Badge.jsx';
import { brief } from '../../content/brief.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { NetworkIcon, ShieldIcon, LaptopIcon, ArrowRightIcon } from './HomeIcons.jsx';

// The 3 featured slugs, in display order — a hand-picked subset of the
// brief's 4 designated case-study projects (docs/sitemap.md), spanning
// distinct verticals per docs/strategy.md's "featured, 2-3 max" guidance.
// The 4th (Server & Storage Solution) surfaces on the full Work page.
const FEATURED_SLUGS = ['corporate-office-it-infrastructure', 'smart-cctv-security-system', 'enterprise-wifi-deployment'];

const VERTICAL_META = {
  'corporate-office-it-infrastructure': { label: 'Corporate', labelKey: 'vertical.corporate', Icon: LaptopIcon },
  'smart-cctv-security-system': { label: 'Security', labelKey: 'vertical.security', Icon: ShieldIcon },
  'enterprise-wifi-deployment': { label: 'Networking', labelKey: 'vertical.networking', Icon: NetworkIcon },
};

const featuredProjects = FEATURED_SLUGS.map((slug) => brief.projects.find((project) => project.slug === slug)).filter(
  Boolean,
);

/**
 * Placeholder project visual — no real project photography exists in the
 * brief yet. Consistent treatment across every card: aspect-video,
 * rounded-lg, gradient + centered category icon, so it reads as a
 * deliberate placeholder rather than a broken image.
 * @param {{ Icon: React.ComponentType<{ className?: string }> }} props
 */
function ProjectVisual({ Icon }) {
  return (
    <div
      aria-hidden="true"
      className="flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600"
    >
      <Icon className="size-10 text-white/70" />
    </div>
  );
}

ProjectVisual.propTypes = { Icon: PropTypes.elementType.isRequired };

/**
 * Featured Work — 3 standout brief projects as cards linking toward the
 * per-project case-study route (`/work/:slug`, structure only for now —
 * CaseStudyPage itself is a later phase). Imagery uses the consistent
 * placeholder treatment above pending real photography.
 */
export default function FeaturedWork() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-border bg-surface py-section">
      <div className="mx-auto max-w-content px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-h2 text-fg">{t('featuredWork.heading', 'Featured work')}</h2>
            <p className="mt-2 max-w-lg text-body text-fg-muted">
              {t(
                'featuredWork.desc',
                'Real deployments across corporate, security, and networking projects — supplied, installed, and supported by one team.',
              )}
            </p>
          </div>
          <Link to="/work" className="hidden shrink-0 items-center gap-1.5 text-body-sm font-medium text-brand-600 hover:text-brand-700 sm:inline-flex">
            {t('common.viewAllWork', 'View all work')}
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => {
            const meta = VERTICAL_META[project.slug];
            return (
              <Link key={project.slug} to={`/work/${project.slug}`} className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
                <Card interactive elevation="raised" padding="none" className="h-full overflow-hidden">
                  <ProjectVisual Icon={meta.Icon} />
                  <div className="p-6">
                    <Badge tone="brand">{t(meta.labelKey, meta.label)}</Badge>
                    <h3 className="mt-3 font-display text-h4 text-fg group-hover:text-brand-600">
                      {t(`project.${project.slug}.name`, project.name)}
                    </h3>
                    <p className="mt-2 text-body-sm text-fg-muted">
                      {t(`project.${project.slug}.description`, project.description)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-600">
                      {t('common.readCaseStudy', 'Read the case study')}
                      <ArrowRightIcon className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none" />
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        <Link to="/work" className="mt-8 inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-600 hover:text-brand-700 sm:hidden">
          {t('common.viewAllWork', 'View all work')}
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </section>
  );
}
