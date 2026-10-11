# Name: Admin UI
# Version: 0.1.0
# Ownership: pwright (personal project)
# Description: A React component library providing design tokens, primitives, overlays, layout, and navigation components for admin interfaces. Built with Vite library mode, producing a single ES module bundle with a single CSS file.


## Package Information

- **Package Name**: admin-ui
- **Language**: TypeScript
- **Installation**: Install directly from git (no npm registry publication)
  ```bash
  npm install github:utopastac/admin-ui
  ```
- **Requirements**: Node.js 18+, TypeScript 5.4+, React 18 or 19
- **Peer Dependencies**: `react`, `react-dom` (^18 || ^19)
- **Runtime Dependencies**: `framer-motion`, `highlight.js`, `lucide-react`, `react-markdown`, `remark-gfm`

## Core Imports

```typescript
// REQUIRED: Import the stylesheet first (single CSS bundle with all tokens and component styles)
import 'admin-ui/styles';

// Import components by name
import { Button, Input, Card, Text, SideNav, TopNav, Modal } from 'admin-ui';

// Import types alongside components
import { Select, Table, GlobalSearch } from 'admin-ui';
import type { SelectOption, TableColumn, GlobalSearchResultData } from 'admin-ui';

// Import PostCSS mixins for use in your own CSS Modules (optional)
import 'admin-ui/mixins';
```

## Quick Start

```typescript
import 'admin-ui/styles';
import { Button, Text, Card } from 'admin-ui';

function App() {
  return (
    <Card>
      <Text variant="heading-m" as="h2">Welcome</Text>
      <Text variant="body-m" color="secondary">Getting started with Admin UI.</Text>
      <Button variant="primary" onClick={() => console.log('clicked')}>
        Get Started
      </Button>
    </Card>
  );
}
```

## API

### Primitives

#### Button

```typescript { .api }
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';  // default: 'primary'
  size?: 'sm' | 'md' | 'lg';                     // default: 'md'
  disabled?: boolean;                              // default: false
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';           // default: 'button'
  className?: string;
  'aria-label'?: string;
}
```

#### ButtonGroup

```typescript { .api }
interface ButtonGroupProps {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';  // default: 'end'
  className?: string;
}
```

#### Text

```typescript { .api }
type TextVariant =
  | 'heading-xl' | 'heading-l' | 'heading-m' | 'heading-s' | 'heading-xs'
  | 'overline'
  | 'body-m' | 'body-s' | 'body-xs'
  | 'body-m-strong' | 'body-s-strong' | 'body-xs-strong';

type TextColor = 'primary' | 'secondary' | 'subtle' | 'highlight' | 'warning' | 'inverted-primary';

interface TextProps {
  variant: TextVariant;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'div' | 'li';  // default: 'span'
  color?: TextColor;       // default: 'primary'
  className?: string;
  children: React.ReactNode;
}
```

#### Input

```typescript { .api }
interface InputProps {
  type?: string;              // default: 'text'
  value: string;
  onChange: (value: string) => void;  // receives the string value, not the event
  label?: string;
  error?: string;
  helperText?: string;
  min?: number;
  max?: number;
  id?: string;
}
```

#### CompactInput

A compact inline input with a prefix label. Supports scrub interaction (drag on prefix to adjust number values).

```typescript { .api }
interface CompactInputProps {
  prefix: string;                          // displayed prefix text (e.g. "#", "px", "%")
  label?: string;
  labelPosition?: 'top' | 'left';         // default: 'top'
  type?: string;                           // default: 'text'
  value: string;
  onChange: (value: string) => void;
  error?: boolean;                         // default: false
  min?: number;
  max?: number;
  step?: number;                           // default: 1
  scrub?: boolean;                         // enable drag-to-scrub on prefix; default: false
  labelWidth?: number | string;
  id?: string;
  className?: string;
}
```

#### Select

```typescript { .api }
interface SelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;          // default: 'Select...'
  disabled?: boolean;             // default: false
  size?: 'sm' | 'md';            // default: 'md'
  className?: string;
  label?: string;
  labelPosition?: 'top' | 'left';
  labelWidth?: number | string;
  error?: string;
  helperText?: string;
  id?: string;
}
```

#### SegmentedControl

```typescript { .api }
interface SegmentedControlOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md';       // default: 'md'
  disabled?: boolean;         // default: false
  className?: string;
}
```

#### Checkbox

