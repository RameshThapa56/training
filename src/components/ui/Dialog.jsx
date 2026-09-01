import { createContext, use, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { cn } from '../../lib/cn.js';
import { cva } from '../../lib/cva.js';
import { useFocusTrap } from '../../lib/useFocusTrap.js';
import { useReducedMotion } from '../../lib/motion.js';

const DialogContext = createContext(null);

// `size`/`padded` are real cva variants (not "override via className")
// specifically because `cn` is plain string concatenation, not
// tailwind-merge — two conflicting same-property utilities (e.g. a
// caller's `max-w-sm` appended after this component's own `max-w-lg`)
// aren't guaranteed to resolve in className order once Tailwind compiles
// them, so callers that need a different width/padding must use these
// variants rather than fight the base classes with an arbitrary className.
const dialogContentStyles = cva('relative z-10 w-full rounded-lg bg-surface-elevated shadow-lg focus-visible:outline-none', {
  variants: {
    size: {
      sm: 'max-w-sm',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
    },
    padded: {
      true: 'p-6',
      false: '',
    },
  },
  defaultVariants: { size: 'md', padded: true },
});

function useDialogContext(component) {
  const ctx = use(DialogContext);
  if (!ctx) throw new Error(`<Dialog.${component}> must be rendered inside <Dialog>`);
  return ctx;
}

/**
 * @typedef {object} DialogProps
 * @property {boolean} open
 * @property {(open: boolean) => void} onOpenChange
 * @property {React.ReactNode} children - `<Dialog.Content>` (and anything else — triggers live outside).
 */

/**
 * Modal dialog (WAI-ARIA Dialog (Modal) Pattern) — used for e.g. a "request
 * a quote" quick-form modal or a project image lightbox. Traps focus,
 * closes on Escape or backdrop click, locks background scroll while open,
 * and restores focus to the trigger on close. Rendered via a portal so
 * stacking context/overflow on ancestor elements can't clip it.
 *
 * @param {DialogProps} props
 */
export function Dialog({ open, onOpenChange, children }) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <DialogContext value={{ open, onOpenChange, titleId, descriptionId }}>{children}</DialogContext>
  );
}

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

/**
 * @param {{ children: React.ReactNode, className?: string, closeOnBackdropClick?: boolean, size?: 'sm'|'md'|'lg', padded?: boolean }} props
 */
Dialog.Content = function DialogContent({
  children,
  className,
  closeOnBackdropClick = true,
  size = 'md',
  padded = true,
  ...props
}) {
  const { open, onOpenChange, titleId, descriptionId } = useDialogContext('Content');
  const contentRef = useRef(null);
  const reduced = useReducedMotion();
  useFocusTrap(contentRef, open);

  useEffect(() => {
    if (!open) return undefined;
    function handleKeyDown(event) {
      if (event.key === 'Escape') onOpenChange(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        className={cn('absolute inset-0 bg-neutral-950/60', !reduced && 'motion-safe:animate-[dialog-backdrop-in_0.2s_ease-out]')}
        onClick={closeOnBackdropClick ? () => onOpenChange(false) : undefined}
      />
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn(
          dialogContentStyles({ size, padded }),
          !reduced && 'motion-safe:animate-[dialog-content-in_0.2s_ease-out]',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};
Dialog.Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeOnBackdropClick: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  padded: PropTypes.bool,
};

/** @param {{ children: React.ReactNode, className?: string }} props */
Dialog.Title = function DialogTitle({ children, className, ...props }) {
  const { titleId } = useDialogContext('Title');
  return (
    <h2 id={titleId} className={cn('font-display text-h4 text-fg', className)} {...props}>
      {children}
    </h2>
  );
};
Dialog.Title.propTypes = { children: PropTypes.node.isRequired, className: PropTypes.string };

/** @param {{ children: React.ReactNode, className?: string }} props */
Dialog.Description = function DialogDescription({ children, className, ...props }) {
  const { descriptionId } = useDialogContext('Description');
  return (
    <p id={descriptionId} className={cn('mt-1.5 text-body-sm text-fg-muted', className)} {...props}>
      {children}
    </p>
  );
};
Dialog.Description.propTypes = { children: PropTypes.node.isRequired, className: PropTypes.string };

/**
 * Close button — pass any content; defaults to an "×" icon-button. Placing
 * this is up to the consumer (top-right of `Dialog.Content` is conventional).
 * @param {{ children?: React.ReactNode, className?: string }} props
 */
Dialog.Close = function DialogClose({ children, className, ...props }) {
  const { onOpenChange } = useDialogContext('Close');
  return (
    <button
      type="button"
      onClick={() => onOpenChange(false)}
      className={cn(
        'inline-flex size-8 items-center justify-center rounded text-fg-muted hover:bg-surface-sunken hover:text-fg',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="sr-only">Close</span>
        </>
      )}
    </button>
  );
};
Dialog.Close.propTypes = { children: PropTypes.node, className: PropTypes.string };

export default Dialog;
