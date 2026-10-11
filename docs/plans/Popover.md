# Feature Plan: Popover

## Summary
A portal-based positioning primitive that renders content into `document.body` with `position: fixed` and viewport-aware placement. Solves the problem of dropdown menus being clipped by `overflow: hidden/auto` containers like SidePanel. ColorPicker and Select will use Popover internally for their dropdowns.

## Goals
- Provide a reusable portal + positioning primitive for all dropdown-like UI
- Viewport-aware placement: try below trigger, flip above if not enough space
- Escape overflow clipping in SidePanel and similar containers
- Handle click-outside dismissal and Escape key
- Update ColorPicker and Select to use Popover, eliminating their duplicated dropdown logic

## Out of Scope
- Arrow/caret pointing to anchor
- Multiple placement options (left, right) — only below/above for now
- Animation/transition on open/close
- Nested popover management

## Technical Approach

### Popover Props
```ts
interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  className?: string;
  matchWidth?: boolean; // true = match anchor width (for Select), false = auto width (for ColorPicker)
}
```

### Positioning Logic
1. Read `anchorRef.getBoundingClientRect()` on open
2. Calculate space below vs above
3. Place below if fits, flip above otherwise, pin to viewport bottom as fallback
4. Set `maxHeight` to constrain within viewport
5. Use `requestAnimationFrame` for initial measurement after portal mount

### Integration with ColorPicker
- Replace conditional `{isOpen && <div className={styles.dropdown}>...}` with `<Popover isOpen={isOpen} onClose={close} anchorRef={containerRef}>`
- Remove click-outside useEffect and Escape handling (Popover handles both)
- Remove `position: absolute/relative` CSS from dropdown/container
- Keep all visual styles on the dropdown className

### Integration with Select
- Same pattern as ColorPicker
- Use `matchWidth` prop so dropdown matches trigger width

## Component Decomposition
No decomposition — Popover is a single focused component (~60 lines).

## Key Files
| File | Change Type | Notes |
|---|---|---|
| `src/primitives/Popover/Popover.tsx` | New | Component implementation |
| `src/primitives/Popover/Popover.module.css` | New | Minimal base styles |
| `src/primitives/Popover/Popover.test.tsx` | New | Tests |
| `src/primitives/Popover/index.ts` | New | Barrel export |
| `src/primitives/index.ts` | Modify | Add Popover export |
| `src/index.ts` | Modify | Add Popover to primitives line |
| `src/primitives/ColorPicker/ColorPicker.tsx` | Modify | Use Popover for dropdown |
| `src/primitives/ColorPicker/ColorPicker.module.css` | Modify | Remove absolute positioning from dropdown |
| `src/primitives/Select/Select.tsx` | Modify | Use Popover for dropdown |
| `src/primitives/Select/Select.module.css` | Modify | Remove absolute positioning from dropdown |
| `catalog/demos/primitives/PopoverDemo.tsx` | New | Demo showing usage |
| `catalog/demos/primitives/index.ts` | Modify | Add demo export |
| `catalog/demos/index.ts` | Modify | Add demo import + record entry |
| `catalog/data/navigation.ts` | Modify | Add nav item |

## Success Criteria
- Popover renders in catalog demo
- ColorPicker dropdown works inside SidePanel without clipping
- Select dropdown works inside SidePanel without clipping
- Click-outside and Escape still close dropdowns
- Tests pass
- Build passes cleanly
