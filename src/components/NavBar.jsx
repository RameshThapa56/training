import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import PropTypes from 'prop-types';
import { cn } from '../lib/cn.js';
import { buttonStyles } from './ui/Button.jsx';
import { Dialog } from './ui/Dialog.jsx';
import { LanguageSwitch } from './ui/LanguageSwitch.jsx';
import { brief } from '../content/brief.js';
import { useReducedMotion, motionTransition, EASE_OUT, DURATION_FAST } from '../lib/motion.js';

// PLACEHOLDER — the brief gives no company/brand name (only "profession"
// and "industry"), so this stands in for real branding/logo assets. See
// the Phase 04 nav summary.
const BRAND_NAME = 'Bhutan IT Solutions';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/insights', label: 'Insights' },
  { to: '/contact', label: 'Contact' },
];

/** Spring used for the active-link indicator — snappy, not bouncy (motion-system: "a spring for interactive feedback"). */
const INDICATOR_SPRING = { type: 'spring', stiffness: 420, damping: 34 };

/** Small abstract logomark — a placeholder standing in for a real logo. */
function LogoMark() {
  return (
    <span
      aria-hidden="true"
      className="flex size-8 shrink-0 items-center justify-center rounded bg-brand-500 text-white"
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-4.5">
        <path
          d="M5.5 11a9 9 0 0 1 13 0M8.5 14a5 5 0 0 1 7 0M12 17.25a.25.25 0 1 1 0-.5.25.25 0 0 1 0 .5Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Hamburger/close trigger — morphs between the two states rather than
 * swapping icons, so opening the mobile menu reads as one continuous
 * transformation instead of a flicker. Reduced-motion collapses the morph
 * to an instant swap.
 */
function MenuIcon({ open }) {
  const reduced = useReducedMotion();
  const transition = motionTransition(reduced, { duration: DURATION_FAST, ease: EASE_OUT });
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <motion.path
        d="M4 7h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
        style={{ originX: '12px', originY: '7px' }}
        transition={transition}
      />
      <motion.path
        d="M4 12h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={transition}
      />
      <motion.path
        d="M4 17h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
        style={{ originX: '12px', originY: '17px' }}
        transition={transition}
      />
    </svg>
  );
}
MenuIcon.propTypes = { open: PropTypes.bool.isRequired };

const mobileNavLinkClassName = ({ isActive }) =>
  cn(
    'block rounded px-3 py-3 text-body font-medium transition-colors duration-200 ease-out motion-reduce:transition-none',
    isActive ? 'bg-brand-50 text-brand-700 dark:bg-brand-950' : 'text-fg hover:bg-surface-sunken',
  );

/** Stagger container/item variants for the mobile menu's link list. */
const mobileListVariants = {
  open: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
  closed: {},
};
const mobileItemVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -8 },
};

/**
 * Site header / app bar — persistent across every page (rendered from
 * `Layout`). Sticky, backdrop-blurred, with the primary nav + a
 * persistent "Request a Quote" CTA per docs/sitemap.md §2, and a Dialog-
 * based menu for small screens (reusing the Phase 03 `Dialog` primitive —
 * focus trap, Escape-to-close, and scroll lock come for free).
 *
 * Desktop nav communicates the current page with a shared-element
 * indicator (Motion `layoutId`) that slides/resizes to the active link on
 * navigation and on hover, rather than a static underline — see
 * skills/motion-system/SKILL.md ("micro-feedback on interactive
 * elements"). Reduced-motion users get the same information instantly,
 * with the indicator snapping rather than sliding.
 */
export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredTo, setHoveredTo] = useState(null);
  const location = useLocation();
  const reduced = useReducedMotion();

  // Close the mobile menu automatically on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const activeTo =
    hoveredTo ??
    NAV_LINKS.find(({ to, end }) => (end ? location.pathname === to : location.pathname.startsWith(to)))?.to;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-6 sm:h-20">
        <Link
          to="/"
          className="group flex items-center gap-2.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <motion.span
            whileHover={reduced ? undefined : { rotate: -8, scale: 1.06 }}
            whileTap={reduced ? undefined : { scale: 0.94 }}
            transition={{ duration: DURATION_FAST, ease: EASE_OUT }}
            className="flex"
          >
            <LogoMark />
          </motion.span>
          <span className="font-display text-body-lg font-semibold text-fg">{BRAND_NAME}</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:block"
          onPointerLeave={() => setHoveredTo(null)}
        >
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to} className="relative">
                <NavLink
                  to={to}
                  end={end}
                  onPointerEnter={() => setHoveredTo(to)}
                  onFocus={() => setHoveredTo(to)}
                  onBlur={() => setHoveredTo(null)}
                  className={({ isActive }) =>
                    cn(
                      'relative z-10 block rounded px-3 py-2 text-body-sm font-medium transition-colors duration-200 ease-out motion-reduce:transition-none',
                      isActive ? 'text-brand-700' : 'text-fg-muted hover:text-fg',
                    )
                  }
                >
                  {label}
                </NavLink>
                {activeTo === to && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded bg-brand-50 dark:bg-brand-950"
                    transition={reduced ? { duration: 0.01 } : INDICATOR_SPRING}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitch className="hidden sm:inline-flex" />

          <Link
            to="/contact"
            className={buttonStyles({ intent: 'primary', size: 'sm', className: 'hidden sm:inline-flex' })}
          >
            {brief.conversion.primaryCta.label}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="inline-flex size-10 items-center justify-center rounded text-fg hover:bg-surface-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface lg:hidden"
          >
            <MenuIcon open={menuOpen} />
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <Dialog.Content size="sm" padded={false}>
          <div className="flex items-center justify-between border-b border-border p-4">
            <Dialog.Title>Menu</Dialog.Title>
            <div className="flex items-center gap-2">
              <LanguageSwitch />
              <Dialog.Close />
            </div>
          </div>
          <nav aria-label="Primary" className="p-3">
            <motion.ul
              className="space-y-1"
              initial={reduced ? 'open' : 'closed'}
              animate="open"
              variants={mobileListVariants}
            >
              {NAV_LINKS.map(({ to, label, end }) => (
                <motion.li
                  key={to}
                  variants={reduced ? undefined : mobileItemVariants}
                  transition={{ duration: DURATION_FAST, ease: EASE_OUT }}
                >
                  <NavLink to={to} end={end} className={mobileNavLinkClassName}>
                    {label}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
          <div className="border-t border-border p-4">
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={buttonStyles({ intent: 'primary', size: 'md', fullWidth: true })}
            >
              {brief.conversion.primaryCta.label}
            </Link>
          </div>
        </Dialog.Content>
      </Dialog>
    </header>
  );
}
