/**
 * Work/portfolio index page metadata layered on top of `src/content/brief.js`.
 *
 * NOTE ON SOURCE: `brief.projects` has no per-project category field to
 * filter by — the only categorical brief data that fits is `brief.specializations`
 * (7 entries) and each project's `hasCaseStudy` flag. `WORK_META` below maps
 * each of the 7 projects to exactly one of the 7 specializations (by reading
 * each project's own brief description against the specializations list —
 * the same kind of hand-mapping `FeaturedWork.jsx` already does for its
 * 3 featured cards' icon/label). Nothing here invents new facts; it just
 * labels which existing brief category each project belongs to, and reuses
 * `home/HomeIcons.jsx` (no per-page icon set) for the placeholder visual.
 *
 * `format` is a direct, un-derived read of `hasCaseStudy` — "Case Study" for
 * projects with full narrative treatment (Phase 06), "Project" for the rest.
 *
 * @typedef {object} WorkMeta
 * @property {string} category - One of `brief.specializations`.
 * @property {React.ComponentType<{ className?: string }>} Icon
 * @property {'Case Study'|'Project'} format
 */

import { brief } from './brief.js';
import {
  LaptopIcon,
  ShieldIcon,
  NetworkIcon,
  WrenchIcon,
  BoltIcon,
  PrinterIcon,
  CertificateIcon,
} from '../components/home/HomeIcons.jsx';

/** @type {Record<string, WorkMeta>} */
const WORK_META = {
  'corporate-office-it-infrastructure': {
    category: 'Business IT infrastructure',
    Icon: LaptopIcon,
  },
  'smart-cctv-security-system': {
    category: 'CCTV and security systems',
    Icon: ShieldIcon,
  },
  'enterprise-wifi-deployment': {
    category: 'Networking and Wi-Fi',
    Icon: NetworkIcon,
  },
  'school-computer-lab-setup': {
    category: 'IT procurement and deployment',
    Icon: PrinterIcon,
  },
  'server-storage-solution': {
    category: 'Server and storage solutions',
    Icon: CertificateIcon,
  },
  'smart-office-project': {
    category: 'Smart electronics and IoT',
    Icon: BoltIcon,
  },
  'gaming-creator-workstations': {
    category: 'Computer and workstation solutions',
    Icon: WrenchIcon,
  },
};

/**
 * Every brief project, decorated with its derived `category`/`Icon` and a
 * `format` read straight from `hasCaseStudy`. Falls back gracefully (neutral
 * icon, "General" category) if a future brief project is added without a
 * `WORK_META` entry, rather than throwing.
 *
 * @type {Array<import('./brief.js').Project & { category: string, Icon: React.ComponentType, format: 'Case Study'|'Project' }>}
 */
export const workProjects = brief.projects.map((project) => {
  const meta = WORK_META[project.slug] ?? { category: 'General', Icon: LaptopIcon };
  return {
    ...project,
    category: meta.category,
    Icon: meta.Icon,
    format: project.hasCaseStudy ? 'Case Study' : 'Project',
  };
});

/** Distinct categories present across `workProjects`, in brief.specializations order. */
export const workCategories = brief.specializations.filter((specialization) =>
  workProjects.some((project) => project.category === specialization),
);

/** Distinct formats present across `workProjects` ("Case Study" before "Project"). */
export const workFormats = ['Case Study', 'Project'].filter((format) =>
  workProjects.some((project) => project.format === format),
);

/**
 * The next project after `slug` in `workProjects` order, wrapping around —
 * backs the case-study page's "next project" discovery hook
 * (`skills/case-study-builder/SKILL.md`'s final beat). Falls back to the
 * first project if `slug` isn't found, so the link never dead-ends.
 *
 * @param {string} slug
 * @returns {typeof workProjects[number]}
 */
export function getNextProject(slug) {
  const index = workProjects.findIndex((project) => project.slug === slug);
  const nextIndex = index === -1 ? 0 : (index + 1) % workProjects.length;
  return workProjects[nextIndex];
}

export default workProjects;
