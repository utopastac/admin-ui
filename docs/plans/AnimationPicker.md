# Feature Plan: AnimationPicker

## Summary
AnimationPicker is a popover-triggered field component (matching the GradientPicker pattern) that lets users configure a CSS transition timing function and duration. It renders a compact trigger field showing the current value, which opens a panel with an easing preset dropdown, an editable duration input, a bezier curve canvas editor (visible only for custom easing), an editable bezier value readout, and an animated preview box. The component outputs a CSS string (`"300ms ease-out"` or `"300ms cubic-bezier(0.25, 0.1, 0.25, 1)"`) via `onChange`.

## Goals
- Render a trigger field (like GradientPicker) displaying the current CSS transition value
- Open a popover panel with full animation configuration controls
- Support easing presets: linear, ease, ease-in, ease-out, ease-in-out, custom bezier
- Show an SVG bezier curve editor when "custom bezier" is selected (x clamped [0,1], y free)
- Provide an editable bezier value readout (e.g. `0, 0, 0.58, 1`)
- Provide an editable duration input (numeric, in ms)
- Show an animated preview box that plays the current easing on demand
- Accept and emit a CSS transition string: `"<duration>ms <timing-function>"`
- Support `inline` prop (render panel directly without trigger)
- Support `label`, `labelPosition`, `labelWidth` props via FieldGroup/FieldLabel

## Out of Scope
- `transition-property` and `transition-delay` configuration (duration + timing function only)
- Spring/physics-based easing
- Keyframe animation editing
- Multiple transition values in one string

## Technical Approach

| Element | Implementation |
|---|---|
| Trigger field | Button styled as input, shows icon + current CSS value text |
| Popover panel | 280px wide, uses existing `Popover` component with `anchorRef` |
| Easing dropdown | `Select` component with 6 options (linear, ease, ease-in, ease-out, ease-in-out, Custom bezier) |
| Duration input | `CompactInput` with numeric type, `ms` suffix label |
| Bezier canvas | `BezierEditor` sub-component — SVG with draggable control points |
| Bezier readout | Four `CompactInput` fields (x1, y1, x2, y2), editable |
| Preview box | `AnimationPreview` sub-component — CSS animation on a div, replay button |
| Value serialization | `parseAnimationValue(css)` → `AnimationState`; `serializeAnimationValue(state)` → CSS string |
| Label integration | `FieldGroup` (top) or `FieldLabel` (left) matching GradientPicker pattern |

Key decisions:
- Folder: `src/primitives/AnimationPicker/`
- Composed from: `Select`, `CompactInput`, `Popover`, `FieldGroup`, `FieldLabel`
- Token usage: `--admin-space-s/xs/l`, `--admin-border-subtle`, `--admin-surface-secondary`, `--admin-text-primary/secondary/subtle`, `--admin-input-background`, `--admin-input-height-sm`, `--admin-radius-sm/md`, `--admin-interactive-focus`

## Component Decomposition

| Sub-component | Location | Exported? | Purpose |
|---|---|---|---|
| `AnimationPicker` | `src/primitives/AnimationPicker/AnimationPicker.tsx` | Yes | Primary public component — trigger, state, popover |
| `BezierEditor` | `src/primitives/AnimationPicker/BezierEditor.tsx` | No | SVG canvas with draggable bezier control points |
| `AnimationPreview` | `src/primitives/AnimationPicker/AnimationPreview.tsx` | No | Animated preview box with replay trigger |

Decomposition rationale: the bezier SVG editor has substantial standalone complexity (coordinate transforms, pointer event math, SVG path generation) and the preview box manages its own animation replay state — splitting both keeps AnimationPicker.tsx readable and each file focused.

## Key Files

