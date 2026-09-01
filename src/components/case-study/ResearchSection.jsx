import PropTypes from 'prop-types';
import { CaseStudySection } from './CaseStudySection.jsx';

/**
 * Research/Discovery beat — what was learned before designing. Explicitly
 * optional per the skill ("optional if not applicable to the project
 * type") — none of the current brief projects have discovery-phase detail,
 * so this renders only when a project's case-study data supplies `findings`.
 *
 * @param {{ findings: string[] }} props
 */
export function ResearchSection({ findings }) {
  return (
    <CaseStudySection beat="research" eyebrow="Research" heading="What we learned first">
      <ul className="max-w-narrow space-y-3">
        {findings.map((finding) => (
          <li key={finding} className="flex gap-3 text-body text-fg-muted">
            <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-500" />
            {finding}
          </li>
        ))}
      </ul>
    </CaseStudySection>
  );
}

ResearchSection.propTypes = { findings: PropTypes.arrayOf(PropTypes.string).isRequired };

export default ResearchSection;
