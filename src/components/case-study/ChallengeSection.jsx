import PropTypes from 'prop-types';
import { CaseStudySection } from './CaseStudySection.jsx';

/**
 * Challenge beat — the real problem, stated in terms the target audience
 * recognizes (per the skill: "business or user pain, not just 'the client
 * wanted a website'").
 *
 * @param {{ challenge: string }} props
 */
export function ChallengeSection({ challenge }) {
  return (
    <CaseStudySection beat="challenge" eyebrow="The challenge" heading="What they were up against">
      <p className="max-w-narrow text-body-lg text-fg">{challenge}</p>
    </CaseStudySection>
  );
}

ChallengeSection.propTypes = { challenge: PropTypes.string.isRequired };

export default ChallengeSection;
