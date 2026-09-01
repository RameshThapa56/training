import PropTypes from 'prop-types';
import { CaseStudySection } from './CaseStudySection.jsx';
import { CheckCircleIcon } from '../home/HomeIcons.jsx';

/**
 * Results beat — quantified outcomes where possible, qualitative outcome
 * statements otherwise, per the skill ("never fabricate numbers"). Renders
 * only when a project's case-study data supplies real `outcomes` — no
 * current project has hard metrics or a standalone qualitative outcome
 * that isn't already the Client Feedback quote, so this is unused today
 * (see `src/content/caseStudies.js`).
 *
 * @param {{ outcomes: string[] }} props
 */
export function ResultsSection({ outcomes }) {
  return (
    <CaseStudySection beat="results" eyebrow="The results" heading="What changed" tone="sunken">
      <ul className="max-w-narrow space-y-3">
        {outcomes.map((outcome) => (
          <li key={outcome} className="flex gap-3 text-body text-fg">
            <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-success-500" />
            {outcome}
          </li>
        ))}
      </ul>
    </CaseStudySection>
  );
}

ResultsSection.propTypes = { outcomes: PropTypes.arrayOf(PropTypes.string).isRequired };

export default ResultsSection;
