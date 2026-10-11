# Feature Plan: RichTextEditor

## Summary
RichTextEditor is a self-contained rich text editing module that renders a formatting toolbar above a `contentEditable` editing area. The toolbar includes a heading-level dropdown (Paragraph, H1, H2, H3), Bold and Italic toggle buttons, and a Link button that expands an inline URL input within the toolbar. The component tracks active formatting state via `selectionchange` events and exposes `value`/`onChange` (HTML string) to the parent.

## Goals
- Provide a fully self-contained rich text editor requiring no external editor library
- Toolbar reflects live formatting state (Bold/Italic pressed, heading level shown)
- Link insertion via inline URL input in the toolbar — no external popover needed
- Uses existing `ToolbarButton` and `Select` primitives
- Clean `value` / `onChange` API for the parent

## Out of Scope
- Image or file upload
- Tables, lists, or other block formatting beyond headings
- Undo/redo history controls
- Collaboration / multi-user features
- Mobile-optimised touch toolbar
- Serialisation to anything other than HTML (Markdown, JSON)

## Technical Approach
| Element | Implementation |
|---|---|
| Toolbar container | `<div>` with flex layout using `--admin-space-xs` gap |
| Heading dropdown | Existing `Select` component, `size="sm"`, options: Paragraph/H1/H2/H3 |
| Bold / Italic buttons | `ToolbarButton` with `pressed` prop bound to `queryCommandState` |
| Link button | `ToolbarButton`, click reveals `RichTextLinkInput` inline in toolbar |
| Link URL input | `RichTextLinkInput` sub-component: text input + confirm/cancel buttons |
| Editable area | `<div contentEditable>` with `onInput` → fires `onChange(el.innerHTML)` |
| Active state tracking | `selectionchange` event on `document`, reads `queryCommandState('bold')` etc. |
| Formatting commands | `document.execCommand('bold')`, `execCommand('italic')`, `execCommand('createLink')`, `execCommand('formatBlock')` |
| Initial value | Set via `dangerouslySetInnerHTML` on first render (uncontrolled after mount) |

Key decisions:
- Folder: `src/primitives/RichTextEditor/`
- Composed from: `ToolbarButton`, `Select` (existing primitives)
- Token usage: `--admin-border-subtle` for editor border, `--admin-background-primary` for editor bg, `--admin-text-primary` for content, `--admin-space-xs/s/m` for spacing, `--admin-radius-md` for corners, `--admin-input-border` / `--admin-input-border-focus` for input in link form

## Component Decomposition

| Sub-component | Location | Exported? | Purpose |
|---|---|---|---|
| `RichTextEditor` | `src/primitives/RichTextEditor/RichTextEditor.tsx` | Yes | Main public component — composes toolbar + editable area, owns selection state |
| `RichTextToolbar` | `src/primitives/RichTextEditor/RichTextToolbar.tsx` | No | Toolbar UI — heading Select + Bold/Italic/Link ToolbarButtons + conditional RichTextLinkInput |
| `RichTextLinkInput` | `src/primitives/RichTextEditor/RichTextLinkInput.tsx` | No | Inline URL input form shown when Link button is active |

Decomposition rationale: The toolbar and link input have enough distinct props and visual complexity to justify splitting, while remaining private to the RichTextEditor folder since they have no use outside this component.

## Key Files
| File | Change Type | Notes |
|---|---|---|
| `src/primitives/RichTextEditor/RichTextEditor.tsx` | New | Main component; contentEditable ref, selectionchange tracking, value/onChange |
| `src/primitives/RichTextEditor/RichTextEditor.module.css` | New | Editor wrapper + editable area styles |
| `src/primitives/RichTextEditor/RichTextToolbar.tsx` | New | Toolbar with Select + ToolbarButtons + conditional link input |
| `src/primitives/RichTextEditor/RichTextToolbar.module.css` | New | Toolbar layout styles |
| `src/primitives/RichTextEditor/RichTextLinkInput.tsx` | New | Inline URL input + confirm/cancel |
| `src/primitives/RichTextEditor/RichTextLinkInput.module.css` | New | Link input form styles |
| `src/primitives/RichTextEditor/RichTextEditor.test.tsx` | New | Tests (Vitest + React Testing Library) |
| `src/primitives/RichTextEditor/index.ts` | New | Barrel export |
| `src/primitives/index.ts` | Modify | Add RichTextEditor export |
| `src/index.ts` | Modify | Add to primitives export line |
| `catalog/demos/primitives/RichTextEditorDemo.tsx` | New | Demo showing default, with initial value, disabled |
| `catalog/demos/primitives/index.ts` | Modify | Add RichTextEditorDemo export |
| `catalog/demos/index.ts` | Modify | Add import + demos Record entry |
| `catalog/data/navigation.ts` | Modify | Add nav item to Primitives section |
| `docs/plans/RichTextEditor.md` | New | This document |

## Props Interface

```typescript
export interface RichTextEditorProps {
  value?: string;           // Initial HTML content (uncontrolled after mount)
  onChange?: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: string;       // CSS value e.g. '160px', defaults to '160px'
  className?: string;
}
```

## Risks & Unknowns
- `document.execCommand` is deprecated but still functional in all major browsers; no viable pure-JS alternative without a library dependency
- `queryCommandState` may return inconsistent results across browsers for heading-level detection — fallback to checking the selection's closest block element tag name

## Success Criteria
- Component renders in catalog with default, pre-filled, and disabled demos
- Bold/Italic buttons reflect live selection state (pressed when cursor is in formatted text)
- Heading dropdown shows current heading level at cursor
- Link button reveals inline URL input; submitting inserts a link; cancel dismisses
- Zero raw CSS values — all `--admin-*` tokens
- Composes `ToolbarButton` and `Select`
- Tests pass (rendering, toolbar actions, onChange, disabled state)
- Build passes cleanly
