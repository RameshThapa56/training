import PropTypes from 'prop-types';
import { cva } from '../../lib/cva.js';
import { cn } from '../../lib/cn.js';
import { HOVER_LIFT } from '../../lib/motion.js';

const cardStyles = cva('rounded-lg border border-border bg-surface-elevated', {
  variants: {
    padding: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
    elevation: {
      flat: '',
      raised: 'shadow-md',
      floating: 'shadow-lg',
    },
    // Shared hover-lift utility (src/lib/motion.js) — every interactive
    // Card (project, service, testimonial) gets the same hover feel.
    interactive: {
      true: HOVER_LIFT,
    },
  },
  defaultVariants: { padding: 'md', elevation: 'flat' },
});

/**
 * @typedef {object} CardProps
 * @property {'none'|'sm'|'md'|'lg'} [padding] - Default 'md'.
 * @property {'flat'|'raised'|'floating'} [elevation] - Default 'flat'.
 * @property {boolean} [interactive] - Adds a hover-elevate treatment for clickable cards
 *   (e.g. project cards). The card itself stays a plain `<div>` — wrap it in a real
 *   `<a>`/`<button>` for the click target rather than an `onClick` div.
 * @property {React.ReactNode} children
 * @property {string} [className]
 */

/**
 * Static content surface — the base for ProjectCard, service tiles, pricing
 * tiers, testimonial cards, etc. Composes with `Card.Header`/`Card.Body`/
 * `Card.Footer` for consistent internal rhythm, or accepts children directly.
 *
 * @param {CardProps & React.HTMLAttributes<HTMLDivElement>} props
 */
export function Card({ padding = 'md', elevation = 'flat', interactive = false, className, children, ...props }) {
  return (
    <div className={cardStyles({ padding, elevation, interactive, className })} {...props}>
      {children}
    </div>
  );
}

Card.propTypes = {
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  elevation: PropTypes.oneOf(['flat', 'raised', 'floating']),
  interactive: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

/** @param {{ className?: string, children?: React.ReactNode }} props */
Card.Header = function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('mb-4 space-y-1.5', className)} {...props}>
      {children}
    </div>
  );
};
Card.Header.propTypes = { className: PropTypes.string, children: PropTypes.node };

/** @param {{ className?: string, children?: React.ReactNode }} props */
Card.Body = function CardBody({ className, children, ...props }) {
  return (
    <div className={cn('text-body text-fg-muted', className)} {...props}>
      {children}
    </div>
  );
};
Card.Body.propTypes = { className: PropTypes.string, children: PropTypes.node };

/** @param {{ className?: string, children?: React.ReactNode }} props */
Card.Footer = function CardFooter({ className, children, ...props }) {
  return (
    <div className={cn('mt-6 flex items-center gap-3', className)} {...props}>
      {children}
    </div>
  );
};
Card.Footer.propTypes = { className: PropTypes.string, children: PropTypes.node };

export default Card;
