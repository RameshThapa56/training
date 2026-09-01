import { useId } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../lib/cn.js';

/**
 * @typedef {object} FieldProps
 * @property {string} label - Visible label text.
 * @property {string} [hint] - Helper text shown below the control when there's no error.
 * @property {string} [error] - Validation error; when present, replaces the hint, marks the
 *   control invalid, and is announced via `aria-describedby` + `role="alert"`.
 * @property {boolean} [required]
 * @property {(fieldProps: { id: string, 'aria-describedby'?: string, 'aria-invalid'?: boolean, required?: boolean }) => React.ReactNode} children -
 *   Render prop: pass the returned props straight onto your `Input`/`Textarea`.
 * @property {string} [className]
 */

/**
 * Label + control + hint/error wrapper used by every form (contact/quote
 * request, newsletter). Owns the id/aria-describedby wiring so `Input` and
 * `Textarea` themselves stay unaware of their surrounding label — pass a
 * render-prop child and spread the given props onto the control.
 *
 * @example
 * <Field label="Email" hint="We'll only use this to reply." error={errors.email}>
 *   {(fieldProps) => <Input type="email" {...fieldProps} />}
 * </Field>
 *
 * @param {FieldProps} props
 */
export function Field({ label, hint, error, required = false, children, className }) {
  const id = useId();
  const controlId = `${id}-control`;
  const messageId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={controlId} className="text-body-sm font-medium text-fg">
        {label}
        {required && (
          <span className="ml-0.5 text-error-700" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children({
        id: controlId,
        'aria-describedby': messageId,
        'aria-invalid': Boolean(error) || undefined,
        required,
      })}

      {error ? (
        <p id={messageId} role="alert" className="text-caption text-error-700">
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="text-caption text-fg-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Field;
