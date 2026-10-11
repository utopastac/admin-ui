import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import {
  ArrowRight,
  Component,
  Keyboard,
  Layers,
  PanelLeft,
  Search,
  Settings,
  SwatchBook,
  Terminal,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionHeading, CardGrid } from '@/layout';
import { SideNav } from '@/navigation';
import type { SideNavSectionData } from '@/navigation';
import {
  Avatar,
  Badge,
  Banner,
  Button,
  Card,
  Checkbox,
  Chip,
  CodeBlock,
  ColorPicker,
  Command,
  CompactInput,
  DataGrid,
  DatePicker,
  EditableText,
  GradientPicker,
  Input,
  Kbd,
  PixelArtEditor,
  ProgressBar,
  ProgressCircular,
  RichTextEditor,
  SegmentedControl,
  Select,
  ShadowEditor,
  Skeleton,
  Slider,
  Spinner,
  Tabs,
  Text,
  Toggle,
  ToolbarButton,
  AnimationPicker,
} from '@/primitives';
import type { CommandGroup, DataGridColumn, PhoneShadow } from '@/primitives';
import { sampleAvatars } from '../data/avatars';

type IconComponent = React.ComponentType<{ size?: number }>;
const asIcon = (icon: unknown) => icon as IconComponent;
import { navigate } from '../router';
import type { MainTab } from '../data/navigation';
import { systemSections, componentTabs } from '../data/navigation';
import styles from './HomePage.module.css';

function countItems(sections: { items: unknown[] }[]): number {
  return sections.reduce((sum, section) => sum + section.items.length, 0);
}

const componentCount = componentTabs.reduce(
  (sum, tab) => sum + countItems(tab.sections),
  0,
);

const FEATURES: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Design tokens',
    description: 'Color, type, space, radius, and shadow as semantic variables. Components stay on those tokens, so a theme can restyle the set at once.',
    icon: SwatchBook,
  },
  {
    title: 'Everyday controls',
    description: 'Buttons, inputs, selects, tables, badges, and banners, with a shared s / m / l size scale.',
    icon: Component,
  },
  {
    title: 'Overlays that keep focus',
    description: 'Modals, side panels, alert dialogs, toasts, tooltips, and context menus trap focus while open and hand it back on close.',
    icon: Layers,
  },
  {
    title: 'Navigation shells',
    description: 'TopNav, SideNav, pagination, and in-page contents, composed with AppLayout when you want a full frame.',
    icon: PanelLeft,
  },
];

interface AdvancedEntry {
  value: string;
  label: string;
  description: string;
  page: string;
}

const ADVANCED: AdvancedEntry[] = [
  { value: 'data-grid', label: 'DataGrid', description: 'Sort and select rows', page: 'data-grid' },
  { value: 'command', label: 'Command', description: 'Groups and shortcuts', page: 'command' },
  { value: 'compact-input', label: 'CompactInput', description: 'Scrub on the prefix', page: 'compact-input' },
  { value: 'editable-text', label: 'EditableText', description: 'Double-click to rename', page: 'editable-text' },
  { value: 'rich-text', label: 'RichTextEditor', description: 'Toolbar and HTML out', page: 'rich-text-editor' },
  { value: 'color', label: 'ColorPicker', description: 'Wheel, hex, opacity', page: 'color-picker' },
  { value: 'gradient', label: 'GradientPicker', description: 'Stops and angle', page: 'gradient-picker' },
  { value: 'shadow', label: 'ShadowEditor', description: 'Bezel and blur', page: 'shadow-editor' },
  { value: 'motion', label: 'AnimationPicker', description: 'Duration and easing', page: 'animation-picker' },
  { value: 'pixel', label: 'PixelArtEditor', description: 'Paint to SVG', page: 'pixel-art-editor' },
];

