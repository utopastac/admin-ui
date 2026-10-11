import React, { useState, useMemo } from 'react';
import { Settings, Search, Plus, FileText, Layers, Upload, DownloadCloud } from 'lucide-react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { ToolbarButton, GlobalSearch } from '@/primitives';
import type { GlobalSearchResultData } from '@/primitives';
import { TopNav } from '@/navigation';
import type { TopNavTabData } from '@/navigation';

const TopNavProps: PropRow[] = [
  { prop: 'tabs', type: 'TopNavTabData[]', description: 'The tabs to render on the left side of the bar.' },
  { prop: 'activeTabId', type: 'string', description: 'The id of the currently active tab.' },
  { prop: 'onTabSelect', type: '(id: string) => void', description: 'Called when a tab is clicked.' },
  { prop: 'brand', type: 'React.ReactNode', description: 'Optional branding element rendered at the far left, before tabs.' },
  { prop: 'onBrandClick', type: '() => void', description: 'Called when the brand element is clicked.' },
  { prop: 'actions', type: 'React.ReactNode', description: 'Optional content rendered on the right side of the bar.' },
  { prop: 'search', type: 'React.ReactNode', description: 'Optional content rendered on the right, directly before the actions slot.' },
  { prop: 'size', type: 'TopNavSize', default: "'sm'", description: 'Size variant. sm is compact; lg is taller with larger typography.', options: ['sm', 's', 'small', 'lg', 'l', 'large'] },
  { prop: 'className', type: 'string', description: 'Additional CSS class for the root element.' },
];

const demoTopNavTabs: TopNavTabData[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'members', label: 'Members' },
  { id: 'settings', label: 'Settings' },
  { id: 'integrations', label: 'Integrations' },
];

const searchItems: GlobalSearchResultData[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'members', title: 'Members' },
  { id: 'settings', title: 'Settings' },
  { id: 'integrations', title: 'Integrations' },
  { id: 'billing', title: 'Billing' },
  { id: 'audit-log', title: 'Audit Log' },
];

const dropdownTabs: TopNavTabData[] = [
  { id: 'overview', label: 'Overview' },
  {
    id: 'create',
    label: 'Create',
    dropdownGroups: [
      {
        header: 'Content',
        items: [
          { id: 'new-flow', label: 'New Flow', icon: Plus },
          { id: 'new-template', label: 'New Template', icon: FileText },
          { id: 'new-component', label: 'New Component', icon: Layers },
        ],
      },
      {
        header: 'Import',
        items: [
          { id: 'import-file', label: 'Import File', icon: Upload },
          { id: 'import-remote', label: 'Import from URL', icon: DownloadCloud },
        ],
      },
    ],
  },
  { id: 'settings', label: 'Settings' },
];

export default function TopNavDemo() {
  const [demoActiveTab, setDemoActiveTab] = useState('overview');
  const [lastDropdownAction, setLastDropdownAction] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return searchItems;
    const q = searchQuery.toLowerCase();
    return searchItems.filter((r) => (r.title as string).toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <DemoSection
      title="TopNav"
      description="A horizontal navigation bar with tabbed navigation and an optional actions slot on the right."
    >
      <DemoShowcase code={`import { TopNav } from 'admin-ui';

const [activeTabId, setActiveTabId] = useState('overview');
const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'members', label: 'Members' },
];

<TopNav tabs={tabs} activeTabId={activeTabId} onTabSelect={setActiveTabId} />`}>
        <div style={{ width: '100%', border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius-md)', overflow: 'hidden' }}>
          <TopNav
            tabs={demoTopNavTabs}
            activeTabId={demoActiveTab}
            onTabSelect={setDemoActiveTab}
          />
        </div>
      </DemoShowcase>
      <PropsTable props={TopNavProps} />

      <DemoSubsection label="With tabs and actions">
        <div style={{ border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius-md)', overflow: 'hidden' }}>
          <TopNav
            tabs={demoTopNavTabs}
            activeTabId={demoActiveTab}
            onTabSelect={setDemoActiveTab}
            actions={
              <div style={{ display: 'flex', gap: 'var(--admin-space-xs)' }}>
                <ToolbarButton icon={Search} title="Search" aria-label="Search" onClick={() => {}} />
                <ToolbarButton icon={Settings} title="Settings" aria-label="Settings" onClick={() => {}} />
              </div>
            }
          />
        </div>
        <p style={{ margin: 0, fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-subtle)' }}>
          Active tab: <strong style={{ color: 'var(--admin-text-primary)' }}>{demoActiveTab}</strong>
        </p>
      </DemoSubsection>

      <DemoSubsection label="Tabs only (no actions)">
        <div style={{ border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius-md)', overflow: 'hidden' }}>
          <TopNav
            tabs={[
              { id: 'tab-a', label: 'First' },
              { id: 'tab-b', label: 'Second' },
            ]}
            activeTabId="tab-a"
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Tabs with dropdown menus">
        <div style={{ border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius-md)', overflow: 'visible' }}>
          <TopNav
            tabs={dropdownTabs.map((t) =>
              t.dropdownGroups
                ? {
                    ...t,
                    dropdownGroups: t.dropdownGroups.map((g) => ({
                      ...g,
                      items: g.items.map((item) => ({
                        ...item,
                        onClick: () => setLastDropdownAction(item.label),
                      })),
                    })),
                  }
                : t,
            )}
            activeTabId={demoActiveTab}
            onTabSelect={setDemoActiveTab}
          />
        </div>
        {lastDropdownAction && (
          <p style={{ margin: 0, fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-subtle)' }}>
            Selected: <strong style={{ color: 'var(--admin-text-primary)' }}>{lastDropdownAction}</strong>
          </p>
        )}
      </DemoSubsection>

      <DemoSubsection label="With separators">
        <div style={{ border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius-md)', overflow: 'hidden' }}>
          <TopNav
            tabs={[
              { id: 'overview', label: 'Overview' },
              { id: 'members', label: 'Members' },
              { id: 'settings', label: 'Settings', separator: true },
              { id: 'integrations', label: 'Integrations' },
            ]}
            activeTabId={demoActiveTab}
            onTabSelect={setDemoActiveTab}
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="With centered search">
        <div style={{ border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius-md)', overflow: 'visible' }}>
          <TopNav
            tabs={demoTopNavTabs}
            activeTabId={demoActiveTab}
            onTabSelect={setDemoActiveTab}
            search={
              <GlobalSearch
                query={searchQuery}
                onQueryChange={setSearchQuery}
                results={searchResults}
                onSelect={setDemoActiveTab}
                placeholder="Search..."
              />
            }
            actions={
              <ToolbarButton icon={Settings} title="Settings" aria-label="Settings" onClick={() => {}} />
            }
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Large size">
        <div style={{ border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius-md)', overflow: 'hidden' }}>
          <TopNav
            tabs={demoTopNavTabs}
            activeTabId={demoActiveTab}
            onTabSelect={setDemoActiveTab}
            size="lg"
          />
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
