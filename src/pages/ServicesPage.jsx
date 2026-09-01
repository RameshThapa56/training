import { Link } from 'react-router-dom';
import { Badge, Card } from '../components/ui/index.js';
import { CheckCircleIcon, ArrowRightIcon, LaptopIcon, NetworkIcon, ShieldIcon, BoltIcon, WrenchIcon, CertificateIcon } from '../components/home/HomeIcons.jsx';
import { CtaBand } from '../components/CtaBand.jsx';
import { Seo } from '../components/Seo.jsx';
import { workProjects } from '../content/work.js';
import { brief } from '../content/brief.js';

/**
 * The brief's 15 services (`brief.services`, verbatim names) grouped onto
 * its 7 specializations (`brief.specializations`) — the only categorical
 * axis the brief actually provides that all 15 services cleanly fit onto.
 * This grouping/assignment is a presentation choice (the brief doesn't
 * pre-group its service list), same kind of hand-mapping
 * `home/ServicesOverview.jsx` and `content/work.js` already do.
 *
 * @type {Array<{ specialization: string, Icon: React.ComponentType, serviceNames: string[] }>}
 */
const SERVICE_GROUPS = [
  {
    specialization: 'Computer and workstation solutions',
    Icon: LaptopIcon,
    serviceNames: [
      'Computers, laptops, and workstations',
      'Computer accessories and peripherals',
      'Printers and printing solutions',
    ],
  },
  {
    specialization: 'Networking and Wi-Fi',
    Icon: NetworkIcon,
    serviceNames: ['Networking equipment and installation', 'Wi-Fi and network infrastructure'],
  },
  {
    specialization: 'CCTV and security systems',
    Icon: ShieldIcon,
    serviceNames: ['CCTV and security systems'],
  },
  {
    specialization: 'Smart electronics and IoT',
    Icon: BoltIcon,
    serviceNames: ['Smart home and IoT devices'],
  },
  {
    specialization: 'Server and storage solutions',
    Icon: CertificateIcon,
    serviceNames: ['Desktop and server solutions', 'Data storage and backup solutions'],
  },
  {
    specialization: 'Business IT infrastructure',
    Icon: WrenchIcon,
    serviceNames: [
      'UPS and power backup solutions',
      'Software and IT infrastructure',
      'Customized IT infrastructure solutions',
    ],
  },
  {
    specialization: 'IT procurement and deployment',
    Icon: LaptopIcon,
    serviceNames: [
      'IT equipment supply for organizations',
      'Hardware installation and configuration',
      'IT maintenance and technical support',
    ],
  },
];

/** For a given specialization, the best portfolio link — a case-study project if one exists, else the Work index. */
function workLinkFor(specialization) {
  const match = workProjects.find((project) => project.category === specialization);
  if (!match) return { to: '/work', label: 'See related work' };
  return match.hasCaseStudy
    ? { to: `/work/${match.slug}`, label: `See it in action: ${match.name}` }
    : { to: '/work', label: 'See related work' };
}

/**
 * Route: `/services`
 *
 * Full service catalog — every brief service, grouped onto the 7 brief
 * specializations, each group linking through to matching portfolio proof
 * per docs/sitemap.md ("each service linking conceptually to relevant
 * portfolio work"). Followed by the 3 pricing tiers verbatim from the
 * brief and a closing CTA band.
 */
export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Services | Bhutan IT Solutions"
        description="IT products, networking, security, smart devices, and infrastructure services — supplied, installed, and supported for businesses, schools, and individuals in Bhutan."
        path="/services"
      />

      {/* Above the fold: category overview + tier framing intro */}
      <section className="border-b border-border bg-surface py-section">
        <div className="mx-auto max-w-content px-6">
          <div className="max-w-narrow">
            <p className="text-caption font-medium uppercase tracking-wide text-brand-600">Services</p>
            <h1 className="mt-2 font-display text-h1 text-fg">
              Everything it takes to get your technology running — and keep it running.
            </h1>
            <p className="mt-5 text-body-lg text-fg-muted">{brief.brand.differentiator}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {SERVICE_GROUPS.map(({ specialization }) => (
              <a
                key={specialization}
                href={`#${specialization.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="rounded-full border border-border bg-surface-elevated px-3.5 py-1.5 text-body-sm font-medium text-fg-muted transition-colors duration-200 ease-out hover:border-brand-500 hover:text-brand-600 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                {specialization}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Full service detail, one section per specialization */}
      <section className="py-section">
        <div className="mx-auto max-w-content divide-y divide-border px-6">
          {SERVICE_GROUPS.map(({ specialization, Icon, serviceNames }) => {
            const link = workLinkFor(specialization);
            return (
              <div
                key={specialization}
                id={specialization.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                className="grid gap-6 py-10 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-8"
              >
                <div className="lg:col-span-4">
                  <Icon className="size-7 text-brand-600" aria-hidden="true" />
                  <h2 className="mt-3 font-display text-h3 text-fg">{specialization}</h2>
                  <Link
                    to={link.to}
                    className="mt-3 inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-600 hover:text-brand-700"
                  >
                    {link.label}
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </div>
                <ul className="lg:col-span-8">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {serviceNames.map((name) => (
                      <li key={name} className="flex items-start gap-2.5">
                        <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-success-500" aria-hidden="true" />
                        <span className="text-body text-fg">{name}</span>
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="border-t border-border bg-surface-sunken py-section">
        <div className="mx-auto max-w-content px-6">
          <div className="max-w-lg">
            <h2 className="font-display text-h2 text-fg">Choose the level of support you need</h2>
            <p className="mt-2 text-body text-fg-muted">
              Every tier is supplied, installed, and supported by the same team — the scope grows with
              your organization.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {brief.pricingTiers.map((tier, index) => (
              <Card
                key={tier.name}
                elevation={index === 1 ? 'floating' : 'raised'}
                className={index === 1 ? 'border-brand-500 ring-1 ring-brand-500' : undefined}
              >
                {index === 1 && (
                  <Badge tone="brand" className="mb-3">
                    Most common
                  </Badge>
                )}
                <h3 className="font-display text-h4 text-fg">{tier.name}</h3>
                <p className="mt-2 text-body text-fg-muted">{tier.description}</p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-600 hover:text-brand-700"
                >
                  Request a quote
                  <ArrowRightIcon className="size-4" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations, compact */}
      <section className="border-t border-border py-section-sm">
        <div className="mx-auto max-w-content px-6">
          <p className="text-caption font-medium uppercase tracking-wide text-fg-muted">Our specializations</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {brief.specializations.map((specialization) => (
              <Badge key={specialization} tone="neutral">
                {specialization}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Not sure which tier fits?" secondaryTo="/work" secondaryLabel="See our work" />
    </>
  );
}
