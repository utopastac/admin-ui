import React, { useState } from 'react';
import { LayoutDashboard, Users, Settings, ShieldCheck } from 'lucide-react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { SideNav } from '@/navigation';
import type {
  SideNavSectionData,
  SideNavTopLevelSectionData,
  SideNavTabConfig,
} from '@/navigation';

const SideNavProps: PropRow[] = [
  { prop: 'sections', type: 'SideNavSectionData[]', description: 'Grouped navigation items. Each section has an optional label and a list of items.' },
  { prop: 'onSelect', type: '(id: string) => void', description: 'Called when any navigation item is clicked.' },
  { prop: 'activeId', type: 'string', description: 'The id of the currently active/selected item.' },
  { prop: 'topLevelSections', type: 'SideNavTopLevelSectionData[]', description: 'Optional top-level accordion sections that sit above the nav content.' },
  { prop: 'searchable', type: 'boolean', default: 'false', description: 'Show a search input to filter items.' },
  { prop: 'searchPlaceholder', type: 'string', default: "'Search\u2026'", description: 'Placeholder text for the search input.' },
  { prop: 'searchIconType', type: "'search' | 'filter'", default: "'search'", description: 'Icon style for the search input.', options: ['search', 'filter'] },
  { prop: 'footer', type: 'React.ReactNode', description: 'Optional content fixed to the bottom of the side nav.' },
  { prop: 'scrollOffset', type: 'number', default: '40', description: 'Extra pixels to scroll past the active item when scrolling into view.' },
  { prop: 'highContrast', type: 'boolean', default: 'false', description: 'High-contrast selected state: black background with white text.' },
  { prop: 'fullWidth', type: 'boolean', default: 'false', description: 'Nav items stretch to the full width of the nav.' },
  { prop: 'tabs', type: 'SideNavTabConfig[]', description: 'When provided, renders a vertical tab strip with per-tab sections.' },
  { prop: 'activeTabId', type: 'string', description: 'The id of the currently active tab.' },
  { prop: 'onTabSelect', type: '(id: string) => void', description: 'Called when a tab is clicked.' },
  { prop: 'collapsible', type: 'boolean', default: 'true', description: 'Show a toggle button to collapse and expand the sidebar.' },
  { prop: 'defaultCollapsed', type: 'boolean', default: 'false', description: 'Initial collapsed state.' },
  { prop: 'onCollapsedChange', type: '(collapsed: boolean) => void', description: 'Called whenever the collapsed state changes.' },
  { prop: 'globalSearchable', type: 'boolean', default: 'false', description: 'In tabbed mode, renders a search bar that filters across all tabs.' },
  { prop: 'globalSearchPlaceholder', type: 'string', default: "'Search all\u2026'", description: 'Placeholder text for the global search input.' },
  { prop: 'globalSearchIconType', type: "'search' | 'filter'", default: "'search'", description: 'Icon style for the global search input.', options: ['search', 'filter'] },
  { prop: 'className', type: 'string', description: 'Additional CSS class for the root element.' },
];

const demoSideNavSections: SideNavSectionData[] = [
  {
    label: 'Pages',
    items: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'reports', label: 'Reports' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { id: 'general', label: 'General' },
      { id: 'team', label: 'Team' },
      { id: 'billing', label: 'Billing' },
    ],
  },
  {
    items: [
      { id: 'help', label: 'Help & Support' },
    ],
  },
];

const topLevelSections: SideNavTopLevelSectionData[] = [
  {
    label: 'Main',
    defaultOpen: true,
    sections: [
      {
        label: 'Overview',
        items: [
          { id: 'home', label: 'Home' },
          { id: 'dashboard', label: 'Dashboard' },
        ],
      },
      {
        label: 'Content',
        items: [
          { id: 'posts', label: 'Posts' },
          { id: 'media', label: 'Media' },
        ],
      },
    ],
  },
  {
    label: 'Settings',
    defaultOpen: false,
    sections: [
      {
        items: [
          { id: 'general', label: 'General' },
          { id: 'team', label: 'Team' },
          { id: 'billing', label: 'Billing' },
        ],
      },
    ],
  },
];

const nestedSections: SideNavSectionData[] = [
  {
    label: 'Overview',
    items: [
      { id: 'home', label: 'Home' },
    ],
  },
  {
    label: 'Interventions',
    items: [
      {
        id: 'cat:nudges',
        label: 'Nudges',
        children: [
          { id: 'int:cookie-banner', label: 'Cookie banner' },
          { id: 'int:dark-pattern', label: 'Dark pattern alert thats  very very very very very long' },
        ],
      },
      {
        id: 'cat:friction',
        label: 'Friction',
        children: [
          { id: 'int:speed-bump', label: 'Speed bump' },
          { id: 'int:confirmation', label: 'Confirmation dialog' },
        ],
      },
    ],
  },
];

