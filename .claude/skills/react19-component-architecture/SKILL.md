# Skill: React 19 Enterprise Component Architecture

Consult this before building or extending any component. The bar is "could this compete with a paid component library" — not "does this work."

## Structure

- `src/components/ui/` — headless-first, unstyled-logic primitives (Button, Dialog, Tabs, Slider, Tooltip, Accordion, Field). Each owns its own accessibility (focus trapping, ARIA roles, keyboard nav) and exposes variants via a `cva`-style class-variance function, not scattered conditional class strings.
- `src/components/` — composed, brand-styled components built from `ui/` primitives (ProjectCard, CaseStudyHero, TestimonialCarousel, FilterBar).
- `src/pages/` — route-level compositions only. No business logic or one-off styling lives here.

## React 19 patterns to actually use

- **No `forwardRef` boilerplate** — `ref` is a normal prop now on function components; drop the `forwardRef` wrapper.
- **`use()`** for reading context or resolving a promise conditionally (e.g., inside a filter panel that reads a context only when open).
- **Actions + `useActionState`** for every form (contact form, lead magnet signup, newsletter). Model submission as an Action, not an `onSubmit` handler with manual `useState` for loading/error.
- **`useOptimistic`** for things like "message sent" states or filter selections that should feel instant while a request resolves.
- **Document metadata in JSX** — render `<title>`, `<meta name="description">`, and OG tags directly inside page components; React 19 hoists them to `<head>`. Don't hand-roll a separate head-management library unless the brief requires SSR/SSG with a specific framework.
- **`<form>` with `action={fn}`** for progressive-enhancement-friendly forms.

## Component contract (every component in `ui/`)

1. Accepts `className` and merges it (don't let consumers fight your styles).
2. Fully keyboard operable; visible focus ring using the design token, never `outline: none` without a replacement.
3. Correct ARIA role/state, especially for custom widgets (tabs, accordions, filter pills, sliders, before/after comparison).
4. Respects `prefers-reduced-motion` for any built-in transition.
5. Exported with a documented prop contract — a `prop-types` definition and/or a JSDoc `@typedef` above the component so consumers see exactly what props exist, including that `children` is expected where relevant. No untyped, undocumented "magic" props.
6. Variants (size, tone, intent) expressed as a small, documented set of allowed string values (validated via `prop-types`' `oneOf`), not free-form, undocumented strings.

## Anti-patterns to avoid

- Inline styles for anything design-token-controlled (color, spacing, radius, shadow, type scale).
- Copy-pasting a component with small tweaks instead of adding a variant/prop.
- Divs with `onClick` standing in for buttons/links.
- Animation logic duplicated per component instead of pulled from the shared motion utilities (`skills/motion-system`).
- Page components that fetch data, hold form state, AND handle layout all in one file — split by concern.