```typescript { .api }
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;   // default: false
  className?: string;
  id?: string;
}
```

#### Toggle

```typescript { .api }
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  labelPosition?: 'top' | 'left';    // default: 'left'
  labelWidth?: number | string;
  disabled?: boolean;                  // default: false
  size?: 'sm' | 'md';                 // default: 'md'
  className?: string;
  id?: string;
}
```

#### Slider

Supports single value or range (two thumbs).

```typescript { .api }
interface SliderProps {
  value: number | [number, number];
  onChange: (value: number | [number, number]) => void;
  min?: number;                        // default: 0
  max?: number;                        // default: 100
  step?: number;
  labels?: { start?: string; end?: string };
  stepLabels?: (string | number)[];
  showTooltip?: boolean;               // default: false
  tooltipFormat?: (value: number) => string;
  size?: 'sm' | 'md';                 // default: 'md'
  disabled?: boolean;                   // default: false
  className?: string;
  id?: string;
}
```

#### Card

```typescript { .api }
interface CardProps {
  children: React.ReactNode;
  active?: boolean;      // default: false
  hoverable?: boolean;   // default: true
  onClick?: () => void;
  className?: string;
}
```

#### Badge

```typescript { .api }
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'info';  // default: 'default'
  size?: 'sm' | 'md';                                      // default: 'md'
  children: React.ReactNode;
  className?: string;
}
```

#### Banner

```typescript { .api }
interface BannerProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  message: string;
  title?: string;
  icon?: LucideIcon;       // from lucide-react
  dismissible?: boolean;    // default: false
  onDismiss?: () => void;
  layout?: 'inline' | 'full';  // default: 'inline'
  className?: string;
}
```

#### Avatar

```typescript { .api }
interface AvatarProps {
  src?: string;                           // image URL; falls back to initials if missing or errors
  name: string;                           // used for initials fallback and title attribute
  size?: 'sm' | 'md' | 'lg';             // default: 'md'
  className?: string;
}
```

#### Tabs

```typescript { .api }
interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  size?: 'sm' | 'md';     // default: 'md'
  className?: string;
}
```

#### Table

Generic component supporting typed row data.

```typescript { .api }
interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  width?: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: string | ((row: T) => string);
  striped?: boolean;     // default: false
  compact?: boolean;     // default: false
  className?: string;
  onRowClick?: (row: T) => void;
}
```

#### Breadcrumb

```typescript { .api }
interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;   // default: '/'
  className?: string;
}
```

#### Tooltip

```typescript { .api }
interface TooltipProps {
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';  // default: 'top'
  delay?: number;                                       // ms; default: 0
  children: React.ReactElement;
  className?: string;
}
```

#### Popover

Portal-based popover that positions itself relative to an anchor element.

```typescript { .api }
interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  className?: string;
  matchWidth?: boolean;   // match width of anchor element; default: false
  overlap?: boolean;      // align top to anchor top instead of below; default: false
  role?: string;
  'aria-label'?: string;
}
```

#### FieldGroup

Wraps a form control with an optional label, error message, and helper text.

```typescript { .api }
interface FieldGroupProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;     // default: false
  children: React.ReactNode;
  className?: string;
}
```

#### FieldLabel

Renders a label alongside a child control with configurable layout (top or left-aligned).

```typescript { .api }
interface FieldLabelProps {
  label: string;
  size?: 'sm' | 'lg';                 // default: 'sm'
  labelPosition?: 'top' | 'left';     // default: 'top'
  labelWidth?: number | string;
  htmlFor?: string;
  disabled?: boolean;                   // default: false
  children: React.ReactNode;
  className?: string;
}
```

#### ToolbarButton

An icon-only button designed for toolbars and action bars. Uses lucide-react icons.

```typescript { .api }
interface ToolbarButtonProps {
  icon: LucideIcon;                       // a lucide-react icon component
  onClick?: () => void;
  size?: 'sm' | 'md';                     // default: 'md'
  pressed?: boolean;                       // when set, renders as toggle button with aria-pressed
  'aria-label'?: string;
  title?: string;
  className?: string;
}
```

#### GlobalSearch

A search input with keyboard-navigable dropdown results. Supports Cmd/Ctrl+K shortcut.

