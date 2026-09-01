import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { buttonStyles } from './ui/Button.jsx';
import { brief } from '../content/brief.js';

/**
 * @typedef {object} CtaBandProps
 * @property {string} [heading] - Defaults to a generic quote-request prompt.
 * @property {string} [subtext]
 * @property {string} [primaryTo] - Route for the primary CTA. Default '/contact'.
 * @property {string} [primaryLabel] - Default brief.conversion.primaryCta.label.
 * @property {string} [secondaryTo] - Route for the secondary CTA. Omit to hide it.
 * @property {string} [secondaryLabel]
 */

/**
 * Reusable below-the-fold conversion band — every page in `src/pages/`
 * (About, Services, Testimonials, Insights) ends with one of these, per
 * docs/sitemap.md §4's "no page is allowed to dead-end" principle. Distinct
 * from `home/FinalCta.jsx`, which is the Home page's larger, dark-toned
 * closing section — this is the lighter, page-level version reused across
 * every secondary page so that section isn't copy-pasted per page.
 *
 * @param {CtaBandProps} props
 */
export function CtaBand({
  heading = 'Ready to talk about your IT infrastructure?',
  subtext = `${brief.conversion.leadMagnet} — no obligation, no cost.`,
  primaryTo = '/contact',
  primaryLabel = brief.conversion.primaryCta.label,
  secondaryTo,
  secondaryLabel,
}) {
  return (
    <section className="border-t border-border bg-surface-sunken py-section">
      <div className="mx-auto max-w-content px-6">
        <div className="flex flex-col items-start gap-6 rounded-lg border border-border bg-surface-elevated p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="font-display text-h3 text-fg">{heading}</h2>
            {subtext && <p className="mt-2 max-w-md text-body text-fg-muted">{subtext}</p>}
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link to={primaryTo} className={buttonStyles({ intent: 'primary', size: 'lg' })}>
              {primaryLabel}
            </Link>
            {secondaryTo && (
              <Link to={secondaryTo} className={buttonStyles({ intent: 'outline', size: 'lg' })}>
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

CtaBand.propTypes = {
  heading: PropTypes.string,
  subtext: PropTypes.string,
  primaryTo: PropTypes.string,
  primaryLabel: PropTypes.string,
  secondaryTo: PropTypes.string,
  secondaryLabel: PropTypes.string,
};

export default CtaBand;
