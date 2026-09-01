import { Link } from 'react-router-dom';
import { buttonStyles } from '../ui/Button.jsx';
import { brief } from '../../content/brief.js';
import { useLanguage } from '../../context/LanguageContext.jsx';

/**
 * Brand Story — a condensed version of the brief's founder story. Per
 * docs/strategy.md §5, the full narrative belongs on the About page only;
 * this is deliberately short (the brief's own 2-3 sentence version, used
 * verbatim) with a link through to the full story rather than a homepage
 * re-telling.
 */
export default function BrandStory() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-border bg-surface-sunken py-section">
      <div className="mx-auto grid max-w-content gap-8 px-6 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4">
          <p className="text-caption font-medium uppercase tracking-wide text-brand-600">
            {t('brandStory.eyebrow', 'Our story')}
          </p>
          <h2 className="mt-2 font-display text-h2 text-fg">{t('brandStory.heading', 'Why we started')}</h2>
        </div>
        <div className="lg:col-span-8">
          <p className="max-w-2xl text-body-lg text-fg-muted">
            {t('brandStory.founderStory', brief.business.founderStory)}
          </p>
          <Link to="/about" className={buttonStyles({ intent: 'outline', size: 'md', className: 'mt-6' })}>
            {t('common.readFullStory', 'Read our full story')}
          </Link>
        </div>
      </div>
    </section>
  );
}
