import PropTypes from 'prop-types';
import { cn } from '../../lib/cn.js';

const baseInputStyles = [
  'w-full rounded border border-border bg-surface px-3.5 text-body text-fg placeholder:text-fg-muted',
  'transition-colors duration-200 ease-out motion-reduce:transition-none',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  'disabled:pointer-events-none disabled:opacity-50',
  'aria-invalid:border-error-500 aria-invalid:focus-visible:ring-error-500',
].join(' ');

/**
 * @typedef {object} InputProps
 * @property {string} [className]
 * @property {React.Ref<HTMLInputElement>} [ref]
 */

/**
 * Styled text input. Headless of label/error markup by design — use inside
 * `Field`, which supplies `id`/`aria-describedby`/`aria-invalid`.
 *
 * @param {InputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref'>} props
 */
export function Input({ className, ref, ...props }) {
  return <input ref={ref} className={cn(baseInputStyles, 'h-11', className)} {...props} />;
}

Input.propTypes = {
  className: PropTypes.string,
  ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default Input;
