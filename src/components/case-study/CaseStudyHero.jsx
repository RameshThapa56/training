import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Badge, Reveal } from '../ui/index.js';
import { ArrowRightIcon } from '../home/HomeIcons.jsx';

/**
 * @typedef {object} CaseStudyHeroProps
 * @property {string} name
 * @property {string} description - One-line outcome/hook from the brief.
 * @property {string} category
 * @property {React.ComponentType<{ className?: string }>} Icon
 * @property {'Case Study'|'Project'} [format] - Default 'Case Study'.
 */

/**
 * Overview beat — the hook before anyone scrolls (skill: "project name,
 * client/context, role, timeframe, one-line outcome"). The brief gives us
 * name + one-line description only, no per-project role/timeframe/client
 * name to attribute — so this renders exactly what's real rather than
 * inventing the rest. Includes the persistent-but-unobtrusive way back to
 * the full portfolio the skill's interaction requirements call for.
 *
 * @param {CaseStudyHeroProps} props
 */
export function CaseStudyHero({ name, description, category, Icon, format = 'Case Study' }) {
  return (
    <section id="beat-overview" data-case-study-beat="overview" className="bg-surface py-section-sm sm:py-section">
      <Reveal className="mx-auto max-w-content px-6">
        <Link
          to="/work"
          className="inline-flex items-center gap-1.5 text-body-sm font-medium text-fg-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <ArrowRightIcon className="size-4 rotate-180" />
          Back to all work
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Badge tone="brand" icon={<Icon className="size-3.5" />}>
            {category}
          </Badge>
          <Badge tone="neutral">{format}</Badge>
        </div>

        <h1 className="mt-4 max-w-3xl font-display text-display text-fg">{name}</h1>
        <p className="mt-5 max-w-2xl text-body-lg text-fg-muted">{description}</p>
      </Reveal>
    </section>
  );
}

CaseStudyHero.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  format: PropTypes.oneOf(['Case Study', 'Project']),
};

export default CaseStudyHero;
