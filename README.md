# Admin UI

React component library providing design tokens, primitives, overlays, layout, and navigation components for admin interfaces.

The catalog — a tour of the components, advanced editors, and themes — is at [admin-ui.f-90.co.uk](https://admin-ui.f-90.co.uk).

## Installation

```bash
npm install github:utopastac/admin-ui#main
```

## Update to latest

```bash
npm update admin-ui
```

## Usage

```ts
import 'admin-ui/styles';
import { Button, SideNav, PageHeading } from 'admin-ui';
```

## Integration

### Pinning a version

The install command above tracks `main`. To pin to a release:

```bash
npm install github:utopastac/admin-ui#v0.12.2
```

### Entry point imports

Import the stylesheet and any optional entry points in your app's root file (e.g. `main.tsx`):

```ts
import 'admin-ui/styles';   // CSS custom properties and component styles (required)
import 'admin-ui/themes';   // Theme definitions — needed if you use data-admin-theme
```

Themes are applied via a `data-admin-theme` attribute. Values compose with word-match so multiple themes can be combined:

```html
<div data-admin-theme="ocean rounded">...</div>
```

### PostCSS setup

If you want to use the design-system mixins in your own CSS files, add `postcss-mixins` as a dev dependency:

```bash
npm install -D postcss-mixins
```

Then create a `postcss.config.js` in your project root:

```js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
  plugins: {
    'postcss-mixins': {
      mixinsFiles: [
        require.resolve('admin-ui/mixins'),
        require.resolve('admin-ui/component-mixins'),
      ],
    },
  },
};
```

This makes all `@mixin` definitions from `admin-ui/mixins` (typography, spacing, etc.) and `admin-ui/component-mixins` (focus-ring, popover-panel, input-base, etc.) available in your CSS files.

### Vite deduplication

Installing from GitHub bundles React inside admin-ui, which can cause "multiple React instances" errors at runtime. Add a `dedupe` entry to your Vite config to force a single copy:

```ts
// vite.config.ts
export default defineConfig({
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
});
```

---

## Components

### Form controls
| Component | Description |
|-----------|-------------|
| `Button` | Action button with variants (primary, secondary, destructive, ghost) and sizes |
| `ButtonGroup` | Renders a set of buttons as a joined group |
| `Checkbox` | Checkbox with optional label and configurable input position |
| `Radio` / `RadioGroup` | Radio button and controlled group |
| `Toggle` | Switch control with label positioning and size variants |
| `Input` | Text/number input with label, validation state, and helper text |
| `Textarea` | Multi-line input with resize control |
| `Select` | Dropdown with optional search and icon support |
| `SelectionList` | Scrollable list of selectable items |
| `Slider` | Single or range slider with step, labels, and optional tooltips |
| `CompactInput` | Compact inline input for editor/picker contexts, with scrub support on prefix |
| `SegmentedControl` | Mutually exclusive button group with icon and pinned-option support |
| `FieldGroup` | Form field wrapper providing label, error, and helper text layout |
| `FieldLabel` | Side-by-side label layout for any form control |
| `LabeledField` | Higher-level field layout combining label and control |

### Data display
| Component | Description |
|-----------|-------------|
| `Table` | Simple data table with striped and compact variants |
| `DataGrid` | Feature table with column sorting and row selection |
| `Avatar` | User avatar with image fallback to initials; xs–xl sizes |
| `Badge` | Small label with variant and size options |
| `Banner` | Inline alert with info/success/warning/error variants and optional dismiss |
| `Chip` | Small tag with optional avatar, icon, remove button, and selected state |
| `Card` | Container with optional hover and active states |
| `Carousel` | Slide carousel with configurable slides-per-view and loop |
| `Timeline` | Vertical timeline with items, icons, and avatars |
| `Skeleton` | Content placeholder with text, rect, and circle variants |
| `ProgressBar` | Linear progress indicator; xs–lg sizes |
| `ProgressCircular` | Circular progress indicator |
| `Spinner` | Loading spinner for inline and overlay use |
| `Divider` | Horizontal or vertical separator |
| `EmptyState` | Zero-data state with optional illustration, title, description, and actions slot |
| `Kbd` | Keyboard shortcut key indicator |

### Typography
| Component | Description |
|-----------|-------------|
| `Text` | Semantic typography with variant, color, and element control |
| `Blockquote` | Quoted text block |
| `BulletList` | Unordered list |
| `NumberedList` | Ordered list |
| `CodeBlock` | Code display with syntax highlighting via highlight.js |

### Pickers & editors
| Component | Description |
|-----------|-------------|
| `DatePicker` | Single or range date selection with calendar UI |
| `TimePicker` | Time selection with 12h/24h format and interval control |
| `ColorPicker` | HSV color wheel with hex input and optional opacity control |
| `GradientPicker` | Linear/radial gradient editor with color stops; popover trigger mode |
| `ShadowEditor` | Box-shadow editor with bezel preview and presets |
| `AnimationPicker` | CSS animation editor with easing curve visualiser and presets |
| `RichTextEditor` | WYSIWYG editor with formatting toolbar; popover trigger mode |
| `PixelArtEditor` | Pixel canvas editor — paint, eraser, fill, shapes, pen, marquee (rect/ellipse/wand); popover trigger mode |

### Search & command
| Component | Description |
|-----------|-------------|
| `Command` / `CommandDialog` | Command palette with grouped results, keyboard navigation, and optional header slot |
| `GlobalSearch` | Full-page search with async results and configurable result renderer |
| `InlineSearch` | Compact inline search field |

### Utility primitives
| Component | Description |
|-----------|-------------|
| `Popover` | Floating panel anchored to a ref element with repositioning on resize |
| `Tabs` | Tab bar with active indicator and size variants |
| `Breadcrumb` | Navigation breadcrumbs with configurable separator |
| `ToolbarButton` | Small icon button for toolbars; inUse dot indicator |

### Overlays
| Component | Description |
|-----------|-------------|
| `Modal` | Centred dialog with optional header and footer |
| `AlertDialog` | Confirmation dialog with confirm/cancel actions and destructive variant |
| `SidePanel` | Slide-in panel from the right edge; overlay or push mode |
| `Toast` / `ToastStack` | Dismissible notifications with info/success/warning/error variants and configurable position |
| `Tooltip` | Hover-triggered tooltip with placement options and arrow |
| `ContextMenu` | Right-click context menu with icon support and controlled open state |

### Layout
| Component | Description |
|-----------|-------------|
| `AppLayout` | Full-page shell combining TopNav, SideNav, main content, and optional panel slot |
| `Stack` | Flexbox layout with gap, alignment, and wrap control |
| `Columns` | Fixed-count grid layout |
| `PageHeading` | Page title with description and actions slot |
| `SectionHeading` | Section title with size variants and actions slot |
| `PageFooter` | Footer bar with alignment and optional top border |
| `DocPage` | Markdown document renderer with copy and download actions |

### Navigation
| Component | Description |
|-----------|-------------|
| `TopNav` | Horizontal navigation bar with tabs, brand, and actions |
| `SideNav` | Vertical sidebar with collapsible sections, tabs, search, and collapse toggle |
| `Pagination` | Page navigation with numbered, buttons, or dots variants |

---

## Design Tokens

Import `admin-ui/styles` to get all tokens as `--admin-*` CSS custom properties:

| Category | Tokens |
|----------|--------|
| **Colors** | Semantic text, background, surface, border, and status (info/success/warning/error) tokens |
| **Typography** | 8-step scale (xs 12px → 4xl 36px); ui size 11px; PostCSS mixins for body, mono, and UI type |
| **Spacing** | xxl 48px, xl 24px, l 16px, m 12px, s 8px, xs 4px |
| **Radii** | sm, md, lg, xl, pill |
| **Shadows** | xs–xl shadow tokens; status-tinted shadow variants |

Additional entry points:

```ts
import 'admin-ui/mixins';           // PostCSS design-system mixins
import 'admin-ui/component-mixins'; // focus-ring, popover-panel, input-base, etc.
import 'admin-ui/themes';           // Theme definitions (data-admin-theme attribute)
```

Themes compose via word-match: `data-admin-theme="ocean rounded"`.

---

## Development

```bash
npm run dev        # Start catalog dev server
npm run build      # Type-check and build library
npm run typecheck  # Type-check only
npm test           # Run tests
npm run coverage   # Run tests with coverage report
```

Browse all components at http://localhost:5173 when the dev server is running.

---

## Changelog

| Version | Date | Summary |
|---------|------|---------|
| v0.19.3 | 2026-06-26 | Active state change |
| v0.19.2 | 2026-06-25 | Fixes to stark |
| v0.19.1 | 2026-06-25 | New theme |
| v0.19.0 | 2026-06-23 | New tokens and themes |
| v0.18.0 | 2026-04-19 | Add EditableText primitive (double-click to edit) |
| v0.17.6 | 2026-04-19 | PixelArtEditor fixes + shift-constrained drawing |
| v0.17.3 | 2026-04-18 | Add grid-size picker to PixelArtEditor (optional sizes + onSizeChange props) |
| v0.17.2 | 2026-04-18 | PixelArtEditor UX polish: rename Clear selection → Deselect, label download menu, drop clear-canvas dialog |
| v0.17.1 | 2026-04-18 | Add PNG export, confirm-before-clear dialog, and move Clear selection to context menu |
| v0.17.0 | 2026-04-18 | Split PixelArtEditor into hooks + sub-components; lint cleanup; Tooltip + SideNav updates |
| v0.16.4 | 2026-04-17 | Fix dark mode interactive-selected token contrast |
| v0.16.3 | 2026-04-17 | SideNav tabbed divider spans full tab-strip height |
| v0.16.2 | 2026-04-17 | SideNav refactor + keyboard nav + test fixes |
| v0.16.1 | 2026-04-17 | SideNav tab strip refinements |
| v0.16.0 | 2026-04-16 | Tabbed catalog navigation, Button startIcon/endIcon, AppLayout sideNavWidth |
| v0.15.1 | 2026-04-16 | Fix SideNav global search: hide tabs during search, combine tab/section headers with / |
| v0.15.0 | 2026-04-16 | Add globalSearchable to SideNav for cross-tab search above the tab strip |
| v0.14.2 | 2026-04-15 | Add bare prop to LinkList to remove section borders and padding |
| v0.14.1 | 2026-04-15 | Fix TopNavDropdown group header typography |
| v0.14.0 | 2026-04-15 | Add CardGrid and LinkList; TopNavDropdown; redesigned catalog |
| v0.13.5 | 2026-04-15 | Add ImagePicker; add --admin-text-placeholder token |
| v0.13.3 | 2026-04-15 | Add GlobalSearch to catalog TopNav, filter label/icon to SideNav, tighten TopNav right-side gap |
| v0.13.2 | 2026-04-15 | Add truncate prop to PageContents; add GlobalSearch to catalog TopNav; use filter label/icon in SideNav |
| v0.13.1 | 2026-04-15 | Add extractHeadings utility and automatic heading IDs to DocPage for PageContents integration |
| v0.13.0 | 2026-04-14 | Add PageContents navigation component with scroll-spy and two-level nesting |
| v0.12.2 | 2026-04-14 | Remove black-95; remap dark mode surface-extra-subtle to black-85 and surface-subtle to black-80 for better contrast |
| v0.12.1 | 2026-04-14 | Fix dark mode surface-subtle and surface-extra-subtle tokens: replace alpha with solid black-85/black-95 to prevent compounding on overlapping layers |
| v0.12.0 | 2026-04-14 | Remove framer-motion; replace animations with CSS keyframes; fix SideNav, DataGrid, Popover, and memo performance issues |
| v0.11.0 | 2026-04-14 | Add EmptyState component |
| v0.10.1 | 2026-04-14 | Add elliptical marquee, magic wand, and Alt+Delete fill shortcut to PixelArtEditor |
| v0.10.0 | 2026-04-14 | Selection-constrained drawing in PixelArtEditor |
| v0.9.9 | 2026-04-12 | Add xs size to ProgressBar; add catalog smoke tests |
| v0.9.8 | 2026-04-12 | Expose component-mixins (focus-ring, popover-panel, input-base, etc.) as admin-ui/component-mixins |
| v0.9.7 | 2026-04-12 | Add ProgressCircular component |
| v0.9.6 | 2026-04-08 | Fix Command highlight: remove CSS hover, use only JS active state |
| v0.9.5 | 2026-04-08 | Fix double-highlight in Command item list |
| v0.9.4 | 2026-04-08 | Add searchOnly flag to CommandGroup |
| v0.9.3 | 2026-04-08 | Add header slot to Command/CommandDialog |
| v0.9.2 | 2026-04-09 | Add swept hairstyle, xl Avatar size, and more sample avatars |
| v0.9.1 | 2026-04-06 | Add xs Avatar size; fix Chip avatar border-radius; add eyeSpacing to makeAvatar |
| v0.9.0 | 2026-04-06 | Add Chip and Timeline components; sample avatars; fix form control tokens |
| v0.8.6 | 2026-04-06 | Fix Tooltip to use portal and add arrow; add tooltip demos |
| v0.8.5 | 2026-04-06 | Add copy and download buttons to DocPage |
| v0.8.4 | 2026-04-05 | Add tooltip prop to Button, ToolbarButton, and SegmentedControl |
| v0.8.3 | 2026-04-05 | Fix SidePanel |
| v0.8.2 | 2026-04-05 | Fix GradientPicker |
| v0.8.1 | 2026-04-03 | Fix Toast test; add DecisionsPage to catalog |
| v0.8.0 | 2026-04-03 | Add Command, Kbd, Stack, Columns components and status border tokens |
| v0.7.3 | 2026-04-03 | Add centered and maxWidth props to DocPage |
| v0.7.2 | 2026-04-03 | Include mixins and themes in the CSS bundle |
| v0.7.1 | 2026-04-03 | Add undo/redo to context menu; fix right-click drawing |
| v0.7.0 | 2026-04-03 | Custom swatches + toolbar padding fix |
| v0.6.20 | 2026-04-02 | Adding pen tool |
| v0.6.19 | 2026-04-02 | Add undo/redo and shapes popover to PixelArtEditor |
| v0.6.18 | 2026-04-02 | Fix GradientPicker color picker popover not closing when gradient bar is clicked |
| v0.6.17 | 2026-04-02 | Add pinned options catalog demo to SegmentedControl |
| v0.6.16 | 2026-04-02 | Add pinned options to SegmentedControl and fix border-radius clipping |
| v0.6.14 | 2026-04-02 | Fix CompactInput prefixSlot not receiving scrub mousedown events |
| v0.6.13 | 2026-04-02 | Fix ContextMenu clicks closing parent Popover before action fires |
| v0.6.12 | 2026-04-02 | Add padding and extra-subtle bg to canvas area; default canvas to white |
| v0.6.11 | 2026-04-02 | Add xl shadow to PixelArtEditor popover and remove wrapper border |
| v0.6.10 | 2026-04-02 | Fix PixelArtEditor popover shadow clipping by applying it to the portal container |
| v0.6.9 | 2026-04-02 | Fix ContextMenu z-index so it renders above Popover |
| v0.6.8 | 2026-04-02 | Add SVG download button and right-click context menu to PixelArtEditor |
| v0.6.7 | 2026-04-02 | Remove min-width from PixelArtEditor popover and fix right/bottom grid border clipping |
| v0.6.6 | 2026-04-02 | Add shadow to PixelArtEditor when opened from a trigger |
| v0.6.5 | 2026-04-02 | Add offsetX and offsetY props to Popover and all trigger-based components |
| v0.6.4 | 2026-04-02 | Fix SegmentedControl scroll and add popoverWidth prop to PixelArtEditor |
| v0.6.3 | 2026-04-01 | Reduce PixelArtEditor trigger padding to 1px and add triggerHeight catalog demo |
| v0.6.2 | 2026-04-01 | Add triggerHeight prop to PixelArtEditor popover mode |
| v0.6.1 | 2026-04-01 | Fix PixelArtEditor popover canvas and add SegmentedControl horizontal scroll |
| v0.6.0 | 2026-04-01 | Add PixelArtEditor component |
| v0.5.2 | 2026-04-01 | Add LabeledField, size aliases, and missing tests for FieldLabel and ShadowEditor |
| v0.5.1 | 2026-03-31 | SidePanel header polish — smaller title and close button |
| v0.5.0 | 2026-03-31 | Fix invisible backdrop blocking mouse events; add push mode to SidePanel |
| v0.4.18 | 2026-03-31 | Select styling fix |
| v0.4.17 | 2026-03-31 | Cap RichTextEditor height in popover mode with overflow scroll |
| v0.4.16 | 2026-03-31 | Add actions slot to SidePanel header and panel-header-height token |
| v0.4.15 | 2026-03-31 | SegmentedControl CSS fix |
| v0.4.14 | 2026-03-30 | ContextMenu icon spacing and catalog example with icons |
| v0.4.13 | 2026-03-30 | Add icon support and controlled mode to ContextMenu |
| v0.4.12 | 2026-03-30 | Add onContextMenu callback to SideNavItemData |
| v0.4.11 | 2026-03-30 | Nest ToolbarButton CSS and add sm inUse dot sizing |
| v0.4.10 | 2026-03-30 | Add iOS easing preset to AnimationPicker |
| v0.4.9 | 2026-03-30 | Add ToolbarButton inUse prop with blue dot indicator |
| v0.4.8 | 2026-03-30 | Center SegmentedControl content |
| v0.4.7 | 2026-03-30 | Add icon support to SegmentedControl |
| v0.4.6 | 2026-03-30 | Add mono type tokens and mixins, shadow tokens |
| v0.4.5 | 2026-03-30 | Tokenize all hardcoded box-shadows |
| v0.4.4 | 2026-03-30 | AnimationPicker duration field always renders last |
| v0.4.3 | 2026-03-30 | AnimationPicker trigger ellipsis and Popover resize repositioning |
| v0.4.2 | 2026-03-30 | SegmentedControl sm height matches CompactInput |
| v0.4.1 | 2026-03-30 | Add onChangeState callback to AnimationPicker |
| v0.4.0 | 2026-03-29 | Add AnimationPicker component |
| v0.3.3 | 2026-03-29 | Add optional index number to SideNav child items |
| v0.3.2 | 2026-03-29 | Add numeric width to SidePanel |
| v0.3.1 | 2026-03-29 | GradientPicker popover trigger mode and UI refinements |
| v0.3.0 | 2026-03-29 | Add GradientPicker component |
| v0.2.2 | 2026-03-29 | Add optional icon support to SideNav tabs |
| v0.2.1 | 2026-03-28 | Move SideNav toggle to float outside the panel |
| v0.2.0 | 2026-03-28 | Add SideNav collapse toggle button |
| v0.1.3 | 2026-03-28 | Use type-body-ui on CompactInput prefix and input |
| v0.1.2 | 2026-03-28 | Add .admin-type-body-ui utility class to dist |
| v0.1.1 | 2026-03-28 | Add font-size-ui token (11px) |
