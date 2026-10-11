import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Tabs } from '@/primitives';
import type { TabItem } from '@/primitives';

const TabsProps: PropRow[] = [
  { prop: 'tabs', type: 'TabItem[]', description: 'Array of tab objects with id and label.' },
  { prop: 'activeId', type: 'string', description: 'The id of the currently active tab.' },
  { prop: 'onChange', type: '(id: string) => void', description: 'Called with the tab id when a tab is clicked.' },
  { prop: 'size', type: "'sm' | 'md'", default: "'md'", options: ['sm', 'md'], description: 'Size of the tab strip.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class for the tablist container.' },
];

const demoTabs: TabItem[] = [
  { id: 'details', label: 'Details' },
  { id: 'activity', label: 'Activity' },
  { id: 'permissions', label: 'Permissions' },
];

export default function TabsDemo() {
  const [activeTab, setActiveTab] = useState('details');
  const [activeSmTab, setActiveSmTab] = useState('details');

  return (
    <DemoSection
      title="Tabs"
      description="Inline content tabs for organizing content within a section. Supports sm and md sizes."
    >
      <DemoShowcase code={`import { Tabs } from 'admin-ui';

const [activeId, setActiveId] = useState('details');
const tabs = [
  { id: 'details', label: 'Details' },
  { id: 'activity', label: 'Activity' },
];

<Tabs tabs={tabs} activeId={activeId} onChange={setActiveId} />`}>
        <div style={{ width: '100%' }}>
          <Tabs tabs={demoTabs} activeId={activeTab} onChange={setActiveTab} />
        </div>
      </DemoShowcase>
      <PropsTable props={TabsProps} />

      <DemoSubsection label='size="md" (default)'>
        <Tabs tabs={demoTabs} activeId={activeTab} onChange={setActiveTab} />
        <p style={{ margin: 0, fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-subtle)' }}>
          Active: <strong style={{ color: 'var(--admin-text-primary)' }}>{activeTab}</strong>
        </p>
      </DemoSubsection>

      <DemoSubsection label='size="sm"'>
        <Tabs tabs={demoTabs} activeId={activeSmTab} onChange={setActiveSmTab} size="sm" />
      </DemoSubsection>
    </DemoSection>
  );
}
