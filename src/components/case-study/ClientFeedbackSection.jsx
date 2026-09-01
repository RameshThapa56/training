import PropTypes from 'prop-types';
import { CaseStudySection } from './CaseStudySection.jsx';
import { Avatar } from '../ui/index.js';
import { QuoteIcon } from '../home/HomeIcons.jsx';

/**
 * Client feedback beat — a real testimonial tied specifically to this
 * project (per the skill: only if available in the brief for that
 * project). Rendered as a large mid-page pull-quote rather than tucked at
 * the very end, matching the skill's "pull-quotes surfaced mid-scroll, not
 * only at the end" requirement.
 *
 * @param {{ name: string, role: string, quote: string }} props
 */
export function ClientFeedbackSection({ name, role, quote }) {
  return (
    <CaseStudySection beat="client-feedback" eyebrow="Client feedback" tone="dark">
      <QuoteIcon className="size-10 text-accent-400" />
      <p className="mt-6 max-w-narrow font-display text-h3 font-medium text-white">&ldquo;{quote}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3">
        <Avatar name={name} size="sm" />
        <div>
          <p className="text-body-sm font-medium text-white">{name}</p>
          <p className="text-caption text-neutral-400">{role}</p>
        </div>
      </div>
    </CaseStudySection>
  );
}

ClientFeedbackSection.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
};

export default ClientFeedbackSection;
