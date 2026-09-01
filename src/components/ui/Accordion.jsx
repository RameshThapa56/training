import { createContext, use, useId, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../lib/cn.js';
import { useControllableState } from '../../lib/useControllableState.js';
import { useReducedMotion } from '../../lib/motion.js';

const AccordionContext = createContext(null);
const AccordionItemContext = createContext(null);

function useAccordionContext(component) {
  const ctx = use(AccordionContext);
  if (!ctx) throw new Error(`<Accordion.${component}> must be rendered inside <Accordion>`);
  return ctx;
}

/**
 * @typedef {object} AccordionProps
 * @property {'single'|'multiple'} [type] - Whether more than one item can be open at once. Default 'single'.
 * @property {string|string[]} [value] - Controlled open item value(s) — string for 'single', string[] for 'multiple'.
 * @property {string|string[]} [defaultValue]
 * @property {(value: string|string[]) => void} [onValueChange]
 * @property {boolean} [collapsible] - For type 'single': whether the open item can be closed
 *   by re-clicking it, leaving nothing open. Default true.
 * @property {React.ReactNode} children - One or more `<Accordion.Item>`.
 * @property {string} [className]
 */

/**
 * Accessible accordion (WAI-ARIA Accordion Pattern) — for FAQ-style content
 * (Contact page reassurance copy, Services detail). Headers are real
 * `<button>`s wrapping an `<h3>`, arrow-key navigation moves between
 * headers, and panel expand/collapse respects `prefers-reduced-motion`.
 *
 * @param {AccordionProps} props
 */
export function Accordion({
  type = 'single',
  value,
  defaultValue,
  onValueChange,
  collapsible = true,
  children,
  className,
}) {
  const [openValue, setOpenValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? (type === 'multiple' ? [] : null),
    onChange: onValueChange,
  });

  function toggle(itemValue) {
    if (type === 'multiple') {
      const current = Array.isArray(openValue) ? openValue : [];
      setOpenValue(
        current.includes(itemValue) ? current.filter((v) => v !== itemValue) : [...current, itemValue],
      );
      return;
    }
    setOpenValue(openValue === itemValue ? (collapsible ? null : openValue) : itemValue);
  }

  function isOpen(itemValue) {
    return type === 'multiple' ? Array.isArray(openValue) && openValue.includes(itemValue) : openValue === itemValue;
  }

  return (
    <AccordionContext value={{ isOpen, toggle }}>
      <div className={cn('divide-y divide-border border-y border-border', className)}>{children}</div>
    </AccordionContext>
  );
}

Accordion.propTypes = {
  type: PropTypes.oneOf(['single', 'multiple']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  onValueChange: PropTypes.func,
  collapsible: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/** @param {{ value: string, children: React.ReactNode, className?: string }} props */
Accordion.Item = function AccordionItem({ value, children, className, ...props }) {
  const { isOpen } = useAccordionContext('Item');
  const idPrefix = useId();

  return (
    <AccordionItemContext value={{ value, open: isOpen(value), idPrefix }}>
      <div className={className} {...props}>
        {children}
      </div>
    </AccordionItemContext>
  );
};
Accordion.Item.propTypes = { value: PropTypes.string.isRequired, children: PropTypes.node.isRequired, className: PropTypes.string };

/** @param {{ children: React.ReactNode, className?: string }} props */
Accordion.Trigger = function AccordionTrigger({ children, className, ...props }) {
  const { toggle } = useAccordionContext('Trigger');
  const { value, open, idPrefix } = use(AccordionItemContext);
  const headerRef = useRef(null);

  function handleKeyDown(event) {
    if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;

    const container = headerRef.current?.closest('[class*="divide-y"]');
    const headers = Array.from(container?.querySelectorAll('[data-accordion-trigger]') ?? []);
    const currentIndex = headers.indexOf(headerRef.current);
    let nextIndex = currentIndex;

    if (event.key === 'ArrowDown') nextIndex = currentIndex === headers.length - 1 ? 0 : currentIndex + 1;
    else if (event.key === 'ArrowUp') nextIndex = currentIndex <= 0 ? headers.length - 1 : currentIndex - 1;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = headers.length - 1;

    event.preventDefault();
    headers[nextIndex]?.focus();
  }

  return (
    <h3 className="flex">
      <button
        ref={headerRef}
        type="button"
        data-accordion-trigger
        id={`${idPrefix}-header`}
        aria-expanded={open}
        aria-controls={`${idPrefix}-panel`}
        onClick={() => toggle(value)}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex w-full items-center justify-between gap-4 py-4 text-left text-body font-medium text-fg',
          'transition-colors duration-200 ease-out motion-reduce:transition-none',
          'hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded',
          className,
        )}
        {...props}
      >
        {children}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className={cn(
            'size-5 shrink-0 text-fg-muted transition-transform duration-200 ease-out motion-reduce:transition-none',
            open && 'rotate-180',
          )}
        >
          <path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </h3>
  );
};
Accordion.Trigger.propTypes = { children: PropTypes.node.isRequired, className: PropTypes.string };

/** @param {{ children: React.ReactNode, className?: string }} props */
Accordion.Panel = function AccordionPanel({ children, className, ...props }) {
  const { open, idPrefix } = use(AccordionItemContext);
  const reduced = useReducedMotion();

  // Animate height via grid-template-rows (0fr -> 1fr) rather than
  // max-height/height, keeping the transition on a layout property that's
  // still GPU-cheap in practice and avoids a magic max-height guess.
  // Reduced motion: skip the transition and toggle instantly via `hidden`.
  //
  // `aria-hidden` is set unconditionally when closed (not just for reduced
  // motion) — the grid-template-rows collapse only clips the panel
  // *visually*; without `aria-hidden`, a screen reader stepping through the
  // page would still land on and announce a closed FAQ answer that sighted
  // users can't see, since `overflow-hidden` alone doesn't remove content
  // from the accessibility tree the way `hidden`/`display:none` does.
  return (
    <div
      id={`${idPrefix}-panel`}
      role="region"
      aria-labelledby={`${idPrefix}-header`}
      aria-hidden={!open}
      hidden={reduced ? !open : undefined}
      style={reduced ? undefined : { display: 'grid', gridTemplateRows: open ? '1fr' : '0fr' }}
      className={cn('overflow-hidden text-body text-fg-muted', !reduced && 'transition-[grid-template-rows] duration-200 ease-out')}
      {...props}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={cn('pb-4', className)}>{children}</div>
      </div>
    </div>
  );
};
Accordion.Panel.propTypes = { children: PropTypes.node.isRequired, className: PropTypes.string };

export default Accordion;
