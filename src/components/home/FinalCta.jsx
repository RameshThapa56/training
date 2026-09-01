import { Link } from 'react-router-dom';
import { buttonStyles } from '../ui/Button.jsx';
import { brief } from '../../content/brief.js';
import { useLanguage } from '../../context/LanguageContext.jsx';

/**
 * Final Conversion Section — closing CTA band restating the value
 * proposition, with both brief CTAs repeated (per docs/sitemap.md's
 * "every page below the fold ends with a CTA band" principle) and a
 * lightweight nod to the brief's WhatsApp/phone contact preference for
 * visitors who'd rather not fill out a form.
 */
export default function FinalCta() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-border bg-neutral-950 py-section text-neutral-50">
      <div className="mx-auto max-w-content px-6 text-center">
        <h2 className="mx-auto max-w-2xl font-display text-h1 text-white">
          {t(
            'finalCta.heading',
            "Ready for IT infrastructure that's supplied, installed, and supported — end to end?",
          )}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-body-lg text-neutral-300">
          {t('leadMagnet.text', brief.conversion.leadMagnet)} — {t('common.noObligation', 'no obligation, no cost')}.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact" className={buttonStyles({ intent: 'accent', size: 'lg' })}>
            {t('cta.requestQuote', brief.conversion.primaryCta.label)}
          </Link>
          <Link
            to="/services"
            className={buttonStyles({ intent: 'outline', size: 'lg', className: 'border-white/25 text-white hover:bg-white/10' })}
          >
            {t('cta.exploreProducts', brief.conversion.secondaryCta.label)}
          </Link>
        </div>

        <p className="mt-6 text-caption text-neutral-400">
          {t('finalCta.whatsappPrefix', 'Prefer WhatsApp or a phone call? Reach us directly from the')}{' '}
          <Link to="/contact" className="underline underline-offset-2 hover:text-neutral-200">
            {t('common.contactPage', 'Contact page')}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
