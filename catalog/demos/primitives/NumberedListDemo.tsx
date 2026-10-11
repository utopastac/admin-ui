import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { NumberedList } from '@/primitives';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';

const NumberedListProps: PropRow[] = [
  { prop: 'items', type: 'string[]', description: 'Array of string items to render as list entries' },
  { prop: 'size', type: "'sm' | 'md'", default: "'md'", options: ['sm', 'md'], description: 'Controls the text and spacing size' },
  { prop: 'start', type: 'number', default: '1', description: 'The number to start counting from' },
  { prop: 'className', type: 'string', description: 'Additional class name applied to the list element' },
];

export default function NumberedListDemo() {
  const items = ['Install the package', 'Import the component', 'Add it to your JSX'];
  return (
    <DemoSection title="NumberedList" description="Styled ordered list with custom number styling.">
      <DemoShowcase code={`import { NumberedList } from 'admin-ui';

<NumberedList items={['Step one', 'Step two', 'Step three']} />`}>
        <NumberedList items={['Step one', 'Step two', 'Step three']} />
      </DemoShowcase>
      <PropsTable props={NumberedListProps} />

      <DemoSubsection label="Medium (default)">
        <NumberedList items={items} />
      </DemoSubsection>
      <DemoSubsection label="Small, Starting at 3">
        <NumberedList items={items} size="sm" start={3} />
      </DemoSubsection>
    </DemoSection>
  );
}
