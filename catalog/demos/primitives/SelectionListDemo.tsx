import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { SelectionList } from '@/primitives';
import type { SelectionListItem } from '@/primitives';

const SelectionListProps: PropRow[] = [
  { prop: 'items', type: 'SelectionListItem[]', description: 'Array of items to render in the list.' },
  { prop: 'value', type: 'string', description: 'The currently selected item value.' },
  { prop: 'onChange', type: '(value: string) => void', description: 'Called when an item is selected.' },
  { prop: 'columns', type: '1 | 2 | 3', default: '1', options: ['1', '2', '3'], description: 'Number of columns in the grid layout.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class for the container.' },
  { prop: 'aria-label', type: 'string', description: 'Accessible label for the listbox.' },
];

const selectionItems: SelectionListItem[] = [
  { value: 'react', label: 'React', description: 'A JavaScript library for building UIs' },
  { value: 'vue', label: 'Vue', description: 'The progressive JavaScript framework' },
  { value: 'angular', label: 'Angular', description: 'Platform for building mobile and desktop apps' },
  { value: 'svelte', label: 'Svelte', description: 'Cybernetically enhanced web apps' },
];

const selectionItemsShort: SelectionListItem[] = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
  { value: 'xxl', label: '2X Large' },
  { value: 'xxxl', label: '3X Large' },
];

export default function SelectionListDemo() {
  const [selectedFramework, setSelectedFramework] = useState('react');
  const [selectedSize, setSelectedSize] = useState('md');

  return (
    <DemoSection
      title="SelectionList"
      description="A list of selectable items displayed in a grid. Supports 1, 2, or 3 column layouts with optional descriptions."
    >
      <DemoShowcase code={`import { SelectionList } from 'admin-ui';

const [value, setValue] = useState('react');
const items = [
  { value: 'react', label: 'React', description: 'A JavaScript library' },
  { value: 'vue', label: 'Vue', description: 'The progressive framework' },
];

<SelectionList items={items} value={value} onChange={setValue} />`}>
        <SelectionList
          items={selectionItems}
          value={selectedFramework}
          onChange={setSelectedFramework}
          columns={1}
        />
      </DemoShowcase>
      <PropsTable props={SelectionListProps} />

      <DemoSubsection label="1 Column (with descriptions)">
        <SelectionList
          items={selectionItems}
          value={selectedFramework}
          onChange={setSelectedFramework}
          columns={1}
        />
      </DemoSubsection>

      <DemoSubsection label="2 Columns (without descriptions)">
        <SelectionList
          items={selectionItemsShort}
          value={selectedSize}
          onChange={setSelectedSize}
          columns={2}
        />
      </DemoSubsection>
    </DemoSection>
  );
}
