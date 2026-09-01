import PropTypes from 'prop-types';
import { cn } from '../../lib/cn.js';

const baseTextareaStyles = [
  'w-full rounded border border-border bg-surface px-3.5 py-3 text-body text-fg placeholder:text-fg-muted',
  'transition-colors duration-200 ease-out motion-reduce:transition-none',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  'disabled:pointer-events-none disabled:opacity-50',
  'aria-invalid:border-error-500 aria-invalid:focus-visible:ring-error-500',
].join(' ');

/**
 * @typedef {object} TextareaProps
 * @property {string} [className]
 * @property {React.Ref<HTMLTextAreaElement>} [ref]
 */

/**
 * Styled multi-line text input (project details / message field on the
 * quote request form). Same headless-of-label contract as `Input` — use
 * inside `Field`.
 *
 * @param {TextareaProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'ref'>} props
 */
export function Textarea({ className, rows = 5, ref, ...props }) {
  return <textarea ref={ref} rows={rows} className={cn(baseTextareaStyles, className)} {...props} />;
}

Textarea.propTypes = {
  className: PropTypes.string,
  rows: PropTypes.number,
  ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default Textarea;
