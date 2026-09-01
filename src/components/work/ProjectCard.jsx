import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Badge } from '../ui/index.js';
import { ArrowRightIcon } from '../home/HomeIcons.jsx';

/**
 * Placeholder project visual — same treatment as `home/FeaturedWork.jsx`
 * (gradient + centered category icon), extended with a hover/focus reveal:
 * the icon crossfades out and a "View case study" scrim crossfades in, so
 * hovering a card surfaces a secondary detail instead of doing nothing
 * until you click. No real project photography exists in the brief yet.
 *
 * @param {{ Icon: React.ComponentType<{ className?: string }>, format: string }} props
 */
function ProjectVisual({ Icon, format }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600"
    >
      <Icon className="size-10 text-white/70 transition-opacity duration-200 ease-out group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:transition-none" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-neutral-950/55 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
        <ArrowRightIcon className="size-6 text-white" />
        <span className="text-caption font-medium text-white">
          {format === 'Case Study' ? 'View case study' : 'View project'}
        </span>
      </div>
    </div>
  );
}

ProjectVisual.propTypes = { Icon: PropTypes.elementType.isRequired, format: PropTypes.string.isRequired };

/**
 * @typedef {object} ProjectCardProps
 * @property {import('../../content/work.js').workProjects[number]} project
 */

/**
 * Portfolio grid card — consistent image/title/result/tags treatment shared
 * across the Work index. Mirrors `home/FeaturedWork.jsx`'s card composition
 * (Card + placeholder visual + Badge + title + description + CTA affordance)
 * rather than a new one-off design, and adds the category/format tag row
 * the Work grid's filters key off of.
 *
 * Wrapped in `memo` — the Work page grid re-renders on every filter/
 * pagination change (`src/pages/WorkPage.jsx`), and most cards in a
 * filtered result didn't actually change; `memo` skips re-rendering the
 * ones whose `project` reference is unchanged (every `workProjects` entry
 * is a stable module-level object, so this is a real, not just theoretical,
 * skip).
 *
 * @param {ProjectCardProps} props
 */
function ProjectCardImpl({ project }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
    >
      <Card interactive elevation="raised" padding="none" className="h-full overflow-hidden">
        <ProjectVisual Icon={project.Icon} format={project.format} />
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="brand">{project.category}</Badge>
            <Badge tone="neutral">{project.format}</Badge>
          </div>
          <h3 className="mt-3 font-display text-h4 text-fg group-hover:text-brand-600">{project.name}</h3>
          <p className="mt-2 text-body-sm text-fg-muted">{project.description}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-600">
            {project.format === 'Case Study' ? 'Read the case study' : 'View the project'}
            <ArrowRightIcon className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </span>
        </div>
      </Card>
    </Link>
  );
}

ProjectCardImpl.propTypes = {
  project: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
  }).isRequired,
};

export const ProjectCard = memo(ProjectCardImpl);

export default ProjectCard;
