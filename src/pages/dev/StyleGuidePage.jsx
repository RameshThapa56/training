import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components/ui/Button.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { Tabs } from '../../components/ui/Tabs.jsx';
import { Accordion } from '../../components/ui/Accordion.jsx';
import { Dialog } from '../../components/ui/Dialog.jsx';
import { Tooltip } from '../../components/ui/Tooltip.jsx';
import { Field } from '../../components/ui/Field.jsx';
import { Input } from '../../components/ui/Input.jsx';
import { Textarea } from '../../components/ui/Textarea.jsx';
import { FilterPill } from '../../components/ui/FilterPill.jsx';
import { Avatar } from '../../components/ui/Avatar.jsx';
import { Skeleton } from '../../components/ui/Skeleton.jsx';

// Tailwind's class scanner needs literal class strings in source — it can't
// resolve `bg-${name}-${step}` at build time — so every swatch class below
// is spelled out rather than templated.
const COLOR_SCALES = [
  {
    label: 'Brand',
    steps: [
      { step: 50, className: 'bg-brand-50' },
      { step: 100, className: 'bg-brand-100' },
      { step: 200, className: 'bg-brand-200' },
      { step: 300, className: 'bg-brand-300' },
      { step: 400, className: 'bg-brand-400' },
      { step: 500, className: 'bg-brand-500' },
      { step: 600, className: 'bg-brand-600' },
      { step: 700, className: 'bg-brand-700' },
      { step: 800, className: 'bg-brand-800' },
      { step: 900, className: 'bg-brand-900' },
      { step: 950, className: 'bg-brand-950' },
    ],
  },
  {
    label: 'Accent',
    steps: [
      { step: 50, className: 'bg-accent-50' },
      { step: 100, className: 'bg-accent-100' },
      { step: 200, className: 'bg-accent-200' },
      { step: 300, className: 'bg-accent-300' },
      { step: 400, className: 'bg-accent-400' },
      { step: 500, className: 'bg-accent-500' },
      { step: 600, className: 'bg-accent-600' },
      { step: 700, className: 'bg-accent-700' },
      { step: 800, className: 'bg-accent-800' },
      { step: 900, className: 'bg-accent-900' },
      { step: 950, className: 'bg-accent-950' },
    ],
  },
  {
    label: 'Neutral',
    steps: [
      { step: 50, className: 'bg-neutral-50' },
      { step: 100, className: 'bg-neutral-100' },
      { step: 200, className: 'bg-neutral-200' },
      { step: 300, className: 'bg-neutral-300' },
      { step: 400, className: 'bg-neutral-400' },
      { step: 500, className: 'bg-neutral-500' },
      { step: 600, className: 'bg-neutral-600' },
      { step: 700, className: 'bg-neutral-700' },
      { step: 800, className: 'bg-neutral-800' },
      { step: 900, className: 'bg-neutral-900' },
      { step: 950, className: 'bg-neutral-950' },
    ],
  },
];
const SEMANTIC_COLORS = [
  { label: 'Success', classes: ['bg-success-50', 'bg-success-500', 'bg-success-700'] },
  { label: 'Warning', classes: ['bg-warning-50', 'bg-warning-500', 'bg-warning-700'] },
  { label: 'Error', classes: ['bg-error-50', 'bg-error-500', 'bg-error-700'] },
];
const TYPE_STEPS = [
  { token: 'display', label: 'Display', className: 'text-display font-display' },
  { token: 'h1', label: 'Heading 1', className: 'text-h1 font-display' },
  { token: 'h2', label: 'Heading 2', className: 'text-h2 font-display' },
  { token: 'h3', label: 'Heading 3', className: 'text-h3 font-display' },
  { token: 'h4', label: 'Heading 4', className: 'text-h4 font-display' },
  { token: 'body-lg', label: 'Body Large', className: 'text-body-lg font-body' },
  { token: 'body', label: 'Body', className: 'text-body font-body' },
  { token: 'body-sm', label: 'Body Small', className: 'text-body-sm font-body' },
  { token: 'caption', label: 'Caption', className: 'text-caption font-body' },
];
const RADII = [
  { label: 'sm (6px)', className: 'rounded-sm' },
  { label: 'default (10px)', className: 'rounded' },
  { label: 'lg (20px)', className: 'rounded-lg' },
];
const SHADOWS = [
  { label: 'shadow-sm', className: 'shadow-sm' },
  { label: 'shadow-md', className: 'shadow-md' },
  { label: 'shadow-lg', className: 'shadow-lg' },
  { label: 'shadow-glow', className: 'shadow-glow' },
];