const ADVANCED_SECTIONS: SideNavSectionData[] = [
  {
    label: 'Data & command',
    items: [
      { id: 'data-grid', label: 'DataGrid' },
      { id: 'command', label: 'Command' },
    ],
  },
  {
    label: 'Inline editing',
    items: [
      { id: 'compact-input', label: 'CompactInput' },
      { id: 'editable-text', label: 'EditableText' },
    ],
  },
  {
    label: 'Editors & pickers',
    items: [
      { id: 'rich-text', label: 'RichTextEditor' },
      { id: 'color', label: 'ColorPicker' },
      { id: 'gradient', label: 'GradientPicker' },
      { id: 'shadow', label: 'ShadowEditor' },
      { id: 'motion', label: 'AnimationPicker' },
      { id: 'pixel', label: 'PixelArtEditor' },
    ],
  },
];

interface Invoice extends Record<string, unknown> {
  id: string;
  customer: string;
  plan: string;
  status: 'Paid' | 'Open' | 'Past due';
  amount: string;
}

const INVOICES: Invoice[] = [
  { id: 'inv-1042', customer: 'Northwind', plan: 'Team', status: 'Paid', amount: '$240' },
  { id: 'inv-1043', customer: 'Brightline', plan: 'Pro', status: 'Open', amount: '$890' },
  { id: 'inv-1044', customer: 'Harbor & Co', plan: 'Team', status: 'Past due', amount: '$240' },
  { id: 'inv-1045', customer: 'Lumen', plan: 'Free', status: 'Paid', amount: '$0' },
];

const invoiceColumns: DataGridColumn<Invoice>[] = [
  { key: 'customer', header: 'Customer', sortable: true },
  { key: 'plan', header: 'Plan', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (_value, row) => {
      const variant = row.status === 'Paid' ? 'success' : row.status === 'Past due' ? 'warning' : 'info';
      return <Badge variant={variant} size="sm">{row.status}</Badge>;
    },
  },
  { key: 'amount', header: 'Amount', sortable: true },
];

const PIXEL_PALETTE = ['#111111', '#f4f4f1', '#0a66c2', '#16a34a', '#d97706', '#be123c'];

const DEFAULT_SHADOW: PhoneShadow = {
  bezelWidth: 8,
  bezelColor: '#1f2937',
  offsetX: 0,
  offsetY: 16,
  blur: 32,
  spread: 0,
  shadowColor: '#000000',
  shadowOpacity: 0.28,
};

interface ThemeOption {
  id: string;
  label: string;
}

const ACCENT_THEMES: ThemeOption[] = [
  { id: '', label: 'Default' },
  { id: 'ocean', label: 'Ocean' },
  { id: 'ember', label: 'Ember' },
  { id: 'forest', label: 'Forest' },
  { id: 'violet', label: 'Violet' },
  { id: 'rose', label: 'Rose' },
];

const SURFACE_THEMES: ThemeOption[] = [
  { id: 'slate', label: 'Slate' },
  { id: 'voltage', label: 'Voltage' },
  { id: 'zine', label: 'Zine' },
  { id: 'studio', label: 'Studio' },
  { id: 'luma', label: 'Luma' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'ledger', label: 'Ledger' },
  { id: 'blueprint', label: 'Blueprint' },
  { id: 'aurora', label: 'Aurora' },
  { id: 'stark', label: 'Stark' },
];

const CATALOG_SECTIONS: {
  id: string;
  title: string;
  tab: MainTab;
  page: string;
  description: string;
  count: number | null;
  countLabel: string | null;
}[] = [
  {
    id: 'about',
    title: 'About',
    tab: 'about',
    page: 'about',
    description: 'Library overview, design principles, and how to get started.',
    count: null,
    countLabel: null,
  },
  {
    id: 'system',
    title: 'System',
    tab: 'system',
    page: 'colors',
    description: 'Design tokens: color scales, typography, spacing, icons, and shadows.',
    count: countItems(systemSections),
    countLabel: 'topics',
  },
  {
    id: 'components',
    title: 'Components',
    tab: 'components',
    page: 'avatar',
    description: 'The full reference for primitives, layout, overlays, and navigation.',
    count: componentCount,
    countLabel: 'components',
  },
  {
    id: 'decisions',
    title: 'Decisions',
    tab: 'about',
    page: 'decisions',
    description: 'Design decisions and the rationale behind the component API.',
    count: null,
    countLabel: null,
  },
];

