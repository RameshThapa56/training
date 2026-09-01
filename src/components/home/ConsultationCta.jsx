import { useActionState, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Dialog, Field, Input, Textarea, Button } from '../ui/index.js';
import { CheckCircleIcon } from './HomeIcons.jsx';
import { brief } from '../../content/brief.js';
import { useLanguage } from '../../context/LanguageContext.jsx';

/** @typedef {{ status: 'idle'|'error'|'success', errors: Record<string,string>, fields: Record<string,string> }} ConsultationState */

/**
 * @param {Record<string,string>} fields
 * @param {(key: string, fallbackEnglish: string) => string} t
 */
function validate(fields, t) {
  const errors = {};
  if (!fields.name.trim()) errors.name = t('form.errorName', 'Enter your name.');
  if (!fields.email.trim()) errors.email = t('form.errorEmail', 'Enter your email address.');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = t('form.errorEmailInvalid', 'Enter a valid email address.');
  return errors;
}

/**
 * React 19 Action for the lead-magnet form — the same `useActionState`
 * pattern as `ContactPage`'s quote request (skills/react19-component-
 * architecture/SKILL.md), deliberately with fewer required fields: this is
 * the low-commitment entry point into the funnel (docs/strategy.md §7 —
 * "the free consultation is the framing used ... to lower the perceived
 * commitment"), not the formal quote request itself.
 *
 * REAL INTEGRATION POINT: same as `ContactPage`'s action — replace the
 * simulated delay with the email-notification/CRM call once one exists.
 *
 * @param {(key: string, fallbackEnglish: string) => string} t
 * @returns {(prevState: ConsultationState, formData: FormData) => Promise<ConsultationState>}
 */
