import { useEffect } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Traps focus inside `containerRef` while `active` is true: Tab/Shift+Tab
 * cycle within the container's focusable elements instead of escaping to
 * the rest of the page, and focus moves into the container on activation
 * and back to the previously-focused element on deactivation. Used by
 * Dialog — any future overlay primitive should reuse this rather than
 * re-implementing trap logic.
 *
 * @param {React.RefObject<HTMLElement>} containerRef
 * @param {boolean} active
 */
export function useFocusTrap(containerRef, active) {
  useEffect(() => {
    if (!active) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    const previouslyFocused = document.activeElement;
    const focusables = () => Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));

    const first = focusables()[0] ?? container;
    first.focus();

    function handleKeyDown(event) {
      if (event.key !== 'Tab') return;

      const elements = focusables();
      if (elements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstEl = elements[0];
      const lastEl = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    }

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [containerRef, active]);
}

export default useFocusTrap;
