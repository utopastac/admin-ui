import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { AppLayout } from '@/layout';
import { TopNav, SideNav } from '@/navigation';
import { SidePanel } from '@/overlays';
import { Button } from '@/primitives';
import type { SideNavSectionData } from '@/navigation';

const AppLayoutProps: PropRow[] = [
  { prop: 'topNav', type: 'React.ReactNode', description: 'Content rendered in the top navigation bar, spanning the full width.' },
  { prop: 'children', type: 'React.ReactNode', description: 'Main content area.' },
  { prop: 'sideNav', type: 'React.ReactNode', description: 'Optional sidebar navigation rendered to the left of the content.' },
  { prop: 'panel', type: 'React.ReactNode', description: 'Optional panel rendered to the right of the content.' },
  { prop: 'className', type: 'string', description: 'Additional CSS class for the root element.' },
];

const demoSections: SideNavSectionData[] = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'analytics', label: 'Analytics' },
    ],
  },
  {
    label: 'Manage',
    items: [
      { id: 'users', label: 'Users' },
      { id: 'settings', label: 'Settings' },
    ],
  },
];

function PlaceholderContent({ activeId }: { activeId?: string }) {
  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 'var(--admin-font-size-xl)', fontWeight: 600, color: 'var(--admin-text-primary)' }}>
        {activeId ? activeId.charAt(0).toUpperCase() + activeId.slice(1) : 'Page content'}
      </h2>
      <p style={{ margin: 0, color: 'var(--admin-text-subtle)', fontSize: 'var(--admin-font-size-m)' }}>
        Main content area
      </p>
    </div>
  );
}

export default function AppLayoutDemo() {
  const [activeTabId, setActiveTabId] = useState('overview');
  const [activeId, setActiveId] = useState('dashboard');
  const [panelOpen, setPanelOpen] = useState(false);
  const [bothPanelOpen, setBothPanelOpen] = useState(false);
  const [bothActiveId, setBothActiveId] = useState('dashboard');

  return (
    <DemoSection
      title="AppLayout"
      description="Full-viewport shell with a TopNav spanning the full width. SideNav and panel slots are both optional — use one, the other, or both."
    >
      <DemoShowcase code={`import { AppLayout } from 'admin-ui';
import { TopNav, SideNav } from 'admin-ui';

<AppLayout
  topNav={<TopNav tabs={tabs} activeTabId={activeTabId} onTabSelect={setActiveTabId} />}
  sideNav={<SideNav sections={sections} activeId={activeId} onSelect={setActiveId} />}
>
  <div style={{ padding: '24px' }}>Page content</div>
</AppLayout>`}>
        <div style={{ height: '500px', border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius-md)', overflow: 'hidden' }}>
          <AppLayout
            topNav={
              <TopNav
                tabs={[
                  { id: 'overview', label: 'Overview' },
                  { id: 'reports', label: 'Reports' },
                  { id: 'settings', label: 'Settings' },
                ]}
                activeTabId={activeTabId}
                onTabSelect={setActiveTabId}
              />
            }
            sideNav={
              <SideNav
                sections={demoSections}
                activeId={activeId}
                onSelect={setActiveId}
              />
            }
          >
            <PlaceholderContent activeId={activeId} />
          </AppLayout>
        </div>
      </DemoShowcase>
      <PropsTable props={AppLayoutProps} />

      <DemoSubsection label="With panel (no sidenav)">
        <div style={{ height: '500px', border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius-md)', overflow: 'hidden' }}>
          <AppLayout
            topNav={
              <TopNav
                tabs={[{ id: 'content', label: 'Content' }, { id: 'activity', label: 'Activity' }]}
                activeTabId="content"
                onTabSelect={() => {}}
                actions={
                  <Button size="sm" onClick={() => setPanelOpen((v) => !v)}>
                    {panelOpen ? 'Close details' : 'Open details'}
                  </Button>
                }
              />
            }
            panel={
              <SidePanel
                isOpen={panelOpen}
                onClose={() => setPanelOpen(false)}
                title="Details"
                mode="push"
              >
                <div style={{ padding: '8px 0', color: 'var(--admin-text-subtle)', fontSize: 'var(--admin-font-size-m)' }}>
                  Panel content appears alongside the main content area.
                </div>
              </SidePanel>
            }
          >
            <PlaceholderContent />
          </AppLayout>
        </div>
      </DemoSubsection>

      <DemoSubsection label="With sidenav and panel">
        <div style={{ height: '500px', border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius-md)', overflow: 'hidden' }}>
          <AppLayout
            topNav={
              <TopNav
                tabs={[{ id: 'overview', label: 'Overview' }, { id: 'reports', label: 'Reports' }]}
                activeTabId="overview"
                onTabSelect={() => {}}
                actions={
                  <Button size="sm" onClick={() => setBothPanelOpen((v) => !v)}>
                    {bothPanelOpen ? 'Close panel' : 'Open panel'}
                  </Button>
                }
              />
            }
            sideNav={
              <SideNav
                sections={demoSections}
                activeId={bothActiveId}
                onSelect={setBothActiveId}
              />
            }
            panel={
              <SidePanel
                isOpen={bothPanelOpen}
                onClose={() => setBothPanelOpen(false)}
                title="Details"
                mode="push"
              >
                <div style={{ padding: '8px 0', color: 'var(--admin-text-subtle)', fontSize: 'var(--admin-font-size-m)' }}>
                  SideNav on the left, panel on the right.
                </div>
              </SidePanel>
            }
          >
            <PlaceholderContent activeId={bothActiveId} />
          </AppLayout>
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
