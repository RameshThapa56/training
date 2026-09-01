# Sitemap & Engagement Structure

Companion to [`docs/strategy.md`](./strategy.md). Routes below match what's already scaffolded in [`src/router.jsx`](../src/router.jsx) (Phase 01) — this document does not add or rename routes, only defines the structure and content each one carries.

---

## 1. Complete Sitemap

```
/                     Home
/about                About
/services             Services
/work                 Work (portfolio index)
/work/:slug           Case Study (dynamic — one per featured project)
/testimonials         Testimonials
/insights             Insights
/contact              Contact
*                     404 / Not Found
```

Case-study slugs are driven by the brief's 4 full-treatment projects:
- `work/corporate-office-it-infrastructure`
- `work/smart-cctv-security-system`
- `work/enterprise-wifi-deployment`
- `work/server-storage-solution`

**Assumption:** exact slug strings aren't specified in the brief; the above follow the project names verbatim, kebab-cased. Confirm against `src/content/brief.js` when case-study data is built (later phase) rather than treating these as final.

The other 3 brief-listed projects (School Computer Lab Setup, Smart Office Project, Gaming & Creator Workstations) appear on the Work index as portfolio entries **without** a dedicated case-study page, since the brief explicitly scopes full case-study treatment to only 4 of the 7.

---

## 2. Navigation Structure

**Primary navigation** (persistent header, all pages):
```
Home · About · Services · Work · Testimonials · Insights · Contact
```
Plus a persistent **"Request a Quote"** button, styled distinctly from the nav links (the primary CTA per strategy.md, always reachable).

**Secondary navigation** (footer):
```
Company: About · Testimonials · Insights
Offering: Services · Work
Contact: Contact page link, phone, email, WhatsApp, address (Thimphu, Bhutan)
Trust strip: awards + certifications (compressed, badge/text form)
Social links (per brief's integration list)
```

**Assumption:** the brief lists "social media links" as a needed integration but names no specific platforms/handles. Footer should reserve the slot but use placeholder icons/links labeled as such until real handles are supplied.

---

## 3. User Journeys by Audience Segment

**Organizational buyer (business / government / education procurement)**
Lands on Home via search or referral, skim-reads the hero for a one-line understanding of scope, then scans the trust strip (years in operation, awards) before clicking through to Services to confirm the vendor covers their specific need (e.g., networking, CCTV, servers). From there they go to Work to find a case study resembling their own organization type (an IT Manager looking for corporate deployments, a school administrator looking for the Computer Lab project), read the matching testimonial for social proof, and land on Contact to submit a formal Request a Quote — treating the "Free IT Infrastructure Consultation" framing as the low-risk first step before a procurement conversation.

**Individual / small-business buyer**
Lands on Home or directly on Services (often via a specific product/search term), wants a fast plain-language answer to "can they get me X and set it up," briefly checks Testimonials or the trust strip for reassurance, and converts through the fastest available channel — WhatsApp or phone — rather than the formal quote form, since the brief marks these as equally preferred contact methods for this segment.

