import type { TopNavTabData, SideNavSectionData, SideNavTabConfig } from '@/navigation';

export type MainTab = 'home' | 'about' | 'system' | 'components';

export const topNavTabs: TopNavTabData[] = [
  { id: 'about', label: 'About' },
  { id: 'system', label: 'System' },
  { id: 'components', label: 'Components' },
];

export const aboutSections: SideNavSectionData[] = [
  {
    items: [
      { id: 'about', label: 'About' },
      { id: 'decisions', label: 'Decisions' },
    ],
  },
  {
    label: 'Development',
    items: [
      { id: 'dev-architecture', label: 'Architecture' },
      { id: 'dev-adding-component', label: 'Adding a Component' },
      { id: 'dev-design-tokens', label: 'Design Tokens' },
      { id: 'dev-css-conventions', label: 'CSS Conventions' },
      { id: 'dev-build-deploy', label: 'Build & Deploy' },
    ],
  },
];

export const systemSections: SideNavSectionData[] = [
  {
    items: [
      { id: 'avatars', label: 'Avatars' },
      { id: 'border-radius', label: 'Border Radius' },
      { id: 'colors', label: 'Colors' },
      { id: 'icons', label: 'Icons' },
      { id: 'mixins', label: 'Mixins' },
      { id: 'shadows', label: 'Shadows' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'typography', label: 'Typography' },
    ],
  },
];

export const componentTabs: SideNavTabConfig[] = [
  {
    id: 'primitives',
    label: 'Primitives',
    sections: [
      {
        items: [
          { id: 'avatar', label: 'Avatar' },
          { id: 'animation-picker', label: 'AnimationPicker' },
          { id: 'badge', label: 'Badge' },
          { id: 'banner', label: 'Banner' },
          { id: 'blockquote', label: 'Blockquote' },
          { id: 'breadcrumb', label: 'Breadcrumb' },
          { id: 'bullet-list', label: 'BulletList' },
          { id: 'button', label: 'Button' },
          { id: 'button-group', label: 'ButtonGroup' },
          { id: 'card', label: 'Card' },
          { id: 'carousel', label: 'Carousel' },
          { id: 'checkbox', label: 'Checkbox' },
          { id: 'chip', label: 'Chip' },
          { id: 'command', label: 'Command' },
          { id: 'code-block', label: 'CodeBlock' },
          { id: 'color-picker', label: 'ColorPicker' },
          { id: 'compact-input', label: 'CompactInput' },
          { id: 'data-grid', label: 'DataGrid' },
          { id: 'date-picker', label: 'DatePicker' },
          { id: 'divider', label: 'Divider' },
          { id: 'editable-text', label: 'EditableText' },
          { id: 'empty-state', label: 'EmptyState' },
          { id: 'field-label', label: 'FieldLabel' },
          { id: 'global-search', label: 'GlobalSearch' },
          { id: 'gradient-picker', label: 'GradientPicker' },
          { id: 'image-picker', label: 'ImagePicker' },
          { id: 'inline-search', label: 'InlineSearch' },
          { id: 'input', label: 'Input' },
          { id: 'kbd', label: 'Kbd' },
          { id: 'numbered-list', label: 'NumberedList' },
          { id: 'pixel-art-editor', label: 'PixelArtEditor' },
          { id: 'popover', label: 'Popover' },
          { id: 'progress-bar', label: 'ProgressBar' },
          { id: 'progress-circular', label: 'ProgressCircular' },
          { id: 'radio', label: 'Radio' },
          { id: 'rich-text-editor', label: 'RichTextEditor' },
          { id: 'segmented-control', label: 'SegmentedControl' },
          { id: 'select', label: 'Select' },
          { id: 'selection-list', label: 'SelectionList' },
          { id: 'shadow-editor', label: 'ShadowEditor' },
          { id: 'skeleton', label: 'Skeleton' },
          { id: 'slider', label: 'Slider' },
          { id: 'spinner', label: 'Spinner' },
          { id: 'table', label: 'Table' },
          { id: 'tabs', label: 'Tabs' },
          { id: 'text', label: 'Text' },
          { id: 'textarea', label: 'Textarea' },
          { id: 'time-picker', label: 'TimePicker' },
          { id: 'timeline', label: 'Timeline' },
          { id: 'toggle', label: 'Toggle' },
          { id: 'toolbar-button', label: 'ToolbarButton' },
        ],
      },
    ],
  },
  {
    id: 'layout',
    label: 'Layout',
    sections: [
      {
        items: [
          { id: 'doc-page', label: 'DocPage' },
          { id: 'page-footer', label: 'PageFooter' },
          { id: 'page-heading', label: 'PageHeading' },
          { id: 'section-heading', label: 'SectionHeading' },
          { id: 'app-layout', label: 'AppLayout' },
          { id: 'stack', label: 'Stack' },
          { id: 'columns', label: 'Columns' },
          { id: 'card-grid', label: 'CardGrid' },
          { id: 'link-list', label: 'LinkList' },
        ],
      },
    ],
  },
  {
    id: 'overlays',
    label: 'Overlays',
    sections: [
      {
        items: [
          { id: 'alert-dialog', label: 'AlertDialog' },
          { id: 'context-menu', label: 'ContextMenu' },
          { id: 'modal', label: 'Modal' },
          { id: 'side-panel', label: 'SidePanel' },
          { id: 'toast', label: 'Toast' },
          { id: 'tooltip', label: 'Tooltip' },
        ],
      },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    sections: [
      {
        items: [
          { id: 'page-contents', label: 'PageContents' },
          { id: 'pagination', label: 'Pagination' },
          { id: 'top-nav', label: 'TopNav' },
          { id: 'side-nav', label: 'SideNav' },
        ],
      },
    ],
  },
];

export const defaultPages: Record<MainTab, string> = {
  home: 'home',
  about: 'about',
  system: 'system',
  components: 'components',
};

/**
 * Returns the top nav tabs with dropdown groups wired up.
 * Accepts the navigate function so navigation.ts stays free of router imports.
 */
export function buildNavTabs(
  nav: (tab: MainTab, page: string) => void,
): TopNavTabData[] {
  return topNavTabs.map((t) => {
    if (t.id === 'about') {
      return {
        ...t,
        dropdownGroups: aboutSections.map((section) => ({
          header: section.label,
          items: section.items.map((item) => ({
            id: item.id,
            label: item.label,
            onClick: () => nav('about', item.id),
          })),
        })),
      };
    }
    if (t.id === 'system') {
      return {
        ...t,
        dropdownGroups: [{
          items: systemSections[0].items.map((item) => ({
            id: item.id,
            label: item.label,
            onClick: () => nav('system', item.id),
          })),
        }],
      };
    }
    if (t.id === 'components') {
      return {
        ...t,
        dropdownGroups: [{
          items: componentTabs.map((tab) => ({
            id: tab.id,
            label: tab.label,
            onClick: () => nav('components', tab.sections[0].items[0].id),
          })),
        }],
      };
    }
    return t;
  });
}
