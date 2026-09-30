---
name: appica-ui
description: Rules for writing UI with Appica UI (@appica/ui-react) in this project. Use before adding or changing any component, color, radius, font or theme code in src/.
---

# Appica UI

This site is built on [Appica UI](https://appica.dev/ui/docs/react) (Tailwind v4, React 19, Base UI underneath).
Component list and docs: https://appica.dev/ui/react/llms.txt (every docs page is also served as `<url>.md`).

## Library rules (from the package's `agent-rules.md`)

- Tailwind CSS v4 only. Do NOT create a `tailwind.config.js` - v4 config lives in CSS via `@theme`.
  If the project is on v3, convert unsupported syntax rather than downgrading the components.
- Scan the library for class names or everything renders unstyled: `@source '../node_modules/@appica/ui-react/dist';`
  in the stylesheet that imports Tailwind. The path is relative to that stylesheet - count the `../`
  needed to reach the project root. A bare package name resolves to nothing and fails silently.
- React 19 is a hard requirement. No `forwardRef` - `ref` is a plain prop.
- Import from the subpath, one component per import:
  `import { Button } from '@appica/ui-react/button'`.
- Never write hex colors, px radii, or duration literals. Use the role-based tokens:
  `bg-background-muted`, `text-foreground-intense`, `border-border-strong`, `var(--radius-md)`.
  Full list: https://appica.dev/ui/docs/react/colors.md
- Never write hue-based utilities (`bg-gray-100`, `text-slate-600`). The palette is organized by
  role, not hue.
- Prefer v4 variant syntax (`*:`, `**:`, `data-*:`, `not-*:`) over `[&_...]` arbitrary selectors.
- For a link styled as a button, put `buttonVariants(...)` on the `<a>` - never `<Button render={<a/>}>`.
- Put `className` overrides on the wrapper component, not on the JSX passed to `render`.
- Do not hand-roll a component that exists in the library. Check the component list first:
  https://appica.dev/ui/react/llms.txt
- Every documentation page is served as clean markdown at `<url>.md` - fetch that, not the HTML.

## Project conventions

- Theme overrides live in `src/app/globals.css`. Override the **raw** tokens (`--secondary`, `--radius`, `--font-sans`)
  under `:root` and `.dark`, never the `--color-*` theme tokens.
- The `@source` path there is `../../node_modules/@appica/ui-react/dist` (the stylesheet is in `src/app/`).
- Theme: `ThemeProvider` wraps `src/app/[lang]/layout.tsx`; toggle with `useTheme` from `@appica/ui-react/hooks/use-theme`.
- Look up a component's props in `node_modules/@appica/ui-react/dist/components/<name>/*.d.ts` before using it.
- Icons: `lucide-react` (no brand icons in v1; brand marks live in `src/components/brand-icons.tsx`).
