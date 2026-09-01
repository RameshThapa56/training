import { Link } from 'react-router-dom';
import { Card } from '../ui/Card.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { LaptopIcon, NetworkIcon, ShieldIcon, BoltIcon, PrinterIcon, WrenchIcon, ArrowRightIcon } from './HomeIcons.jsx';

// The brief lists 15 individual services (src/content/brief.js `services`)
// — too granular for a scannable homepage grid. Grouped here into 6
// categories that together cover all 15 verbatim brief items; the full,
// ungrouped list belongs on the Services page (docs/sitemap.md). This
// grouping is a homepage-presentation choice, not a brief-given taxonomy.
const SERVICE_CATEGORIES = [
  {
    key: 'computers',
    Icon: LaptopIcon,
    title: 'Computers & Workstations',
    description: 'Laptops, desktops, and workstations, plus the accessories and peripherals to run them.',
  },
  {
    key: 'networking',
    Icon: NetworkIcon,
    title: 'Networking & Wi-Fi',
    description: 'Networking equipment, installation, and Wi-Fi infrastructure built for full coverage.',
  },
  {
    key: 'security',
    Icon: ShieldIcon,
    title: 'Security & Surveillance',
    description: 'CCTV and security systems with centralized monitoring and remote access.',
  },
  {
    key: 'smart',
    Icon: BoltIcon,
    title: 'Smart Devices & Power',
    description: 'Smart home and IoT devices, plus UPS and power backup solutions.',
  },
  {
    key: 'printing',
    Icon: PrinterIcon,
    title: 'Printing & Storage',
    description: 'Printers, printing solutions, and data storage and backup systems.',
  },
  {
    key: 'infrastructure',
    Icon: WrenchIcon,
    title: 'Infrastructure & Support',
    description: 'Servers, software, equipment supply, installation, and ongoing technical support.',
  },
];

/**
 * Services Overview — the brief's 15 services grouped into 6 scannable
 * categories, each conceptually pointing at the (not-yet-built) Services
 * page per docs/sitemap.md's engagement funnel ("Services: let the
 * visitor self-identify their need against the offering").
 */
export default function ServicesOverview() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-border bg-surface-sunken py-section">
      <div className="mx-auto max-w-content px-6">
        <div className="max-w-lg">
          <h2 className="font-display text-h2 text-fg">{t('servicesOverview.heading', 'What we do')}</h2>
          <p className="mt-2 text-body text-fg-muted">
            {t(
              'servicesOverview.desc',
              'From individual products to full infrastructure — every category below is supplied, installed, and supported by the same team.',
            )}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map(({ key, Icon, title, description }) => (
            <Link key={key} to="/services" className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
              <Card interactive className="h-full">
                <Icon className="size-7 text-brand-600" />
                <h3 className="mt-4 font-display text-h4 text-fg">
                  {t(`serviceCategory.${key}.title`, title)}
                </h3>
                <p className="mt-2 text-body-sm text-fg-muted">
                  {t(`serviceCategory.${key}.description`, description)}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-600 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                  {t('common.exploreServices', 'Explore services')}
                  <ArrowRightIcon className="size-4" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