**Startup buyer**
Behaves like a hybrid of the two: price- and speed-sensitive like an individual buyer, but needs the credibility signals (case studies, certifications) an organizational buyer needs before recommending the vendor internally. Journey: Home → Services (to gauge scalability/tiering, since "Essential/Business/Enterprise" tiers map directly to a growing startup's needs) → Contact, converting via quote form once tier is roughly identified.

---

## 4. Engagement Funnel — What Each Page Must Do

| Page | Job in the funnel | Must move visitor toward |
|---|---|---|
| **Home** | Establish positioning + credibility fast; route to the right next page | Services (learn more) or Contact (ready now) — both visible above the fold |
| **About** | Convert skepticism into trust via founder story, credentials, awards | Contact (quote) or Services (what's on offer) |
| **Services** | Let the visitor self-identify their need against the offering/tiers | Work (proof it's been done) or Contact (ready to scope) |
| **Work** | Prove delivery capability across the visitor's likely vertical | Individual case study, then Contact |
| **Work/:slug** (case study) | Show the full lifecycle (supply → install → configure → support) on one real project | Contact — every case study ends with a quote CTA |
| **Testimonials** | Third-party validation, lower-guard content | Contact or back to Work for supporting case study |
| **Insights** | Authority/SEO, keep return visitors engaged | Soft CTA to Contact or Services; not the primary conversion page (see strategy.md assumption) |
| **Contact** | Convert — capture the lead | Form submission (Request a Quote) or a direct WhatsApp/phone/email action |

Principle: **every page below the fold ends with a CTA band** (quote or a page-appropriate secondary action) — no page is allowed to dead-end without a next step, per CLAUDE.md's "every page carries at least one genuine conversion opportunity."

---

## 5. Content Hierarchy Per Page (Above vs. Below the Fold)

### Home
- **Above fold:** Headline (sharpened UVP from strategy.md), one-line sub-copy, primary CTA (Request a Quote) + secondary CTA (Explore Services), compressed trust strip (years, 1-2 award badges)
- **Below fold:** Service category overview (linking to Services), 2-3 featured case studies, 1-2 featured testimonials, closing CTA band

### About
- **Above fold:** Founder story lead-in, brand personality conveyed via tone/visual, years of experience
- **Below fold:** Full founder story, certifications list, awards/recognition, mission/objective framing, CTA band

### Services
- **Above fold:** Service category navigation/overview (the 15 brief-listed services grouped logically — e.g., Hardware, Networking, Security, Infrastructure & Support), tier framing (Essential/Business/Enterprise) intro
- **Below fold:** Full service detail per category, pricing-tier comparison, specializations, CTA band

### Work
- **Above fold:** Portfolio intro line, filter/category context (by vertical: corporate, education, security, etc.)
- **Below fold:** Full project grid (all 7), with the 4 case-study projects visually distinguished (e.g., "Read the case study" vs. a static project card), CTA band

### Work/:slug (Case Study)
- **Above fold:** Project name, one-line outcome description (per brief), client type/context
- **Below fold:** Challenge → solution → delivery narrative, related testimonial (if one maps to this project type), CTA band

### Testimonials
- **Above fold:** Section intro, 1 featured testimonial
- **Below fold:** Remaining testimonials with name/role, each optionally linking to a related case study

### Insights
- **Above fold:** Page intro framing this as technology guidance/education content
- **Below fold:** Content listing (structure only — actual articles are out of scope for this phase; brief supplies no content here)
- **Assumption:** the brief provides no Insights content (articles, topics). This phase defines structure only; content is a gap to flag for a later phase.

### Contact
- **Above fold:** Request a Quote form (or a clear path to it), plus WhatsApp/phone/email as equally visible parallel options
- **Below fold:** Google Maps embed (per brief's integration list), business hours/location detail (Thimphu, Bhutan), FAQ or reassurance copy if needed

---

## Summary of Key Strategic Decisions

1. Sitemap matches the 8 routes already scaffolded in `src/router.jsx` exactly — no new routes introduced at this phase.
2. Only the brief's 4 designated projects get full case-study pages; the remaining 3 portfolio projects live on the Work index only.
3. Primary nav carries all 7 top-level pages plus a persistent Request-a-Quote button; footer nav groups by Company/Offering/Contact plus a trust strip.
4. Three audience journeys (organizational, individual, startup) converge on the same two endpoints — Services (evaluation) and Contact (conversion) — but differ in preferred contact channel (formal form vs. WhatsApp/phone).
5. Every page must end with a CTA band; no page is allowed to dead-end, per CLAUDE.md's conversion requirement.
6. Insights page is structurally defined but has no content in the brief — flagged as a gap for a later content phase, not fabricated here.
7. Case-study slugs are assumed/kebab-cased from project names pending confirmation against `src/content/brief.js` when that data is built.
