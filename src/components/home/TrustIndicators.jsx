import { Badge } from '../ui/Badge.jsx';
import { CertificateIcon } from './HomeIcons.jsx';
import { brief } from '../../content/brief.js';
import { useLanguage } from '../../context/LanguageContext.jsx';

/**
 * Trust Indicators — the brief's certifications, in compressed badge form
 * (per docs/strategy.md §5: "Home carries authority signals in compressed
 * form... don't repeat the full certification list" — this is the badge
 * row, not the narrative treatment the About page will carry). Distinct
 * from `SocialProof` above, which covers third-party awards.
 */
export default function TrustIndicators() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-border bg-surface py-section">
      <div className="mx-auto max-w-content px-6">
        <div className="flex flex-col items-start gap-6 rounded-lg border border-border bg-surface-elevated p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <CertificateIcon className="mt-1 size-8 shrink-0 text-brand-600" />
            <div>
              <h2 className="font-display text-h4 text-fg">
                {t('trustIndicators.heading', 'Certified expertise behind every deployment')}
              </h2>
              <p className="mt-1 text-body-sm text-fg-muted">
                {brief.business.yearsOfExperience}{' '}
                {t('trustIndicators.descSuffix', 'of operating history, backed by industry certifications.')}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:max-w-md sm:justify-end">
            {brief.certifications.map((certification) => (
              <Badge key={certification} tone="brand">
                {certification}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