function makeSubmitConsultationRequest(t) {
  return async function submitConsultationRequest(_prevState, formData) {
    const fields = {
      name: formData.get('name')?.toString() ?? '',
      email: formData.get('email')?.toString() ?? '',
      note: formData.get('note')?.toString() ?? '',
    };

    const errors = validate(fields, t);
    if (Object.keys(errors).length > 0) {
      return { status: 'error', errors, fields };
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    return { status: 'success', errors: {}, fields };
  };
}

/**
 * Consultation dialog — its own compact form (name, email, optional note),
 * separate from the full quote form on `/contact` so the lead magnet has a
 * genuine capture point rather than only being mentioned in CTA sub-copy.
 */
function ConsultationDialogContent({ onOpenChange }) {
  const { t } = useLanguage();
  const [state, formAction, isPending] = useActionState(makeSubmitConsultationRequest(t), {
    status: 'idle',
    errors: {},
    fields: {},
  });

  return (
    <Dialog.Content size="md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Dialog.Title>{t('consultationDialog.title', 'Book your free consultation')}</Dialog.Title>
          <Dialog.Description>
            {t('leadMagnet.text', brief.conversion.leadMagnet)} — {t('common.noObligation', 'no obligation, no cost')}.{' '}
            {t(
              'consultationDialog.descSuffix',
              "We'll follow up to talk through what you need before anything is scoped or priced.",
            )}
          </Dialog.Description>
        </div>
        <Dialog.Close />
      </div>

      {state.status === 'success' ? (
        <div role="status" className="mt-6 flex flex-col items-start gap-3 rounded-lg border border-success-500/30 bg-success-50 p-6 dark:bg-success-500/10">
          <CheckCircleIcon className="size-8 text-success-500" aria-hidden="true" />
          <p className="font-display text-h4 text-fg">
            {t('consultationSuccess.thanksPrefix', 'Thanks,')} {state.fields.name.split(' ')[0]}.
          </p>
          <p className="text-body-sm text-fg-muted">
            {t(
              'consultationSuccess.bodyBeforeLink',
              "We'll reach out by email to set up a time. If you already know the scope of what you need, the",
            )}{' '}
            <Link to="/contact" onClick={() => onOpenChange(false)} className="font-medium text-brand-600 hover:text-brand-700">
              {t('common.fullQuoteRequestForm', 'full quote request form')}
            </Link>{' '}
            {t('consultationSuccess.bodyAfterLink', 'works too.')}
          </p>
          <Button intent="outline" size="sm" onClick={() => onOpenChange(false)}>
            {t('common.close', 'Close')}
          </Button>
        </div>
      ) : (
        <form action={formAction} noValidate className="mt-6 space-y-4">
          {state.status === 'error' && (
            <p role="alert" className="text-body-sm text-error-700">
              {t('form.errorBanner', 'Please fix the highlighted fields below.')}
            </p>
          )}

          <Field label={t('field.fullName', 'Full name')} required error={state.errors.name}>
            {(fieldProps) => (
              <Input
                {...fieldProps}
                type="text"
                name="name"
                autoComplete="name"
                defaultValue={state.fields.name}
                disabled={isPending}
              />
            )}
          </Field>

          <Field label={t('field.emailAddress', 'Email address')} required error={state.errors.email}>
            {(fieldProps) => (
              <Input
                {...fieldProps}
                type="email"
                name="email"
                autoComplete="email"
                defaultValue={state.fields.email}
                disabled={isPending}
              />
            )}
          </Field>

          <Field
            label={t('field.talkThrough', 'What would you like to talk through?')}
            hint={t('field.talkThroughHint', 'Optional — a sentence or two is plenty.')}
          >
            {(fieldProps) => (
              <Textarea {...fieldProps} name="note" rows={3} defaultValue={state.fields.note} disabled={isPending} />
            )}
          </Field>

          <Button type="submit" size="lg" isLoading={isPending} fullWidth>
            {isPending
              ? t('form.sending', 'Sending...')
              : t('form.submitConsultation', 'Request my free consultation')}
          </Button>

          <p className="text-caption text-fg-muted">
            {t(
              'form.footerPrefix',
              'Not connected to a live inbox yet — this build simulates submission. Need to scope a formal quote instead?',
            )}{' '}
            {t('form.footerUseThe', 'Use the')}{' '}
            <Link to="/contact" onClick={() => onOpenChange(false)} className="font-medium text-brand-600 hover:text-brand-700">
              {t('common.fullRequestForm', 'full request form')}
            </Link>
            .
          </p>
        </form>
      )}
    </Dialog.Content>
  );
}

ConsultationDialogContent.propTypes = { onOpenChange: PropTypes.func.isRequired };

/**
 * Consultation CTA — a dedicated homepage capture point for the brief's
 * lead magnet (`brief.conversion.leadMagnet`, "Free IT Infrastructure
 * Consultation"), distinct from the full "Request a Quote" band in
 * `FinalCta` below it. Sits between the authority section (`TrustIndicators`)
 * and the closing quote CTA, as the lower-commitment bridge docs/
 * strategy.md §7 describes.
 */
export default function ConsultationCta() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <section className="border-t border-border py-section">
      <div className="mx-auto max-w-content px-6">
        <div className="flex flex-col items-start gap-6 rounded-lg border border-brand-500/30 bg-brand-50 p-8 dark:bg-brand-950/40 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-lg">
            <p className="text-caption font-medium uppercase tracking-wide text-brand-600">
              {t('consultationCta.eyebrow', 'Not ready for a full quote?')}
            </p>
            <h2 className="mt-2 font-display text-h3 text-fg">
              {t('consultationCta.heading', 'Start with a free consultation instead')}
            </h2>
            <p className="mt-2 text-body text-fg-muted">
              {t('leadMagnet.text', brief.conversion.leadMagnet)} — {t('common.noObligation', 'no obligation, no cost')}.{' '}
              {t(
                'consultationCta.descSuffix',
                "Tell us what you're dealing with and we'll talk it through before anything is scoped or priced.",
              )}
            </p>
          </div>
          <Button size="lg" onClick={() => setOpen(true)} className="shrink-0">
            {t('consultationCta.bookButton', 'Book Your Free Consultation')}
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <ConsultationDialogContent onOpenChange={setOpen} />
      </Dialog>
    </section>
  );
}
