import PropTypes from 'prop-types';
import { cva } from '../../lib/cva.js';

const pillStyles = cva(
  [
    'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-body-sm font-medium',
    'transition-colors duration-200 ease-out motion-reduce:transition-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  ].join(' '),
  {
    variants: {
      pressed: {
        true: 'border-brand-500 bg-brand-500 text-white',
        false: 'border-border bg-transparent text-fg-muted hover:border-fg-muted hover:text-fg',
      },
    },
    defaultVariants: { pressed: false },
  },
);

/**
 * @typedef {object} FilterPillProps
 * @property {boolean} pressed - Whether this filter is currently active.
 * @property {(pressed: boolean) => void} onPressedChange - Called with the next pressed state on click.
 * @property {React.ReactNode} children - Filter label.
 * @property {string} [className]
 */

/**
 * Toggleable filter chip (portfolio/category filtering — Work page filter
 * bar). A real `<button>` with `aria-pressed`, not a styled checkbox or a
 * div with an onClick, so it's reachable and operable via keyboard and
 * announced correctly by screen readers.
 *
 * @param {FilterPillProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>} props
 */
export function FilterPill({ pressed, onPressedChange, children, className, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={pillStyles({ pressed, className })}
      onClick={() => onPressedChange(!pressed)}
      {...props}
    >
      {children}
    </button>
  );
}

FilterPill.propTypes = {
  pressed: PropTypes.bool.isRequired,
  onPressedChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default FilterPill;