/**
 * Section wrapper — internal to this page only.
 * @param {{ title: string, description?: string, children: React.ReactNode }} props
 */
function Section({ title, description, children }) {
  return (
    <section className="border-b border-border py-12">
      <div className="mx-auto max-w-content px-6">
        <h2 className="font-display text-h3 text-fg">{title}</h2>
        {description && <p className="mt-1 max-w-narrow text-body text-fg-muted">{description}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
};

/**
 * Internal dev-only route (`/dev/style-guide`, not linked in navigation)
 * rendering every design token and `ui/` primitive with its variants, per
 * skills/design-system/SKILL.md's request for a visual review surface
 * before the design system is used across real pages.
 */
export default function StyleGuidePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ networking: true, cctv: false, servers: false });
  const [fieldValue, setFieldValue] = useState('');

  return (
    <div className="bg-surface pb-24">
      <title>Style Guide (Dev) — Portfolio</title>
      <meta name="robots" content="noindex, nofollow" />

      <header className="border-b border-border bg-surface-sunken py-10">
        <div className="mx-auto max-w-content px-6">
          <Badge tone="warning">Internal — not linked in navigation</Badge>
          <h1 className="mt-3 font-display text-h1 text-fg">Style Guide</h1>
          <p className="mt-2 max-w-narrow text-body-lg text-fg-muted">
            Every design token and UI primitive from Phase 03, for visual review before real pages
            are built on top of them.
          </p>
        </div>
      </header>

      <Section title="Color" description="1 primary (brand), 1 accent, a neutral scale, and semantic status colors.">
        <div className="space-y-8">
          {COLOR_SCALES.map((scale) => (
            <div key={scale.label}>
              <h3 className="text-body-sm font-medium text-fg-muted">{scale.label}</h3>
              <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6 md:grid-cols-11">
                {scale.steps.map(({ step, className }) => (
                  <div key={step} className="space-y-1">
                    <div className={`h-14 rounded-sm border border-border ${className}`} />
                    <p className="text-caption text-fg-muted">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div>
            <h3 className="text-body-sm font-medium text-fg-muted">Semantic</h3>
            <div className="mt-2 grid grid-cols-3 gap-4 sm:w-1/2">
              {SEMANTIC_COLORS.map((s) => (
                <div key={s.label} className="space-y-1">
                  <div className="flex overflow-hidden rounded-sm border border-border">
                    {s.classes.map((className) => (
                      <div key={className} className={`h-14 flex-1 ${className}`} />
                    ))}
                  </div>
                  <p className="text-caption text-fg-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Typography" description="Space Grotesk (display) + Inter (body). Named scale steps, not arbitrary sizes.">
        <div className="space-y-4">
          {TYPE_STEPS.map(({ token, label, className }) => (
            <div key={token} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border pb-4">
              <span className="w-32 shrink-0 font-mono text-caption text-fg-muted">text-{token}</span>
              <p className={`${className} text-fg`}>
                {label} — Bhutan&rsquo;s technology partner
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Spacing, radius &amp; elevation" description="Small deliberate sets, reused everywhere.">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-body-sm font-medium text-fg-muted">Radius</h3>
            <div className="mt-2 flex flex-wrap gap-4">
              {RADII.map(({ label, className }) => (
                <div key={label} className="space-y-1 text-center">
                  <div className={`size-16 border-2 border-brand-500 bg-brand-50 ${className}`} />
                  <p className="text-caption text-fg-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-body-sm font-medium text-fg-muted">Shadow / elevation</h3>
            <div className="mt-2 flex flex-wrap gap-6">
              {SHADOWS.map(({ label, className }) => (
                <div key={label} className="space-y-1 text-center">
                  <div className={`size-16 rounded-md bg-surface-elevated ${className}`} />
                  <p className="text-caption text-fg-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Button">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button intent="primary">Primary</Button>
            <Button intent="accent">Accent</Button>
            <Button intent="outline">Outline</Button>
            <Button intent="ghost">Ghost</Button>
            <Button intent="danger">Danger</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button disabled>Disabled</Button>
            <Button isLoading>Loading</Button>
          </div>
        </div>
      </Section>

      <Section title="Badge">
        <div className="flex flex-wrap gap-3">
          <Badge tone="neutral">Neutral</Badge>
          <Badge tone="brand">Brand</Badge>
          <Badge tone="accent">Accent</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="error">Error</Badge>
        </div>
      </Section>

      <Section title="Card">
        <div className="grid gap-6 sm:grid-cols-3">
          <Card elevation="flat">
            <Card.Header>
              <p className="font-display text-h4 text-fg">Flat</p>
            </Card.Header>
            <Card.Body>Base card with a border only.</Card.Body>
          </Card>
          <Card elevation="raised">
            <Card.Header>
              <p className="font-display text-h4 text-fg">Raised</p>
            </Card.Header>
            <Card.Body>Adds shadow-md for a lifted surface.</Card.Body>
          </Card>
          <Card elevation="floating" interactive>
            <Card.Header>
              <p className="font-display text-h4 text-fg">Interactive</p>
            </Card.Header>
            <Card.Body>Hover to see the elevation increase.</Card.Body>
            <Card.Footer>
              <Button size="sm">Read more</Button>
            </Card.Footer>
          </Card>
        </div>
      </Section>

      <Section title="Tabs">
        <Tabs defaultValue="essential" className="max-w-narrow">
          <Tabs.List>
            <Tabs.Trigger value="essential">Essential</Tabs.Trigger>
            <Tabs.Trigger value="business">Business</Tabs.Trigger>
            <Tabs.Trigger value="enterprise">Enterprise</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Panel value="essential">Basic IT equipment and accessories for individuals and small offices.</Tabs.Panel>
          <Tabs.Panel value="business">Complete computers, networking, security, and infrastructure solutions.</Tabs.Panel>
          <Tabs.Panel value="enterprise">Customized infrastructure, servers, networking, and ongoing support.</Tabs.Panel>
        </Tabs>
      </Section>

      <Section title="Accordion">
        <Accordion type="single" defaultValue="item-1" className="max-w-narrow">
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Do you install what you sell?</Accordion.Trigger>
            <Accordion.Panel>
              Yes — every deployment is supplied, installed, configured, and supported by the same
              team, not handed off at the point of sale.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Do you work with schools and government offices?</Accordion.Trigger>
            <Accordion.Panel>
              Yes — organizational deployments across corporate, education, and government sectors.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Section>

      <Section title="Dialog">
        <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Dialog.Content>
            <Dialog.Close className="absolute right-4 top-4" />
            <Dialog.Title>Request a free consultation</Dialog.Title>
            <Dialog.Description>
              Tell us about your project and we&rsquo;ll get back to you within one business day.
            </Dialog.Description>
            <div className="mt-6 flex justify-end gap-3">
              <Button intent="ghost" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Continue</Button>
            </div>
          </Dialog.Content>
        </Dialog>
      </Section>

      <Section title="Tooltip">
        <div className="flex gap-6">
          <Tooltip content="Shown on hover or keyboard focus">
            <Button intent="outline">Hover or focus me</Button>
          </Tooltip>
        </div>
      </Section>

      <Section title="Field, Input &amp; Textarea">
        <div className="grid max-w-narrow gap-6 sm:grid-cols-2">
          <Field label="Full name" hint="As it should appear on the quote.">
            {(fieldProps) => (
              <Input {...fieldProps} value={fieldValue} onChange={(e) => setFieldValue(e.target.value)} placeholder="Karma Dorji" />
            )}
          </Field>
          <Field label="Email" required error="Enter a valid email address.">
            {(fieldProps) => <Input {...fieldProps} type="email" placeholder="you@company.bt" />}
          </Field>
          <Field label="Project details" className="sm:col-span-2">
            {(fieldProps) => <Textarea {...fieldProps} placeholder="Tell us what you need…" />}
          </Field>
        </div>
      </Section>

      <Section title="FilterPill">
        <div className="flex flex-wrap gap-3">
          {Object.entries(activeFilters).map(([key, pressed]) => (
            <FilterPill
              key={key}
              pressed={pressed}
              onPressedChange={(next) => setActiveFilters((prev) => ({ ...prev, [key]: next }))}
            >
              {key}
            </FilterPill>
          ))}
        </div>
      </Section>

      <Section title="Avatar">
        <div className="flex items-center gap-4">
          <Avatar name="Karma Dorji" size="sm" />
          <Avatar name="Pema Wangchuk" size="md" />
          <Avatar name="Sonam Choden" size="lg" />
          <Avatar name="Broken Image" src="/does-not-exist.jpg" size="md" />
        </div>
      </Section>

      <Section title="Skeleton">
        <div className="flex items-center gap-4">
          <Skeleton variant="circle" className="size-12" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="w-1/3" />
            <Skeleton variant="text" className="w-2/3" />
          </div>
        </div>
      </Section>
    </div>
  );
}