| File | Change Type | Notes |
|---|---|---|
| `src/primitives/AnimationPicker/AnimationPicker.tsx` | New | Main component + parser/serializer + AnimationState type |
| `src/primitives/AnimationPicker/AnimationPicker.module.css` | New | Trigger, popover panel, duration row, bezier readout styles |
| `src/primitives/AnimationPicker/BezierEditor.tsx` | New | SVG bezier canvas sub-component |
| `src/primitives/AnimationPicker/BezierEditor.module.css` | New | SVG canvas, control point, curve path styles |
| `src/primitives/AnimationPicker/AnimationPreview.tsx` | New | Preview box with replay button |
| `src/primitives/AnimationPicker/AnimationPreview.module.css` | New | Preview box, replay button styles |
| `src/primitives/AnimationPicker/AnimationPicker.test.tsx` | New | Tests |
| `src/primitives/AnimationPicker/index.ts` | New | Barrel export |
| `src/primitives/index.ts` | Modify | Add AnimationPicker export |
| `src/index.ts` | Modify | Add to primitives export line |
| `catalog/demos/primitives/AnimationPickerDemo.tsx` | New | Demo with all variants |
| `catalog/demos/primitives/index.ts` | Modify | Add AnimationPickerDemo export |
| `catalog/demos/index.ts` | Modify | Add import + demos Record entry |
| `catalog/data/navigation.ts` | Modify | Add nav item to Primitives section |
| `docs/plans/AnimationPicker.md` | New | This document |

## BezierEditor Specification

The SVG canvas renders a cubic-bezier curve with P0=(0,0), P1=(x1,y1), P2=(x2,y2), P3=(1,1).

**Coordinate system:** SVG origin is top-left; the canvas maps the [0,1] value space with Y flipped. Canvas is 200×200px with 20px padding giving a 160×160px draw area. Point (0,0) maps to bottom-left of draw area; (1,1) maps to top-right.

**Visual elements:**
- Dashed border rectangle around the [0,1]×[0,1] draw area
- Gray diagonal line from P0 to P3 (linear reference)
- Black cubic bezier curve path (computed with enough t steps for smooth rendering)
- Lines from P0→P1 and P3→P2 (thin gray handles)
- P0 and P3: open circles (fixed, not draggable)
- P1 and P2: filled circles (draggable)

**Drag behavior:**
- Pointer events on the SVG; hit targets slightly larger than visible circles
- x clamped to [0,1]; y unclamped (can go outside draw area)
- Dragging P1 or P2 updates the corresponding control point and fires `onChange([x1,y1,x2,y2])`

**Props:**
```ts
interface BezierEditorProps {
  value: [number, number, number, number]; // [x1, y1, x2, y2]
  onChange: (value: [number, number, number, number]) => void;
}
```

## AnimationPreview Specification

Renders a small container with a box that slides/animates to demonstrate the easing curve.

**Props:**
```ts
interface AnimationPreviewProps {
  duration: number; // ms
  timingFunction: string; // e.g. "ease-out" or "cubic-bezier(0,0,0.58,1)"
}
```

**Behavior:**
- Box translates from left to right using the given CSS transition
- A replay button (circular arrow icon) triggers the animation
- Animation replays by toggling a CSS class, resetting, then re-applying after a frame

## AnimationState & Serialization

```ts
interface AnimationState {
  duration: number; // ms, integer
  easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'custom';
  bezier: [number, number, number, number]; // [x1, y1, x2, y2], only used when easing === 'custom'
}

// e.g. "300ms ease-out" → { duration: 300, easing: 'ease-out', bezier: [0.25, 0.1, 0.25, 1] }
// e.g. "500ms cubic-bezier(0, 0, 0.58, 1)" → { duration: 500, easing: 'custom', bezier: [0, 0, 0.58, 1] }
```

Output format: `"<duration>ms <timing-function>"`
- Named easings: `"300ms ease-out"`
- Custom: `"300ms cubic-bezier(0, 0, 0.58, 1)"`

Default value if none provided: `"300ms ease-out"`

## Risks & Unknowns
- SVG pointer event math needs testing at different device pixel ratios
- The `AnimationPreview` replay mechanism (class toggle + rAF) needs verification that CSS transition triggers correctly
- `CompactInput` props interface needs verification — the research found it exists but didn't detail its full API; may need to read it before implementing

## Success Criteria
- Component renders in catalog with popover trigger and inline modes shown
- All 6 easing presets switch correctly; custom shows bezier editor, others hide it
- Dragging bezier control points updates curve, readout, preview, and emits new CSS string
- Editing bezier readout inputs updates the curve in real time
- Duration input updates the output CSS string
- Preview box replays animation on button click
- Zero raw CSS values — all `--admin-*` tokens
- All tests pass
- Build passes cleanly