function themeSnippet(themeId: string): string {
  if (!themeId) return '<div>';
  return `<div data-admin-theme="${themeId}">`;
}

function ProductSnapshot() {
  const [tab, setTab] = useState('overview');
  const [name, setName] = useState('Northwind');
  const [receipts, setReceipts] = useState(true);
  const caption = tab === 'invoices'
    ? 'Last payment landed Tuesday'
    : tab === 'usage'
      ? 'Team plan · 18 of 25 seats'
      : '12 open invoices · $1,370 due';

  return (
    <Card hoverable={false}>
      <div className={styles.snapshot}>
        <div className={styles.snapshotHeader}>
          <div className={styles.snapshotIntro}>
            <p className={styles.eyebrow}>On this page</p>
            <Text as="div" variant="heading-s">Billing</Text>
          </div>
          <Badge variant="success" size="sm">Live</Badge>
        </div>
        <SegmentedControl
          size="sm"
          value={tab}
          onChange={setTab}
          options={[
            { value: 'overview', label: 'Overview' },
            { value: 'invoices', label: 'Invoices' },
            { value: 'usage', label: 'Usage' },
          ]}
        />
        <Input label="Workspace" value={name} onChange={setName} />
        <Toggle
          label="Email receipts"
          checked={receipts}
          onChange={setReceipts}
          aria-label="Email receipts"
        />
        <div className={styles.actions}>
          <Button size="sm">Save</Button>
          <Button size="sm" variant="secondary">Cancel</Button>
        </div>
        <Text as="p" variant="body-xs" color="secondary">{caption}</Text>
      </div>
    </Card>
  );
}

function AdvancedShowcase() {
  const [active, setActive] = useState(ADVANCED[0].value);
  const current = ADVANCED.find((entry) => entry.value === active) ?? ADVANCED[0];

  return (
    <div className={styles.showcase}>
      <div className={styles.showcaseNav}>
        <SideNav
          sections={ADVANCED_SECTIONS}
          activeId={active}
          onSelect={setActive}
          collapsible={false}
          fullWidth
        />
      </div>
      <div className={styles.canvas}>
        <div className={styles.canvasBody}>
          {active === 'data-grid' && <DataPanel />}
          {active === 'command' && <CommandPanel />}
          {active === 'compact-input' && <CompactInputPanel />}
          {active === 'editable-text' && <EditableTextPanel />}
          {active === 'rich-text' && <RichTextPanel />}
          {active === 'color' && <ColorPanel />}
          {active === 'gradient' && <GradientPanel />}
          {active === 'shadow' && <ShadowPanel />}
          {active === 'motion' && <MotionPanel />}
          {active === 'pixel' && <PixelPanel />}
        </div>
        <div className={styles.canvasFooter}>
          <Text as="p" variant="body-xs" color="secondary">{current.description}</Text>
          <Button
            variant="ghost"
            size="sm"
            endIcon={ArrowRight}
            onClick={() => navigate('components', current.page)}
          >
            Open {current.label}
          </Button>
        </div>
      </div>
    </div>
  );
}

function DataPanel() {
  return (
    <DataGrid
      columns={invoiceColumns}
      data={INVOICES}
      rowKey="id"
      selectable
      striped
      compact
    />
  );
}