```typescript { .api }
interface GlobalSearchResultData {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

interface GlobalSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  results: GlobalSearchResultData[];
  onSelect: (id: string) => void;
  loading?: boolean;                 // default: false
  placeholder?: string;              // default: 'Search...'
  emptyMessage?: string;             // default: 'No matches'
  renderResult?: (result: GlobalSearchResultData) => React.ReactNode;
  shortcut?: boolean;                // enable Cmd/Ctrl+K; default: true
  className?: string;
}
```

#### DatePicker

Supports single date or date range selection with a calendar dropdown.

```typescript { .api }
interface DatePickerProps {
  mode?: 'single' | 'range';                     // default: 'single'
  value: string | [string, string];               // ISO date strings 'YYYY-MM-DD'
  onChange: (value: string | [string, string]) => void;
  min?: string;                                    // ISO date string
  max?: string;                                    // ISO date string
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;                              // default: false
  id?: string;
}
```

#### TimePicker

```typescript { .api }
interface TimePickerProps {
  value: string;                          // 24h format 'HH:MM'
  onChange: (value: string) => void;
  format?: '12h' | '24h';                 // default: '24h'
  interval?: number;                       // minutes between slots; default: 30
  min?: string;                            // 'HH:MM' format
  max?: string;                            // 'HH:MM' format
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;                      // default: false
  id?: string;
}
```

#### ColorPicker

A color picker with swatch preview, hex input, and popover color wheel.

```typescript { .api }
interface ColorPickerProps {
  value: string;                           // hex color string '#rrggbb'
  onChange: (value: string) => void;
  opacity?: number;                         // 0-1
  onOpacityChange?: (opacity: number) => void;
  label?: string;
  labelPosition?: 'top' | 'left';          // default: 'top'
  labelWidth?: number | string;
  error?: string;
  helperText?: string;
  disabled?: boolean;                       // default: false
  id?: string;
  swatches?: string[];                      // array of hex colors for quick selection
}
```

#### RichTextEditor

A contentEditable-based rich text editor with formatting toolbar. Supports inline and popover modes.

```typescript { .api }
interface RichTextEditorProps {
  value?: string;                            // HTML or markdown string
  onChange?: (output: string) => void;
  placeholder?: string;
  disabled?: boolean;                         // default: false
  minHeight?: string;                         // default: '160px'
  outputFormat?: 'html' | 'markdown';         // default: 'html'
  popover?: boolean;                          // render as popover trigger; default: false
  className?: string;
  actions?: React.ReactNode;                  // content between toolbar and editor area
}
```

#### ShadowEditor

A composite editor for phone bezel and drop shadow properties, rendered in a popover.

```typescript { .api }
interface PhoneShadow {
  bezelWidth: number;
  bezelColor: string;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  shadowColor: string;
  shadowOpacity: number;    // 0-1
}

interface ShadowEditorProps {
  value: PhoneShadow;
  onChange: (partial: Partial<PhoneShadow>) => void;  // partial update
  label?: string;
  labelPosition?: 'top' | 'left';
  labelWidth?: number | string;
}
```

#### SelectionList

A card-based selection list (like radio buttons rendered as cards).

```typescript { .api }
interface SelectionListItem {
  value: string;
  label: string;
  description?: string;
}

interface SelectionListProps {
  items: SelectionListItem[];
  value?: string;
  onChange?: (value: string) => void;
  columns?: 1 | 2 | 3;               // default: 1
  className?: string;
  'aria-label'?: string;
}
```

#### Carousel

```typescript { .api }
interface CarouselProps {
  children: React.ReactNode;           // each child is a slide
  slidesPerView?: number;              // default: 1
  gap?: number;                        // px; default: 16
  loop?: boolean;                      // default: false
  className?: string;
}
```

#### Blockquote

```typescript { .api }
interface BlockquoteProps {
  children: React.ReactNode;
  cite?: string;
  className?: string;
}
```

#### CodeBlock

Syntax-highlighted code block with copy button. Uses highlight.js.

```typescript { .api }
interface CodeBlockProps {
  children: string;                    // the code content
  language?: string;                   // highlight.js language identifier
  showLineNumbers?: boolean;           // default: false
  className?: string;
}
```

#### BulletList / NumberedList

```typescript { .api }
interface BulletListProps {
  items: string[];
  size?: 'sm' | 'md';       // default: 'md'
  className?: string;
}

interface NumberedListProps {
  items: string[];
  size?: 'sm' | 'md';       // default: 'md'
  start?: number;            // default: 1
  className?: string;
}
```

