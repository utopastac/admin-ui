# Feature Plan: EditableText

## Summary
A single-line text label primitive that swaps to an input on double-click. Commits on Enter or blur (with a non-empty value), reverts on Escape or empty commit. The display `<span>` and the edit `<input>` share identical typography, padding, border, and height so that swapping between them causes zero layout shift across all supported sizes.

## Goals
- Inline rename affordance without a separate edit UI
- Drop-in label replacement with `value` + `onChange` control
- Zero pixel jitter when toggling display ↔ edit at any size
- Supports admin-ui size aliases (`s/sm/small`, `m/md/medium`, `l/lg/large`) via `resolveSize`
- Keyboard-accessible: `Enter` on span also enters edit mode
- Full edit-lifecycle callbacks: `onEditStart`, `onEditEnd(reason)`, `onCancel`

## Out of Scope
- Multi-line editing
- Rich text / formatting
- Validation beyond "empty reverts"
- Auto-grow width beyond the natural content width
- Adding editability to the existing `Text` primitive

## Technical Approach

| Element | Implementation |
|---|---|
| Display mode | `<span role="button" tabIndex={0}>` with shared `.field` class |
| Edit mode | `<input type="text">` with the same `.field` class |
| Size variants | Three CSS modifier classes (`.sm`, `.md`, `.lg`) resolved from the `size` prop via `resolveSize` |
| Dimension match | Shared `.field` base class sets identical font via `@mixin type-body-*`, identical padding, `border: 1px solid transparent`, `box-sizing: border-box`, identical `min-height` per size. When entering edit mode, the span's current `offsetWidth` is captured and pinned on the input via inline style so the input cannot collapse below the previous label width |
| Commit | On `Enter` or blur with non-empty trimmed draft: call `onChange(draft)`, exit edit mode, fire `onEditEnd('commit')` |
| Revert | On `Escape` or blur with empty/whitespace-only draft: exit edit mode without calling `onChange`, fire `onEditEnd('cancel')` and `onCancel` |
| Selection | On entering edit mode, `input.focus()` + `input.select()` to pre-select existing text |
| Hover affordance | Span gets `background: var(--admin-interactive-hover)` on hover (not when disabled) |
| Disabled | Renders plain `<span>` with no `role`/`tabIndex`, no hover background, no double-click handler |

Key decisions:
- **Folder:** `src/primitives/EditableText/`
- **Composed from:** None. This is a leaf primitive — composing `Input` would drag in label/helper/error scaffolding that would break dimension match.
- **Token usage:**
  - Typography mixin per size: `type-body-xs` (sm), `type-body-s` (md), `type-body-m` (lg) — matches admin-ui body scale
  - Text color: `var(--admin-text-primary)`
  - Hover background: `var(--admin-interactive-hover)`
  - Focus ring on input: `var(--admin-border-highlight)` via 1px solid border (replaces the transparent border on the span)
  - Border radius: `var(--admin-radius-xs)`
  - Padding: `0 var(--admin-space-xs)` so span and input share the same horizontal padding
- **`resolveSize`:** import from `../../utils/resolveSize` — returns `'sm' | 'md' | 'lg'`
- **Props type export:** `EditableTextProps` alongside default export

## Component Decomposition
No decomposition — component is simple enough to implement as a single file.

Decomposition rationale: The whole component is a single node with two rendering modes toggled by one piece of internal state. Splitting display and edit into sub-components would just shuffle the state plumbing without making anything more readable.

## Key Files
| File | Change Type | Notes |
|---|---|---|
| `src/primitives/EditableText/EditableText.tsx` | New | Component implementation |
| `src/primitives/EditableText/EditableText.module.css` | New | Shared `.field` + `.sm`/`.md`/`.lg` size modifiers + `.editing` modifier |
| `src/primitives/EditableText/EditableText.test.tsx` | New | Behavior tests |
| `src/primitives/EditableText/index.ts` | New | `export { default } from './EditableText'; export type { EditableTextProps } from './EditableText';` |
| `src/primitives/index.ts` | Modify | Add `EditableText` default and `EditableTextProps` type re-exports |
| `src/index.ts` | Modify | Add `EditableText` and `EditableTextProps` to the primitives re-export lines |
| `catalog/demos/primitives/EditableTextDemo.tsx` | New | Catalog demo: basic, all three sizes stacked (visual zero-shift proof), disabled, with placeholder, with all callbacks wired to a log |
| `catalog/demos/primitives/index.ts` | Modify | Add `EditableTextDemo` export |
| `catalog/demos/index.ts` | Modify | Add import + `'editable-text': EditableTextDemo` record entry |
| `catalog/data/navigation.ts` | Modify | Insert `{ id: 'editable-text', label: 'EditableText' }` between `empty-state` and `field-label` |
| `docs/plans/EditableText.md` | New | This document |

## Props
```ts
export interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  size?: 's' | 'sm' | 'small' | 'm' | 'md' | 'medium' | 'l' | 'lg' | 'large';
  disabled?: boolean;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  onEditStart?: () => void;
  onEditEnd?: (reason: 'commit' | 'cancel') => void;
  onCancel?: () => void;
}
```

## Risks & Unknowns
- **Sub-pixel jitter** — shared CSS class should eliminate most drift, and pinning the input's width via the measured `offsetWidth` handles the rest. If a single-pixel shift still appears in practice, fall back to also pinning `height` from `getBoundingClientRect()`.
- **Input browser defaults** — input carries implicit styles (margin, line-height, background). The `.field` class resets all of these explicitly.
- **Focus-ring placement** — because the span's border is transparent and the input's border is colored, the visual footprint is identical.

## Success Criteria
- Double-click on span → swaps to input with value pre-selected, fires `onEditStart`
- `Enter` with non-empty value → `onChange(value)` fires, exits edit mode, `onEditEnd('commit')` fires
- `Escape` → exits without `onChange`, `onCancel` + `onEditEnd('cancel')` fire
- Blur with non-empty value → commit path
- Blur with empty/whitespace value → cancel path
- Keyboard `Enter` on the span → same as double-click
- `disabled` → span is plain, no role/tabIndex, no hover, double-click does nothing
- All three sizes render at the correct typography scale
- No visual pixel shift between display and edit at any size (verified in catalog demo)
- All tests pass; `npm run build` succeeds; component appears in catalog