function CompactInputPanel() {
  const [width, setWidth] = useState('320');
  const [height, setHeight] = useState('180');
  const [radius, setRadius] = useState('12');
  const [opacity, setOpacity] = useState('0.85');

  return (
    <div className={styles.inspector}>
      <Text as="p" variant="body-xs" color="secondary">
        Drag a prefix sideways to scrub the value. Shift-friendly for property panels.
      </Text>
      <div className={styles.inspectorRow}>
        <CompactInput
          prefix="W"
          type="number"
          value={width}
          onChange={setWidth}
          scrub
          min={0}
          max={1200}
          step={1}
        />
        <CompactInput
          prefix="H"
          type="number"
          value={height}
          onChange={setHeight}
          scrub
          min={0}
          max={1200}
          step={1}
        />
      </div>
      <div className={styles.inspectorRow}>
        <CompactInput
          prefix="R"
          type="number"
          value={radius}
          onChange={setRadius}
          scrub
          min={0}
          max={64}
          step={1}
        />
        <CompactInput
          prefix="O"
          type="number"
          value={opacity}
          onChange={setOpacity}
          scrub
          min={0}
          max={1}
          step={0.05}
        />
      </div>
      <div
        className={styles.inspectorPreview}
        style={{
          width: `${Math.min(Number(width) || 0, 280)}px`,
          height: `${Math.min(Number(height) || 0, 120)}px`,
          borderRadius: `${radius}px`,
          opacity: Number(opacity) || 0,
        }}
        aria-hidden
      />
    </div>
  );
}

function EditableTextPanel() {
  const [title, setTitle] = useState('Quarterly planning');
  const [subtitle, setSubtitle] = useState('Workspace settings');
  const [note, setNote] = useState('');

  return (
    <div className={styles.inspector}>
      <Text as="p" variant="body-xs" color="secondary">
        Double-click a label to edit. Enter or blur commits; Escape cancels.
      </Text>
      <EditableText value={title} onChange={setTitle} size="lg" ariaLabel="Page title" />
      <EditableText value={subtitle} onChange={setSubtitle} size="md" ariaLabel="Section title" />
      <EditableText
        value={note}
        onChange={setNote}
        size="sm"
        placeholder="Add a note…"
        ariaLabel="Note"
      />
    </div>
  );
}

function CommandPanel() {
  const [notice, setNotice] = useState('Search, then press Enter.');
  const groups: CommandGroup[] = [
    {
      label: 'Go to',
      items: [
        {
          id: 'components',
          label: 'Browse components',
          icon: asIcon(Component),
          onSelect: () => navigate('components', 'components'),
        },
        {
          id: 'system',
          label: 'Open the design system',
          icon: asIcon(SwatchBook),
          onSelect: () => navigate('system', 'colors'),
        },
        {
          id: 'decisions',
          label: 'Read the decisions',
          icon: asIcon(Keyboard),
          onSelect: () => navigate('about', 'decisions'),
        },
      ],
    },
    {
      label: 'Actions',
      items: [
        {
          id: 'copy',
          label: 'Copy install command',
          icon: asIcon(Terminal),
          shortcut: 'C',
          onSelect: () => {
            const command = 'npm install github:utopastac/admin-ui#main';
            const write = navigator.clipboard?.writeText(command);
            if (!write) {
              setNotice(command);
              return;
            }
            void write.then(
              () => setNotice('Copied the install command.'),
              () => setNotice(command),
            );
          },
        },
      ],
    },
  ];

  return (
    <>
      <Command groups={groups} placeholder="Search the catalog…" />
      <Text as="p" variant="body-xs" color="secondary">{notice}</Text>
    </>
  );
}

function RichTextPanel() {
  const [value, setValue] = useState('');
  return (
    <RichTextEditor
      value={value}
      onChange={setValue}
      placeholder="Write the release note…"
      minHeight="140px"
    />
  );
}

function ColorPanel() {
  const [color, setColor] = useState('#0a66c2');
  return (
    <div className={styles.previewRow}>
      <span
        className={styles.swatch}
        style={{ '--preview-fill': color } as CSSProperties}
        aria-hidden
      />
      <div className={styles.editorField}>
        <ColorPicker label="Accent" value={color} onChange={setColor} />
      </div>
    </div>
  );
}

