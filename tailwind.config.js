/**
 * Tailwind theme extension — Phase 03 design system tokens.
 *
 * Palette rationale (see the phase summary for the full paragraph): a
 * confident blue "brand" scale carries trust/professionalism, a cyan-teal
 * "accent" scale carries the "innovative / smart electronics" energy and is
 * reserved for CTAs and highlight moments, and a cool slate "neutral" scale
 * carries the modern dark/light contrast called for in docs/strategy.md.
 * Display face is Plus Jakarta Sans (headlines) paired with Inter (body) —
 * both clean, low-personality geometric sans faces for an Apple/enterprise-
 * SaaS-adjacent feel, swapped in from the original Space Grotesk pairing
 * per direct design feedback.
 *
 * Semantic surface/text/border colors (`surface`, `fg`, `border`, `ring`)
 * resolve through CSS custom properties defined in `src/styles/tokens.css`
 * so the same utility class (e.g. `bg-surface`) adapts between light and
 * dark mode — components never hand-roll a `dark:` pair for chrome colors.
 *
 * Do not add ad hoc values directly in components — every color, spacing,
 * radius, or shadow used in more than one place belongs here as a token.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Not a default ARIA variant — added so `aria-invalid:` can style
      // Input/Textarea validation state directly off the attribute Field sets.
      aria: {
        invalid: 'invalid="true"',
      },

      colors: {
        // Primary brand color — confident, trustworthy blue.
        brand: {
          50: '#eef2ff',
          100: '#dfe6ff',
          200: '#c0cdff',
          300: '#98acfd',
          400: '#6f86fa',
          500: '#4c63f0', // primary
          600: '#3547d6',
          700: '#2935ad',
          800: '#232c89',
          900: '#1f276d',
          950: '#14183f',
        },
        // Accent — cyan/teal, reserved for CTAs, highlights, glow moments.
        accent: {
          50: '#ecfffc',
          100: '#cffff8',
          200: '#a0fbef',
          300: '#62efe0',
          400: '#2ad8c9',
          500: '#10b8ac', // accent base
          600: '#0a938a',
          700: '#0d746e',
          800: '#115c58',
          900: '#124c49',
          950: '#052b2a',
        },
        // Neutral — cool slate, used for both light and dark chrome.
        neutral: {
          50: '#f7f8fa',
          100: '#eef0f4',
          200: '#dfe3ea',
          300: '#c5cbd6',
          400: '#9aa3b5',
          500: '#707b91',
          600: '#545e74',
          700: '#3f4759',
          800: '#262b38',
          900: '#171a22',
          950: '#0c0e13',
        },
        // Semantic status colors — subtle/base/strong, enough for badges,
        // alerts, and form validation states without a full 10-step scale.
        success: { 50: '#eafbf1', 500: '#1fa864', 700: '#137a48' },
        // warning-700 alone (4.70:1 on white) drops below the 4.5:1 AA
        // floor for normal text once it sits on the warning-50/surface-
        // sunken tints actually used behind it (4.38:1 / 4.43:1 measured) —
        // warning-800 is the accessibility-hardening-pass fix, used for
        // every warning/placeholder text instance instead of -700.
        warning: { 50: '#fef6e7', 500: '#d98c1a', 700: '#a3660e', 800: '#8a5510' },
        error: { 50: '#fdecec', 500: '#e5484d', 700: '#b72e33' },

        // Semantic chrome tokens — swap automatically with light/dark mode
        // via the CSS custom properties in src/styles/tokens.css.
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-elevated': 'rgb(var(--color-surface-elevated) / <alpha-value>)',
        'surface-sunken': 'rgb(var(--color-surface-sunken) / <alpha-value>)',
        fg: 'rgb(var(--color-fg) / <alpha-value>)',
        'fg-muted': 'rgb(var(--color-fg-muted) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        ring: 'rgb(var(--color-ring) / <alpha-value>)',
      },

      // 4px base-unit spacing scale additions beyond Tailwind's defaults —
      // section-level rhythm tokens used for consistent vertical spacing
      // between page sections everywhere (per skills/design-system).
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        'section-sm': '4rem',
        section: '6rem',
        'section-lg': '8rem',
      },

      // Display face (Plus Jakarta Sans) for headlines, workhorse face
      // (Inter) for body/UI text. See phase summary for the pairing rationale.
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      // Named type-scale steps — use these, not arbitrary text-[Npx] values.
      fontSize: {
        caption: ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.65' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        h4: ['1.375rem', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '600' }],
        h3: ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '600' }],
        h2: [
          'clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem)',
          { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' },
        ],
        h1: [
          'clamp(2.25rem, 1.7rem + 2.2vw, 3.25rem)',
          { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' },
        ],
        display: [
          'clamp(2.75rem, 1.9rem + 3.5vw, 4.5rem)',
          { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '700' },
        ],
      },

      // Three deliberate radii, reused everywhere (plus Tailwind's built-in
      // `rounded-full` for pills/avatars).
      borderRadius: {
        sm: '0.375rem', // 6px — inputs, badges, small controls
        DEFAULT: '0.625rem', // 10px — buttons, form fields
        md: '0.625rem',
        lg: '1.25rem', // 20px — cards, dialogs, large surfaces
      },

      // Three elevation levels + one accent "glow" for CTA/glass moments
      // called for in the brief's visual-style direction.
      boxShadow: {
        sm: '0 1px 2px 0 rgb(15 23 42 / 0.06)',
        md: '0 4px 16px -4px rgb(15 23 42 / 0.14), 0 2px 6px -2px rgb(15 23 42 / 0.08)',
        lg: '0 16px 40px -12px rgb(15 23 42 / 0.24), 0 4px 12px -4px rgb(15 23 42 / 0.10)',
        glow: '0 0 0 1px rgb(16 184 172 / 0.25), 0 8px 30px -6px rgb(16 184 172 / 0.45)',
      },

      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
        spring: 'var(--ease-spring)',
      },

      // 12-column grid content widths, referenced instead of repeating
      // max-width values per page.
      maxWidth: {
        narrow: '48rem', // 768px — long-form text (case studies, insights)
        content: '80rem', // 1280px — standard page container
        wide: '90rem', // 1440px — full-bleed feature sections
      },

      screens: {
        xs: '420px',
        '3xl': '1600px',
      },

      // Minimal keyframe used by Tooltip's entrance (wrapped in
      // `motion-safe:` at the call site, so reduced-motion users never see it).
      keyframes: {
        'tooltip-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'dialog-backdrop-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'dialog-content-in': {
          from: { opacity: '0', transform: 'translateY(8px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
