# admin-ui — LLM Usage Guidance

This document is written for LLMs consuming the admin-ui component library. It describes correct usage patterns, prop contracts, composition rules, and anti-patterns to avoid.

---

## Setup

```ts
// Import the stylesheet once at your app entry point
import 'admin-ui/styles';

// Import components by name
import { Button, Input, Modal, SideNav } from 'admin-ui';
```

The library exports a single ES module (`dist/index.js`) and a single CSS file (`dist/styles/style.css`). All design tokens are CSS custom properties prefixed `--admin-*`. Do not import individual component files directly — always import from the package root.

---

## Core Principles

**All interactive components are fully controlled.** No component manages its own selection, open/close, or value state. The consuming application owns state and passes it down via props. Every stateful component requires a value prop and a change handler.

**Typography is always via the Text component.** Do not use raw HTML heading or paragraph elements when rendering content within admin-ui layouts. Use `<Text variant="..." as="...">`.

**Form fields compose around FieldGroup.** Input, Select, and similar controls accept `label`, `error`, and `helperText` directly and render them via FieldGroup internally. Do not wrap these components in a separate FieldGroup.

---

## Component Reference

### Button

```tsx
<Button variant="primary" size="md" onClick={handleClick}>Save</Button>
<Button variant="secondary" onClick={handleCancel}>Cancel</Button>
<Button variant="ghost" size="sm" onClick={handleEdit}>Edit</Button>
<Button variant="primary" disabled>Saving...</Button>
<Button type="submit" variant="primary">Submit</Button>
```

Props:
- `variant`: `'primary' | 'secondary' | 'ghost'` — defaults to `'primary'`
- `size`: `'sm' | 'md' | 'lg'` — defaults to `'md'`
- `type`: `'button' | 'submit' | 'reset'` — defaults to `'button'`
- `disabled`: boolean
- `onClick`: `() => void`
- `aria-label`: string — provide when button contains only an icon

Anti-patterns:
- Do not use `variant="primary"` for destructive actions. Use `variant="secondary"` or `variant="ghost"` for secondary actions and pair with AlertDialog for destructive confirmation.
- Do not use `onClick` on a button with `type="submit"` — let the form handle submission.

### ButtonGroup

Groups multiple Button elements with shared border treatment.

```tsx
<ButtonGroup>
  <Button variant="secondary">Bold</Button>
  <Button variant="secondary">Italic</Button>
  <Button variant="secondary">Underline</Button>
</ButtonGroup>
```

ButtonGroup expects direct Button children. Do not nest other elements between buttons.

### ToolbarButton

Icon-only button for toolbars and navigation chrome. Requires a Lucide icon component.

```tsx
import { Settings, Bell } from 'lucide-react';

<ToolbarButton icon={Settings} onClick={openSettings} title="Settings" aria-label="Settings" />
<ToolbarButton icon={Bell} size="sm" onClick={openNotifications} aria-label="Notifications" />
```

Props:
- `icon`: `LucideIcon` — required
- `size`: `'sm' | 'md'` — defaults to `'md'`
- `aria-label`: string — always provide, as there is no visible text

### Input

Controlled text input with built-in label, error, and helper text rendering.

```tsx
<Input
  id="username"
  label="Username"
  value={username}
  onChange={(value) => setUsername(value)}
/>

<Input
  id="email"
  type="email"
  label="Email"
  value={email}
  onChange={setEmail}
  error={errors.email}
  helperText="We'll never share your email."
/>
```

Props:
- `value`: string — required, controlled
- `onChange`: `(value: string) => void` — receives the string value, not an event
- `type`: any valid HTML input type — defaults to `'text'`
- `label`, `error`, `helperText`: rendered via FieldGroup
- `id`: used to associate label with input via `htmlFor`

Anti-patterns:
- Do not wrap Input in a separate FieldGroup. It renders FieldGroup internally.
- Do not pass an event handler — `onChange` receives the unwrapped string value.

### Select

Controlled custom select with optional labels and descriptions per option.

```tsx
const options = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published', description: 'Visible to all users' },
  { value: 'archived', label: 'Archived', disabled: true },
];

<Select
  id="status"
  label="Status"
  options={options}
  value={status}
  onChange={setStatus}
  placeholder="Choose a status"
/>
```