function GradientPanel() {
  const [gradient, setGradient] = useState('linear-gradient(120deg, #0a66c2 0%, #7c3aed 55%, #f97316 100%)');
  return (
    <>
      <span
        className={`${styles.swatch} ${styles.wide}`}
        style={{ '--preview-fill': gradient } as CSSProperties}
        aria-hidden
      />
      <div className={styles.editorField}>
        <GradientPicker label="Background" value={gradient} onChange={setGradient} />
      </div>
    </>
  );
}

function ShadowPanel() {
  const [shadow, setShadow] = useState<PhoneShadow>(DEFAULT_SHADOW);
  const preview = `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.spread}px rgba(0, 0, 0, ${shadow.shadowOpacity})`;
  return (
    <div className={styles.previewRow}>
      <span
        className={styles.swatch}
        style={{ '--preview-shadow': preview } as CSSProperties}
        aria-hidden
      />
      <div className={styles.editorField}>
        <ShadowEditor
          label="Shadow"
          value={shadow}
          onChange={(partial) => setShadow((current) => ({ ...current, ...partial }))}
        />
      </div>
    </div>
  );
}

function MotionPanel() {
  const [transition, setTransition] = useState('300ms ease-out');
  return (
    <div className={styles.editorField}>
      <AnimationPicker label="Transition" value={transition} onChange={setTransition} />
    </div>
  );
}

function PixelPanel() {
  const [svg, setSvg] = useState('');
  return (
    <div className={styles.pixelFrame}>
      <PixelArtEditor
        width={16}
        height={16}
        value={svg}
        palette={PIXEL_PALETTE}
        onChange={setSvg}
      />
    </div>
  );
}

function GalleryTile({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  const open = () => navigate('components', id);

  return (
    <div
      className={styles.galleryTile}
      role="link"
      tabIndex={0}
      aria-label={`Open ${label}`}
      onClick={open}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      }}
    >
      <div className={styles.galleryDemo}>{children}</div>
    </div>
  );
}

