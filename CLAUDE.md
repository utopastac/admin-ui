# Admin UI Component Library

## Overview

Admin UI is a React component library providing design tokens, primitives, and navigation components for admin interfaces. Built with Vite library mode, it produces a single ES module bundle with a single CSS file. PostCSS mixins are compiled at build time.

## Build Commands

```bash
npm run dev        # Start catalog dev server (Vite serves catalog/index.html)
npm run build      # Type-check then build library (dist/index.js + dist/styles/style.css)
npm run typecheck  # Type-check only (tsc --noEmit)
```

## Component Placement

- `primitives/` — non-positioned leaf components
- `overlays/` — floating or fixed-position UI (Modal, SidePanel, Toast, ContextMenu, AlertDialog, Tooltip)
- `navigation/` — SideNav, TopNav, Pagination
- `layout/` — structural components that arrange other components (Stack, Columns, AppLayout, page-level wrappers)

If it floats above the page → `overlays/`; if it arranges children spatially → `layout/`; otherwise → `primitives/`.

## Adding Components

Each component lives in its own directory with four files:

```
primitives/ComponentName/
  ComponentName.tsx          # Component implementation + props interface
  ComponentName.module.css   # Scoped styles using semantic tokens
  ComponentName.test.tsx     # Tests (Vitest + React Testing Library)
  index.ts                   # export { default } from './ComponentName'
```

Then re-export from the parent barrel (`primitives/index.ts`, `overlays/index.ts`, `navigation/index.ts`, or `layout/index.ts`), and from `src/index.ts`.

Use the `/admin-ui-component` skill when building a new component — it scaffolds the four files and wires up the barrel exports.

## Public API

`src/index.ts` is the single public surface. Rules:

- Export the top-level component only — not internal sub-components (e.g. `SideNav` is exported, `SideNavItem` is not).
- Export all public prop types and data interfaces alongside the component.
- Sub-component data types used by consumers (e.g. `SideNavItemData`) are exported as types even though the sub-component itself is not.

## CSS Rules

- **CSS Modules only** — no inline styles, no global class names in components.
- All CSS custom properties use the `--admin-*` prefix. Use semantic tokens (`var(--admin-text-primary)`, `var(--admin-surface-*)`, etc.) in component styles. Never reference primitive color tokens directly.
- **Always nest selectors** — pseudo-classes, pseudo-elements, modifier classes, and size variants must be nested inside the root class using `&`.
- PostCSS mixins defined in `src/styles/design-system.css` are available in all CSS files. New mixins must have a matching utility class added to `utilities.css` in the same change.

## Design Tokens

- **Don't add new tokens** unless the existing semantic vocabulary genuinely cannot express the concept.
- **Status signals** (borders on Banner-style components, etc.) use `--admin-border-info/success/warning/error` tokens, not surface tokens. Surface tokens are for fills; border tokens are for strokes.
- **Size props** on all components use the `s/sm/small`, `m/md/medium`, `l/lg/large` alias pattern. Use the shared `resolveSize` utility from `src/primitives/resolveSize.ts` — don't reimplement alias logic per-component.
- **Theming** uses `data-admin-theme` with CSS `~=` (word-match) attribute selectors so themes compose: `data-admin-theme="ocean rounded"`. Never use `=` (exact match) in theme rules.

## Accessibility

- Overlay components (Modal, SidePanel, AlertDialog) must trap focus while open and restore focus on close.
- Interactive lists and grids should support arrow-key navigation where the pattern calls for it (Command, DataGrid, SelectionList).

## Testing

Tests use Vitest with jsdom, React Testing Library, and `@testing-library/user-event`. Test files live alongside their component (`ComponentName.test.tsx`). Vitest globals (`describe`, `it`, `expect`, `vi`) are available without imports.

```bash
npm test           # Run all tests
npm test -- --run  # Run once (no watch)
```

- Every component file gets its own test file, including sub-components co-located within a parent's directory.
- Tests should be behavior-focused — assert on what the component does, not on CSS class names or implementation details.
- Canvas and SVG-heavy components: test render, callbacks, and accessible controls only. Do not assert on canvas drawing output (jsdom has no real 2D context). Test any exported utility functions directly instead.
- For pointer/drag tests that rely on coordinates, mock `Element.prototype.getBoundingClientRect` to a known rect — jsdom returns zeros by default.

## Commit Rules

Always run `npm run build` before committing. The `dist/` directory is checked into the repo so consumers can install directly from git without a build step.
