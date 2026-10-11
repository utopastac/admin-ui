# Feature Plan: DatePicker

## Summary
A date picker input with a calendar dropdown popup. Supports single date and date range selection modes. Accepts min/max date constraints. Follows the existing Input visual pattern with label, error, helperText, and disabled support. Lives in `src/primitives/DatePicker/`.

## Goals
- Single date selection with calendar dropdown
- Date range selection mode via `mode="range"` prop
- Month/year navigation in calendar header
- Min/max date constraints to disable out-of-range dates
- Controlled component following library conventions (`value`/`onChange` with string values)
- Follow existing Input visual patterns

## Out of Scope
- DateTime combined mode (use DatePicker + TimePicker separately)
- Multi-month calendar view
- Week number display
- Localization/i18n (month and day names are English)
- Year picker grid (navigate month by month)

## Technical Approach
| Element | Implementation |
|---|---|
| Trigger input | Read-only text input styled like Input, click opens calendar |
| Calendar icon | lucide-react `Calendar` icon in the input |
| Calendar popup | Dropdown panel (Select pattern) with month grid |
| Month/year header | Navigation row with prev/next arrows (lucide-react ChevronLeft/ChevronRight) |
| Day grid | 7-column CSS grid with day-of-week headers (Su Mo Tu...) |
| Day cells | Buttons with hover/selected/today/disabled/in-range states |
| Range selection | First click sets start, second click sets end; highlight range between |
| Click-outside close | useRef + document mousedown listener (Select pattern) |
| Escape to close | document keydown listener (Select pattern) |

Key decisions:
- Folder: `src/primitives/DatePicker/`
- Composed from: none (custom calendar rendering)
- Token usage: `--admin-input-height-md`, `--admin-input-background`, `--admin-input-border-focus`, `--admin-radius-md`, `--admin-space-s`, `--admin-surface-highlight` for selected, `--admin-surface-info-subtle` for range highlight
- Props API:
  - `mode?: 'single' | 'range'` (default `'single'`)
  - Single: `value: string` (YYYY-MM-DD or empty), `onChange: (value: string) => void`
  - Range: `value: [string, string]`, `onChange: (value: [string, string]) => void`
- Date values use ISO format strings (YYYY-MM-DD) to match the library's string-based convention
- No external date library — use native Date for calendar math

## Component Decomposition
| Sub-component | Location | Exported? | Purpose |
|---|---|---|---|
| `DatePicker` | `src/primitives/DatePicker/DatePicker.tsx` | Yes | Main controlled input with popup trigger and mode handling |
| `Calendar` | `src/primitives/DatePicker/Calendar.tsx` | No | Internal calendar grid with month navigation and day selection |

Decomposition rationale: The calendar grid with its navigation, day rendering, and range selection logic is substantial (~120+ lines) and benefits from separation from the input/popup trigger logic.

## Key Files
| File | Change Type | Notes |
|---|---|---|
| `src/primitives/DatePicker/DatePicker.tsx` | New | Main component with input trigger, mode handling |
| `src/primitives/DatePicker/Calendar.tsx` | New | Internal calendar grid with navigation |
| `src/primitives/DatePicker/DatePicker.module.css` | New | Scoped styles using --admin-* tokens |
| `src/primitives/DatePicker/DatePicker.test.tsx` | New | Tests |
| `src/primitives/DatePicker/index.ts` | New | Barrel export |
| `src/primitives/index.ts` | Modify | Add export |
| `src/index.ts` | Modify | Add DatePicker to primitives export |
| `catalog/demos/primitives/DatePickerDemo.tsx` | New | Catalog demo with single and range modes |
| `catalog/demos/primitives/index.ts` | Modify | Add demo export |
| `catalog/demos/index.ts` | Modify | Add import + demos entry |
| `catalog/data/navigation.ts` | Modify | Add nav item |
| `docs/plans/DatePicker.md` | New | This document |

## Risks & Unknowns
- Calendar math edge cases (month boundaries, leap years, first day of week)
- Range selection UX: hover preview of range while selecting second date
- Keyboard navigation within the calendar grid (arrow keys, Enter to select)

## Success Criteria
- Component renders in catalog with single and range mode demos
- Calendar navigates months correctly with proper day grid layout
- Min/max constraints disable out-of-range dates
- Range mode highlights the selected range
- Zero raw CSS values — all --admin-* tokens
- Tests pass (rendering, date selection, range selection, navigation, disabled, accessibility)
- Build passes cleanly