### Overlays

#### Modal

```typescript { .api }
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  headerBorder?: boolean;                    // default: true
  footerBorder?: boolean;                    // default: true
  maxWidth?: 'sm' | 'md' | 'lg' | 'full';   // default: 'md'
}
```

#### AlertDialog

```typescript { .api }
interface AlertDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  confirmLabel?: string;                     // default: 'Continue'
  cancelLabel?: string;                      // default: 'Cancel'
  variant?: 'default' | 'destructive';       // default: 'default'
}
```

#### SidePanel

```typescript { .api }
interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  width?: 'sm' | 'md' | 'lg' | 'xl';       // default: 'md'
}
```

#### ContextMenu

Wraps children and shows a right-click context menu.

```typescript { .api }
interface ContextMenuItem {
  label: string;
  onClick?: () => void;
  shortcut?: string;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
  separator?: boolean;                        // renders a divider instead of an item
}

interface ContextMenuProps {
  children: React.ReactNode;
  items: ContextMenuItem[];
  className?: string;
}
```

### Layout

#### PageHeading

```typescript { .api }
interface PageHeadingProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}
```

#### SectionHeading

```typescript { .api }
type SectionHeadingSize = 'lg' | 'md' | 'sm';

interface SectionHeadingProps {
  title: string;
  description?: string;
  size?: SectionHeadingSize;         // default: 'md'; renders h2/h3/h4 respectively
  actions?: React.ReactNode;
  className?: string;
}
```

#### DocPage

Renders a markdown string as styled HTML using react-markdown with GFM support.

```typescript { .api }
interface DocPageProps {
  content: string;         // markdown string
  className?: string;
}
```

#### PageFooter

```typescript { .api }
interface PageFooterProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';  // default: 'right'
  border?: boolean;                       // default: true
  className?: string;
}
```

### Navigation

#### TopNav

```typescript { .api }
type TopNavSize = 'sm' | 'lg';

interface TopNavTabData {
  id: string;
  label: string;
  separator?: boolean;          // renders a vertical divider before this tab
}

interface TopNavProps {
  brand?: React.ReactNode;
  onBrandClick?: () => void;
  tabs: TopNavTabData[];
  activeTabId?: string;
  onTabSelect?: (id: string) => void;
  actions?: React.ReactNode;    // right-side slot for ToolbarButtons, etc.
  search?: React.ReactNode;     // slot before actions for search input
  size?: TopNavSize;             // default: 'sm'
  className?: string;
}
```

#### SideNav

```typescript { .api }
interface SideNavItemData {
  id: string;
  label: string;
  detail?: string;                    // right-aligned detail text (e.g. date)
  children?: SideNavItemData[];       // nested sub-items
}

interface SideNavSectionData {
  label?: string;                     // section heading; omit for ungrouped
  items: SideNavItemData[];
  collapsible?: boolean;              // default: false
  defaultOpen?: boolean;              // default: true; only used when collapsible
}

interface SideNavTopLevelSectionData {
  label: string;                      // accordion header label
  defaultOpen?: boolean;
  sections: SideNavSectionData[];
}

interface SideNavProps {
  sections: SideNavSectionData[];
  topLevelSections?: SideNavTopLevelSectionData[];  // accordion-style top-level groups
  activeId?: string;
  onSelect: (id: string) => void;
  searchable?: boolean;                              // default: false
  searchPlaceholder?: string;                        // default: 'Search...'
  searchIconType?: 'search' | 'filter';              // default: 'search'
  footer?: React.ReactNode;                          // fixed bottom content
  className?: string;
}
```

#### Pagination

```typescript { .api }
type PaginationVariant = 'buttons' | 'numbered' | 'dots';

interface PaginationProps {
  currentPage: number;                    // 1-based
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: PaginationVariant;             // default: 'numbered'
  className?: string;
}
```

## Design Token System

All tokens use the `--admin-*` prefix. Components reference semantic tokens only, never primitive values directly.

### Token Architecture

```
Primitive tokens (raw colors)  -->  Semantic tokens (meaningful names)  -->  Component styles
     --admin-blue-100                  --admin-text-highlight                 color: var(--admin-text-highlight)
```

### Semantic Color Tokens

