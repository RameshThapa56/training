# CLAUDE.md — Project Standing Instructions

This file is read automatically at the start of every session in this project. It applies to **every prompt in `prompts/`**, so individual prompts won't repeat these rules — follow them by default.

## What this project is

A multi-page, award-caliber portfolio/agency website, built in sequential phases (see `prompts/`). The site must work as both a design showcase and a lead-generation tool.

## Tech stack (non-negotiable unless the student's brief says otherwise)

- **React 19** — use its actual new primitives where they fit: `use()` for async/context reads, Actions + `useActionState` for the contact/lead form, `useOptimistic` for optimistic UI, ref-as-prop (no `forwardRef` needed), the `<title>`/`<meta>` hoisting in JSX for per-page SEO.
- **JavaScript** (ES2022+), not TypeScript. Use JSDoc comments (`@param`, `@type`) on non-trivial functions and component props for editor-level type hints without a build-time type checker, and use `prop-types` on any component whose props aren't obvious from usage.
- **Vite** as the build tool.
- **Tailwind CSS** for styling, driven by design tokens (see `skills/design-system/SKILL.md`) — no ad hoc magic numbers.
- **Motion** (the successor to Framer Motion) for animation.
- **React Router** (data router / loaders) for multi-page routing.
- Component architecture should be **enterprise-grade**: accessible, headless-first primitives with styled wrappers — built to the same bar as paid libraries (Radix, MUI, Ant, shadcn/ui), not a pile of one-off divs. See `skills/react19-component-architecture/SKILL.md` before writing any component.

## Before writing code in any phase

1. Read `docs/brief.md` — this holds the real content (profession, audience, services, projects, testimonials, CTAs). Never invent conflicting facts; use placeholder-but-labeled content only where the brief is silent, and say so.
2. Read the relevant file(s) in `skills/` for the phase (design system, motion, case-study structure, component architecture).
3. Read what already exists in the repo before adding new files — extend the established design tokens and component patterns rather than reinventing them per page.

## Quality bar every phase must hold to

- Mobile-first, fully responsive.
- WCAG 2.1 AA: semantic HTML, keyboard navigation, visible focus states, color contrast, alt text, reduced-motion support.
- Target Lighthouse 95+ on Performance, Accessibility, SEO, and Best Practices.
- No template-looking layouts, no generic SaaS-hero clichés, no animation without a purpose.
- Every page carries at least one genuine conversion opportunity.
- Motion must support usability and storytelling, never just decorate — and must respect `prefers-reduced-motion`.

## Working style

- Build incrementally. Don't build later-phase features (e.g., case study pages) while executing an earlier phase (e.g., design system) — flag if a prompt seems to need something not yet built, rather than silently building ahead.
- After each phase, briefly summarize what was created/changed and flag any assumptions made due to gaps in `docs/brief.md`.
- Keep components in `src/components/` (`.jsx` files), primitives in `src/components/ui/`, pages in `src/pages/`, design tokens in `src/styles/tokens.css` (or `tailwind.config.js` theme extension), content/data in `src/content/`.
