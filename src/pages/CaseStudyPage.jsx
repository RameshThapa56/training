import { Link, useParams } from 'react-router-dom';
import { workProjects, getNextProject } from '../content/work.js';
import { getCaseStudy } from '../content/caseStudies.js';
import { brief } from '../content/brief.js';
import { buttonStyles } from '../components/ui/Button.jsx';
import { Seo, JsonLd, SITE_NAME, SITE_URL } from '../components/Seo.jsx';
import {
  CaseStudyHero,
  ChallengeSection,
  StrategySection,
  ExecutionSection,
  ClientFeedbackSection,
  NextProjectSection,
} from '../components/case-study/index.js';

/**
 * Route: `/work/:slug`
 *
 * Composes the narrative structure from `skills/case-study-builder/SKILL.md`
 * out of the per-beat section components in `src/components/case-study/`,
 * pulling content from `src/content/caseStudies.js` (which is itself
 * layered on `src/content/brief.js`).
 *
 * Three outcomes for a given slug:
 *
 * 1. **Unknown slug** — no matching entry in `workProjects` at all. Shown a
 *    lightweight not-found state rather than the app-wide 404 page, since
 *    the visitor is still clearly "in" the work section.
 * 2. **`hasCaseStudy: false`** (school-computer-lab-setup, smart-office-project,
 *    gaming-creator-workstations) — `ProjectCard` links here for every
 *    project regardless of format, so these still need a page. Per
 *    `src/content/work.js`'s own note ("still get a portfolio entry, just
 *    without the Phase 06 narrative"), this renders only the Overview beat
 *    plus the Strategy beat (the company's real, general approach — not a
 *    fabricated case study) and the Next Project hook, never
 *    Challenge/Execution/Results copy the brief doesn't support.
 * 3. **`hasCaseStudy: true`** — the full beat set, minus whichever beats
 *    that project's `caseStudies.js` entry omits (see that file's header
 *    comment for exactly which beats are missing per project, and why).
 *    Research and Process never render today — no discovery or
 *    decision/iteration detail exists in the brief for any project.
 */
export default function CaseStudyPage() {
  const { slug } = useParams();
  const project = workProjects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <>
        <Seo
          title="Project Not Found | Bhutan IT Solutions"
          description="This project may have been renamed or moved. Browse the full portfolio instead."
          path="/work"
          noindex
        />
        <section className="py-section">
          <div className="mx-auto max-w-content px-6 text-center">
            <h1 className="font-display text-h1 text-fg">We couldn&rsquo;t find that project</h1>
            <p className="mx-auto mt-3 max-w-md text-body-lg text-fg-muted">
              It may have been renamed or moved. Browse the full portfolio instead.
            </p>
            <Link to="/work" className={buttonStyles({ intent: 'primary', size: 'lg', className: 'mt-8' })}>
              Back to all work
            </Link>
          </div>
        </section>
      </>
    );
  }

  const nextProject = getNextProject(project.slug);
  const caseStudy = project.hasCaseStudy ? getCaseStudy(project.slug) : undefined;

  // CreativeWork structured data — only for projects with real case-study
  // narrative content (`hasCaseStudy: true`); the 3 portfolio-only entries
  // have nothing beyond the one-line brief description already covered by
  // the page's own <meta name="description">, so marking those up as a
  // "work" would overstate what's actually on the page.
  const creativeWorkSchema = caseStudy
    ? {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.name,
        description: project.description,
        about: project.category,
        url: `${SITE_URL}/work/${project.slug}`,
        author: { '@type': 'Organization', name: SITE_NAME },
      }
    : undefined;

  return (
    <>
      <Seo
        title={`${project.name} | Case Study — Bhutan IT Solutions`}
        description={project.description}
        path={`/work/${project.slug}`}
        type="article"
      />
      {creativeWorkSchema && <JsonLd data={creativeWorkSchema} />}

      <CaseStudyHero
        name={project.name}
        description={project.description}
        category={project.category}
        Icon={project.Icon}
        format={project.format}
      />

      {caseStudy ? (
        <>
          <ChallengeSection challenge={caseStudy.challenge} />
          <StrategySection strategy={caseStudy.strategy} />
          <ExecutionSection
            intro={caseStudy.execution.intro}
            deliverables={caseStudy.execution.deliverables}
            beforeAfter={caseStudy.beforeAfter}
          />
          {caseStudy.clientFeedback && (
            <ClientFeedbackSection
              name={caseStudy.clientFeedback.name}
              role={caseStudy.clientFeedback.role}
              quote={caseStudy.clientFeedback.quote}
            />
          )}
        </>
      ) : (
        // hasCaseStudy: false — brief only gives us the one-line description
        // already shown in the hero, so the only other genuinely-sourced
        // beat is the company's general strategy/differentiator.
        <StrategySection strategy={brief.brand.differentiator} />
      )}

      <NextProjectSection project={nextProject} />
    </>
  );
}
