/**
 * Insights/blog post content.
 *
 * NOTE ON SOURCE: `docs/brief.md` supplies no blog/content topics, titles,
 * or article bodies at all (flagged in `docs/sitemap.md`'s Insights
 * section as a content gap). The 2 posts below are placeholder scaffolding
 * only — titles/topics chosen to plausibly fit the brief's own
 * specializations (so the page doesn't look empty), but every word of body
 * copy is generic placeholder text, not sourced from the brief. Each post
 * carries `isPlaceholder: true` so the UI can visibly flag it, and this
 * file needs real editorial content before launch.
 *
 * @typedef {object} InsightPost
 * @property {string} slug
 * @property {string} title
 * @property {string} excerpt
 * @property {string} category - One of `brief.specializations`.
 * @property {string} publishedLabel - Placeholder date label, not a real publish date.
 * @property {string} readTime
 * @property {string[]} body - Paragraphs.
 * @property {boolean} isPlaceholder
 */

/** @type {InsightPost[]} */
export const insightPosts = [
  {
    slug: 'choosing-the-right-cctv-system-for-your-business',
    title: 'Choosing the Right CCTV System for Your Business',
    excerpt:
      'What to weigh before installing a commercial security system — coverage, storage, and remote access.',
    category: 'CCTV and security systems',
    publishedLabel: 'Coming soon',
    readTime: '5 min read',
    isPlaceholder: true,
    body: [
      'PLACEHOLDER ARTICLE — this post is scaffolding only. Real editorial content, written by the team, needs to replace this text before launch.',
      'A typical article here would walk through IP vs. analog CCTV, how much storage a commercial property actually needs, and what "centralized remote access" looks like day to day for a business owner.',
      'It would close with a practical checklist a reader could use before requesting a quote — camera count, coverage zones, retention period — tying back to the CCTV and Security Systems service.',
    ],
  },
  {
    slug: 'planning-reliable-wifi-coverage-for-a-multi-floor-office',
    title: 'Planning Reliable Wi-Fi Coverage for a Multi-Floor Office',
    excerpt: 'Why "just add more routers" doesn\'t solve dead zones — and what actually does.',
    category: 'Networking and Wi-Fi',
    publishedLabel: 'Coming soon',
    readTime: '4 min read',
    isPlaceholder: true,
    body: [
      'PLACEHOLDER ARTICLE — this post is scaffolding only. Real editorial content, written by the team, needs to replace this text before launch.',
      'A typical article here would explain access-point placement, floor-to-floor interference, and how a site survey informs a Wi-Fi deployment plan before any hardware goes in.',
      'It would close by connecting the topic back to the Enterprise Wi-Fi Deployment case study as a real example of the process in practice.',
    ],
  },
];

/** @param {string} slug @returns {InsightPost | undefined} */
export function getInsightPost(slug) {
  return insightPosts.find((post) => post.slug === slug);
}

export default insightPosts;