Props:
- `options`: `SelectOption[]` — each item requires `value` and `label`; optionally `description` and `disabled`
- `value`: string — the currently selected value
- `onChange`: `(value: string) => void`
- `size`: `'sm' | 'md'` — defaults to `'md'`
- `label`, `error`, `helperText`: rendered via FieldGroup internally

Anti-patterns:
- Do not use a native `<select>` when a Select from this library fits — the custom component handles Popover positioning and consistent styling.

### SegmentedControl

Mutually exclusive option picker rendered as a connected button group. Semantically a radiogroup.

```tsx
<SegmentedControl
  options={[
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
  ]}
  value={period}
  onChange={setPeriod}
  size="sm"
/>
```

Keyboard: ArrowLeft/ArrowRight navigate between enabled options.

Use SegmentedControl when there are 2–5 mutually exclusive options that should all be visible simultaneously. For longer option lists, use Select instead.

### Checkbox

```tsx
<Checkbox
  id="terms"
  label="I agree to the terms"
  checked={accepted}
  onChange={setAccepted}
/>
```

Props:
- `checked`: boolean — required, controlled
- `onChange`: `(checked: boolean) => void`
- `label`: string
- `disabled`: boolean

### Toggle

On/off switch. Semantically a role="switch".

```tsx
<Toggle
  id="notifications"
  label="Enable notifications"
  checked={enabled}
  onChange={setEnabled}
  size="md"
/>
```

Props:
- `checked`: boolean — required, controlled
- `onChange`: `(checked: boolean) => void`
- `size`: `'sm' | 'md'`

### SelectionList

Presents a list of selectable options as visible cards. Suitable for settings panels where options benefit from always being visible.

```tsx
<SelectionList
  aria-label="Layout"
  items={[
    { value: 'list', label: 'List', description: 'Items in a vertical list' },
    { value: 'grid', label: 'Grid', description: 'Items in a grid' },
  ]}
  value={layout}
  onChange={setLayout}
  columns={2}
/>
```

Props:
- `items`: `SelectionListItem[]` — each requires `value` and `label`; optionally `description`
- `columns`: `1 | 2 | 3` — defaults to `1`

Use SelectionList over Select when the options benefit from persistent visibility and descriptions. Use Select for space-constrained contexts.

### FieldGroup

Wraps any form control with a label, error message, and helper text. Used internally by Input, Select, and similar components. Use directly only when wrapping a custom or third-party control.

```tsx
<FieldGroup label="Custom field" htmlFor="custom-id" error={error} helperText="Some hint">
  <MyCustomControl id="custom-id" />
</FieldGroup>
```

Anti-patterns:
- Do not wrap Input or Select in FieldGroup — they compose it internally.

### Text

All typography rendering. Controls font size, weight, line-height, and letter-spacing through the `variant` prop.

```tsx
<Text variant="heading-m" as="h2">Section Title</Text>
<Text variant="body-s" color="secondary">Supporting description</Text>
<Text variant="overline">Category Label</Text>
<Text variant="body-s-strong" color="warning">Warning note</Text>
```

Variants (heading → body, large → small):
- `heading-xl`, `heading-l`, `heading-m`, `heading-s`, `heading-xs`
- `overline` — uppercase, semibold, extra small; for category labels
- `body-m`, `body-s`, `body-xs`
- `body-m-strong`, `body-s-strong`, `body-xs-strong`

Colors: `'primary' | 'secondary' | 'subtle' | 'highlight' | 'warning' | 'inverted-primary'`

The `as` prop controls the rendered HTML element: `'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'div' | 'li'`. Defaults to `'span'`.

Anti-patterns:
- Do not use raw `<h1>`–`<h6>` or `<p>` elements for content text — use Text.
- Do not use `heading-xl` as `<span>` — always match the semantic element to heading level.

### Badge

Inline status label.

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning" size="sm">Pending</Badge>
<Badge variant="info">Beta</Badge>
<Badge variant="default">Inactive</Badge>
```

Variants: `'default' | 'success' | 'warning' | 'info'`

For error or destructive states, use `'warning'` or show a Banner instead.

### Avatar

Displays a user photo with initials fallback.

```tsx
<Avatar name="Jane Smith" src={user.avatarUrl} size="md" />
<Avatar name="Jane Smith" size="sm" />  // initials only
```

Props:
- `name`: string — required; used for initials generation and `title` attribute
- `src`: string — optional; falls back to initials if the image fails to load
- `size`: `'sm' | 'md' | 'lg'`

### Card

Container with surface styling. Use for grouping related content.

```tsx
<Card>
  <Text variant="body-s">Content here</Text>
