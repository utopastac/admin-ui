# Contributing

## Setup

```bash
npm install
npm run dev       # Component catalog at http://localhost:5173
```

## Development workflow

```bash
npm run build     # Type-check then build (required before committing)
npm test          # Run all tests once
npm run test:watch  # Watch mode
npm run lint      # ESLint
npm run coverage  # Coverage report with 70% thresholds
```

Always run `npm run build` before committing. The `dist/` directory is checked in so consumers can install directly from git.

## Adding a component

Each component lives in its own directory with four files:

```
src/primitives/ComponentName/
  ComponentName.tsx          # Component + props interface
  ComponentName.module.css   # Scoped styles using semantic tokens
  ComponentName.test.tsx     # Vitest + React Testing Library tests
  index.ts                   # export { default } from './ComponentName'
```

Then re-export from the category barrel (`primitives/index.ts`, `overlays/index.ts`, `navigation/index.ts`, or `layout/index.ts`) and from `src/index.ts`.

Use the `/admin-ui-component` skill if working with Claude Code — it scaffolds all four files and wires up the exports automatically.

Component placement:
- `primitives/` — non-positioned leaf components
- `overlays/` — floating or fixed-position UI (Modal, SidePanel, Toast, ContextMenu, AlertDialog, Tooltip)
- `navigation/` — SideNav, TopNav, Pagination
- `layout/` — structural components that arrange other components

## CSS rules

- CSS Modules only — no inline styles, no global class names.
- Use `--admin-*` semantic tokens. Never use raw hex values in component CSS.
- Nest all pseudo-classes, modifier classes, and size variants inside the root class using `&`.
- PostCSS mixins from `src/styles/design-system.css` are available in all component files. Any new mixin must have a matching utility class added to `utilities.css` in the same change.

## Testing guidelines

- Tests live alongside the component (`ComponentName.test.tsx`).
- Write behavior-focused tests — assert on roles, labels, and callbacks, not CSS class names.
- For pointer/drag tests that depend on coordinates, mock `getBoundingClientRect` to a known rect.
- Canvas and SVG-heavy components: test render, callbacks, and accessible controls only. Do not assert on canvas output.

## Public API

`src/index.ts` is the single public surface.

- Export the top-level component only, not internal sub-components.
- Export all public prop types alongside the component.
- Sub-component data types used by consumers are exported as types even if the sub-component itself is not.

## Design tokens

Do not add new tokens unless the existing semantic vocabulary genuinely cannot express the concept. See `src/styles/design-system.css` for the full token set.

## Detailed guidance

- [`CLAUDE.md`](CLAUDE.md) — component structure, CSS rules, accessibility requirements, commit rules
- [`LLM_GUIDANCE.md`](LLM_GUIDANCE.md) — usage patterns, prop contracts, composition rules, anti-patterns
- [`DECISIONS.md`](DECISIONS.md) — design decision log with rationale
