import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Badge, Reveal } from '../ui/index.js';
import { ArrowRightIcon } from '../home/HomeIcons.jsx';
import { HOVER_LIFT } from '../../lib/motion.js';
import { cn } from '../../lib/cn.js';

/**
 * @typedef {object} NextProject
 * @property {string} slug
 * @property {string} name
 * @property {string} description
 * @property {string} category
 * @property {React.ComponentType<{ className?: string }>} Icon
 */

/**
 * Next project / related work beat — a discovery hook into another
 * portfolio entry, keeping the visitor exploring rather than dead-ending
 * on the last section (per the skill's final beat + "persistent... way
 * forward to the next case study").
 *
 * @param {{ project: NextProject }} props
 */
export function NextProjectSection({ project }) {
  return (
    <section
      id="beat-next-project"
      data-case-study-beat="next-project"
      className="border-t border-border py-section-sm sm:py-section"
    >
      <Reveal className="mx-auto max-w-content px-6">
        <p className="text-caption font-medium uppercase tracking-wide text-fg-muted">Next up</p>

        <Link
          to={`/work/${project.slug}`}
          className="group mt-4 block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <div className={cn('flex flex-col items-start justify-between gap-6 rounded-lg border border-border bg-surface-elevated p-8 sm:flex-row sm:items-center', HOVER_LIFT)}>
            <div>
              <Badge tone="brand" icon={<project.Icon className="size-3.5" />}>
                {project.category}
              </Badge>
              <h3 className="mt-3 font-display text-h3 text-fg group-hover:text-brand-600">{project.name}</h3>
              <p className="mt-2 max-w-lg text-body text-fg-muted">{project.description}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 text-body font-medium text-brand-600">
              View project
              <ArrowRightIcon className="size-5 transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none" />
            </span>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}

NextProjectSection.propTypes = {
  project: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
  }).isRequired,
};

export default NextProjectSection;
