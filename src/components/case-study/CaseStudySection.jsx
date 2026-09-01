import PropTypes from 'prop-types';
import { cn } from '../../lib/cn.js';
import { Reveal } from '../ui/Reveal.jsx';

/**
 * @typedef {object} CaseStudySectionProps
 * @property {string} beat - Machine-readable beat id (e.g. "challenge") — becomes both the
 *   section's `id` (for in-page/next-project anchor links) and its `data-case-study-beat`
 *   attribute. Anchors stay on the plain `<section>`; the inner content column is what
 *   scroll-reveals (see the `<Reveal>` wrap below), so anchor scrolling never lands on a
 *   pre-animation, invisible target.
 * @property {string} eyebrow - Short chapter label shown above the heading (e.g. "The challenge").
 * @property {string} [heading] - Optional larger heading below the eyebrow.
 * @property {'default'|'sunken'|'dark'} [tone] - Background treatment. Default 'default'.
 * @property {React.ReactNode} children
 * @property {string} [className]
 */

/**
 * Shared "chapter" wrapper every case-study beat renders inside — gives
 * every section the same rhythm (section-padding token, border-top
 * separator, max-width column) so the page reads as distinct chapters
 * rather than a continuous wall of text, per
 * `skills/case-study-builder/SKILL.md`'s interaction requirements.
 *
 * @param {CaseStudySectionProps} props
 */
export function CaseStudySection({ beat, eyebrow, heading, tone = 'default', children, className }) {
  return (
    <section
      id={`beat-${beat}`}
      data-case-study-beat={beat}
      className={cn(
        'border-t border-border py-section-sm sm:py-section',
        tone === 'sunken' && 'bg-surface-sunken',
        tone === 'dark' && 'bg-neutral-950 text-neutral-50',
        className,
      )}
    >
      <Reveal className="mx-auto max-w-content px-6">
        <p
          className={cn(
            'text-caption font-medium uppercase tracking-wide',
            tone === 'dark' ? 'text-neutral-400' : 'text-fg-muted',
          )}
        >
          {eyebrow}
        </p>
        {heading && (
          <h2 className={cn('mt-2 font-display text-h2', tone === 'dark' ? 'text-white' : 'text-fg')}>{heading}</h2>
        )}
        <div className="mt-6">{children}</div>
      </Reveal>
    </section>
  );
}

CaseStudySection.propTypes = {
  beat: PropTypes.string.isRequired,
  eyebrow: PropTypes.string.isRequired,
  heading: PropTypes.string,
  tone: PropTypes.oneOf(['default', 'sunken', 'dark']),
  children: PropTypes.node,
  className: PropTypes.string,
};

export default CaseStudySection;
