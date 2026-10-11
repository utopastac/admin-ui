# Feature Plan: TimePicker

## Summary
A time picker input with a scrollable dropdown of time slots. Supports configurable 12-hour and 24-hour formats. The dropdown shows time options at a configurable interval (e.g., every 15 or 30 minutes). Follows the existing Input visual pattern. Lives in `src/primitives/TimePicker/`.

## Goals
- Text input for direct time entry with format validation
- Dropdown of selectable time slots at configurable intervals
- Configurable 12h (AM/PM) or 24h format
- Min/max time constraints to disable out-of-range slots
- Controlled component following library conventions (`value`/`onChange` with string values)
- Follow existing Input visual patterns

## Out of Scope
- Seconds precision (hours and minutes only)
- Analog clock face picker
- Combined DateTime picker (use DatePicker + TimePicker separately)
- Timezone selection

## Technical Approach
| Element | Implementation |
|---|---|
| Trigger input | Text input styled like Input, with clock icon (lucide-react `Clock`) |
| Time slots dropdown | Dropdown panel (Select pattern) with scrollable list of time options |
| Time slot items | Buttons at each interval, with selected/disabled states |
| Format display | 12h shows "9:00 AM", 24h shows "09:00" |
| Direct input | User can type time directly; validated on blur |
| Click-outside close | useRef + document mousedown listener (Select pattern) |
| Escape to close | document keydown listener (Select pattern) |

Key decisions:
- Folder: `src/primitives/TimePicker/`
- Composed from: none (follows Select dropdown pattern)
- Token usage: `--admin-input-height-md`, `--admin-input-background`, `--admin-input-border-focus`, `--admin-radius-md`, `--admin-space-s`
- Props API:
  - `value: string` — HH:mm format (24h internal), empty string for no selection
  - `onChange: (value: string) => void` — always emits HH:mm (24h)
  - `format?: '12h' | '24h'` — display format (default `'24h'`)
  - `interval?: number` — minutes between slots (default `30`)
  - `min?: string` — minimum time (HH:mm)
  - `max?: string` — maximum time (HH:mm)
- Internal value is always 24h format; display adapts to format prop
- Time slots are generated from interval, filtered by min/max

## Component Decomposition
No decomposition — component is simple enough to implement as a single file. It closely follows the Select component's pattern (input trigger + scrollable dropdown list) and should stay under ~100 lines of TSX.

## Key Files
| File | Change Type | Notes |
|---|---|---|
| `src/primitives/TimePicker/TimePicker.tsx` | New | Component with input and time slots dropdown |
| `src/primitives/TimePicker/TimePicker.module.css` | New | Scoped styles using --admin-* tokens |
| `src/primitives/TimePicker/TimePicker.test.tsx` | New | Tests |
| `src/primitives/TimePicker/index.ts` | New | Barrel export |
| `src/primitives/index.ts` | Modify | Add export |
| `src/index.ts` | Modify | Add TimePicker to primitives export |
| `catalog/demos/primitives/TimePickerDemo.tsx` | New | Catalog demo with format and interval variants |
| `catalog/demos/primitives/index.ts` | Modify | Add demo export |
| `catalog/demos/index.ts` | Modify | Add import + demos entry |
| `catalog/data/navigation.ts` | Modify | Add nav item |
| `docs/plans/TimePicker.md` | New | This document |

## Risks & Unknowns
- Time parsing edge cases when user types directly (partial input, invalid formats)
- Scroll-to-selected behavior in the dropdown when opening

## Success Criteria
- Component renders in catalog with 12h, 24h, and custom interval demos
- Time slots dropdown shows correct options based on format and interval
- Min/max constraints disable out-of-range slots
- Zero raw CSS values — all --admin-* tokens
- Tests pass (rendering, slot selection, format display, direct input, disabled, accessibility)
- Build passes cleanly
