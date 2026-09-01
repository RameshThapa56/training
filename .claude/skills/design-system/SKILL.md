# Skill: Visual Design System

Consult before touching colors, type, spacing, or layout. Benchmark: Apple, Stripe, Linear, Airbnb, Notion, Framer Showcase — not generic SaaS templates.

## Tokens (define once, in `tailwind.config.js` theme extension + `src/styles/tokens.css`)

- **Color** — a restrained palette: 1 primary brand color, 1 accent, a neutral gray scale (9–10 steps), semantic tokens for success/warning/error, and explicit light/dark values if dark mode is in scope. No raw hex codes inside components — reference tokens only.
- **Typography** — a deliberate type scale (e.g., a modular scale, not arbitrary px jumps), one display typeface for headlines + one workhorse typeface for body (or a single well-chosen variable font doing both jobs). Define scale steps as tokens: `text-display`, `text-h1`...`text-h4`, `text-body`, `text-caption`.
- **Spacing** — a consistent scale (4px or 8px base unit), never arbitrary values in components.
- **Radius/shadow/elevation** — a small, deliberate set (e.g., 3 radius sizes, 3 elevation levels), reused everywhere.
- **Grid** — a 12-column responsive grid with defined breakpoints; content max-widths defined as tokens, not repeated per page.

## Layout philosophy

- Generous whitespace over dense information — let content breathe; this is what separates "premium" from "template."
- Strong visual hierarchy: one clear focal point per section, not competing headlines/CTAs.
- Asymmetry and intentional grid-breaking in hero/featured sections is encouraged — rigid centered-everything layouts read as generic.
- Consistent vertical rhythm between sections (a defined section-padding token used everywhere).

## Component system rules

- Every visual pattern used more than once becomes a token or a component — never a copy-pasted style.
- Dark-on-light and light-on-dark text must both meet WCAG AA contrast; verify, don't eyeball.
- Imagery/case-study visuals get consistent treatment (aspect ratios, corner radius, hover state) across the whole site.

## Anti-patterns to avoid

- Centered-hero-with-gradient-blob SaaS cliché.
- More than 2 typefaces.
- Ad hoc one-off colors "just for this section."
- Shadows/gradients applied decoratively without a hierarchy purpose.
