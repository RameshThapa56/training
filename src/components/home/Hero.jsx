import { Link } from 'react-router-dom';
import { buttonStyles } from '../ui/Button.jsx';
import { Badge } from '../ui/Badge.jsx';
import { brief } from '../../content/brief.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { NetworkIcon, ShieldIcon, LaptopIcon } from './HomeIcons.jsx';

const primaryAward = brief.awards[0]?.name;

/**
 * Hero — sharpened value proposition (docs/strategy.md §4) as the headline,
 * the brief's UVP as supporting copy, both brief CTAs, and a compressed
 * trust indicator (years + headline award, per strategy.md's authority
 * framework: "Home carries authority signals in compressed form").
 *
 * Deliberately asymmetric (60/40 content-vs-visual split on large screens,
 * stacked on mobile) with a dark, layered "glass" service-stack visual
 * instead of a centered gradient blob — per skills/design-system's
 * anti-pattern list and the brief's glassmorphism/dark-contrast direction.
 */
export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-neutral-950 text-neutral-50">
      {/* Decorative grid + glow backdrop — CSS only, no imagery. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-accent-500/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-content gap-12 px-6 py-20 sm:py-28 lg:grid-cols-12 lg:items-center lg:py-32">
        <div className="lg:col-span-7">
          <Badge tone="accent" className="bg-accent-500/15 text-accent-300">
            {brief.business.yearsOfExperience} {t('hero.badgeSuffix', 'in Bhutan')}
          </Badge>

          <h1 className="mt-5 max-w-xl font-display text-display text-white">
            {t(
              'hero.headline',
              "Bhutan’s technology partner for IT infrastructure that’s supplied, installed, and supported — end to end.",
            )}
          </h1>

          <p className="mt-6 max-w-lg text-body-lg text-neutral-300">
            {t('hero.subcopy', brief.business.valueProposition)}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {/* Real <Link>s styled with Button's variant resolver — buttonStyles
                is exported for exactly this (a link that looks like a button
                without rendering a <button> for what's really navigation). */}
            <Link to="/contact" className={buttonStyles({ intent: 'accent', size: 'lg' })}>
              {t('cta.requestQuote', brief.conversion.primaryCta.label)}
            </Link>
            <Link
              to="/services"
              className={buttonStyles({
                intent: 'outline',
                size: 'lg',
                className: 'border-white/25 text-white hover:bg-white/10',
              })}
            >
              {t('cta.exploreProducts', brief.conversion.secondaryCta.label)}
            </Link>
          </div>

          <p className="mt-6 text-body-sm text-neutral-400">
            {t('leadMagnet.text', brief.conversion.leadMagnet)} —{' '}
            {t('common.noObligation', 'no obligation, no cost')}.
          </p>

          {primaryAward && (
            <p className="mt-3 flex items-center gap-2 text-caption text-neutral-400">
              <ShieldIcon className="size-4 shrink-0 text-accent-400" />
              {t('hero.award', primaryAward)}
            </p>
          )}
        </div>

        <div className="relative mx-auto max-w-sm lg:col-span-5 lg:max-w-none">
          {/* Layered "glass" panels standing in for product photography — no
              real project imagery exists yet (see phase summary). Consistent
              treatment: rounded-lg, border + blur, one accent icon each. */}
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md shadow-lg">
            <LaptopIcon className="size-8 text-accent-300" />
            <p className="mt-4 font-display text-h4 text-white">
              {t('hero.card1.title', 'One team, full lifecycle')}
            </p>
            <p className="mt-2 text-body-sm text-neutral-300">
              {t(
                'hero.card1.desc',
                'Supply, install, configure, and support — handled end to end, not handed off after the sale.',
              )}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:mt-0 sm:block">
            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md shadow-md sm:absolute sm:-left-6 sm:-top-10 sm:w-44">
              <NetworkIcon className="size-6 text-accent-300" />
              <p className="mt-3 text-body-sm font-medium text-white">
                {t('hero.card2.title', 'Wi-Fi & Networking')}
              </p>
              <p className="mt-1 text-caption text-neutral-400">
                {t('hero.card2.desc', 'Multi-floor coverage, tuned on site.')}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md shadow-md sm:absolute sm:-bottom-8 sm:-right-6 sm:w-48">
              <ShieldIcon className="size-6 text-accent-300" />
              <p className="mt-3 text-body-sm font-medium text-white">
                {t('hero.card3.title', 'CCTV & Security')}
              </p>
              <p className="mt-1 text-caption text-neutral-400">
                {t('hero.card3.desc', 'Centralized, remotely monitored.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
