import { useActionState, useId } from 'react';
import PropTypes from 'prop-types';
import { Field, Input, Textarea, Accordion, Badge } from '../components/ui/index.js';
import { Button } from '../components/ui/Button.jsx';
import { CheckCircleIcon } from '../components/home/HomeIcons.jsx';
import { Seo } from '../components/Seo.jsx';
import { cn } from '../lib/cn.js';
import { brief } from '../content/brief.js';

// PLACEHOLDER — the brief lists preferred contact *methods* (`brief.conversion.preferredContactMethods`)
// but gives no actual phone number, WhatsApp number, email address, or
// street address (only `brief.business.location`, "Thimphu, Bhutan").
// These stand in for real contact details the same way NavBar's BRAND_NAME
// placeholder does — replace before launch.
const CONTACT_CHANNELS = [
  { method: 'Phone', value: '+975 XX XXX XXX', href: 'tel:+975XXXXXXXX' },
  { method: 'WhatsApp', value: '+975 XX XXX XXX', href: 'https://wa.me/975XXXXXXXX' },
  { method: 'Email', value: 'hello@example.bt', href: 'mailto:hello@example.bt' },
];

// PLACEHOLDER — no business hours given in the brief.
const BUSINESS_HOURS = [
  { days: 'Monday – Friday', hours: '9:00 AM – 5:00 PM' },
  { days: 'Saturday', hours: '10:00 AM – 2:00 PM' },
  { days: 'Sunday', hours: 'Closed' },
];

// Lightweight lead-qualification options — the brief's own 3 pricing tiers
// (`brief.pricingTiers`, Essential/Business/Enterprise) plus a non-committal
// option, so an organizational lead and a simple individual enquiry can
// self-segment without the field being required (per docs/strategy.md §7:
// organizational buyers want a scoped quote path, individual buyers want a
// fast, low-friction one — this lets both use the same form).
const PROJECT_SCOPE_OPTIONS = [...brief.pricingTiers.map((tier) => tier.name), 'Not sure yet'];

// Generic reassurance content — deliberately not claiming specific
// turnaround times, guarantees, or coverage areas the brief doesn't state.
const FAQ_ITEMS = [
  {
    question: 'Is the initial consultation really free?',
    answer: `Yes — ${brief.conversion.leadMagnet.toLowerCase()} costs nothing and doesn't commit you to anything. We'll talk through what you need before any quote is prepared.`,
  },
  {
    question: 'Do you work with individuals, or only organizations?',
    answer: brief.business.targetAudience,
  },
  {
    question: "What's the fastest way to reach you?",
    answer:
      'Phone and WhatsApp are the quickest for a fast, informal answer. For a formal quotation request, use the form on this page or email us directly.',
  },
  {
    question: 'What happens after I submit a quote request?',
    answer:
      "We'll review what you've shared and follow up using whichever contact method you selected, to confirm scope before any pricing is put together.",
  },
];

/** @typedef {{ status: 'idle'|'error'|'success', errors: Record<string,string>, fields: Record<string,string> }} FormState */

/** @param {Record<string,string>} fields */
function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Enter your name.';
  if (!fields.email.trim()) errors.email = 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Enter a valid email address.';
  if (!fields.preferredContact) errors.preferredContact = 'Choose how we should reach you.';
  if (!fields.message.trim()) errors.message = 'Tell us a little about what you need.';
  else if (fields.message.trim().length < 10) errors.message = 'A few more details would help us prepare a useful reply.';
  return errors;
}

/**
 * React 19 Action, driven by `useActionState` (per
 * skills/react19-component-architecture/SKILL.md — "model submission as an
 * Action, not an onSubmit handler with manual useState"). No real backend
 * exists yet: this validates client-side, then simulates a network call.
 *
 * REAL INTEGRATION POINT: replace the `setTimeout` below with a POST to an
 * email-notification service (e.g. Resend/SendGrid — see
 * `brief.technical.integrations`, "Email notifications") and/or a CRM lead
 * endpoint ("Optional CRM integration"). The validated `fields` object is
 * already shaped as the payload that call would send.
 *
 * @param {FormState} _prevState
 * @param {FormData} formData
 * @returns {Promise<FormState>}
 */
