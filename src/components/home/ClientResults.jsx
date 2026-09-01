import { useLanguage } from '../../context/LanguageContext.jsx';
import { NetworkIcon, ShieldIcon, WrenchIcon } from './HomeIcons.jsx';

// The brief gives no quantified metrics (uptime %, device counts, SLAs) for
// any project — docs/strategy.md §2 explicitly flags this and says to use
// qualifying language instead of inventing numbers. These three outcomes
// are drawn verbatim/near-verbatim from the brief's own project
// descriptions (src/content/brief.js `projects`), not fabricated stats.
const RESULTS = [
  {
    key: 'wifi',
    Icon: NetworkIcon,
    outcome: 'Reliable, high-speed coverage',
    context: 'Multi-floor Wi-Fi deployed and tuned for an entire office environment.',
  },
  {
    key: 'cctv',
    Icon: ShieldIcon,
    outcome: 'Centralized remote monitoring',
    context: 'IP-based CCTV with access from anywhere, for a commercial property.',
  },
  {
    key: 'server',
    Icon: WrenchIcon,
    outcome: 'Centralized server & backup',
    context: 'Network storage and data management consolidated onto one system.',
  },
];

/**
 * Client Results — concrete, brief-grounded outcomes presented as a
 * compact proof strip. Deliberately outcome-phrased rather than
 * numeric-metric-phrased since the brief supplies no figures to display
 * honestly (see the flag in docs/strategy.md §2).
 */
export default function ClientResults() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-border bg-surface py-section">
      <div className="mx-auto max-w-content px-6">
        <div className="max-w-lg">
          <h2 className="font-display text-h2 text-fg">
            {t('clientResults.heading', 'What that looks like in practice')}
          </h2>
          <p className="mt-2 text-body text-fg-muted">
            {t(
              'clientResults.desc',
              "Every engagement is scoped to the site — here's the kind of outcome real deployments deliver.",
            )}
          </p>
        </div>

        <dl className="mt-10 grid gap-6 sm:grid-cols-3">
          {RESULTS.map(({ key, Icon, outcome, context }) => (
            <div key={key} className="rounded-lg border border-border bg-surface-elevated p-6">
              <Icon className="size-7 text-accent-600" />
              <dt className="mt-4 font-display text-h4 text-fg">{t(`result.${key}.outcome`, outcome)}</dt>
              <dd className="mt-2 text-body-sm text-fg-muted">{t(`result.${key}.context`, context)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
