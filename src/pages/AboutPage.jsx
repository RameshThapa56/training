import { Link } from 'react-router-dom';
import { Badge, Card } from '../components/ui/index.js';
import { AwardIcon, CertificateIcon } from '../components/home/HomeIcons.jsx';
import { CtaBand } from '../components/CtaBand.jsx';
import { buttonStyles } from '../components/ui/Button.jsx';
import { Seo } from '../components/Seo.jsx';
import { brief } from '../content/brief.js';

/**
 * Route: `/about`
 *
 * Full founder story + credentials, presented as narrative rather than a
 * résumé dump per CLAUDE.md ("personality-driven presentation"). Every
 * fact traces to `brief.business`/`brief.brand`/`brief.awards`/
 * `brief.certifications` — nothing here is invented. Section order follows
 * docs/sitemap.md's About content hierarchy: founder story lead-in +
 * years of experience above the fold, then full story, certifications,
 * awards, mission, and a closing CTA band below it.
 */
export default function AboutPage() {
  return (
    <>
      <Seo
        title="About | Bhutan IT Solutions"
        description="8+ years bringing reliable IT products, networking, security, and smart technology solutions to businesses, schools, and individuals across Bhutan."
        path="/about"
      />

      {/* Above the fold: lead-in + years of experience */}
      <section className="border-b border-border bg-surface py-section">
        <div className="mx-auto max-w-content px-6">
          <div className="max-w-narrow">
            <p className="text-caption font-medium uppercase tracking-wide text-brand-600">About us</p>
            <h1 className="mt-2 font-display text-h1 text-fg">
              A technology partner built on {brief.business.yearsOfExperience.toLowerCase()} of hands-on work.
            </h1>
            <p className="mt-5 text-body-lg text-fg-muted">{brief.business.valueProposition}</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {brief.brand.personality.map((trait) => (
              <Badge key={trait} tone="brand">
                {trait}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Full founder story */}
      <section className="border-b border-border py-section">
        <div className="mx-auto grid max-w-content gap-8 px-6 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <p className="text-caption font-medium uppercase tracking-wide text-brand-600">Our story</p>
            <h2 className="mt-2 font-display text-h2 text-fg">Why we started</h2>
          </div>
          <div className="lg:col-span-8">
            <p className="max-w-narrow text-body-lg text-fg">{brief.business.founderStory}</p>
            <p className="mt-6 max-w-narrow text-body text-fg-muted">{brief.brand.voice}</p>
          </div>
        </div>
      </section>

      {/* Mission / objective */}
      <section className="border-b border-border bg-surface-sunken py-section">
        <div className="mx-auto max-w-content px-6">
          <div className="rounded-lg border border-border bg-surface-elevated p-8 sm:p-10">
            <p className="text-caption font-medium uppercase tracking-wide text-brand-600">Our objective</p>
            <p className="mt-3 max-w-narrow font-display text-h3 font-medium text-fg">
              {brief.business.primaryObjective}
            </p>
            <p className="mt-4 max-w-narrow text-body text-fg-muted">{brief.brand.differentiator}</p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-b border-border py-section">
        <div className="mx-auto max-w-content px-6">
          <div className="flex items-start gap-4">
            <CertificateIcon className="mt-1 size-8 shrink-0 text-brand-600" aria-hidden="true" />
            <div>
              <h2 className="font-display text-h2 text-fg">Certifications</h2>
              <p className="mt-2 max-w-lg text-body text-fg-muted">
                The team behind every deployment holds industry-recognized credentials, not just
                on-the-job experience.
              </p>
            </div>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {brief.certifications.map((certification) => (
              <li key={certification}>
                <Card padding="sm" className="flex h-full items-center gap-3">
                  <CertificateIcon className="size-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <span className="text-body-sm font-medium text-fg">{certification}</span>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Awards / recognition */}
      <section className="border-b border-border bg-surface-sunken py-section">
        <div className="mx-auto max-w-content px-6">
          <div className="flex items-start gap-4">
            <AwardIcon className="mt-1 size-8 shrink-0 text-accent-600" aria-hidden="true" />
            <div>
              <h2 className="font-display text-h2 text-fg">Awards &amp; recognition</h2>
              <p className="mt-2 max-w-lg text-body text-fg-muted">
                Recognition from industry bodies, alongside the certifications above.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {brief.awards.map((award) => (
              <Card key={award.name} elevation="raised" className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-200">
                  <AwardIcon className="size-5" aria-hidden="true" />
                </span>
                <p className="text-body font-medium text-fg">{award.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="border-b border-border py-section">
        <div className="mx-auto max-w-content px-6">
          <div className="rounded-lg border border-border bg-surface-elevated p-8 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-10">
            <div className="max-w-narrow">
              <h2 className="font-display text-h3 text-fg">Who we work with</h2>
              <p className="mt-2 text-body text-fg-muted">{brief.business.targetAudience}</p>
            </div>
            <Link
              to="/services"
              className={buttonStyles({ intent: 'outline', size: 'md', className: 'mt-6 shrink-0 sm:mt-0' })}
            >
              See what we offer
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Let's build your next deployment together"
        secondaryTo="/work"
        secondaryLabel="See our work"
      />
    </>
  );
}
