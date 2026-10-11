import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { BulletList } from '@/primitives';

const BulletListProps: PropRow[] = [
  { prop: 'items', type: 'string[]', description: 'Array of text strings to render as list items.' },
  { prop: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Text and spacing size.', options: ['sm', 'md'] },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class names.' },
];

export default function BulletListDemo() {
  const items = ['First item in the list', 'Second item with more detail', 'Third item to complete the set'];
  return (
    <DemoSection title="BulletList" description="Styled unordered list with custom bullet points.">
      <DemoShowcase code={`import { BulletList } from 'admin-ui';

<BulletList items={['First item', 'Second item', 'Third item']} />`}>
        <BulletList items={['First item', 'Second item', 'Third item']} />
      </DemoShowcase>

      <PropsTable props={BulletListProps} />

      <DemoSubsection label="Medium (default)">
        <BulletList items={items} />
      </DemoSubsection>
      <DemoSubsection label="Small">
        <BulletList items={items} size="sm" />
      </DemoSubsection>
    </DemoSection>
  );
}
