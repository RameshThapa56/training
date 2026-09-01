/**
 * Per-project case-study narrative content — layered on top of
 * `src/content/brief.js` / `src/content/work.js`, for the 4 projects with
 * `hasCaseStudy: true` (`corporate-office-it-infrastructure`,
 * `smart-cctv-security-system`, `enterprise-wifi-deployment`,
 * `server-storage-solution`).
 *
 * NOTE ON SOURCE / CONTENT RULES (per `skills/case-study-builder/SKILL.md`):
 * `docs/brief.md` gives each project only a name + one-line description —
 * no separate Challenge/Research/Strategy/Process/Results copy, no
 * per-project imagery, and no testimonial explicitly tied to a specific
 * project. Rather than invent client names, metrics, or quotes, every field
 * below is either:
 *
 *   1. A direct read of an existing brief field (`strategy` reuses
 *      `brief.brand.differentiator` verbatim — the company's real,
 *      general approach, not project-specific invention), or
 *   2. A restrained restatement of that project's own brief `description`
 *      (`challenge` names the pain the description's own wording implies —
 *      e.g. "growing office" implies outgrowing ad hoc equipment — and adds
 *      no new facts, names, or numbers), or
 *   3. A cross-reference back into `brief.services` (`execution.deliverables`
 *      picks the exact service names the description's own wording maps to).
 *
 * Beats this data genuinely can't support are omitted entirely per the
 * skill's content rule, rather than filled with generic filler:
 *
 *   - **Research/Discovery**: no discovery-phase detail exists for any
 *     project — omitted for all 4.
 *   - **Process**: no decision/iteration detail exists for any project —
 *     omitted for all 4.
 *   - **Results**: no metrics exist for any project, and only one project
 *     has a client-reported qualitative outcome (see below) — omitted
 *     elsewhere rather than restated as a duplicate of Client Feedback.
 *   - **Client feedback**: of the 3 brief testimonials, only Karma Dorji's
 *     ("delivered our complete office infrastructure on time") reads as
 *     tied to one specific engagement — `corporate-office-it-infrastructure`.
 *     Pema Wangchuk's quote spans multiple categories (computers,
 *     networking, CCTV, accessories) and isn't scoped to a single project,
 *     so it's used on the Testimonials page, not force-matched here. Sonam
 *     Choden's quote is about the school computer lab, which has
 *     `hasCaseStudy: false`. So 3 of 4 case studies have no Client Feedback
 *     beat.
 *
 * `beforeAfter` is populated only where the project physically transforms a
 * space in a way a viewer could plausibly compare (an office floor, a server
 * room) — enterprise-wifi-deployment and smart-cctv-security-system are
 * left without one, since Wi-Fi coverage and camera footage aren't the kind
 * of thing a before/after slider can honestly represent without a real
 * photo or survey to show. Per CLAUDE.md's "placeholder-but-labeled content
 * where the brief is silent" allowance, the two sliders that do exist use
 * clearly-labeled gradient placeholders — no real project photography
 * exists in the brief — swap `beforeImage`/`afterImage` for real photo URLs
 * when available.
 *
 * @typedef {object} BeforeAfterSide
 * @property {string} label - e.g. "Before"
 * @property {string} caption - Short, non-fabricated description of the state.
 * @property {string} [image] - Photo URL, once real photography exists.
 *
 * @typedef {object} CaseStudyContent
 * @property {string} challenge
 * @property {string} strategy
 * @property {{ intro: string, deliverables: string[] }} execution
 * @property {{ name: string, role: string, quote: string }} [clientFeedback]
 * @property {{ before: BeforeAfterSide, after: BeforeAfterSide }} [beforeAfter]
 */

import { brief } from './brief.js';

const karmaDorji = brief.testimonials.find((t) => t.name === 'Karma Dorji');

/** @type {Record<string, CaseStudyContent>} */
export const caseStudies = {
  'corporate-office-it-infrastructure': {
    challenge:
      'A growing corporate office needed computers, networking, Wi-Fi, and printing infrastructure that could keep pace with an expanding team — without the reliability gaps that come from sourcing equipment piecemeal from multiple vendors.',
    strategy: brief.brand.differentiator,
    execution: {
      intro:
        'Rather than treating each category as a separate purchase, the office was equipped as one connected system — supplied, installed, and configured together.',
      deliverables: [
        'Computers, laptops, and workstations',
        'Networking equipment and installation',
        'Wi-Fi and network infrastructure',
        'Printers and printing solutions',
      ],
    },
    clientFeedback: karmaDorji,
    beforeAfter: {
      before: {
        label: 'Before',
        caption: 'Equipment sourced ad hoc, department by department, with no shared network plan.',
      },
      after: {
        label: 'After',
        caption: 'One connected system — workstations, Wi-Fi, and printing installed and configured together.',
      },
    },
  },

  'smart-cctv-security-system': {
    challenge:
      'A commercial property had no centralized way to monitor its premises — camera coverage, if any, was disconnected from a single view, and there was no way to check in on the property while off-site.',
    strategy: brief.brand.differentiator,
    execution: {
      intro:
        'An IP-based camera system was installed and tied into one monitoring setup, with remote access configured for off-site viewing.',
      deliverables: ['CCTV and security systems', 'Networking equipment and installation'],
    },
  },

  'enterprise-wifi-deployment': {
    challenge:
      'A multi-floor office environment needed consistent, high-speed Wi-Fi across every floor — the kind of coverage that a single access point can’t reliably provide once a building has more than one level.',
    strategy: brief.brand.differentiator,
    execution: {
      intro:
        'Coverage was planned and deployed floor by floor as one network, rather than treating each floor as its own isolated setup.',
      deliverables: ['Wi-Fi and network infrastructure', 'Networking equipment and installation'],
    },
  },

  'server-storage-solution': {
    challenge:
      'A business was managing its data without a centralized server or backup plan — meaning no single, reliable place to store, protect, or recover business data.',
    strategy: brief.brand.differentiator,
    execution: {
      intro:
        'A centralized server and storage solution was implemented with backup and data management built in from the start, rather than added on afterward.',
      deliverables: [
        'Desktop and server solutions',
        'Data storage and backup solutions',
        'Software and IT infrastructure',
      ],
    },
    beforeAfter: {
      before: {
        label: 'Before',
        caption: 'Data spread across individual machines, with no centralized backup or recovery plan.',
      },
      after: {
        label: 'After',
        caption: 'A centralized server and storage solution with backup and data management built in.',
      },
    },
  },
};

/**
 * @param {string} slug
 * @returns {CaseStudyContent | undefined}
 */
export function getCaseStudy(slug) {
  return caseStudies[slug];
}

export default caseStudies;
