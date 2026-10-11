import { DocPage } from '@/layout';
import AboutPageLayout from '../shared/AboutPageLayout';

const content = `# Design Tokens

All design tokens use the \`--admin-*\` prefix and are defined as CSS custom properties. They are grouped into two layers: **primitive tokens** and **semantic tokens**.

## Primitive tokens

Primitive tokens define the raw values — specific colors, spacing steps, font sizes. They are not used directly in component styles.

\`\`\`css
--admin-black-100: #000;
--admin-space-4: 4px;
--admin-font-size-s: 0.75rem;
\`\`\`

## Semantic tokens

Semantic tokens reference primitive tokens and carry intent. These are what component styles consume.

\`\`\`css
/* Text */
--admin-text-primary
--admin-text-secondary
--admin-text-subtle
--admin-text-action
--admin-text-highlight

/* Surfaces */
--admin-surface-default
--admin-surface-raised
--admin-surface-overlay

/* Borders */
--admin-border-default
--admin-border-info
--admin-border-success
--admin-border-warning
--admin-border-error

/* Interactive */
--admin-interactive-default
--admin-interactive-hover
--admin-interactive-active
\`\`\`

**Rule: never reference primitive tokens directly in component styles.** Use semantic tokens only.

## Status signals

For components that communicate state (e.g. Banner), use border tokens for strokes and surface tokens for fills:

\`\`\`css
/* Correct */
border-color: var(--admin-border-error);
background: var(--admin-surface-error);

/* Wrong — don't use a surface token for a stroke */
border-color: var(--admin-surface-error);
\`\`\`

## Spacing

Spacing uses a named scale — not arbitrary numbers:

| Token | Value |
|-------|-------|
| \`--admin-space-xs\` | 4px |
| \`--admin-space-s\` | 8px |
| \`--admin-space-m\` | 16px |
| \`--admin-space-l\` | 24px |
| \`--admin-space-xl\` | 32px |
| \`--admin-space-2xl\` | 48px |

## Theming

Themes are applied via a \`data-admin-theme\` attribute on a container element:

\`\`\`html
<div data-admin-theme="ocean">…</div>
\`\`\`

Theme CSS rules use the \`~=\` (word-match) attribute selector so themes compose:

\`\`\`css
[data-admin-theme~="ocean"] { --admin-text-action: var(--admin-blue-60); }
[data-admin-theme~="rounded"] { --admin-radius-m: 12px; }
\`\`\`

\`\`\`html
<!-- Both ocean and rounded rules apply -->
<div data-admin-theme="ocean rounded">…</div>
\`\`\`

Never use \`=\` (exact match) in theme rules — it breaks composition.

## Adding new tokens

Don't add new tokens unless the existing semantic vocabulary genuinely cannot express the concept. When you do add a token:

1. Define it in \`src/styles/design-system.css\` for all base modes (light/dark)
2. Add overrides in \`src/styles/themes.css\` for every theme that needs a custom value
3. Add a corresponding utility class in \`src/styles/utilities.css\`
`;

export default function DevDesignTokensPage() {
  return <AboutPageLayout><DocPage content={content} centered={false} /></AboutPageLayout>;
}