function ComponentGallery() {
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [tab, setTab] = useState('overview');
  const [plan, setPlan] = useState('pro');
  const [view, setView] = useState('list');
  const [volume, setVolume] = useState(62);
  const [chipOn, setChipOn] = useState(true);
  const avatar = sampleAvatars[0];

  return (
    <div className={styles.componentGrid}>
      <GalleryTile id="button" label="Button">
        <div className={styles.galleryRow}>
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="secondary">Secondary</Button>
        </div>
      </GalleryTile>

      <GalleryTile id="badge" label="Badge">
        <div className={styles.galleryRow}>
          <Badge variant="success" size="sm">Success</Badge>
          <Badge variant="warning" size="sm">Warning</Badge>
          <Badge variant="info" size="sm">Info</Badge>
        </div>
      </GalleryTile>

      <GalleryTile id="chip" label="Chip">
        <Chip
          selected={chipOn}
          onSelect={() => setChipOn((value) => !value)}
          avatar={{ src: avatar.src, name: avatar.name }}
        >
          {avatar.name}
        </Chip>
      </GalleryTile>

      <GalleryTile id="avatar" label="Avatar">
        <div className={styles.galleryRow}>
          <Avatar src={avatar.src} name={avatar.name} size="sm" />
          <Avatar src={sampleAvatars[1].src} name={sampleAvatars[1].name} size="md" />
          <Avatar src={sampleAvatars[2].src} name={sampleAvatars[2].name} size="lg" />
        </div>
      </GalleryTile>

      <GalleryTile id="toggle" label="Toggle">
        <Toggle
          label="Enabled"
          checked={enabled}
          onChange={setEnabled}
          aria-label="Enabled"
        />
      </GalleryTile>

      <GalleryTile id="checkbox" label="Checkbox">
        <Checkbox
          label="Notify me"
          checked={checked}
          onChange={setChecked}
        />
      </GalleryTile>

      <GalleryTile id="segmented-control" label="SegmentedControl">
        <SegmentedControl
          size="sm"
          value={view}
          onChange={setView}
          options={[
            { value: 'list', label: 'List' },
            { value: 'grid', label: 'Grid' },
          ]}
        />
      </GalleryTile>

      <GalleryTile id="tabs" label="Tabs">
        <Tabs
          size="sm"
          activeId={tab}
          onChange={setTab}
          tabs={[
            { id: 'overview', label: 'Overview' },
            { id: 'activity', label: 'Activity' },
          ]}
        />
      </GalleryTile>

      <GalleryTile id="select" label="Select">
        <Select
          size="sm"
          value={plan}
          onChange={setPlan}
          options={[
            { value: 'free', label: 'Free' },
            { value: 'pro', label: 'Pro' },
            { value: 'team', label: 'Team' },
          ]}
        />
      </GalleryTile>

      <GalleryTile id="slider" label="Slider">
        <div className={styles.galleryStretch}>
          <Slider
            value={volume}
            onChange={(value) => setVolume(typeof value === 'number' ? value : value[0])}
            aria-label="Volume"
            size="sm"
          />
        </div>
      </GalleryTile>

      <GalleryTile id="progress-bar" label="ProgressBar">
        <div className={styles.galleryStretch}>
          <ProgressBar value={72} size="sm" showValue />
        </div>
      </GalleryTile>

      <GalleryTile id="spinner" label="Spinner">
        <div className={styles.galleryRow}>
          <Spinner size="sm" />
          <ProgressCircular value={64} size="sm" />
        </div>
      </GalleryTile>

      <GalleryTile id="kbd" label="Kbd">
        <div className={styles.galleryRow}>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </div>
      </GalleryTile>

      <GalleryTile id="toolbar-button" label="ToolbarButton">
        <div className={styles.galleryRow}>
          <ToolbarButton icon={Search} aria-label="Search" />
          <ToolbarButton icon={Settings} aria-label="Settings" selected />
        </div>
      </GalleryTile>

      <GalleryTile id="skeleton" label="Skeleton">
        <div className={styles.galleryStretch}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="rect" height={28} />
        </div>
      </GalleryTile>

      <GalleryTile id="banner" label="Banner">
        <Banner variant="info" message="Deploy finished without errors." />
      </GalleryTile>
    </div>
  );
}

function ThemeTile({
  option,
  selected,
  onSelect,
}: {
  option: ThemeOption;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      className={styles.themeTile}
      aria-label={option.label}
      aria-pressed={selected}
      onClick={() => onSelect(option.id)}
    >
      <span
        className={styles.themePreview}
        data-admin-theme={option.id || undefined}
      >
        <span className={styles.themeMark}>{option.label}</span>
        <span className={styles.themeAction}>Ok</span>
      </span>
    </button>
  );
}

