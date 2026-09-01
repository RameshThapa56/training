import PropTypes from 'prop-types';
import { cva } from '../../lib/cva.js';

/**
 * Variant resolver — exported so consumers can apply Button's visual
 * treatment to a non-`<button>` element (e.g. React Router's `<Link>`)
 * without duplicating the class list.
 */
export const buttonStyles = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded font-display font-semibold',
    'transition-colors duration-200 ease-out motion-reduce:transition-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      intent: {
        primary: 'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700',
        accent: 'bg-accent-500 text-neutral-950 hover:bg-accent-400 active:bg-accent-600',
        outline: 'border border-border text-fg bg-transparent hover:bg-surface-sunken',
        ghost: 'text-fg bg-transparent hover:bg-surface-sunken',
        danger: 'bg-error-500 text-white hover:bg-error-700',
      },
      size: {
        sm: 'h-9 px-3.5 text-body-sm',
        md: 'h-11 px-5 text-body',
        lg: 'h-13 px-7 text-body-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: { intent: 'primary', size: 'md' },
  },
);

/**
 * @typedef {object} ButtonProps
 * @property {'primary'|'accent'|'outline'|'ghost'|'danger'} [intent] - Visual treatment. Default 'primary'.
 * @property {'sm'|'md'|'lg'} [size] - Height/padding/type scale. Default 'md'.
 * @property {boolean} [fullWidth] - Stretch to the width of its container.
 * @property {boolean} [isLoading] - Shows a spinner and disables interaction while true.
 * @property {React.ReactNode} [children]
 * @property {string} [className]
 * @property {React.Ref<HTMLButtonElement>} [ref]
 */

/**
 * Primary interactive control. Renders a native `<button>` — real click,
 * keyboard (Enter/Space), and disabled semantics come for free. For a
 * link that should look like a button, use `buttonStyles({ intent, size })`
 * directly on a `<Link>`/`<a>` rather than rendering this as a link.
 *
 * @param {ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'>} props
 */
export function Button({
  intent = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  className,
  children,
  ref,
  ...props
}) {
  return (
    <button
      ref={ref}
      type={props.type ?? 'button'}
      className={buttonStyles({ intent, size, fullWidth, className })}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading && (
        <svg
          className="size-4 animate-spin motion-reduce:animate-none"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

Button.propTypes = {
  intent: PropTypes.oneOf(['primary', 'accent', 'outline', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default Button;
