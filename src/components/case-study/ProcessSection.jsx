import PropTypes from 'prop-types';
import { CaseStudySection } from './CaseStudySection.jsx';

/**
 * Process beat — key decisions and iterations ("show the thinking, not just
 * final screens"). None of the current brief projects have decision/
 * iteration detail beyond their one-line description, so this renders only
 * when a project's case-study data supplies `steps` — omitted everywhere
 * today rather than backfilled with generic "we planned, then we built"
 * filler.
 *
 * @param {{ steps: string[] }} props
 */
export function ProcessSection({ steps }) {
  return (
    <CaseStudySection beat="process" eyebrow="The process" heading="How it came together">
      <ol className="max-w-narrow space-y-6">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-4">
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-body-sm font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-200"
            >
              {index + 1}
            </span>
            <p className="pt-1 text-body text-fg-muted">{step}</p>
          </li>
        ))}
      </ol>
    </CaseStudySection>
  );
}

ProcessSection.propTypes = { steps: PropTypes.arrayOf(PropTypes.string).isRequired };

export default ProcessSection;
