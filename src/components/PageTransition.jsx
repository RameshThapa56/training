import { motion } from 'motion/react';
import { Outlet, useLocation } from 'react-router-dom';
import { useReducedMotion, EASE_OUT, DURATION_BASE } from '../lib/motion.js';

/**
 * Route-change wrapper (see skills/motion-system/SKILL.md — "page
 * transition wrapper for route changes... subtle cross-fade or slide, not
 * jarring"). Keyed on `location.pathname` so React remounts the outlet's
 * content on navigation, which re-triggers the entrance animation below.
 *
 * Deliberately entrance-only — no exit animation, no `AnimatePresence`.
 * An exit-then-enter sequence (`AnimatePresence mode="wait"`) would delay
 * the new page's mount until the old page finishes fading out, which is
 * exactly the "animations that block interaction" anti-pattern the skill
 * warns against and violates this phase's "a user must be able to click
 * through a CTA immediately" requirement. The new page mounts and is
 * interactive the instant the router swaps routes; only its opacity/y
 * still animate in underneath that already-clickable content.
 */
export default function PageTransition() {
  const location = useLocation();
  const reduced = useReducedMotion();

  return (
    <motion.div
      key={location.pathname}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.01 : DURATION_BASE, ease: EASE_OUT }}
    >
      <Outlet />
    </motion.div>
  );
}
