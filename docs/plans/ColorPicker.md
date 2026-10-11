# Feature Plan: ColorPicker

## Summary
A color picker input that lets users select a color via a visual color wheel or by typing a hex value directly. Displays a preview swatch of the selected color. Follows the existing Input visual pattern with label, border, and focus ring. Lives in `src/primitives/ColorPicker/`.

## Goals
- Provide a hex text input with `#` prefix for direct color entry
- Provide a color wheel popup for visual color selection
- Show a live preview swatch of the currently selected color
- Follow existing Input visual patterns (label, error, helperText, disabled)
- Controlled component with `value`/`onChange` using hex string values

## Out of Scope
- Alpha/opacity channel
- RGB/HSL text input modes (hex only)
- Preset color swatches/palette
- Eyedropper/screen picker tool

## Technical Approach
| Element | Implementation |
|---|---|
| Trigger input | Text input styled like Input, with swatch preview and hex value |
| Color wheel popup | Dropdown panel (Select pattern) with canvas-based HSL color wheel |
| Hue ring | Canvas ring showing full hue spectrum, click/drag to select hue |
| Saturation/lightness area | Inner gradient square for saturation + lightness selection |
| Hex input | Text input inside popup for direct hex entry |
| Preview swatch | Small colored square next to the input, showing current color |
| Click-outside close | useRef + document mousedown listener (Select pattern) |
| Escape to close | document keydown listener (Select pattern) |

Key decisions:
- Folder: `src/primitives/ColorPicker/`
- Composed from: none (custom canvas rendering)
- Token usage: `--admin-input-height-md`, `--admin-input-background`, `--admin-input-border-focus`, `--admin-radius-md`, `--admin-space-s`
- Canvas-based wheel avoids external dependencies
- `value` is always a 7-char hex string like `#ff0000`

## Component Decomposition
| Sub-component | Location | Exported? | Purpose |
|---|---|---|---|
| `ColorPicker` | `src/primitives/ColorPicker/ColorPicker.tsx` | Yes | Main controlled input with popup trigger |
| `ColorWheel` | `src/primitives/ColorPicker/ColorWheel.tsx` | No | Internal canvas-based hue ring + saturation/lightness square |

Decomposition rationale: The canvas rendering logic for the color wheel is complex enough (~80+ lines) to warrant separation from the main component's input/popup logic.

## Key Files
| File | Change Type | Notes |
|---|---|---|
| `src/primitives/ColorPicker/ColorPicker.tsx` | New | Main component with input, swatch preview, popup |
| `src/primitives/ColorPicker/ColorWheel.tsx` | New | Internal canvas hue ring + sat/light area |
| `src/primitives/ColorPicker/ColorPicker.module.css` | New | Scoped styles using --admin-* tokens |
| `src/primitives/ColorPicker/ColorPicker.test.tsx` | New | Tests |
| `src/primitives/ColorPicker/index.ts` | New | Barrel export |
| `src/primitives/index.ts` | Modify | Add export |
| `src/index.ts` | Modify | Add ColorPicker to primitives export |
| `catalog/demos/primitives/ColorPickerDemo.tsx` | New | Catalog demo |
| `catalog/demos/primitives/index.ts` | Modify | Add demo export |
| `catalog/demos/index.ts` | Modify | Add import + demos entry |
| `catalog/data/navigation.ts` | Modify | Add nav item |
| `docs/plans/ColorPicker.md` | New | This document |

## Risks & Unknowns
- Canvas rendering complexity for the color wheel; need accurate HSL-to-hex math
- Touch/pointer event handling on canvas for drag interaction
- Ensuring hex input validation doesn't block valid partial inputs while typing

## Success Criteria
- Component renders in catalog with color wheel and hex input modes
- Zero raw CSS values — all --admin-* tokens
- Tests pass (rendering, hex input, popup open/close, disabled state, accessibility)
- Build passes cleanly
