import PropTypes from 'prop-types';
import { CaseStudySection } from './CaseStudySection.jsx';
import { BeforeAfterSlider } from './BeforeAfterSlider.jsx';

/**
 * @typedef {object} BeforeAfterSide
 * @property {string} label
 * @property {string} caption
 * @property {string} [image]
 */

/**
 * Execution/Solution beat — the actual work, richly presented. Renders the
 * before/after comparison here (when the project's data supplies one) since
 * this is the beat the skill describes as carrying "imagery, video,
 * interactive mockups."
 *
 * @param {{ intro: string, deliverables: string[], beforeAfter?: { before: BeforeAfterSide, after: BeforeAfterSide } }} props
 */
export function ExecutionSection({ intro, deliverables, beforeAfter }) {
  return (
    <CaseStudySection beat="execution" eyebrow="The execution" heading="What was delivered">
      <p className="max-w-narrow text-body-lg text-fg">{intro}</p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {deliverables.map((item) => (
          <li
            key={item}
            className="rounded-lg border border-border bg-surface-elevated px-4 py-3 text-body-sm font-medium text-fg"
          >
            {item}
          </li>
        ))}
      </ul>

      {beforeAfter && (
        <div className="mt-10 max-w-3xl">
          <BeforeAfterSlider before={beforeAfter.before} after={beforeAfter.after} />
        </div>
      )}
    </CaseStudySection>
  );
}

ExecutionSection.propTypes = {
  intro: PropTypes.string.isRequired,
  deliverables: PropTypes.arrayOf(PropTypes.string).isRequired,
  beforeAfter: PropTypes.shape({
    before: PropTypes.object.isRequired,
    after: PropTypes.object.isRequired,
  }),
};

export default ExecutionSection;
