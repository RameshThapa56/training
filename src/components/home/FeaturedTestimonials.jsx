import { Link } from 'react-router-dom';
import { Card } from '../ui/Card.jsx';
import { Avatar } from '../ui/Avatar.jsx';
import { QuoteIcon, ArrowRightIcon } from './HomeIcons.jsx';
import { brief } from '../../content/brief.js';
import { useLanguage } from '../../context/LanguageContext.jsx';

// 2 of the brief's 3 testimonials, chosen to represent both organizational
// buyer types (IT Manager, School Administrator) per docs/strategy.md §5
// ("Home (1-2 featured)"); the third (Business Owner) appears in full on
// the Testimonials page.
const FEATURED_NAMES = ['Karma Dorji', 'Sonam Choden'];
const featured = brief.testimonials.filter((testimonial) => FEATURED_NAMES.includes(testimonial.name));

/** Testimonial name -> dictionary key slug. */
const TESTIMONIAL_KEYS = {
  'Karma Dorji': 'karma-dorji',
  'Sonam Choden': 'sonam-choden',
};

/**
 * Testimonials — 2 featured, named-with-title quotes from the brief. No
 * headshots exist, so `Avatar` falls back to initials rather than a stock
 * photo standing in for a real person.
 */
export default function FeaturedTestimonials() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-border bg-surface py-section">
      <div className="mx-auto max-w-content px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-h2 text-fg">{t('testimonials.heading', 'What clients say')}</h2>
          <Link
            to="/testimonials"
            className="hidden shrink-0 items-center gap-1.5 text-body-sm font-medium text-brand-600 hover:text-brand-700 sm:inline-flex"
          >
            {t('common.readAllTestimonials', 'Read all testimonials')}
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {featured.map((testimonial) => {
            const key = TESTIMONIAL_KEYS[testimonial.name];
            return (
              <Card key={testimonial.name} interactive elevation="raised" className="flex flex-col">
                <QuoteIcon className="size-8 text-accent-500" />
                <p className="mt-4 flex-1 text-body-lg text-fg">
                  &ldquo;{t(`testimonial.${key}.quote`, testimonial.quote)}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar name={testimonial.name} size="sm" />
                  <div>
                    <p className="text-body-sm font-medium text-fg">{testimonial.name}</p>
                    <p className="text-caption text-fg-muted">{t(`testimonial.${key}.role`, testimonial.role)}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Link
          to="/testimonials"
          className="mt-8 inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-600 hover:text-brand-700 sm:hidden"
        >
          {t('common.readAllTestimonials', 'Read all testimonials')}
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </section>
  );
}