const indexedSections: SideNavSectionData[] = [
  {
    label: 'Pipeline',
    items: [
      {
        id: 'stage:review',
        label: 'Review',
        children: [
          { id: 'review:1', label: 'Initial triage', index: 1 },
          { id: 'review:2', label: 'Duplicate check', index: 2 },
          { id: 'review:3', label: 'Policy match', index: 3 },
        ],
      },
      {
        id: 'stage:action',
        label: 'Action',
        children: [
          { id: 'action:1', label: 'Notify member', index: 1 },
          { id: 'action:2', label: 'Apply restriction', index: 2 },
        ],
      },
    ],
  },
];

const tabbedTabs: SideNavTabConfig[] = [
  {
    id: 'pages',
    label: 'Pages',
    sections: [
      {
        label: 'Main',
        items: [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'analytics', label: 'Analytics' },
          { id: 'reports', label: 'Reports' },
        ],
      },
    ],
    searchable: true,
    searchPlaceholder: 'Search pages…',
  },
  {
    id: 'users',
    label: 'Users',
    sections: [
      {
        label: 'Management',
        items: [
          { id: 'all-users', label: 'All users' },
          { id: 'roles', label: 'Roles' },
          { id: 'invites', label: 'Invites' },
        ],
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    separator: true,
    sections: [
      {
        items: [
          { id: 'general', label: 'General' },
          { id: 'billing', label: 'Billing' },
          { id: 'security', label: 'Security' },
          { id: 'integrations', label: 'Integrations' },
        ],
      },
    ],
  },
];

export default function SideNavDemo() {
  const [demoActiveSideNavId, setDemoActiveSideNavId] = useState('dashboard');
  const [topLevelActiveId, setTopLevelActiveId] = useState('dashboard');
  const [nestedActiveId, setNestedActiveId] = useState('int:cookie-banner');
  const [indexedActiveId, setIndexedActiveId] = useState('review:1');
  const [tabbedActiveTab, setTabbedActiveTab] = useState('pages');
  const [tabbedActiveId, setTabbedActiveId] = useState('dashboard');
  const [globalSearchActiveTab, setGlobalSearchActiveTab] = useState('pages');
  const [globalSearchActiveId, setGlobalSearchActiveId] = useState('dashboard');

  return (
    <DemoSection
      title="SideNav"
      description="A vertical sidebar navigation with grouped sections, optional section labels, and active item highlighting."
    >
      <DemoShowcase code={`import { SideNav } from 'admin-ui';

const [activeId, setActiveId] = useState('home');

<SideNav
  sections={[{
    items: [
      { id: 'home', label: 'Home' },
      { id: 'settings', label: 'Settings' },
    ],
  }]}
  activeId={activeId}
  onSelect={setActiveId}
/>`}>
        <div style={{ border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius-md)', overflow: 'hidden', height: '200px', width: '320px' }}>
          <SideNav
            sections={[{ items: [{ id: 'home', label: 'Home' }, { id: 'settings', label: 'Settings' }] }]}
            activeId="home"
            onSelect={() => {}}
          />
        </div>
      </DemoShowcase>
      <PropsTable props={SideNavProps} />

      <DemoSubsection label="With multiple sections">
        <div style={{
          display: 'flex',
          border: '1px solid var(--admin-border-subtle)',
          borderRadius: 'var(--admin-radius-md)',
          overflow: 'hidden',
          height: '320px',
        }}>
          <div style={{ width: '320px', flexShrink: 0 }}>
          <SideNav
            sections={demoSideNavSections}
            activeId={demoActiveSideNavId}
            onSelect={setDemoActiveSideNavId}
          />
          </div>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--admin-background-extra-subtle)',
            color: 'var(--admin-text-subtle)',
            fontSize: 'var(--admin-font-size-m)',
          }}>
            Selected: <strong style={{ marginLeft: '4px', color: 'var(--admin-text-primary)' }}>{demoActiveSideNavId}</strong>
          </div>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Top-level accordion sections">
        <div style={{
          display: 'flex',
          border: '1px solid var(--admin-border-subtle)',
          borderRadius: 'var(--admin-radius-md)',
          overflow: 'hidden',
          height: '360px',
        }}>
          <div style={{ width: '320px', flexShrink: 0 }}>
          <SideNav
            sections={[]}
            topLevelSections={topLevelSections}
            activeId={topLevelActiveId}
            onSelect={setTopLevelActiveId}
          />
          </div>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--admin-background-extra-subtle)',
            color: 'var(--admin-text-subtle)',
            fontSize: 'var(--admin-font-size-m)',
          }}>
            Selected: <strong style={{ marginLeft: '4px', color: 'var(--admin-text-primary)' }}>{topLevelActiveId}</strong>
          </div>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Nested items (3-level hierarchy)">
        <div style={{
          display: 'flex',
          border: '1px solid var(--admin-border-subtle)',
          borderRadius: 'var(--admin-radius-md)',
          overflow: 'hidden',
          height: '360px',
        }}>
          <div style={{ width: '320px', flexShrink: 0 }}>
          <SideNav
            sections={nestedSections}
            activeId={nestedActiveId}
            onSelect={setNestedActiveId}
          />
          </div>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--admin-background-extra-subtle)',
            color: 'var(--admin-text-subtle)',
            fontSize: 'var(--admin-font-size-m)',
          }}>
            Selected: <strong style={{ marginLeft: '4px', color: 'var(--admin-text-primary)' }}>{nestedActiveId}</strong>
          </div>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Nested items with index numbers">
        <div style={{
          display: 'flex',
          border: '1px solid var(--admin-border-subtle)',
          borderRadius: 'var(--admin-radius-md)',
          overflow: 'hidden',
          height: '320px',
        }}>
          <div style={{ width: '320px', flexShrink: 0 }}>
            <SideNav
              sections={indexedSections}
              activeId={indexedActiveId}
              onSelect={setIndexedActiveId}
            />
          </div>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--admin-background-extra-subtle)',
            color: 'var(--admin-text-subtle)',
            fontSize: 'var(--admin-font-size-m)',
          }}>
            Selected: <strong style={{ marginLeft: '4px', color: 'var(--admin-text-primary)' }}>{indexedActiveId}</strong>
          </div>
        </div>
      </DemoSubsection>

      <DemoSubsection label="With footer">
        <div style={{
          display: 'flex',
          border: '1px solid var(--admin-border-subtle)',
          borderRadius: 'var(--admin-radius-md)',
          overflow: 'hidden',
          height: '320px',
        }}>
          <div style={{ width: '320px', flexShrink: 0 }}>
          <SideNav
            sections={demoSideNavSections}
            activeId={demoActiveSideNavId}
            onSelect={setDemoActiveSideNavId}
            footer={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-subtle)' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--admin-background-extra-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)' }}>P</div>
                <span>pwright@company.com</span>
              </div>
            }
          />
          </div>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--admin-background-extra-subtle)',
            color: 'var(--admin-text-subtle)',
            fontSize: 'var(--admin-font-size-m)',
          }}>
            Selected: <strong style={{ marginLeft: '4px', color: 'var(--admin-text-primary)' }}>{demoActiveSideNavId}</strong>
          </div>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Collapsible sections">
        <div style={{
          display: 'flex',
          border: '1px solid var(--admin-border-subtle)',
          borderRadius: 'var(--admin-radius-md)',
          overflow: 'hidden',
          height: '360px',
        }}>
          <div style={{ width: '320px', flexShrink: 0 }}>
          <SideNav
            sections={[
              {
                label: 'Pages',
                collapsible: true,
                items: [
                  { id: 'dashboard', label: 'Dashboard' },
                  { id: 'analytics', label: 'Analytics' },
                  { id: 'reports', label: 'Reports' },
                ],
              },
              {
                label: 'Settings',
                collapsible: true,
                defaultOpen: false,
                items: [
                  { id: 'general', label: 'General' },
                  { id: 'team', label: 'Team' },
                  { id: 'billing', label: 'Billing' },
                ],
              },
              {
                items: [
                  { id: 'help', label: 'Help & Support' },
                ],
              },
            ]}
            activeId="dashboard"
            onSelect={() => {}}
          />
          </div>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--admin-background-extra-subtle)',
            color: 'var(--admin-text-subtle)',
            fontSize: 'var(--admin-font-size-m)',
          }}>
            Click section headers to toggle
          </div>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Tabbed">
        <div style={{
          display: 'flex',
          border: '1px solid var(--admin-border-subtle)',
          borderRadius: 'var(--admin-radius-md)',
          overflow: 'hidden',
          height: '320px',
        }}>
          <div style={{ width: '360px', flexShrink: 0 }}>
            <SideNav
              tabs={tabbedTabs}
              activeTabId={tabbedActiveTab}
              onTabSelect={setTabbedActiveTab}
              sections={[]}
              activeId={tabbedActiveId}
              onSelect={setTabbedActiveId}
            />
          </div>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--admin-background-extra-subtle)',
            color: 'var(--admin-text-subtle)',
            fontSize: 'var(--admin-font-size-m)',
          }}>
            Selected: <strong style={{ marginLeft: '4px', color: 'var(--admin-text-primary)' }}>{tabbedActiveId}</strong>
          </div>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Tabbed with icons">
        <div style={{
          display: 'flex',
          border: '1px solid var(--admin-border-subtle)',
          borderRadius: 'var(--admin-radius-md)',
          overflow: 'hidden',
          height: '320px',
        }}>
          <div style={{ width: '360px', flexShrink: 0 }}>
            <SideNav
              tabs={[
                {
                  id: 'pages',
                  label: 'Pages',
                  icon: LayoutDashboard,
                  sections: [
                    { label: 'Main', items: [{ id: 'dashboard', label: 'Dashboard' }, { id: 'analytics', label: 'Analytics' }] },
                  ],
                  searchable: true,
                  searchPlaceholder: 'Search pages…',
                },
                {
                  id: 'users',
                  label: 'Users',
                  icon: Users,
                  sections: [
                    { label: 'Management', items: [{ id: 'all-users', label: 'All users' }, { id: 'roles', label: 'Roles' }] },
                  ],
                },
                {
                  id: 'trust',
                  label: 'Trust',
                  icon: ShieldCheck,
                  sections: [
                    { items: [{ id: 'policies', label: 'Policies' }, { id: 'violations', label: 'Violations' }] },
                  ],
                },
                {
                  id: 'settings',
                  label: 'Settings',
                  icon: Settings,
                  separator: true,
                  sections: [
                    { items: [{ id: 'general', label: 'General' }, { id: 'billing', label: 'Billing' }] },
                  ],
                },
              ]}
              activeTabId={tabbedActiveTab}
              onTabSelect={setTabbedActiveTab}
              sections={[]}
              activeId={tabbedActiveId}
              onSelect={setTabbedActiveId}
            />
          </div>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--admin-background-extra-subtle)',
            color: 'var(--admin-text-subtle)',
            fontSize: 'var(--admin-font-size-m)',
          }}>
            Selected: <strong style={{ marginLeft: '4px', color: 'var(--admin-text-primary)' }}>{tabbedActiveId}</strong>
          </div>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Tabbed with global search">
        <div style={{
          display: 'flex',
          border: '1px solid var(--admin-border-subtle)',
          borderRadius: 'var(--admin-radius-md)',
          overflow: 'hidden',
          height: '360px',
        }}>
          <div style={{ width: '360px', flexShrink: 0 }}>
            <SideNav
              tabs={[
                {
                  id: 'pages',
                  label: 'Pages',
                  icon: LayoutDashboard,
                  sections: [
                    {
                      label: 'Main',
                      items: [
                        { id: 'gs:dashboard', label: 'Dashboard' },
                        { id: 'gs:analytics', label: 'Analytics' },
                        { id: 'gs:reports', label: 'Reports' },
                        { id: 'gs:audit', label: 'Audit log' },
                      ],
                    },
                  ],
                },
                {
                  id: 'users',
                  label: 'Users',
                  icon: Users,
                  sections: [
                    {
                      label: 'Management',
                      items: [
                        { id: 'gs:all-users', label: 'All users' },
                        { id: 'gs:roles', label: 'Roles' },
                        { id: 'gs:invites', label: 'Invites' },
                        { id: 'gs:team-settings', label: 'Team settings' },
                      ],
                    },
                  ],
                },
                {
                  id: 'settings',
                  label: 'Settings',
                  icon: Settings,
                  separator: true,
                  sections: [
                    {
                      items: [
                        { id: 'gs:general', label: 'General' },
                        { id: 'gs:billing', label: 'Billing' },
                        { id: 'gs:security', label: 'Security' },
                        { id: 'gs:integrations', label: 'Integrations' },
                        { id: 'gs:notifications', label: 'Notifications' },
                      ],
                    },
                  ],
                },
              ]}
              globalSearchable
              globalSearchPlaceholder="Search all tabs…"
              activeTabId={globalSearchActiveTab}
              onTabSelect={setGlobalSearchActiveTab}
              sections={[]}
              activeId={globalSearchActiveId}
              onSelect={setGlobalSearchActiveId}
            />
          </div>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--admin-background-extra-subtle)',
            color: 'var(--admin-text-subtle)',
            fontSize: 'var(--admin-font-size-m)',
          }}>
            Selected: <strong style={{ marginLeft: '4px', color: 'var(--admin-text-primary)' }}>{globalSearchActiveId}</strong>
          </div>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Single section (no label)">
        <div style={{
          border: '1px solid var(--admin-border-subtle)',
          borderRadius: 'var(--admin-radius-md)',
          overflow: 'hidden',
          width: '320px',
        }}>
          <SideNav
            sections={[
              {
                items: [
                  { id: 'home', label: 'Home' },
                  { id: 'projects', label: 'Projects' },
                  { id: 'inbox', label: 'Inbox' },
                  { id: 'archive', label: 'Archive' },
                ],
              },
            ]}
            activeId="projects"
            onSelect={() => {}}
          />
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
