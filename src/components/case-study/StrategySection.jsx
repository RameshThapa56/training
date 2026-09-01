import PropTypes from 'prop-types';
import { CaseStudySection } from './CaseStudySection.jsx';

/**
 * Strategy beat — the approach chosen and why, tied back to the challenge.
 * Every current case study reuses `brief.brand.differentiator` here (see
 * `src/content/caseStudies.js`'s header comment) — it's the company's real,
 * general approach, applied honestly rather than inventing a bespoke
 * strategy narrative the brief doesn't contain.
 *
 * @param {{ strategy: string }} props
 */
export function StrategySection({ strategy }) {
  return (
    <CaseStudySection beat="strategy" eyebrow="The strategy" heading="The approach" tone="sunken">
      <p className="max-w-narrow text-body-lg text-fg">{strategy}</p>
    </CaseStudySection>
  );
}

StrategySection.propTypes = { strategy: PropTypes.string.isRequired };

export default StrategySection;
