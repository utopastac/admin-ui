# Feature Plan: Slider

## Summary
Slider is a horizontal range input that emits numeric values. It supports continuous (analogue) and stepped (discrete) modes, single-value and range (two-thumb) modes, optional labels at ends or on every step, an optional value tooltip on the thumb, and two sizes. Used in admin settings for numeric configuration like thresholds, percentages, and ratings.

## Goals
- Continuous slider with smooth value emission
- Stepped slider snapping to discrete values
- Single-thumb and range (min/max two-thumb) modes
- Labels at ends, or labels on every step (strings or numbers)
- Optional tooltip showing current value above thumb during interaction
- Two sizes: sm and md
- Disabled state
- Fully keyboard accessible

## Out of Scope
- Vertical orientation
- Logarithmic or custom scale curves
- Color gradient fills on the track
- Input field integration (type the number directly)

## Technical Approach
| Element | Implementation |
|---|---|
| Track | `<div>` with `--admin-background-subtle` background, rounded ends |
| Fill | Absolutely positioned `<div>` with `--admin-surface-action` background |
| Thumb(s) | `<div role="slider">` with `--admin-surface-action` background, `tabindex="0"` |
| Interaction | `onPointerDown` → `pointermove` → `pointerup` for drag; arrow keys for keyboard |
| Stepping | When `step` provided, snap value to nearest step on move/release |
| Range mode | Two thumbs, each independently draggable, fill spans between them |
| Labels | Flex row of `<span>` elements below the track |
| Value tooltip | Composes the new `Tooltip` primitive, shown during drag/hover on thumb |
| Sizes | `sm`: 4px track height, 16px thumb; `md`: 6px track height, 20px thumb |

Key decisions:
- Folder: `src/primitives/Slider/`
- Composed from: `Tooltip` (for value display on thumb)
- No native `<input type="range">` — custom implementation for range mode and consistent styling
- Pointer events API for cross-device drag handling
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-orientation="horizontal"` on each thumb

## Component Decomposition
No decomposition — the component has interrelated state (drag tracking, pointer capture) that makes splitting counterproductive. Labels, track, fill, and thumbs are simple enough as inline JSX regions.

Decomposition rationale: All visual pieces share drag state and value computation logic; splitting would require prop-drilling the same state everywhere.

## Key Files
| File | Change Type | Notes |
|---|---|---|
| `src/primitives/Slider/Slider.tsx` | New | Component implementation |
| `src/primitives/Slider/Slider.module.css` | New | Scoped styles |
| `src/primitives/Slider/Slider.test.tsx` | New | Tests |
| `src/primitives/Slider/index.ts` | New | Barrel export |
| `src/primitives/index.ts` | Modify | Add export |
| `src/index.ts` | Modify | Add to primitives export line |
| `catalog/demos/primitives/SliderDemo.tsx` | New | Catalog demo |
| `catalog/demos/primitives/index.ts` | Modify | Add demo export |
| `catalog/demos/index.ts` | Modify | Add import + demos entry |
| `catalog/data/navigation.ts` | Modify | Add nav item |

## Props Interface
```ts
interface SliderProps {
  value: number | [number, number];                   // Single or range
  onChange: (value: number | [number, number]) => void;
  min?: number;                                       // Default 0
  max?: number;                                       // Default 100
  step?: number;                                      // Undefined = continuous
  labels?: { start?: string; end?: string };          // End labels only
  stepLabels?: (string | number)[];                   // Label for every step
  showTooltip?: boolean;                              // Show value tooltip on thumb, default false
  tooltipFormat?: (value: number) => string;          // Custom tooltip text
  size?: 'sm' | 'md';                                 // Default 'md'
  disabled?: boolean;
  className?: string;
  id?: string;
}
```

## Risks & Unknowns
- Range mode thumb overlap when both values are equal — thumbs stack, last-dragged stays on top
- Step labels may get crowded with many steps — consumer's responsibility to use reasonable step counts

## Success Criteria
- Continuous slider drags smoothly and emits values between min/max
- Stepped slider snaps to discrete values
- Range mode: two thumbs move independently, fill spans between them
- Labels render at ends or on every step
- Tooltip appears on thumb during hover/drag when enabled
- Both sizes render correctly
- Disabled state prevents all interaction
- Keyboard: arrow keys move value by step (or 1% of range for continuous)
- All ARIA attributes present and correct
- Tests pass, build passes cleanly
