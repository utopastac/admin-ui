import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { LinkList } from '@/layout';

const LinkListProps: PropRow[] = [
  { prop: 'sections', type: 'LinkListSection[]', description: 'Sections of grouped links to render.' },
  { prop: 'bare', type: 'boolean', description: 'Remove section borders and vertical padding.' },
];

const grouped = [
  {
    header: 'Primitives',
    description: 'Core interactive elements — buttons, inputs, form controls, data display, and more.',
    items: [
      { id: 'button', label: 'Button' },
      { id: 'input', label: 'Input' },
      { id: 'select', label: 'Select' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'badge', label: 'Badge' },
    ],
  },
  {
    header: 'Layout',
    description: 'Structural components for arranging content.',
    items: [
      { id: 'stack', label: 'Stack' },
      { id: 'columns', label: 'Columns' },
      { id: 'card-grid', label: 'CardGrid' },
    ],
  },
];

const flat = [
  {
    items: [
      { id: 'colors', label: 'Colors' },
      { id: 'typography', label: 'Typography' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'icons', label: 'Icons' },
      { id: 'shadows', label: 'Shadows' },
    ],
  },
];

export default function LinkListDemo() {
  return (
    <DemoSection
      title="LinkList"
      description="Renders groups of items as inline clickable links separated by /. Typically used for catalog index and landing pages."
    >
      <PropsTable props={LinkListProps} />
      <DemoSubsection label="Grouped with headers and descriptions">
        <LinkList sections={grouped} />
      </DemoSubsection>

      <DemoSubsection label="Flat (no header)">
        <LinkList sections={flat} />
      </DemoSubsection>
    </DemoSection>
  );
}
