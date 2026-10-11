import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Breadcrumb } from '@/primitives';
import type { BreadcrumbItem } from '@/primitives';

const BreadcrumbProps: PropRow[] = [
  { prop: 'items', type: 'BreadcrumbItem[]', description: 'Array of breadcrumb items. Each item has a label and optional href or onClick.' },
  { prop: 'separator', type: 'React.ReactNode', default: "'/'", description: 'Separator rendered between breadcrumb items.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class names.' },
];

export default function BreadcrumbDemo() {
  const items: BreadcrumbItem[] = [
    { label: 'Home', onClick: () => {} },
    { label: 'Components', onClick: () => {} },
    { label: 'Breadcrumb' },
  ];
  return (
    <DemoSection title="Breadcrumb" description="Navigational hierarchy showing the path to the current page.">
      <DemoShowcase code={`import { Breadcrumb } from 'admin-ui';

<Breadcrumb items={[
  { label: 'Home', onClick: () => {} },
  { label: 'Components', onClick: () => {} },
  { label: 'Breadcrumb' },
]} />`}>
        <Breadcrumb items={items} />
      </DemoShowcase>

      <PropsTable props={BreadcrumbProps} />

      <DemoSubsection label="Default">
        <Breadcrumb items={items} />
      </DemoSubsection>
      <DemoSubsection label="Custom Separator">
        <Breadcrumb items={items} separator=">" />
      </DemoSubsection>
    </DemoSection>
  );
}
