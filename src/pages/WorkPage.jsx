import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { FilterPill, Button, Reveal } from '../components/ui/index.js';
import ProjectCard from '../components/work/ProjectCard.jsx';
import { CtaBand } from '../components/CtaBand.jsx';
import { Seo } from '../components/Seo.jsx';
import { workProjects, workCategories, workFormats } from '../content/work.js';

/** Projects revealed per page/batch, and the increment "Load more" adds. */
const PAGE_SIZE = 6;

/**
 * Route: `/work`
 *
 * Portfolio index — an interactive filtered/paginated grid over
 * `src/content/work.js` (the 7 brief projects, decorated with a derived
 * category + format). Two filter facets, both genuinely present in the
 * brief data:
 *
 * - **Category** — `brief.specializations`, mapped one-to-one onto each
 *   project (see `content/work.js` for how).
 * - **Format** — `project.hasCaseStudy`, read directly ("Case Study" vs
 *   "Project" — the 3 projects without full case-study treatment still get
 *   a portfolio entry, just without the Phase 06 narrative).
 *
 * Selecting pills within a facet is OR ("Networking" or "Security"); across
 * facets it's AND. Filtering re-flows the grid client-side — no reload/route
 * change. Only `PAGE_SIZE` matching projects render at a time, with a "Load
 * more" button revealing the rest — the brief only has 7 projects today, but
 * the grid never assumes "all of them fit on screen."
 */
export default function WorkPage() {
  const [activeCategories, setActiveCategories] = useState(() => new Set());
  const [activeFormats, setActiveFormats] = useState(() => new Set());
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredProjects = useMemo(() => {
    return workProjects.filter((project) => {
      const matchesCategory = activeCategories.size === 0 || activeCategories.has(project.category);
      const matchesFormat = activeFormats.size === 0 || activeFormats.has(project.format);
      return matchesCategory && matchesFormat;
    });
  }, [activeCategories, activeFormats]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;
  const hasActiveFilters = activeCategories.size > 0 || activeFormats.size > 0;

  // useCallback so these stay referentially stable across re-renders
  // (WorkPage's grid and filter pills are the "list-heavy component" this
  // hardening pass calls out for a re-render audit) — passing a fresh
  // function to every FilterPill on every render is exactly the kind of
  // avoidable render trigger `React.memo`-wrapped children like
  // `ProjectCard` (see `work/ProjectCard.jsx`) would otherwise defeat.
  /** @param {Set<string>} set @param {(next: Set<string>) => void} setSet @param {string} value @param {boolean} pressed */
  const toggleFilter = useCallback((set, setSet, value, pressed) => {
    const next = new Set(set);
    if (pressed) next.add(value);
    else next.delete(value);
    setSet(next);
    setVisibleCount(PAGE_SIZE);
  }, []);

  const clearFilters = useCallback(() => {
    setActiveCategories(new Set());
    setActiveFormats(new Set());
    setVisibleCount(PAGE_SIZE);
  }, []);

  return (
    <>
      <Seo
        title="Work | IT Products &amp; Electronics Solutions — Thimphu, Bhutan"
        description="Browse deployed IT infrastructure, networking, security, and smart office projects — filterable by category and case-study format."
        path="/work"
      />

      <section className="border-b border-border bg-surface py-section">
        <div className="mx-auto max-w-content px-6">
          <h1 className="font-display text-h1 text-fg">Our work</h1>
          <p className="mt-3 max-w-lg text-body-lg text-fg-muted">
            Real deployments across corporate, education, and enterprise clients in Bhutan — supplied,
            installed, and supported end to end.
          </p>
        </div>
      </section>

      <section className="py-section">
        <div className="mx-auto max-w-content px-6">
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-caption font-medium uppercase tracking-wide text-fg-muted">Category</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {workCategories.map((category) => (
                  <FilterPill
                    key={category}
                    pressed={activeCategories.has(category)}
                    onPressedChange={(pressed) =>
                      toggleFilter(activeCategories, setActiveCategories, category, pressed)
                    }
                  >
                    {category}
                  </FilterPill>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-caption font-medium uppercase tracking-wide text-fg-muted">Format</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {workFormats.map((format) => (
                  <FilterPill
                    key={format}
                    pressed={activeFormats.has(format)}
                    onPressedChange={(pressed) => toggleFilter(activeFormats, setActiveFormats, format, pressed)}
                  >
                    {format}
                  </FilterPill>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="self-start text-body-sm font-medium text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Clear filters
              </button>
            )}
          </div>

          <p className="mt-6 text-body-sm text-fg-muted" role="status" aria-live="polite">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </p>

          {filteredProjects.length === 0 ? (
            <div className="mt-6 rounded-lg border border-dashed border-border bg-surface-sunken px-6 py-16 text-center">
              <p className="text-body text-fg">No projects match these filters.</p>
              <p className="mt-1 text-body-sm text-fg-muted">Try a different combination, or clear all filters.</p>
              <Button intent="outline" size="sm" className="mt-5" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          ) : (
            <>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence initial={false}>
                  {visibleProjects.map((project) => (
                    <Reveal key={project.slug} as="div" layout>
                      <ProjectCard project={project} />
                    </Reveal>
                  ))}
                </AnimatePresence>
              </div>

              {hasMore && (
                <div className="mt-10 flex justify-center">
                  <Button intent="outline" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
                    Load more
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CtaBand
        heading="See something close to what you need?"
        secondaryTo="/services"
        secondaryLabel="Browse services"
      />
    </>
  );
}
