/**
 * Small, shared icon set for the Home page sections (services categories,
 * trust indicators, results, testimonials). Hand-authored inline SVGs —
 * 24x24 viewBox, 1.5 stroke, `currentColor` — rather than a per-section
 * one-off icon, so every icon on the page shares the same visual language.
 * All are purely decorative (aria-hidden) — the surrounding text carries
 * the meaning.
 *
 * @typedef {object} IconProps
 * @property {string} [className]
 */

import PropTypes from 'prop-types';

const base = { viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true };
const stroke = { stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
const iconPropTypes = { className: PropTypes.string };

/** @param {IconProps} props */
export function LaptopIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="5" width="16" height="10.5" rx="1.5" {...stroke} />
      <path d="M2.5 19h19M9.5 19l.5-2.5h4l.5 2.5" {...stroke} />
    </svg>
  );
}

/** @param {IconProps} props */
export function NetworkIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 20v-3M8.5 14a5 5 0 0 1 7 0M5.5 11a9 9 0 0 1 13 0M12 17.25a.25.25 0 1 1 0-.5.25.25 0 0 1 0 .5Z" {...stroke} />
    </svg>
  );
}

/** @param {IconProps} props */
export function ShieldIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5 5 6v5.5c0 4.2 2.9 7.4 7 9 4.1-1.6 7-4.8 7-9V6l-7-2.5Z" {...stroke} />
      <path d="M9.25 12l1.9 1.9 3.6-3.9" {...stroke} />
    </svg>
  );
}

/** @param {IconProps} props */
export function BoltIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M12.75 3 5.5 13.25h4.75L11 21l7.25-10.25H13.5L12.75 3Z" {...stroke} />
    </svg>
  );
}

/** @param {IconProps} props */
export function PrinterIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M6.5 8.5V4h11v4.5M6.5 17.5H5a1.5 1.5 0 0 1-1.5-1.5v-4A1.5 1.5 0 0 1 5 10.5h14a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-1.5" {...stroke} />
      <rect x="6.5" y="14.5" width="11" height="6" {...stroke} />
    </svg>
  );
}

/** @param {IconProps} props */
export function WrenchIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 4.9L4 16.5 7.5 20l5.3-5.3a4 4 0 0 0 4.9-5.4l-2.6 2.6-2.1-.4-.4-2.1 2.6-2.6Z" {...stroke} />
    </svg>
  );
}

/** @param {IconProps} props */
export function AwardIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="9" r="5.5" {...stroke} />
      <path d="M9 13.5 7.5 20l4.5-2.5 4.5 2.5-1.5-6.5" {...stroke} />
    </svg>
  );
}

/** @param {IconProps} props */
export function CertificateIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="4" width="17" height="12" rx="1.5" {...stroke} />
      <path d="M7 8.5h10M7 11.5h6.5" {...stroke} />
      <path d="M9.5 16.5 9 20l3-1.5 3 1.5-.5-3.5" {...stroke} />
    </svg>
  );
}

/** @param {IconProps} props */
export function QuoteIcon({ className }) {
  return (
    <svg {...base} className={className} fill="currentColor" stroke="none">
      <path d="M9.5 6.5C6.5 7.6 4.8 9.9 4.8 13c0 2.2 1.5 3.7 3.4 3.7 1.7 0 3-1.3 3-3 0-1.6-1.1-2.8-2.6-2.9.4-1.5 1.6-2.7 3.1-3.3l-2.2-1Zm8 0C14.5 7.6 12.8 9.9 12.8 13c0 2.2 1.5 3.7 3.4 3.7 1.7 0 3-1.3 3-3 0-1.6-1.1-2.8-2.6-2.9.4-1.5 1.6-2.7 3.1-3.3l-2.2-1Z" />
    </svg>
  );
}

/** @param {IconProps} props */
export function CheckCircleIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" {...stroke} />
      <path d="M8.5 12.3 11 14.8l4.5-5.6" {...stroke} />
    </svg>
  );
}

/** @param {IconProps} props */
export function ArrowRightIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 12h15M13.5 6.5 19 12l-5.5 5.5" {...stroke} />
    </svg>
  );
}

LaptopIcon.propTypes = iconPropTypes;
NetworkIcon.propTypes = iconPropTypes;
ShieldIcon.propTypes = iconPropTypes;
BoltIcon.propTypes = iconPropTypes;
PrinterIcon.propTypes = iconPropTypes;
WrenchIcon.propTypes = iconPropTypes;
AwardIcon.propTypes = iconPropTypes;
CertificateIcon.propTypes = iconPropTypes;
QuoteIcon.propTypes = iconPropTypes;
CheckCircleIcon.propTypes = iconPropTypes;
ArrowRightIcon.propTypes = iconPropTypes;