</Card>

<Card hoverable active={isSelected} onClick={() => select(item.id)}>
  <Text variant="body-s-strong">{item.name}</Text>
</Card>
```

Props:
- `active`: boolean — applies selected/active visual state
- `hoverable`: boolean — enables hover highlight; defaults to `true`
- `onClick`: `() => void` — makes the card interactive

Anti-patterns:
- Do not set `hoverable={true}` on cards without an `onClick` — hoverable implies clickability.

### Banner

Inline or full-width status message. Manages its own visibility for dismissal but calls `onDismiss` when closed.

```tsx
<Banner variant="info" message="Your changes have been saved." dismissible />

<Banner
  variant="error"
  title="Save failed"
  message="Check your connection and try again."
  icon={AlertCircle}
/>

<Banner
  variant="warning"
  message="This action cannot be undone."
  layout="full"
/>
```

Props:
- `variant`: `'info' | 'success' | 'warning' | 'error'` — required
- `message`: string — required
- `title`: string — optional bold heading above message
- `icon`: `LucideIcon` — optional leading icon
- `dismissible`: boolean — shows an X button; Banner manages its own hidden state internally
- `onDismiss`: `() => void` — called when dismissed; use to sync external state if needed
- `layout`: `'inline' | 'full'` — defaults to `'inline'`

### Tooltip

Wraps a single React element and shows a text tooltip on hover/focus.

```tsx
<Tooltip content="Delete this item" placement="top">
  <ToolbarButton icon={Trash} aria-label="Delete" onClick={handleDelete} />
</Tooltip>
```

Props:
- `content`: string — the tooltip text
- `placement`: `'top' | 'bottom' | 'left' | 'right'` — defaults to `'top'`
- `delay`: number (ms) — show delay; defaults to `0`
- `children`: must be a single React element (not a string or fragment)

Anti-patterns:
- Do not wrap multiple children — Tooltip clones a single element to attach aria-describedby.

### Popover

Portal-rendered floating container anchored to a ref element. Used internally by Select; use directly for custom dropdown menus or pickers.

```tsx
const triggerRef = useRef<HTMLButtonElement>(null);
const [open, setOpen] = useState(false);

<button ref={triggerRef} onClick={() => setOpen(true)}>Open</button>
<Popover isOpen={open} onClose={() => setOpen(false)} anchorRef={triggerRef}>
  <div>Custom content</div>
</Popover>
```

Props:
- `isOpen`: boolean — required
- `onClose`: `() => void` — called on outside click or Escape
- `anchorRef`: `React.RefObject<HTMLElement | null>` — the element to position against
- `matchWidth`: boolean — if true, the popover matches the anchor's width

Popover renders into `document.body` via a portal. It handles click-outside and Escape automatically. Nested Popovers are safe — clicking inside a child Popover will not close a parent Popover.

### ContextMenu

Wraps content and shows a right-click context menu via a portal.

```tsx
<ContextMenu
  items={[
    { label: 'Edit', onClick: handleEdit },
    { label: 'Duplicate', onClick: handleDuplicate, shortcut: '⌘D' },
    { separator: true },
    { label: 'Delete', onClick: handleDelete, variant: 'destructive' },
  ]}
>
  <div>Right-click me</div>
</ContextMenu>
```

`ContextMenuItem` shape:
- `label`: string
- `onClick`: `() => void`
- `shortcut`: string — displayed at the trailing edge (display only, not functional)
- `variant`: `'default' | 'destructive'`
- `disabled`: boolean
- `separator`: boolean — when true, renders a divider; other fields are ignored

Anti-patterns:
- Do not use ContextMenu for primary actions — it is only discoverable via right-click. All critical actions must also be reachable through visible controls.

---

## Overlays

All overlays are controlled via `isOpen` and `onClose`.

### Modal

Centered dialog for content that requires user attention or input.

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit Profile"
  maxWidth="md"
  footer={
    <ButtonGroup>
      <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={handleSave}>Save</Button>
    </ButtonGroup>
  }
>
  <Input label="Name" value={name} onChange={setName} />
</Modal>
```

