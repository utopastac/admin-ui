import { DocPage } from '@/layout';
import AboutPageLayout from '../shared/AboutPageLayout';

const content = `# Architecture

Admin UI is a Vite library-mode project that produces a single ES module bundle (\`dist/index.js\`) and a single CSS file (\`dist/styles/style.css\`). PostCSS mixins are compiled at build time.

## Directory structure

\`\`\`
src/
  index.ts              # Single public export surface
  primitives/           # Non-positioned leaf components
  overlays/             # Floating or fixed-position UI
  layout/               # Structural components that arrange other components
  navigation/           # SideNav, TopNav, Pagination
  styles/               # Design tokens, mixins, themes, utilities
\`\`\`

**Placing a new component:**

| Type | Directory |
|------|-----------|
| Floats above the page (Modal, Tooltip, ContextMenu) | \`overlays/\` |
| Arranges children spatially (Stack, Columns, CardGrid) | \`layout/\` |
| Everything else | \`primitives/\` |

## Component structure

Each component lives in its own directory with four files:

\`\`\`
primitives/ComponentName/
  ComponentName.tsx          # Component implementation + props interface
  ComponentName.module.css   # Scoped styles using semantic tokens
  ComponentName.test.tsx     # Vitest + React Testing Library tests
  index.ts                   # export { default } from './ComponentName'
\`\`\`

## Barrel exports

Each category has its own barrel file:

\`\`\`
primitives/index.ts
overlays/index.ts
layout/index.ts
navigation/index.ts
\`\`\`

Each barrel re-exports all components in that category. \`src/index.ts\` then re-exports from all four barrels — it is the single public surface consumed by library users.

## Public API rules

\`src/index.ts\` is the only file consumers import from. The rules:

- Export the top-level component only — not internal sub-components (e.g. \`SideNav\` yes, \`SideNavItem\` no).
- Export all public prop types and data interfaces alongside the component.
- Sub-component data types used by consumers (e.g. \`SideNavItemData\`) are exported as types even though the sub-component itself is not.

## The catalog

The \`catalog/\` directory is a Vite SPA that demonstrates and documents the library. It imports from \`@/\` (aliased to \`src/\`) so it always reflects the current source. It is not part of the published library — only \`dist/\` is.
`;

export default function DevArchitecturePage() {
  return <AboutPageLayout><DocPage content={content} centered={false} /></AboutPageLayout>;
}