async function submitQuoteRequest(_prevState, formData) {
  const fields = {
    name: formData.get('name')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    phone: formData.get('phone')?.toString() ?? '',
    preferredContact: formData.get('preferredContact')?.toString() ?? '',
    projectScope: formData.get('projectScope')?.toString() ?? '',
    message: formData.get('message')?.toString() ?? '',
  };

  const errors = validate(fields);
  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, fields };
  }

  await new Promise((resolve) => setTimeout(resolve, 800));

  return { status: 'success', errors: {}, fields };
}

/** @param {{ error?: string, children: React.ReactNode }} props */
function RadioFieldset({ error, children }) {
  const errorId = useId();
  return (
    <fieldset>
      <legend className="text-body-sm font-medium text-fg">
        Preferred contact method
        <span className="ml-0.5 text-error-700" aria-hidden="true">
          *
        </span>
      </legend>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4" aria-describedby={error ? errorId : undefined}>
        {children}
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-caption text-error-700">
          {error}
        </p>
      )}
    </fieldset>
  );
}

RadioFieldset.propTypes = { error: PropTypes.string, children: PropTypes.node.isRequired };

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitQuoteRequest, {
    status: 'idle',
    errors: {},
    fields: {},
  });

  return (
    <>
      <Seo
        title="Contact | Bhutan IT Solutions"
        description="Request a quote or reach us directly by phone, WhatsApp, or email — IT infrastructure support for businesses and individuals in Thimphu, Bhutan."
        path="/contact"
      />

      <section className="border-b border-border bg-surface py-section">
        <div className="mx-auto max-w-content px-6">
          <div className="max-w-narrow">
            <p className="text-caption font-medium uppercase tracking-wide text-brand-600">Contact</p>
            <h1 className="mt-2 font-display text-h1 text-fg">{brief.conversion.primaryCta.label}</h1>
            <p className="mt-4 text-body-lg text-fg-muted">{brief.conversion.leadMagnet} — no obligation, no cost.</p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Form */}
            <div className="lg:col-span-7">
              {state.status === 'success' ? (
                <div
                  role="status"
                  className="flex flex-col items-start gap-3 rounded-lg border border-success-500/30 bg-success-50 p-8 dark:bg-success-500/10"
                >
                  <CheckCircleIcon className="size-9 text-success-500" aria-hidden="true" />
                  <h2 className="font-display text-h4 text-fg">Thanks — your request is in.</h2>
                  <p className="text-body text-fg-muted">
                    We&rsquo;ll follow up using your preferred contact method as soon as possible. In the
                    meantime, feel free to reach us directly using any of the channels alongside this form.
                  </p>
                </div>
              ) : (
                <form action={formAction} noValidate className="space-y-5">
                  {state.status === 'error' && (
                    <p role="alert" className="text-body-sm text-error-700">
                      Please fix the highlighted fields below.
                    </p>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" required error={state.errors.name}>
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

                    <Field label="Email address" required error={state.errors.email}>
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
                  </div>

                  <Field label="Phone number" hint="Optional — helpful if you select Phone or WhatsApp below.">
                    {(fieldProps) => (
                      <Input
                        {...fieldProps}
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        defaultValue={state.fields.phone}
                        disabled={isPending}
                      />
                    )}
                  </Field>

                  <RadioFieldset error={state.errors.preferredContact}>
                    {brief.conversion.preferredContactMethods.map((method) => (
                      <label
                        key={method}
                        className={cn(
                          'flex cursor-pointer items-center justify-center rounded border border-border px-3 py-2.5 text-center text-body-sm font-medium text-fg-muted',
                          'transition-colors duration-200 ease-out motion-reduce:transition-none',
                          'has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-700 dark:has-[:checked]:bg-brand-950 dark:has-[:checked]:text-brand-200',
                          'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-surface',
                        )}
                      >
                        <input
                          type="radio"
                          name="preferredContact"
                          value={method}
                          defaultChecked={state.fields.preferredContact === method}
                          disabled={isPending}
                          className="sr-only"
                        />
                        {method}
                      </label>
                    ))}
                  </RadioFieldset>

                  <fieldset>
                    <legend className="text-body-sm font-medium text-fg">
                      What kind of project is this?
                      <span className="ml-1.5 font-normal text-fg-muted">(optional — helps us prepare)</span>
                    </legend>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {PROJECT_SCOPE_OPTIONS.map((scope) => (
                        <label
                          key={scope}
                          className={cn(
                            'flex cursor-pointer items-center justify-center rounded border border-border px-3 py-2.5 text-center text-body-sm font-medium text-fg-muted',
                            'transition-colors duration-200 ease-out motion-reduce:transition-none',
                            'has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-700 dark:has-[:checked]:bg-brand-950 dark:has-[:checked]:text-brand-200',
                            'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-surface',
                          )}
                        >
                          <input
                            type="radio"
                            name="projectScope"
                            value={scope}
                            defaultChecked={state.fields.projectScope === scope}
                            disabled={isPending}
                            className="sr-only"
                          />
                          {scope}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <Field label="What do you need help with?" required error={state.errors.message}>
                    {(fieldProps) => (
                      <Textarea
                        {...fieldProps}
                        name="message"
                        rows={6}
                        placeholder="e.g. Wi-Fi coverage for a 3-floor office, or a CCTV system for a retail space..."
                        defaultValue={state.fields.message}
                        disabled={isPending}
                      />
                    )}
                  </Field>

                  <Button type="submit" size="lg" isLoading={isPending} fullWidth>
                    {isPending ? 'Sending...' : brief.conversion.primaryCta.label}
                  </Button>

                  <p className="text-caption text-fg-muted">
                    This form isn&rsquo;t connected to a live inbox yet — submissions are simulated for this
                    build. A real integration (email notifications, optional CRM) plugs in at the same
                    submit action.
                  </p>
                </form>
              )}
            </div>

            {/* Parallel direct-contact channels */}
            <aside className="lg:col-span-5">
              <div className="rounded-lg border border-border bg-surface-elevated p-6">
                <h2 className="font-display text-h4 text-fg">Prefer a direct line?</h2>
                <p className="mt-1.5 text-body-sm text-fg-muted">
                  All of these reach us just as fast as the form.
                </p>
                <ul className="mt-5 space-y-3">
                  {CONTACT_CHANNELS.map((channel) => (
                    <li key={channel.method}>
                      <a
                        href={channel.href}
                        className="flex items-center justify-between gap-3 rounded border border-border px-4 py-3 text-body-sm transition-colors duration-200 ease-out hover:border-brand-500 hover:bg-surface-sunken motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                      >
                        <span className="font-medium text-fg">{channel.method}</span>
                        <span className="text-fg-muted">{channel.value}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <Badge tone="warning" className="mt-4">
                  Placeholder contact details
                </Badge>
              </div>

              <div className="mt-6 rounded-lg border border-border bg-surface-elevated p-6">
                <h2 className="font-display text-h4 text-fg">Business hours</h2>
                <p className="mt-1.5 text-caption text-warning-800">Placeholder — confirm real hours before launch.</p>
                <dl className="mt-4 space-y-2">
                  {BUSINESS_HOURS.map(({ days, hours }) => (
                    <div key={days} className="flex items-center justify-between text-body-sm">
                      <dt className="text-fg-muted">{days}</dt>
                      <dd className="font-medium text-fg">{hours}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-body-sm text-fg-muted">{brief.business.location}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Below the fold: map + FAQ */}
      <section className="border-b border-border py-section">
        <div className="mx-auto max-w-content px-6">
          <h2 className="font-display text-h3 text-fg">Find us</h2>
          <p className="mt-1.5 text-body-sm text-fg-muted">
            Approximate location — {brief.business.location}. Exact address to be confirmed before launch.
          </p>
          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <iframe
              title="Map showing Thimphu, Bhutan"
              src="https://maps.google.com/maps?q=Thimphu%2C%20Bhutan&z=13&output=embed"
              className="h-80 w-full grayscale-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="py-section">
        <div className="mx-auto max-w-narrow px-6">
          <h2 className="font-display text-h3 text-fg">Common questions</h2>
          <Accordion type="single" className="mt-6">
            {FAQ_ITEMS.map((item, index) => (
              <Accordion.Item key={item.question} value={`faq-${index}`}>
                <Accordion.Trigger>{item.question}</Accordion.Trigger>
                <Accordion.Panel>{item.answer}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
