# Feature Plan: Tooltip

## Summary
Tooltip is a lightweight floating label that appears on hover or keyboard focus of a trigger element. It displays a short text description positioned relative to its trigger. Used throughout the admin UI to provide contextual hints on icons, buttons, and truncated content.

## Goals
- Render a floating text label on hover/focus of any wrapped child element
- Support four placement directions: top, bottom, left, right
- Use inverted color scheme (dark background, light text) for contrast
- Support controlled delay before showing
- Compose cleanly as a wrapper around any existing component

## Out of Scope
- Rich content (HTML) inside the tooltip — text only for v1
- Click-triggered tooltips (popovers)
- Arrow/caret indicator

## Technical Approach
| Element | Implementation |
|---|---|
| Trigger wrapper | `<span>` wrapping `children`, with mouse/focus listeners |
| Floating label | Absolutely positioned `<span>` with `role="tooltip"` |
| Positioning | CSS absolute positioning relative to the trigger wrapper |
| Show/hide | Internal `useState` toggled by `onMouseEnter`/`onMouseLeave`/`onFocus`/`onBlur` |
| Delay | Optional `delay` prop (default 0), implemented with `setTimeout`/`clearTimeout` |
| Colors | `--admin-background-inverted-primary` bg, `--admin-text-inverted-primary` text |
| Typography | `@mixin type-body-xs` |
| Spacing | `--admin-space-xs` padding, `--admin-space-xs` offset from trigger |
| Radius | `--admin-radius-sm` |

Key decisions:
- Folder: `src/primitives/Tooltip/`
- Composed from: none (standalone primitive)
- CSS-only positioning (no JS measurement) — simpler, sufficient for short text labels

## Component Decomposition
No decomposition — component is simple enough to implement as a single file.

## Key Files
| File | Change Type | Notes |
|---|---|---|
| `src/primitives/Tooltip/Tooltip.tsx` | New | Component implementation |
| `src/primitives/Tooltip/Tooltip.module.css` | New | Scoped styles |
| `src/primitives/Tooltip/Tooltip.test.tsx` | New | Tests |
| `src/primitives/Tooltip/index.ts` | New | Barrel export |
| `src/primitives/index.ts` | Modify | Add export |
| `src/index.ts` | Modify | Add to primitives export line |
| `catalog/demos/primitives/TooltipDemo.tsx` | New | Catalog demo |
| `catalog/demos/primitives/index.ts` | Modify | Add demo export |
| `catalog/demos/index.ts` | Modify | Add import + demos entry |
| `catalog/data/navigation.ts` | Modify | Add nav item |

## Props Interface
```ts
interface TooltipProps {
  content: string;                                    // Tooltip text
  placement?: 'top' | 'bottom' | 'left' | 'right';  // Default 'top'
  delay?: number;                                     // ms before showing, default 0
  children: React.ReactElement;                       // Trigger element
  className?: string;
}
```

## Risks & Unknowns
- CSS-only positioning may clip at viewport edges for elements near the edge — acceptable for v1

## Success Criteria
- Tooltip appears on hover and keyboard focus, disappears on leave/blur
- All four placements render correctly
- Uses inverted tokens for high contrast
- Accessible: `role="tooltip"`, `aria-describedby` linking trigger to tooltip
- Tests pass, build passes cleanly
