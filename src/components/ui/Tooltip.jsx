import { cloneElement, useId, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../lib/cn.js';
import { useReducedMotion } from '../../lib/motion.js';

const SHOW_DELAY_MS = 300;

/**
 * @typedef {object} TooltipProps
 * @property {string} content - Tooltip text.
 * @property {'top'|'bottom'|'left'|'right'} [side] - Preferred placement relative to the trigger. Default 'top'.
 * @property {React.ReactElement} children - A single focusable element (button, link, icon-button) —
 *   Tooltip clones it to attach hover/focus handlers and `aria-describedby`.
 */

/**
 * Hover/focus-triggered tooltip. Shows on both mouse hover and keyboard
 * focus (never hover-only — keyboard users need the same info), dismisses
 * on Escape, and is announced via `aria-describedby` rather than
 * `title` (which screen readers handle inconsistently).
 *
 * @param {TooltipProps} props
 */
export function Tooltip({ content, side = 'top', children }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);
  const id = useId();
  const reduced = useReducedMotion();

  function show() {
    timeoutRef.current = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
  }

  function hide() {
    window.clearTimeout(timeoutRef.current);
    setOpen(false);
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') hide();
  }

  const sideStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    // Hover/keydown handlers live on this wrapper only to bound the
    // show/hide and Escape-dismiss region; the actual interactive control
    // is the cloned `children` element itself (a real button/link), which
    // is what receives focus and keyboard activation.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide} onKeyDown={handleKeyDown}>

      {cloneElement(children, {
        'aria-describedby': open ? id : undefined,
        onFocus: (event) => {
          children.props.onFocus?.(event);
          show();
        },
        onBlur: (event) => {
          children.props.onBlur?.(event);
          hide();
        },
      })}
      {open && (
        <span
          role="tooltip"
          id={id}
          className={cn(
            'pointer-events-none absolute z-50 whitespace-nowrap rounded bg-neutral-900 px-2.5 py-1.5 text-caption text-white shadow-md dark:bg-neutral-100 dark:text-neutral-900',
            !reduced && 'motion-safe:animate-[tooltip-in_0.15s_ease-out]',
            sideStyles[side],
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}

Tooltip.propTypes = {
  content: PropTypes.string.isRequired,
  side: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  children: PropTypes.element.isRequired,
};

export default Tooltip;