function ThemeStudio() {
  const [themeId, setThemeId] = useState('ocean');
  const [workspace, setWorkspace] = useState('Northwind');
  const [renewal, setRenewal] = useState('2026-10-11');

  return (
    <div className={styles.themeLayout}>
      <div className={styles.themePicker}>
        <Text as="p" variant="overline">Accent</Text>
        <div className={styles.themeGrid}>
          {ACCENT_THEMES.map((option) => (
            <ThemeTile
              key={option.label}
              option={option}
              selected={themeId === option.id}
              onSelect={setThemeId}
            />
          ))}
        </div>
        <Text as="p" variant="overline">Surface</Text>
        <div className={styles.themeGrid}>
          {SURFACE_THEMES.map((option) => (
            <ThemeTile
              key={option.id}
              option={option}
              selected={themeId === option.id}
              onSelect={setThemeId}
            />
          ))}
        </div>
      </div>
      <div className={styles.themeResult}>
        <section
          className={styles.stage}
          aria-label="Theme preview"
          data-admin-theme={themeId || undefined}
        >
          <Text as="div" variant="heading-s">Workspace</Text>
          <div className={styles.stageFields}>
            <Input label="Name" value={workspace} onChange={setWorkspace} />
            <DatePicker
              label="Renewal"
              value={renewal}
              onChange={(value) => setRenewal(typeof value === 'string' ? value : value[0])}
              autoClose
            />
          </div>
          <div className={styles.stageRow}>
            <Button size="sm">Save</Button>
            <Button size="sm" variant="secondary">Cancel</Button>
            <Button size="sm" variant="ghost">Archive</Button>
          </div>
          <div className={styles.stageRow}>
            <Badge variant="success" size="sm">Paid</Badge>
            <Badge variant="warning" size="sm">Review</Badge>
            <Badge variant="info" size="sm">Info</Badge>
          </div>
        </section>
        <CodeBlock language="html">{themeSnippet(themeId)}</CodeBlock>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.band}>
        <div className={styles.inner}>
          <div className={styles.heroGrid}>
            <div className={styles.hero}>
              <h1 className={styles.title}>Build admin tools with one stylesheet</h1>
              <p className={styles.lede}>
                Design tokens, primitives, overlays, and navigation for dashboards, settings, and internal tools. Authored in React with opinionated defaults — import the stylesheet and ship.
              </p>
              <div className={styles.actions}>
                <Button endIcon={ArrowRight} onClick={() => navigate('components', 'components')}>
                  Browse components
                </Button>
                <Button variant="secondary" onClick={() => navigate('system', 'colors')}>
                  Design system
                </Button>
              </div>
            </div>
            <ProductSnapshot />
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.inner}>
          <SectionHeading
            size="lg"
            title="What you get"
            description="A kit for the screens behind the product: dense, repeatable, and ready to theme."
          />
          <CardGrid>
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} hoverable={false}>
                  <div className={styles.feature}>
                    <span className={styles.featureIcon} aria-hidden>
                      <Icon size={18} />
                    </span>
                    <Text as="h3" variant="heading-xs">{feature.title}</Text>
                    <Text as="p" variant="body-s" color="secondary">{feature.description}</Text>
                  </div>
                </Card>
              );
            })}
          </CardGrid>
        </div>
      </section>

      <section className={styles.band} aria-label="Component gallery">
        <div className={styles.inner}>
          <ComponentGallery />
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.inner}>
          <SectionHeading
            size="lg"
            title="Advanced components"
            description="Editors, data, and command surfaces that usually become their own project. They share tokens, keyboard behavior, and theming with Button."
          />
          <AdvancedShowcase />
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.inner}>
          <SectionHeading
            size="lg"
            title="Themes that compose"
            description="Set data-admin-theme on any element. Color themes and shape themes combine with word matching, and dark mode stacks on data-theme."
          />
          <ThemeStudio />
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.inner}>
          <SectionHeading
            size="lg"
            title="Install"
            description="Import the stylesheet once. Import themes when you want data-admin-theme."
          />
          <div className={styles.split}>
            <CodeBlock language="bash">{`npm install github:utopastac/admin-ui#main`}</CodeBlock>
            <CodeBlock language="tsx">{`import 'admin-ui/styles';
import 'admin-ui/themes';
import { Button, DataGrid, SideNav } from 'admin-ui';`}</CodeBlock>
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.inner}>
          <SectionHeading
            size="lg"
            title="Explore the catalog"
            description="Reference pages for every token and component."
          />
          <CardGrid>
            {CATALOG_SECTIONS.map((section) => (
              <Card key={section.id} hoverable onClick={() => navigate(section.tab, section.page)}>
                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardTitle}>{section.title}</span>
                    {section.count !== null && (
                      <span className={styles.cardCount}>
                        {section.count} {section.countLabel}
                      </span>
                    )}
                  </div>
                  <p className={styles.cardDescription}>{section.description}</p>
                </div>
              </Card>
            ))}
          </CardGrid>
        </div>
      </section>
    </div>
  );
}
