import PropTypes from 'prop-types';

/**
 * Per-page SEO head tags + structured data, built on React 19's JSX head
 * hoisting (any `<title>`/`<meta>`/`<link>` rendered anywhere in the tree is
 * hoisted into `<head>` automatically — no `react-helmet`-style library
 * needed). Every page already rendered its own `<title>`/`<meta
 * name="description">` inline (Phase 04-07); this centralizes that pattern
 * and extends it with canonical URLs, Open Graph, and Twitter Card tags so
 * that duplication doesn't grow 3x across every page for this hardening
 * pass. Pages keep passing their own real title/description copy — this
 * component only owns the boilerplate that's identical everywhere.
 *
 * PLACEHOLDER — `docs/brief.md` gives no production domain, so `SITE_URL`
 * stands in the same way `NavBar`'s `BRAND_NAME` and `ContactPage`'s
 * `CONTACT_CHANNELS` do. Replace with the real deployed domain before
 * launch; canonical/OG/Twitter URLs below are wrong until it is.
 *
 * PLACEHOLDER — `DEFAULT_OG_IMAGE` points at the existing favicon SVG
 * (the only brand image asset in the repo) purely so the `og:image`/
 * `twitter:image` tags aren't broken links. Social platforms expect a
 * ~1200x630 raster (PNG/JPG) preview image, which doesn't exist yet — see
 * the phase summary's "remaining known gap" list.
 */
export const SITE_NAME = 'Bhutan IT Solutions';
export const SITE_URL = 'https://www.bhutanitsolutions.example';
const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon.svg`;

/**
 * @typedef {object} SeoProps
 * @property {string} title - Full page `<title>` (page pages already include the "| Bhutan IT Solutions" suffix themselves).
 * @property {string} description
 * @property {string} [path] - Route path (e.g. '/services') used to build the canonical/OG URL. Default '/'.
 * @property {string} [image] - Absolute OG/Twitter image URL. Defaults to the placeholder logo asset.
 * @property {'website'|'article'} [type] - og:type. Default 'website'.
 * @property {boolean} [noindex] - Renders `<meta name="robots" content="noindex">` for pages that
 *   shouldn't be indexed (not-found states, unpublished insight posts, the dev style guide).
 */

/** @param {SeoProps} props */
export function Seo({ title, description, path = '/', image = DEFAULT_OG_IMAGE, type = 'website', noindex = false }) {
  const url = `${SITE_URL}${path}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.oneOf(['website', 'article']),
  noindex: PropTypes.bool,
};

/**
 * Renders a JSON-LD `<script>` block for structured data (schema.org).
 * Escapes `<` inside the serialized JSON so a value containing `</script>`
 * can never prematurely close the tag — the standard mitigation for
 * embedding JSON inside an HTML `<script>` element.
 *
 * @param {{ data: Record<string, unknown> }} props
 */
export function JsonLd({ data }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

JsonLd.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Seo;
