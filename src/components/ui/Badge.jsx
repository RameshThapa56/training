import PropTypes from 'prop-types';
import { cva } from '../../lib/cva.js';

const badgeStyles = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-caption font-medium whitespace-nowrap',
  {
    variants: {
      tone: {
        neutral: 'bg-surface-sunken text-fg-muted',
        brand: 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-200',
        accent: 'bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-200',
        success: 'bg-success-50 text-success-700',
        warning: 'bg-warning-50 text-warning-800',
        error: 'bg-error-50 text-error-700',
      },
    },
    defaultVariants: { tone: 'neutral' },
  },
);

/**
 * @typedef {object} BadgeProps
 * @property {'neutral'|'brand'|'accent'|'success'|'warning'|'error'} [tone] - Default 'neutral'.
 * @property {React.ReactNode} [icon] - Optional leading icon (decorative; wrap with aria-hidden yourself).
 * @property {React.ReactNode} children
 * @property {string} [className]
 */

/**
 * Compact status/category label (badge or filter tag). Non-interactive by
 * default — for a clickable/toggleable pill, use `FilterPill` instead.
 *
 * @param {BadgeProps & React.HTMLAttributes<HTMLSpanElement>} props
 */
export function Badge({ tone = 'neutral', icon, children, className, ...props }) {
  return (
    <span className={badgeStyles({ tone, className })} {...props}>
      {icon}
      {children}
    </span>
  );
}

Badge.propTypes = {
  tone: PropTypes.oneOf(['neutral', 'brand', 'accent', 'success', 'warning', 'error']),
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Badge;