| Category | Token | Light Default | Purpose |
|----------|-------|---------------|---------|
| **Surface** | `--admin-surface-primary` | white | Main background |
| | `--admin-surface-secondary` | gray-70 | Secondary surfaces |
| | `--admin-surface-subtle` | gray-5 | Subtle backgrounds |
| | `--admin-surface-extra-subtle` | gray-2 | Very subtle backgrounds |
| | `--admin-surface-action` | black | Action surfaces (primary buttons) |
| | `--admin-surface-highlight` | brand green | Highlight/accent surfaces |
| **Text** | `--admin-text-primary` | black | Primary body text |
| | `--admin-text-secondary` | gray-70 | Secondary text |
| | `--admin-text-subtle` | gray-50 | Muted text |
| | `--admin-text-highlight` | blue-100 | Links, active elements |
| | `--admin-text-warning` | orange-150 | Warning text |
| | `--admin-text-success` | green-150 | Success text |
| | `--admin-text-error` | red-150 | Error text |
| | `--admin-text-inverted-primary` | white | Text on dark surfaces |
| **Background** | `--admin-background-primary` | white | Page background |
| | `--admin-background-subtle` | gray-5 | Subtle section background |
| | `--admin-background-highlight` | brand green | Highlight background |
| | `--admin-background-annotation` | orange-50 | Annotation highlight |
| **Border** | `--admin-border-prominent` | black | Strong borders |
| | `--admin-border-subtle` | black 10% | Default borders |
| | `--admin-border-highlight` | blue-100 | Focus/active borders |
| **Status** | `--admin-surface-warning-primary` | orange-100 | Warning status |
| | `--admin-surface-success-primary` | green-100 | Success status |
| | `--admin-surface-error-primary` | red-100 | Error status |
| | `--admin-surface-info-primary` | blue-100 | Info status |

### Component-Specific Tokens (Customizable)

These tokens can be overridden by consumers to adjust layout:

| Token | Default | Description |
|-------|---------|-------------|
| `--admin-topnav-padding` | `4rem` (64px) | Horizontal padding of the top navigation bar |
| `--admin-sidenav-padding` | `4rem` (64px) | Padding of the side navigation |
| `--admin-input-height-sm` | `2rem` (32px) | Height of small inputs |
| `--admin-input-height-md` | `2.25rem` (36px) | Height of medium inputs |
| `--admin-input-background` | `--admin-surface-extra-subtle` | Input background color |
| `--admin-input-border` | `--admin-border-subtle` | Input border color |
| `--admin-input-border-focus` | `--admin-border-highlight` | Input border on focus |

### Spacing Scale

| Token | Value |
|-------|-------|
| `--admin-space-xxs` | 0.25rem (4px) |
| `--admin-space-xs` | 0.25rem (4px) |
| `--admin-space-s` | 0.5rem (8px) |
| `--admin-space-m` | 1rem (16px) |
| `--admin-space-l` | 1.25rem (20px) |
| `--admin-space-xl` | 2rem (32px) |
| `--admin-space-xxl` | 4rem (64px) |

### Typography Scale

| Token | Value |
|-------|-------|
| `--admin-font-size-xs` | 0.75rem (12px) |
| `--admin-font-size-s` | 0.8rem (12.8px) |
| `--admin-font-size-m` | 0.875rem (14px) |
| `--admin-font-size-l` | 1rem (16px) |
| `--admin-font-size-xl` | 1.25rem (20px) |
| `--admin-font-size-2xl` | 1.5rem (24px) |
| `--admin-font-size-3xl` | 1.875rem (30px) |
| `--admin-font-size-4xl` | 2.25rem (36px) |

### Font Weights

| Token | Value |
|-------|-------|
| `--admin-font-weight-body` | 400 (Regular) |
| `--admin-font-weight-medium` | 500 (Medium) |
| `--admin-font-weight-emphasis` | 600 (Semibold) |

### Border Radius

| Token | Value |
|-------|-------|
| `--admin-radius-sm` | 8px |
| `--admin-radius-md` | 10px |
| `--admin-radius-lg` | 12px |
| `--admin-radius-xl` | 16px |

### Dark Mode

Dark mode is activated by setting `data-theme="dark"` on any ancestor element. All semantic tokens are automatically remapped.

```html
<div data-theme="dark">
  <!-- All admin-ui components inside here use dark tokens -->
</div>
```

### PostCSS Mixins (for custom components)

Import `admin-ui/mixins` to use typography mixins in your own CSS Modules:

