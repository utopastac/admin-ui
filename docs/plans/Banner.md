# Feature Plan: Banner

## Summary
Banner is a status messaging component that displays contextual alerts in four severity variants: `info`, `success`, `warning`, and `error`. It renders an optional Lucide icon, an optional title, and a required message string. A `dismissible` prop shows a close (X) button that hides the banner on click, firing an optional `onDismiss` callback. A `layout` prop switches between `inline` (fits its container width) and `full` (100% width, typically used for page-level alerts).

## Goals
- Four severity variants with distinct background/text/accent colours drawn entirely from `--admin-*` tokens
- Optional Lucide icon slot (caller passes the icon component; Banner renders it at a fixed size)
- Optional title (bold) above the message body
- Dismissible mode: internal visibility state, optional `onDismiss` callback
- `inline` (default) and `full` layout modes
- Accessible: `role="alert"` on the container, `aria-label` on the dismiss button

## Out of Scope
- Action buttons beyond dismiss (e.g., "Retry", "View more") — not requested
- Auto-dismiss / timeout behaviour
- Animated entrance/exit transitions
- Stacking multiple banners (consumer responsibility)

## Technical Approach
| Element | Implementation |
|---|---|
| Container | `<div role="alert">` with CSS module class for variant + layout |
| Icon | Rendered from `icon` prop (LucideIcon component type) at `size={18}` inside a flex wrapper |
| Title | `<strong>` with `@mixin type-body-m-strong` via CSS module |
| Message | `<p>` with `@mixin type-body-m` via CSS module |
| Dismiss button | Native `<button>` styled with CSS module; uses Lucide `X` icon at `size={16}` |
| Visibility | `useState(true)` internally; returns `null` when dismissed |

**Token mapping by variant:**
| Variant | Background | Text | Left-border accent |
|---|---|---|---|
| `info` | `--admin-surface-info-subtle` | `--admin-text-info` | `--admin-surface-info-primary` |
| `success` | `--admin-surface-success-subtle` | `--admin-text-success` | `--admin-surface-success-primary` |
| `warning` | `--admin-surface-warning-subtle` | `--admin-text-warning` | `--admin-surface-warning-primary` |
| `error` | `--admin-surface-error-subtle` | `--admin-text-error` | `--admin-surface-error-primary` |

Key decisions:
- Folder: `src/primitives/Banner/`
- Composed from: none (uses native HTML elements for title/message; native `<button>` for dismiss to allow full styling control)
- Token usage: status surface tokens for backgrounds, matching text tokens, left-border accent strip for variant identity, `--admin-radius-sm` for container corners, `--admin-space-s/m` for padding/gaps

## Component Decomposition
No decomposition — component is simple enough to implement as a single file. The layout has no independently reusable regions; total TSX is well under 100 lines.

Decomposition rationale: Banner is a leaf component with a single visual region — no sub-parts are meaningful outside this context.

## Key Files
| File | Change Type | Notes |
|---|---|---|
| `src/primitives/Banner/Banner.tsx` | New | Component implementation + `BannerProps` export |
| `src/primitives/Banner/Banner.module.css` | New | Scoped styles using `--admin-*` tokens |
| `src/primitives/Banner/index.ts` | New | Barrel export |
| `src/primitives/index.ts` | Modify | Add `Banner` and `BannerProps` export |
| `src/index.ts` | Modify | Add `Banner` (and `BannerProps`) to primitives export line |
| `catalog/demos/primitives/BannerDemo.tsx` | New | Demo showing all 4 variants, with/without title, with/without icon, dismissible, full layout |
| `catalog/demos/primitives/index.ts` | Modify | Add `BannerDemo` export |
| `catalog/demos/index.ts` | Modify | Add import + `'banner': BannerDemo` entry |
| `catalog/data/navigation.ts` | Modify | Add `{ id: 'banner', label: 'Banner' }` to Primitives section (alphabetically after Avatar, before Badge) |

## Risks & Unknowns
- The design system has no explicit `error`/`danger` semantic token; `--admin-background-annotation-subtle` + `--admin-text-annotation` is the closest available (amber/dark-brown). This matches the annotation token intent (callout content) and creates a clear visual hierarchy vs the lighter warning variant.
- Lucide icons are an assumed peer dependency — confirmed used elsewhere in the library (e.g., `X` icon in SideNav clear button).

## Success Criteria
- Component renders in catalog with all 4 variants shown
- All variant, title, icon, dismissible, and layout combinations displayed in demo
- Zero raw CSS colour or pixel values — every property uses `--admin-*` tokens or CSS mixin references
- Build passes cleanly (`npm run build`)