Props:
- `isOpen`: boolean — required
- `onClose`: `() => void` — called when backdrop or X is clicked
- `title`: string — optional header text
- `footer`: `React.ReactNode` — optional footer slot; place action buttons here
- `maxWidth`: `'sm' | 'md' | 'lg'` — defaults to `'md'`
- `headerBorder`: boolean — defaults to `true`
- `footerBorder`: boolean — defaults to `true`

### AlertDialog

Blocking confirmation dialog for destructive or irreversible actions. Not dismissible by clicking the backdrop.

```tsx
<AlertDialog
  isOpen={showConfirm}
  title="Delete workspace?"
  description="This will permanently delete the workspace and all its data. This action cannot be undone."
  confirmLabel="Delete"
  cancelLabel="Cancel"
  variant="destructive"
  onConfirm={handleDelete}
  onCancel={() => setShowConfirm(false)}
/>
```

Props:
- `title`: string — required
- `description`: string — required
- `variant`: `'default' | 'destructive'` — `'destructive'` applies danger styling to the confirm button
- `confirmLabel`: string — defaults to `'Continue'`
- `cancelLabel`: string — defaults to `'Cancel'`
- `onConfirm`: `() => void`
- `onCancel`: `() => void`

Use AlertDialog (not Modal) when: the action is destructive, irreversible, or requires explicit acknowledgement before proceeding. AlertDialog provides no arbitrary content slot — it is strictly for title + description + confirm/cancel.

### SidePanel

Slide-in panel from the right edge. Use for detail views, settings, or forms that should not fully interrupt the page context.

```tsx
<SidePanel
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="User Details"
  width="md"
  footer={<Button variant="primary" onClick={handleSave}>Save</Button>}
>
  <Input label="Name" value={name} onChange={setName} />
</SidePanel>
```

Props:
- `width`: `'sm' | 'md' | 'lg'` — defaults to `'md'`
- `title`, `footer`, `isOpen`, `onClose`: same contract as Modal

Choosing between Modal and SidePanel: use Modal for focused tasks with limited content; use SidePanel for forms or detail views where content may be tall or where the user may want to reference the underlying page.

---

## Navigation

### TopNav

Fixed-height horizontal navigation bar.

```tsx
<TopNav
  brand={<img src={logo} alt="Admin" height={24} />}
  onBrandClick={() => navigate('/')}
  tabs={[
    { id: 'flows', label: 'Flows' },
    { id: 'settings', label: 'Settings' },
  ]}
  activeTabId={activeTab}
  onTabSelect={(id) => setActiveTab(id)}
  actions={
    <>
      <ToolbarButton icon={Bell} aria-label="Notifications" onClick={openNotifications} />
      <Avatar name={user.name} src={user.avatar} size="sm" />
    </>
  }
/>
```

Props:
- `tabs`: `TopNavTabData[]` — each requires `id` and `label`
- `activeTabId`: string — the currently active tab id
- `onTabSelect`: `(id: string) => void`
- `brand`: `React.ReactNode` — optional branding slot at far left
- `onBrandClick`: `() => void` — called when brand is clicked
- `actions`: `React.ReactNode` — optional slot at far right; use ToolbarButtons or Avatar

### SideNav

Vertical navigation sidebar with optional section grouping and search.

```tsx
<SideNav
  sections={[
    {
      label: 'Content',
      items: [
        { id: 'pages', label: 'Pages' },
        { id: 'posts', label: 'Posts' },
      ],
    },
    {
      label: 'Settings',
      items: [
        { id: 'general', label: 'General' },
        { id: 'team', label: 'Team' },
      ],
    },
  ]}
  activeId={activeId}
  onSelect={(id) => setActiveId(id)}
  searchable
  searchPlaceholder="Find a page..."
/>
```

Props:
- `sections`: `SideNavSectionData[]` — each has optional `label` and required `items`
- `items`: `SideNavItemData[]` — each requires `id` and `label`
- `activeId`: string — the currently selected item id
- `onSelect`: `(id: string) => void`
- `searchable`: boolean — adds a search input that filters items by label
- `searchPlaceholder`: string

For unlabelled sections (no grouping), omit the `label` field on the section.

### Pagination

