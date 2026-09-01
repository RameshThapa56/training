import { Badge } from '../ui/Badge.jsx';
import { AwardIcon } from './HomeIcons.jsx';
import { brief } from '../../content/brief.js';
import { useLanguage } from '../../context/LanguageContext.jsx';

/** Award name -> dictionary key, since award names aren't slugged in the brief. */
const AWARD_KEYS = {
  'Best Emerging Technology Solutions Provider — Bhutan Technology Awards 2025':
    'award.best-emerging-technology-solutions-provider',
  'Trusted IT Solutions Partner — Regional Business Excellence Recognition 2025':
    'award.trusted-it-solutions-partner',
};

/**
 * Social Proof — the brief lists no client logos or roster (docs/
 * strategy.md §6 explicitly says not to fabricate a client-logo wall), so
 * this section substitutes the brief's two named third-party awards as a
 * compact recognition strip instead of omitting the section outright.
 * Distinct from `TrustIndicators` below, which covers certifications.
 */
export default function SocialProof() {
  const { t } = useLanguage();

  if (brief.awards.length === 0) return null;

  return (
    <section className="border-t border-border bg-surface-sunken py-8">
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-center sm:gap-6 sm:text-left">
        <p className="shrink-0 text-caption font-medium uppercase tracking-wide text-fg-muted">
          {t('socialProof.recognizedBy', 'Recognized by')}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {brief.awards.map((award) => (
            <Badge key={award.name} tone="neutral" icon={<AwardIcon className="size-3.5" />}>
              {AWARD_KEYS[award.name] ? t(AWARD_KEYS[award.name], award.name) : award.name}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
