import { useEffect, useState } from 'react';

/**
 * Shared easing curves (see skills/motion-system/SKILL.md — "define 2-3
 * easing curves as shared constants and reuse them everywhere"). Mirrors
 * the CSS custom properties in src/styles/tokens.css so Motion-driven
 * animation and CSS transitions stay visually consistent.
 */
export const EASE_OUT = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];
export const EASE_SPRING = [0.34, 1.56, 0.64, 1];

/** Standard UI transition duration, in seconds (150-300ms per the motion skill). */
export const DURATION_FAST = 0.15;
export const DURATION_BASE = 0.2;
export const DURATION_SLOW = 0.3;

/**
 * Tracks the user's `prefers-reduced-motion` setting. Every built-in
 * component transition (Dialog, Tooltip, Accordion, …) reads this once,
 * centrally, rather than each component re-querying the media feature —
 * per the design-system contract's "respects prefers-reduced-motion" rule.
 *
 * @returns {boolean} true when the user has requested reduced motion.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReduced(query.matches);
    handleChange();
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return reduced;
}

/**
 * Given "full-motion" Motion variants/transition, returns a reduced-motion
 * safe version: durations collapse near-instant and any transform is
 * dropped in favor of an opacity-only (or instant) change. Use this instead
 * of duplicating an `if (reduced) {...}` branch inside every component.
 *
 * @param {boolean} reduced
 * @param {import('motion/react').Transition} transition
 * @returns {import('motion/react').Transition}
 */
export function motionTransition(reduced, transition = {}) {
  if (!reduced) return transition;
  return { ...transition, duration: 0.01 };
}

/**
 * Shared hover-lift/scale treatment (see skills/motion-system/SKILL.md —
 * "shared hover-lift/hover-scale utility for cards and interactive tiles,"
 * "build once, reuse everywhere"). Pure Tailwind/CSS rather than a Motion
 * component: hover-driven `transform`/`box-shadow` transitions are
 * GPU-friendly, need no JS, and `motion-reduce:` is Tailwind's own
 * `prefers-reduced-motion` variant — so the reduced-motion fallback (no
 * lift, snap straight to the hover shadow) is built into the class string
 * itself rather than bolted on per-component.
 *
 * Applied by `Card`'s `interactive` variant and by any hand-rolled
 * card-shaped tile (e.g. `NextProjectSection`) that can't route through
 * `Card`, so every clickable tile across the site shares one feel.
 */
export const HOVER_LIFT =
  'transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0';
