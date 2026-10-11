import { DocPage } from '@/layout';
import AboutPageLayout from '../shared/AboutPageLayout';

const content = `# CSS Conventions

## CSS Modules only

Every component uses a co-located \`.module.css\` file. No inline styles, no global class names.

\`\`\`tsx
import styles from './MyComponent.module.css';

export default function MyComponent() {
  return <div className={styles.root}>…</div>;
}
\`\`\`

## Use semantic tokens

Only reference semantic tokens in component styles — never primitive tokens directly:

\`\`\`css
/* Correct */
color: var(--admin-text-primary);
background: var(--admin-surface-raised);

/* Wrong — primitive token */
color: var(--admin-black-100);
\`\`\`

## Always nest selectors

Pseudo-classes, pseudo-elements, modifier classes, and size variants must be nested inside the root class using \`&\`:

\`\`\`css
.root {
  padding: var(--admin-space-s);

  &:hover {
    background: var(--admin-interactive-hover);
  }

  &.active {
    color: var(--admin-text-action);
  }

  &.sm {
    padding: var(--admin-space-xs);
    font-size: var(--admin-font-size-xs);
  }

  &.lg {
    padding: var(--admin-space-m);
    font-size: var(--admin-font-size-m);
  }
}
\`\`\`

Never write flat selectors like \`.root:hover { }\` or \`.root.active { }\` outside the root block.

## PostCSS mixins

Shared mixins are defined in \`src/styles/design-system.css\` and available in all component CSS files without importing:

\`\`\`css
.panel {
  @mixin popover-panel;
}

.label {
  @mixin label-s;
}
\`\`\`

To add a new mixin:

1. Define it in \`src/styles/design-system.css\`
2. Add a corresponding utility class in \`src/styles/utilities.css\` in the same change

The utility class must always be added — this keeps the two files in sync and allows the mixin to be used without CSS Modules when needed.

## Size props

Components that accept size variants use the \`s/sm/small\`, \`m/md/medium\`, \`l/lg/large\` alias pattern. Use the shared \`resolveSize\` utility instead of re-implementing alias logic per component:

\`\`\`ts
import { resolveSize } from '@/primitives/resolveSize';

// In the component:
const resolvedSize = resolveSize(size); // normalizes 'sm' → 's', 'small' → 's', etc.
\`\`\`

Then apply the resolved size as a CSS class:

\`\`\`tsx
<div className={\`\${styles.root} \${styles[resolvedSize]}\`}>
\`\`\`

## Custom property injection

For layout components that accept dynamic values (e.g. gap, columns), inject them via CSS custom properties on the \`style\` prop:

\`\`\`tsx
<div
  style={{ '--card-grid-gap': \`var(--admin-space-\${gap})\` } as React.CSSProperties}
  className={styles.root}
>
\`\`\`

\`\`\`css
.root {
  gap: var(--card-grid-gap, var(--admin-space-m));
}
\`\`\`
`;

export default function DevCssConventionsPage() {
  return <AboutPageLayout><DocPage content={content} centered={false} /></AboutPageLayout>;
}
