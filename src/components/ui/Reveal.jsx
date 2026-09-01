import { motion } from 'motion/react';
import PropTypes from 'prop-types';
import { useReducedMotion, EASE_OUT, DURATION_SLOW } from '../../lib/motion.js';

/**
 * @typedef {object} RevealProps
 * @property {keyof import('motion/react').HTMLMotionComponents} [as] - Element tag to render. Default 'div'.
 * @property {number} [delay] - Extra delay in seconds, for hand-staggered groups. Default 0.
 * @property {number} [y] - Pixels the content slides up from on entrance. Default 20.
 * @property {number} [amount] - Fraction of the element that must be in view to trigger. Default 0.2.
 * @property {boolean} [once] - Only ever animate in once per mount. Default true — re-triggering on
 *   every scroll-back is exactly the "parallax everything" anti-pattern the motion skill warns against.
 * @property {boolean} [layout] - Opt into Motion's layout (FLIP) animation, for grids whose items
 *   reflow under filtering (see `skills/motion-system/SKILL.md`'s "items should re-flow smoothly,
 *   not jump-cut"). Off by default since most `<Reveal>` usage is static page content. Pair with
 *   an `<AnimatePresence>` around the list so filtered-out items animate out via `exit` instead of
 *   vanishing instantly — `exit` is a no-op outside `AnimatePresence`, so it's always set here.
 * @property {string} [className]
 * @property {React.ReactNode} children
 */

/**
 * Shared scroll-entrance wrapper (see skills/motion-system/SKILL.md —
 * "`useScrollReveal` / a shared `<Reveal>` wrapper... used for section
 * entrances"). Fades + slides up on scroll into view, once, via Motion's
 * `whileInView` (no manual IntersectionObserver plumbing needed).
 *
 * Reduced motion is built in, not bolted on: when `useReducedMotion()` is
 * true, `initial` is skipped entirely (`false`) so the element renders
 * straight into its final state and never animates — not just a faster
 * version of the same motion.
 *
 * A section already in the viewport on first paint (e.g. the homepage
 * Hero) still animates exactly once via this same mechanism — `whileInView`
 * evaluates on mount, and `once: true` means it never repeats on scroll-back,
 * which is the "hero entrance on first load — brief, not repeated" behavior
 * the skill calls for, with no separate code path.
 *
 * Only `opacity`/`transform` are animated — GPU-friendly, per the skill.
 *
 * @param {RevealProps & Record<string, unknown>} props
 */
export function Reveal({
  as = 'div',
  delay = 0,
  y = 20,
  amount = 0.2,
  once = true,
  layout = false,
  className,
  children,
  ...props
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      layout={layout}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: reduced ? 0.01 : DURATION_SLOW,
        ease: EASE_OUT,
        delay: reduced ? 0 : delay,
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

Reveal.propTypes = {
  as: PropTypes.string,
  delay: PropTypes.number,
  y: PropTypes.number,
  amount: PropTypes.number,
  once: PropTypes.bool,
  layout: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Reveal;