```css
@import 'admin-ui/mixins';

.myHeading {
  @mixin type-heading-m;
}

.myBody {
  @mixin type-body-m;
}
```

Available mixins: `type-heading-xl`, `type-heading-l`, `type-heading-m`, `type-heading-s`, `type-heading-xs`, `type-overline`, `type-body-l`, `type-body-m`, `type-body-s`, `type-body-xs`, `type-body-m-strong`, `type-body-s-strong`, `type-body-xs-strong`, `weight-regular`, `weight-medium`, `weight-semibold`.


## Usage

### Admin Shell Layout

A typical admin interface with TopNav, SideNav, and content area:

```typescript
import 'admin-ui/styles';
import { TopNav, SideNav, PageHeading, Button } from 'admin-ui';
import { Settings, Bell } from 'lucide-react';

function AdminShell() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activePage, setActivePage] = useState('overview');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopNav
        brand={<span>My Admin</span>}
        tabs={[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'users', label: 'Users' },
          { id: 'settings', label: 'Settings', separator: true },
        ]}
        activeTabId={activeTab}
        onTabSelect={setActiveTab}
        actions={
          <>
            <ToolbarButton icon={Bell} aria-label="Notifications" />
            <ToolbarButton icon={Settings} aria-label="Settings" />
          </>
        }
      />
      <div style={{ display: 'flex', flex: 1 }}>
        <SideNav
          sections={[
            {
              label: 'Overview',
              items: [
                { id: 'overview', label: 'Overview' },
                { id: 'analytics', label: 'Analytics' },
              ],
            },
            {
              label: 'Management',
              items: [
                { id: 'users', label: 'Users' },
                { id: 'roles', label: 'Roles' },
              ],
              collapsible: true,
            },
          ]}
          activeId={activePage}
          onSelect={setActivePage}
          searchable
        />
        <main style={{ flex: 1, padding: 'var(--admin-space-xl)' }}>
          <PageHeading
            title="Overview"
            description="System dashboard"
            actions={<Button>Create New</Button>}
          />
          {/* Content here */}
        </main>
      </div>
    </div>
  );
}
```

### Form with Various Controls

```typescript
import 'admin-ui/styles';
import {
  Input, Select, Toggle, Checkbox, Slider, DatePicker,
  TimePicker, ColorPicker, FieldGroup, ButtonGroup, Button,
} from 'admin-ui';

function SettingsForm() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('admin');
  const [enabled, setEnabled] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [threshold, setThreshold] = useState(50);
  const [startDate, setStartDate] = useState('2026-01-15');
  const [time, setTime] = useState('09:00');
  const [accentColor, setAccentColor] = useState('#0033d9');

  return (
    <form>
      <Input
        label="Name"
        value={name}
        onChange={setName}
        helperText="Enter your display name"
      />

      <Select
        label="Role"
        options={[
          { value: 'admin', label: 'Administrator' },
          { value: 'editor', label: 'Editor' },
          { value: 'viewer', label: 'Viewer', description: 'Read-only access' },
        ]}
        value={role}
        onChange={setRole}
      />

      <Toggle
        label="Enabled"
        checked={enabled}
        onChange={setEnabled}
      />

      <Checkbox
        label="Email notifications"
        checked={notifications}
        onChange={setNotifications}
      />

      <Slider
        value={threshold}
        onChange={(v) => setThreshold(v as number)}
        min={0}
        max={100}
        step={5}
        labels={{ start: '0%', end: '100%' }}
      />

      <DatePicker
        label="Start date"
        value={startDate}
        onChange={(v) => setStartDate(v as string)}
      />

      <TimePicker
        label="Meeting time"
        value={time}
        onChange={setTime}
        format="12h"
        interval={15}
      />

      <ColorPicker
        label="Accent color"
        value={accentColor}
        onChange={setAccentColor}
        swatches={['#0033d9', '#e01515', '#00a050', '#ff8103']}
      />

      <ButtonGroup>
        <Button variant="ghost">Cancel</Button>
        <Button variant="primary">Save</Button>
      </ButtonGroup>
    </form>
  );
}
```

### Data Table

