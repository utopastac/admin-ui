# Plan: Resizable Popover

## Summary

Add a `resizable?: boolean` prop to `Popover` that lets users drag the bottom-right corner (and other corners) to resize the popover. The main challenge is that the existing `updatePosition` logic rewrites the popover's `style` on every scroll/resize event via `ResizeObserver`, which conflicts with the browser's native resize drag. The implementation must suppress repositioning while a user-initiated resize is in progress and preserve the user's chosen dimensions afterward.

## Goals

- `<Popover resizable>` renders with draggable resize handles
- Resizing does not fight the positioning logic
- `maxHeight` does not clamp the user's chosen height after they've resized
- `minWidth` and `minHeight` prevent the popover being dragged to unusable sizes
- Non-resizable popovers are completely unaffected

## Out of Scope

- Persisting the resized dimensions across open/close cycles (resets on close)
- Drag-to-move (repositioning by dragging the popover header)
- Resizing in all directions independently (browser `resize: both` gives bottom/right/corner handles only)

## Technical Approach

### 1. CSS (`Popover.module.css`)

Add a `.resizable` modifier class:

```css
.resizable {
  resize: both;
  overflow: auto;       /* resize: both requires overflow != visible */
  min-width: 120px;
  min-height: 80px;
}
```

`overflow-y: auto` is already on `.popover` — switching to `overflow: auto` (both axes) for the resizable case is handled by the class.

### 2. Props (`Popover.tsx`)

Add to `PopoverProps`:

```ts
resizable?: boolean;
```

### 3. Suppress repositioning during resize

The `ResizeObserver` watching `contentRef` currently calls `updatePosition` on every size change — including when the user drags the resize handle. This would overwrite `top`/`left`/`maxHeight` mid-drag and snap the popover.

Use a ref flag `isUserResizing` to gate `updatePosition`:

```ts
const isUserResizing = useRef(false);
const userSize = useRef<{ width: number; height: number } | null>(null);
```

Attach `pointerdown` to the popover element to detect when a resize drag starts. The browser's resize handle sits inside the element's padding box at the bottom-right; we detect it by checking whether the pointer lands within the resize handle zone (bottom-right 16×16 px corner):

```ts
const handlePointerDown = useCallback((e: PointerEvent) => {
  if (!resizable || !contentRef.current) return;
  const rect = contentRef.current.getBoundingClientRect();
  const inCorner =
    e.clientX > rect.right - 16 &&
    e.clientY > rect.bottom - 16;
  if (!inCorner) return;

  isUserResizing.current = true;

  const onPointerUp = () => {
    isUserResizing.current = false;
    if (contentRef.current) {
      userSize.current = {
        width: contentRef.current.offsetWidth,
        height: contentRef.current.offsetHeight,
      };
    }
    window.removeEventListener('pointerup', onPointerUp);
  };
  window.addEventListener('pointerup', onPointerUp);
}, [resizable]);
```

Register this in the `isOpen` effect:

```ts
const el = contentRef.current;
if (resizable && el) {
  el.addEventListener('pointerdown', handlePointerDown);
}
return () => {
  el?.removeEventListener('pointerdown', handlePointerDown);
  // ... other cleanup
};
```

### 4. Gate `updatePosition` behind the flag

At the top of `updatePosition`:

```ts
if (isUserResizing.current) return;
```

Also, after initial positioning, apply `userSize` if the user has previously resized (so the size is preserved if `updatePosition` is called again — e.g. on scroll):

```ts
// After computing top/left, apply user's chosen dimensions if set
const sizeOverride = userSize.current
  ? { width: `${userSize.current.width}px`, height: `${userSize.current.height}px` }
  : {};

setPosition({
  top: `${top}px`,
  left: `${left}px`,
  ...(matchWidth ? { width: `${anchorRect.width}px` } : {}),
  maxHeight: userSize.current ? undefined : `${viewportHeight - GAP * 2}px`,
  ...sizeOverride,
});
```

### 5. Reset on close

Clear `userSize` when the popover closes so each open starts fresh:

```ts
if (!isOpen) {
  setPosition(null);
  userSize.current = null;  // ← add this
  return;
}
```

### 6. Apply the CSS class conditionally

```tsx
<div
  ref={contentRef}
  className={[styles.popover, resizable && styles.resizable, className].filter(Boolean).join(' ')}
  ...
>
```

## Files to Change

| File | Change |
|------|--------|
| `src/primitives/Popover/Popover.tsx` | Add `resizable` prop, `isUserResizing` ref, `userSize` ref, `handlePointerDown`, gate in `updatePosition`, reset on close, conditional class |
| `src/primitives/Popover/Popover.module.css` | Add `.resizable` class |
| `src/primitives/Popover/Popover.test.tsx` | Add tests for resizable mode (see below) |

## Tests to Add

```ts
describe('resizable', () => {
  it('applies resizable class when resizable prop is set', () => {
    // render with resizable, check element has resize CSS class
  });

  it('does not apply resizable class by default', () => {
    // render without prop, confirm class absent
  });
});
```

Full resize-drag interaction testing requires a browser environment (jsdom doesn't support CSS resize handles), so the `pointerdown` detection logic is best covered by a visual/e2e test or manual verification.

## Risks

- **jsdom + CSS resize**: `resize: both` is a CSS feature. jsdom won't render actual drag handles, so the corner-detection `pointerdown` logic can't be unit tested easily. Accept this and rely on manual QA.
- **16px corner heuristic**: The browser doesn't expose an event for "resize handle drag started" — we infer it from pointer position in the bottom-right 16×16 corner. This is a convention that works in practice but isn't a guaranteed API.
- **`matchWidth` + `resizable`**: If `matchWidth` is true and the popover is also resizable, the width will be locked to the anchor width on initial position. The user can still drag wider, but the width gets reset by `updatePosition` on scroll/resize unless `userSize` has been set. This combination is unusual and probably not worth special-casing.
