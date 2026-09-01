import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../lib/motion.js';
import { useLanguage, LOCALES } from '../../context/LanguageContext.jsx';

/** Spring used for the sliding thumb — snappy, not bouncy, matching the nav's active-link indicator. */
const THUMB_SPRING = { type: 'spring', stiffness: 500, damping: 32 };

/**
 * Language slide switch — a two-state toggle (English / Dzongkha) built as
 * a native `role="switch"` control (headless-first per
 * skills/react19-component-architecture/SKILL.md: real semantics, not a
 * styled `<div>`). Full keyboard support comes from the underlying
 * `<button>` (Enter/Space); the thumb slides via a shared-element style
 * transform, snapping instantly under reduced motion.
 *
 * Only Home page content is translated (see `src/content/dzongkha.js`), so
 * this switch is deliberately global chrome — flipping it elsewhere in the
 * site changes nothing yet, which is expected until later phases extend
 * translation coverage.
 */
export function LanguageSwitch({ className }) {
  const { locale, toggleLocale, isDzongkha } = useLanguage();
  const reduced = useReducedMotion();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDzongkha}
      aria-label={`Language: ${isDzongkha ? 'Dzongkha' : 'English'}. Activate to switch to ${isDzongkha ? 'English' : 'Dzongkha'}.`}
      onClick={toggleLocale}
      className={[
        'relative inline-flex h-8 w-[4.5rem] shrink-0 items-center rounded-full border border-border bg-surface-sunken p-0.5',
        'transition-colors duration-200 ease-out motion-reduce:transition-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 text-[0.625rem] font-semibold uppercase tracking-wide">
        <span className={locale === LOCALES.EN ? 'text-fg' : 'text-fg-muted'}>EN</span>
        <span className={locale === LOCALES.DZ ? 'text-fg' : 'text-fg-muted'}>DZ</span>
      </span>
      <motion.span
        aria-hidden="true"
        className="relative z-10 flex size-7 items-center justify-center rounded-full bg-surface-elevated text-caption font-semibold shadow-sm"
        animate={{ x: isDzongkha ? '2.375rem' : '0rem' }}
        transition={reduced ? { duration: 0.01 } : THUMB_SPRING}
      >
        {isDzongkha ? 'རྫ' : 'EN'}
      </motion.span>
    </button>
  );
}

LanguageSwitch.propTypes = { className: PropTypes.string };

export default LanguageSwitch;