```typescript
import 'admin-ui/styles';
import { Table, Badge, Pagination } from 'admin-ui';
import type { TableColumn } from 'admin-ui';

interface User {
  id: string;
  name: string;
  email: string;
  status: string;
}

const columns: TableColumn<User>[] = [
  { key: 'name', header: 'Name', width: '200px' },
  { key: 'email', header: 'Email' },
  {
    key: 'status',
    header: 'Status',
    width: '120px',
    render: (value) => (
      <Badge variant={value === 'active' ? 'success' : 'warning'}>
        {value as string}
      </Badge>
    ),
  },
];

function UserTable() {
  const [page, setPage] = useState(1);
  const data: User[] = [
    { id: '1', name: 'Alice', email: 'alice@example.com', status: 'active' },
    { id: '2', name: 'Bob', email: 'bob@example.com', status: 'pending' },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={data}
        rowKey="id"
        striped
        onRowClick={(row) => console.log('Selected:', row.id)}
      />
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={setPage}
        variant="numbered"
      />
    </>
  );
}
```

### Confirmation Dialog

```typescript
import 'admin-ui/styles';
import { AlertDialog, Button } from 'admin-ui';

function DeleteAction() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setShowDialog(true)}>
        Delete Item
      </Button>
      <AlertDialog
        isOpen={showDialog}
        title="Delete this item?"
        description="This action cannot be undone. The item and all its data will be permanently removed."
        variant="destructive"
        confirmLabel="Delete"
        cancelLabel="Keep"
        onConfirm={() => {
          handleDelete();
          setShowDialog(false);
        }}
        onCancel={() => setShowDialog(false)}
      />
    </>
  );
}
```

### Side Panel

```typescript
import 'admin-ui/styles';
import { SidePanel, Button, ButtonGroup, Input } from 'admin-ui';

function EditPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit Details</Button>
      <SidePanel
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Edit Details"
        width="md"
        footer={
          <ButtonGroup>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary">Save</Button>
          </ButtonGroup>
        }
      >
        <Input label="Name" value="" onChange={() => {}} />
      </SidePanel>
    </>
  );
}
```

### Global Search

```typescript
import 'admin-ui/styles';
import { TopNav, GlobalSearch } from 'admin-ui';
import type { GlobalSearchResultData } from 'admin-ui';

function NavWithSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GlobalSearchResultData[]>([]);

  const handleSearch = (q: string) => {
    setQuery(q);
    // Fetch or filter results
    setResults(
      allItems
        .filter((item) => item.title.toLowerCase().includes(q.toLowerCase()))
        .map((item) => ({ id: item.id, title: item.title, description: item.description }))
    );
  };

  return (
    <TopNav
      tabs={[{ id: 'home', label: 'Home' }]}
      search={
        <GlobalSearch
          query={query}
          onQueryChange={handleSearch}
          results={results}
          onSelect={(id) => navigateTo(id)}
          placeholder="Search pages..."
        />
      }
    />
  );
}
```

### Typography with Text Component

```typescript
import { Text } from 'admin-ui';

// Headings
<Text variant="heading-xl" as="h1">Page Title</Text>
<Text variant="heading-l" as="h2">Section Title</Text>
<Text variant="heading-m" as="h3">Subsection</Text>

// Overline label
<Text variant="overline">CATEGORY</Text>

// Body text with colors
<Text variant="body-m">Regular body text</Text>
<Text variant="body-s" color="secondary">Secondary helper text</Text>
<Text variant="body-xs" color="subtle">Timestamp or metadata</Text>
<Text variant="body-m-strong">Emphasized text (semibold)</Text>

// On dark backgrounds
<Text variant="body-m" color="inverted-primary">White text on dark</Text>
```

### Right-Click Context Menu

```typescript
import 'admin-ui/styles';
import { ContextMenu, Card } from 'admin-ui';
import type { ContextMenuItem } from 'admin-ui';

const menuItems: ContextMenuItem[] = [
  { label: 'Edit', shortcut: 'Cmd+E', onClick: () => handleEdit() },
  { label: 'Duplicate', shortcut: 'Cmd+D', onClick: () => handleDuplicate() },
  { separator: true, label: '' },
  { label: 'Delete', variant: 'destructive', onClick: () => handleDelete() },
];

<ContextMenu items={menuItems}>
  <Card>Right-click this card for options</Card>
</ContextMenu>
```

### Customizing Layout Tokens

Override CSS custom properties on a parent element to adjust navigation spacing:

```css
:root {
  --admin-topnav-padding: 2rem;    /* reduce from default 4rem */
  --admin-sidenav-padding: 1.5rem;
  --admin-input-height-md: 2.5rem; /* increase input height */
}
```

### Dark Mode