```tsx
<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
  variant="numbered"
/>
```

Props:
- `currentPage`: number — 1-based
- `totalPages`: number
- `onPageChange`: `(page: number) => void`
- `variant`: `'buttons' | 'numbered' | 'dots'`
  - `buttons` — prev/next with "Page X of Y" label; suitable for minimal space
  - `numbered` — prev/next with page number buttons and ellipsis; suitable for most cases
  - `dots` — prev/next with dot indicators; suitable for media carousels or image galleries

Anti-patterns:
- Do not guard against out-of-range calls — Pagination does not disable the prev/next buttons at boundaries; the consumer must not call `onPageChange` with invalid pages, or must clamp the value.

---

## Layout

### PageHeading

Top-of-page title block with optional description and action slot.

```tsx
<PageHeading
  title="Users"
  description="Manage your team members and their access levels."
  actions={<Button variant="primary" onClick={openInvite}>Invite user</Button>}
/>
```

### SectionHeading

Sub-section heading within a page. Accepts a `size` prop.

```tsx
<SectionHeading title="Billing" size="md" />
<SectionHeading title="Danger Zone" size="sm" description="Irreversible actions." />
```

### PageFooter

Footer bar for a page. Typically contains save/cancel actions.

```tsx
<PageFooter>
  <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
  <Button variant="primary" onClick={handleSave}>Save changes</Button>
</PageFooter>
```

### DocPage

Full-page layout for documentation or long-form content pages. Composes a title area with optional sidebar navigation.

---

## General Anti-Patterns

**Do not use inline styles.** All styling must come from component props, CSS Modules, and design tokens. Do not pass `style={{...}}` to any admin-ui component.

**Do not use raw HTML form elements inside admin-ui layouts.** Use Input, Select, Checkbox, Toggle, and other provided primitives.

**Do not manage open state inside overlays.** Modal, AlertDialog, and SidePanel are always fully controlled. Always hold `isOpen` in the consuming component.

**Do not render overlays conditionally in JSX.** Pass `isOpen={false}` rather than using `{condition && <Modal ...>}`. The AnimatePresence exit animation requires the component to stay mounted to play the exit transition.

**Do not mix Tabs (primitive) and TopNav tabs.** Tabs is for in-page content switching. TopNav provides its own tab row for app-level navigation. They are not interchangeable.

**Do not hardcode `--admin-*` token values.** All tokens are defined in the library's CSS. Never copy a token value as a hex string or number — always reference the token.

---

## Composition Examples

### Settings page with side navigation

```tsx
function SettingsPage() {
  const [activeId, setActiveId] = useState('general');

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SideNav
        sections={[{ items: [
          { id: 'general', label: 'General' },
          { id: 'security', label: 'Security' },
          { id: 'billing', label: 'Billing' },
        ]}]}
        activeId={activeId}
        onSelect={setActiveId}
      />
      <main>
        <PageHeading title="General Settings" />
        {/* page content */}
      </main>
    </div>
  );
}
```

### Data table with pagination

```tsx
<Table
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'status', header: 'Status', render: (_, row) => <Badge variant="success">{row.status}</Badge> },
    { key: 'actions', header: '', render: (_, row) => (
      <ToolbarButton icon={Trash} aria-label="Delete" onClick={() => confirmDelete(row.id)} />
    )},
  ]}
  data={users}
  rowKey="id"
  striped
/>
<Pagination
  currentPage={page}
  totalPages={Math.ceil(total / pageSize)}
  onPageChange={setPage}
  variant="numbered"
/>
```

### Destructive action with confirmation

```tsx
function DeleteButton({ onDeleted }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setShowConfirm(true)}>Delete</Button>
      <AlertDialog
        isOpen={showConfirm}
        title="Delete item?"
        description="This cannot be undone."
        variant="destructive"
        confirmLabel="Delete"
        onConfirm={() => { setShowConfirm(false); onDeleted(); }}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
```

### Form in a modal

```tsx
function EditModal({ isOpen, onClose, item }) {
  const [name, setName] = useState(item.name);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit item"
      footer={
        <ButtonGroup>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={() => { save(name); onClose(); }}>Save</Button>
        </ButtonGroup>
      }
    >
      <Input id="item-name" label="Name" value={name} onChange={setName} />
    </Modal>
  );
}
```
