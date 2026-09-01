import {
  Hero,
  FeaturedWork,
  ServicesOverview,
  ClientResults,
  SocialProof,
  FeaturedTestimonials,
  BrandStory,
  TrustIndicators,
  ConsultationCta,
  FinalCta,
} from '../components/home/index.js';
import { Reveal } from '../components/ui/index.js';
import { Seo, JsonLd, SITE_NAME, SITE_URL } from '../components/Seo.jsx';
import { brief } from '../content/brief.js';

// Organization structured data (schema.org) — the brief gives no founder
// name to attribute a Person schema to (see docs/brief.md's founder story,
// which is unnamed), so this covers the business itself only. Every field
// traces to `brief.business`, same sourcing discipline as the rest of the
// site's content.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  description: brief.business.valueProposition,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Thimphu',
    addressCountry: 'BT',
  },
  areaServed: 'BT',
  knowsAbout: brief.specializations,
};

/**
 * Route: `/`
 *
 * Full Home page — see the section components in `src/components/home/`
 * for the reasoning behind each one. Content is sourced from
 * `src/content/brief.js`/`docs/brief.md`; layout/tokens from Phase 03's
 * `ui/` primitive library. Section order matches docs/sitemap.md's
 * engagement funnel for Home.
 */
export default function HomePage() {
  return (
    <>
      <Seo
        title="Home | IT Products &amp; Electronics Solutions — Thimphu, Bhutan"
        description="Bhutan's technology partner for IT infrastructure that's supplied, installed, and supported end to end — networking, CCTV, servers, and smart office solutions for businesses, schools, and government."
        path="/"
      />
      <JsonLd data={organizationSchema} />

      {/* Each section reveals independently as it scrolls into view (see
          skills/motion-system/SKILL.md). Hero is already in the viewport on
          first paint, so it plays its entrance once on load rather than on
          scroll — same <Reveal> mechanism, no special-casing needed. */}
      <Reveal>
        <Hero />
      </Reveal>
      <Reveal>
        <FeaturedWork />
      </Reveal>
      <Reveal>
        <ServicesOverview />
      </Reveal>
      <Reveal>
        <ClientResults />
      </Reveal>
      <Reveal>
        <SocialProof />
      </Reveal>
      <Reveal>
        <FeaturedTestimonials />
      </Reveal>
      <Reveal>
        <BrandStory />
      </Reveal>
      <Reveal>
        <TrustIndicators />
      </Reveal>
      <Reveal>
        <ConsultationCta />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
    </>
  );
}
