# Portfolio

React 19 + JavaScript (Vite) portfolio/agency site. See [claude.md](./claude.md) for the
project's standing instructions, `docs/BRIEF-TEMPLATE.md` for the client brief, and `skills/`
for per-phase build guidance.

## Stack

- React 19, plain JavaScript (JSDoc for type hints, `prop-types` for component contracts)
- Vite
- React Router (data router)
- Tailwind CSS
- Motion (successor to Framer Motion)

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
npm run lint      # ESLint
npm run format    # Prettier (write)
```

## Structure

```
src/
  components/ui/   headless-first primitives (Button, Dialog, Tabs, ...)
  components/      composed, brand-styled components built from ui/
  pages/           route-level compositions only
  content/         structured content pulled from the brief
  styles/          design tokens (tokens.css)
```