```typescript
function App() {
  const [dark, setDark] = useState(false);

  return (
    <div data-theme={dark ? 'dark' : undefined}>
      <Toggle label="Dark mode" checked={dark} onChange={setDark} />
      {/* All components inside automatically use dark tokens */}
    </div>
  );
}
```

## Anti-patterns

```typescript
// WRONG: Forgetting to import styles - components will render without any styling
import { Button } from 'admin-ui';

// CORRECT: Always import styles first
import 'admin-ui/styles';
import { Button } from 'admin-ui';

// WRONG: Using raw color values in component styles
.myComponent { color: #0033d9; }

// CORRECT: Use semantic tokens
.myComponent { color: var(--admin-text-highlight); }

// WRONG: Input onChange expects an event
<Input value={val} onChange={(e) => setVal(e.target.value)} />

// CORRECT: Input onChange receives the string value directly
<Input value={val} onChange={setVal} />

// WRONG: Slider with range - not handling tuple type
<Slider value={[10, 90]} onChange={(v) => setMin(v)} />

// CORRECT: Slider range returns a tuple
<Slider value={[min, max]} onChange={(v) => {
  const [newMin, newMax] = v as [number, number];
  setMin(newMin);
  setMax(newMax);
}} />

// WRONG: Using primitive color tokens in components
.box { background: var(--admin-blue-100); }

// CORRECT: Use semantic tokens
.box { background: var(--admin-surface-info-primary); }
```

## Dependencies

### package.json

```json
{
  "dependencies": {
    "admin-ui": "github:utopastac/admin-ui"
  }
}
```

### Peer Dependencies (must be installed)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

### Runtime Dependencies (bundled with admin-ui)

- `framer-motion` ^11.0.0 -- overlay animations (Modal, AlertDialog, SidePanel)
- `highlight.js` ^11.11.1 -- syntax highlighting in CodeBlock
- `lucide-react` ^0.400.0 -- icon system used by ToolbarButton, Banner, navigation
- `react-markdown` ^10.1.0 -- DocPage markdown rendering
- `remark-gfm` ^4.0.1 -- GitHub Flavored Markdown support

## Testing

### Running Tests

```bash
npm test              # run all tests (vitest)
npm run test:watch    # run in watch mode
```

### Writing Tests

Tests use Vitest with jsdom and React Testing Library. Vitest globals (`describe`, `it`, `expect`, `vi`) are available without imports.

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from 'admin-ui';

describe('Button', () => {
  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    await user.click(screen.getByRole('button', { name: 'Click Me' }));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('does not fire when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Click Me</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

## Complete Export Reference

### Components

**Primitives**: `Avatar`, `Badge`, `Banner`, `Blockquote`, `Breadcrumb`, `BulletList`, `Button`, `ButtonGroup`, `Card`, `Carousel`, `Checkbox`, `CodeBlock`, `ColorPicker`, `CompactInput`, `DatePicker`, `FieldGroup`, `FieldLabel`, `GlobalSearch`, `Input`, `NumberedList`, `Popover`, `RichTextEditor`, `SegmentedControl`, `Select`, `SelectionList`, `ShadowEditor`, `Slider`, `Table`, `Tabs`, `Text`, `TimePicker`, `Toggle`, `Tooltip`, `ToolbarButton`

**Overlays**: `AlertDialog`, `ContextMenu`, `Modal`, `SidePanel`

**Layout**: `DocPage`, `PageFooter`, `PageHeading`, `SectionHeading`

**Navigation**: `SideNav`, `TopNav`, `Pagination`

### Exported Types

`BannerProps`, `BreadcrumbItem`, `ColorPickerProps`, `ContextMenuItem`, `DatePickerProps`, `DocPageProps`, `FieldGroupProps`, `FieldLabelProps`, `GlobalSearchProps`, `GlobalSearchResultData`, `PaginationVariant`, `PhoneShadow`, `PopoverProps`, `RichTextEditorProps`, `SectionHeadingSize`, `SegmentedControlOption`, `SegmentedControlProps`, `SelectionListItem`, `SelectOption`, `ShadowEditorProps`, `SideNavItemData`, `SideNavSectionData`, `SideNavTopLevelSectionData`, `SliderProps`, `TabItem`, `TableColumn`, `TextColor`, `TextVariant`, `TimePickerProps`, `TooltipProps`, `TopNavSize`, `TopNavTabData`
