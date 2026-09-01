# Skill: Motion & Interaction System

Consult before adding any animation. Motion must justify itself with a usability or storytelling purpose — never decoration for its own sake.

## Principles

- **Purposeful** — every animation communicates state change, hierarchy, or narrative progression (e.g., a case study's "before" morphing to "after").
- **Fast and light** — UI transitions in the 150–300ms range; anything longer needs a storytelling reason (scroll-driven reveals can run longer since they're user-paced).
- **Consistent easing** — define 2–3 easing curves as shared constants (e.g., a standard ease-out for entrances, a spring for interactive feedback) and reuse them everywhere instead of picking per-component.
- **Respect `prefers-reduced-motion`** — every animation must have a reduced/no-motion fallback; build this into the shared motion utility, not per-component.
- **GPU-friendly only** — animate `transform` and `opacity`; avoid animating `width`/`height`/`top`/`left` or layout-triggering properties.

## Patterns to build once, reuse everywhere

- `useScrollReveal` / a shared `<Reveal>` wrapper — fade+slide-in on scroll intersection, used for section entrances.
- Shared hover-lift/hover-scale utility for cards and interactive tiles.
- Page transition wrapper for route changes (subtle cross-fade or slide, not jarring).
- Before/after slider component (draggable, keyboard-operable) for case studies.
- Skeleton/placeholder loading states for async content (project galleries, images) instead of blank flashes.

## Where motion earns its place

- Scroll-triggered narrative reveals in case studies (progressive disclosure of challenge → process → results).
- Filter transitions in the portfolio gallery (items should re-flow smoothly, not jump-cut).
- Micro-feedback on interactive elements (buttons, form fields, CTA hover).
- Hero entrance on first load — brief, not repeated on every scroll-back.

## Anti-patterns to avoid

- Animating everything on scroll indiscriminately ("parallax everything" syndrome).
- Animations that block interaction (user has to wait out a flourish before they can click).
- Inconsistent duration/easing between similar interactions across pages.
- Motion that ignores `prefers-reduced-motion`.
