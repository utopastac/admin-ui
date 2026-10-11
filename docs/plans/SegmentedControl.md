# Feature Plan: SegmentedControl

## Summary
An iOS-style segmented control — a horizontal row of mutually exclusive text options inside a rounded background tray, with a pill-shaped highlight that indicates the selected segment. Used for switching between views or filtering content inline.

## Goals
- Provide a controlled segmented control with `value` + `onChange` API
- Support two sizes: `sm` and `md`
- Support disabling the whole control or individual segments
- Include keyboard navigation (arrow keys to move selection)
- Match iOS visual style: rounded tray background, pill highlight on selected segment, smooth transition
- Register in the catalog with a full demo

## Out of Scope
- Uncontrolled mode / `defaultValue`
- Icon segments or icon+label segments
- Animated sliding pill (CSS transition on background is sufficient)
- Vertical orientation

## Technical Approach
| Element | Implementation |
|---|---|
| Tray background | Container div with `--admin-surface-subtle` background, `--admin-radius` rounded corners |
| Segment buttons | Native `<button>` elements with `role="radio"` inside a `role="radiogroup"` container |
| Selected pill | Selected button gets `--admin-surface-primary` background with subtle shadow, `--admin-radius-sm` corners |
| Unselected text | `--admin-text-secondary` |
| Selected text | `--admin-text-primary` with `--admin-font-weight-medium` |
| Disabled state | Reduced opacity, `pointer-events: none` |
| Size sm | Smaller padding, `--admin-font-size-s` |
| Size md | Default padding, `--admin-font-size-m` |
| Keyboard nav | Arrow left/right cycles through enabled segments, wrapping at ends |
| Transition | `background-color` and `color` transitions (~150ms ease) |

Key decisions:
- Folder: `src/primitives/SegmentedControl/`
- Composed from: none (uses native buttons, similar to Tabs)
- Token usage: `--admin-surface-subtle` (tray), `--admin-surface-primary` (pill), `--admin-text-primary/secondary`, `--admin-radius`, `--admin-space-xs/s`, `--admin-font-size-s/m`, `--admin-font-weight-medium`
- API mirrors Tabs: `options: Array<{ value: string; label: string; disabled?: boolean }>`, `value`, `onChange`, `size`, `disabled`

## Component Decomposition
No decomposition — component is simple enough to implement as a single file (~60-80 lines TSX).

## Key Files
| File | Change Type | Notes |
|---|---|---|
| `src/primitives/SegmentedControl/SegmentedControl.tsx` | New | Component implementation |
| `src/primitives/SegmentedControl/SegmentedControl.module.css` | New | Scoped styles using --admin-* tokens |
| `src/primitives/SegmentedControl/SegmentedControl.test.tsx` | New | Tests (Vitest + React Testing Library) |
| `src/primitives/SegmentedControl/index.ts` | New | Barrel export |
| `src/primitives/index.ts` | Modify | Add export |
| `src/index.ts` | Modify | Add to primitives export line |
| `catalog/demos/primitives/SegmentedControlDemo.tsx` | New | Catalog demo with all variants |
| `catalog/demos/primitives/index.ts` | Modify | Add demo export |
| `catalog/demos/index.ts` | Modify | Add import + demos Record entry |
| `catalog/data/navigation.ts` | Modify | Add nav item to Primitives section |
| `docs/plans/SegmentedControl.md` | New | This document |

## Risks & Unknowns
- Pill highlight transition timing may need tuning for feel
- Equal-width segments via `flex: 1` should work but may need a min-width for very short labels

## Success Criteria
- Component renders in catalog with all variants shown
- Zero raw CSS values — all --admin-* tokens
- Tests pass (rendering, variants, props, interaction, accessibility)
- Build passes cleanly
- Keyboard navigation works (arrow keys cycle, disabled segments skipped)
