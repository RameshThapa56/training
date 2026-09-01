import { createContext, use, useId, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../lib/cn.js';
import { useControllableState } from '../../lib/useControllableState.js';

const TabsContext = createContext(null);

function useTabsContext(component) {
  const ctx = use(TabsContext);
  if (!ctx) throw new Error(`<Tabs.${component}> must be rendered inside <Tabs>`);
  return ctx;
}

/**
 * @typedef {object} TabsProps
 * @property {string} [value] - Controlled active tab value.
 * @property {string} [defaultValue] - Initial active tab when uncontrolled.
 * @property {(value: string) => void} [onValueChange]
 * @property {'horizontal'|'vertical'} [orientation] - Governs which arrow keys move focus. Default 'horizontal'.
 * @property {React.ReactNode} children - `<Tabs.List>` + one `<Tabs.Panel>` per tab.
 * @property {string} [className]
 */

/**
 * Accessible tabs (WAI-ARIA Tabs Pattern) — roving tabindex, arrow-key
 * navigation, `aria-selected`/`aria-controls` wiring. Used for e.g. the
 * Services page's tier comparison or a case study's before/after content.
 *
 * @param {TabsProps} props
 */
export function Tabs({ value, defaultValue, onValueChange, orientation = 'horizontal', children, className }) {
  const [activeValue, setActiveValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? null,
    onChange: onValueChange,
  });
  const idPrefix = useId();

  return (
    <TabsContext value={{ activeValue, setActiveValue, orientation, idPrefix }}>
      <div className={className}>{children}</div>
    </TabsContext>
  );
}

Tabs.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onValueChange: PropTypes.func,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/** @param {{ children: React.ReactNode, className?: string }} props */
Tabs.List = function TabsList({ children, className, ...props }) {
  const { orientation } = useTabsContext('List');
  const listRef = useRef(null);

  function handleKeyDown(event) {
    const keys =
      orientation === 'horizontal' ? ['ArrowLeft', 'ArrowRight'] : ['ArrowUp', 'ArrowDown'];
    const [prevKey, nextKey] = keys;
    if (![prevKey, nextKey, 'Home', 'End'].includes(event.key)) return;

    const tabs = Array.from(listRef.current?.querySelectorAll('[role="tab"]:not([disabled])') ?? []);
    if (tabs.length === 0) return;

    const currentIndex = tabs.indexOf(document.activeElement);
    let nextIndex = currentIndex;

    if (event.key === prevKey) nextIndex = currentIndex <= 0 ? tabs.length - 1 : currentIndex - 1;
    else if (event.key === nextKey) nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;

    event.preventDefault();
    tabs[nextIndex].focus();
    tabs[nextIndex].click();
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      // Not part of the tab sequence (individual triggers use roving
      // tabindex below) — set only so this container is a valid target for
      // the eslint-jsx-a11y focusability check on interactive roles.
      tabIndex={-1}
      aria-orientation={orientation}
      className={cn('flex gap-1 border-b border-border', orientation === 'vertical' && 'flex-col border-b-0 border-r', className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
};
Tabs.List.propTypes = { children: PropTypes.node.isRequired, className: PropTypes.string };

/** @param {{ value: string, children: React.ReactNode, disabled?: boolean, className?: string }} props */
Tabs.Trigger = function TabsTrigger({ value, children, disabled = false, className, ...props }) {
  const { activeValue, setActiveValue, idPrefix } = useTabsContext('Trigger');
  const selected = activeValue === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${idPrefix}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${idPrefix}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      onClick={() => setActiveValue(value)}
      className={cn(
        'px-4 py-2.5 text-body-sm font-medium text-fg-muted border-b-2 border-transparent -mb-px',
        'transition-colors duration-200 ease-out motion-reduce:transition-none',
        'hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        'disabled:pointer-events-none disabled:opacity-50',
        selected && 'border-brand-500 text-fg',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
Tabs.Trigger.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

/** @param {{ value: string, children: React.ReactNode, className?: string }} props */
Tabs.Panel = function TabsPanel({ value, children, className, ...props }) {
  const { activeValue, idPrefix } = useTabsContext('Panel');
  if (activeValue !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`${idPrefix}-panel-${value}`}
      aria-labelledby={`${idPrefix}-tab-${value}`}
      tabIndex={0}
      className={cn('pt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded', className)}
      {...props}
    >
      {children}
    </div>
  );
};
Tabs.Panel.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Tabs;
