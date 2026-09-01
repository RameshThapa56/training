import PropTypes from 'prop-types';
import { cn } from '../../lib/cn.js';

/**
 * @typedef {object} SkeletonProps
 * @property {'text'|'circle'|'rect'} [variant] - Shape. Default 'rect'.
 * @property {string} [className] - Set explicit width/height utilities here (e.g. 'h-48 w-full').
 */

/**
 * Loading placeholder for async content (project galleries, images,
 * testimonial lists) — used in place of a blank flash or a layout jump
 * once real content resolves, per skills/motion-system/SKILL.md. The pulse
 * animation is disabled under `prefers-reduced-motion`, leaving a static
 * placeholder rather than removing the loading affordance entirely.
 *
 * @param {SkeletonProps & React.HTMLAttributes<HTMLDivElement>} props
 */
export function Skeleton({ variant = 'rect', className, ...props }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'animate-pulse bg-surface-sunken motion-reduce:animate-none',
        variant === 'circle' && 'rounded-full',
        variant === 'text' && 'h-4 rounded',
        variant === 'rect' && 'rounded-md',
        className,
      )}
      {...props}
    />
  );
}

Skeleton.propTypes = {
  variant: PropTypes.oneOf(['text', 'circle', 'rect']),
  className: PropTypes.string,
};

export default Skeleton;
