import React, { useState, useMemo } from 'react';
import { FileText, Settings, Users, LayoutDashboard, BarChart3, Bell, Shield, Palette } from 'lucide-react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { GlobalSearch, Toggle } from '@/primitives';
import type { GlobalSearchResultData } from '@/primitives';

const GlobalSearchProps: PropRow[] = [
  { prop: 'query', type: 'string', description: 'Current search query string.' },
  { prop: 'onQueryChange', type: '(query: string) => void', description: 'Called when the query input changes.' },
  { prop: 'results', type: 'GlobalSearchResultData[]', description: 'Array of result objects to display in the dropdown.' },
  { prop: 'onSelect', type: '(id: string) => void', description: 'Called when a result is selected.' },
  { prop: 'loading', type: 'boolean', default: 'false', description: 'Shows a loading indicator while results are being fetched.' },
  { prop: 'placeholder', type: 'string', default: "'Search...'", description: 'Placeholder text for the search input.' },
  { prop: 'emptyMessage', type: 'string', default: "'No matches'", description: 'Message shown when no results match the query.' },
  { prop: 'renderResult', type: '(result: GlobalSearchResultData) => React.ReactNode', description: 'Custom render function for each result row.' },
  { prop: 'shortcut', type: 'boolean', default: 'true', description: 'Whether to register ⌘K / Ctrl+K to focus the input.' },
  { prop: 'className', type: 'string', description: 'Additional class names.' },
];
import { TopNav } from '@/navigation';

// --- Mock data ---

const basicResults: GlobalSearchResultData[] = [
  { id: 'dashboard', title: 'Dashboard' },
  { id: 'user-management', title: 'User Management' },
  { id: 'project-settings', title: 'Project Settings' },
  { id: 'analytics', title: 'Analytics Overview' },
  { id: 'notifications', title: 'Notification Preferences' },
  { id: 'security', title: 'Security & Privacy' },
  { id: 'design-system', title: 'Design System' },
  { id: 'audit-log', title: 'Audit Log' },
];

const resultsWithIcons: GlobalSearchResultData[] = [
  { id: 'dashboard', title: 'Dashboard', description: 'Overview of key metrics', icon: <LayoutDashboard size={16} /> },
  { id: 'user-management', title: 'User Management', description: 'Manage team members and roles', icon: <Users size={16} /> },
  { id: 'project-settings', title: 'Project Settings', description: 'Configure project preferences', icon: <Settings size={16} /> },
  { id: 'analytics', title: 'Analytics Overview', description: 'View traffic and engagement data', icon: <BarChart3 size={16} /> },
  { id: 'notifications', title: 'Notification Preferences', description: 'Manage alerts and emails', icon: <Bell size={16} /> },
  { id: 'security', title: 'Security & Privacy', description: 'Access control and audit settings', icon: <Shield size={16} /> },
  { id: 'design-system', title: 'Design System', description: 'Tokens, components, and guidelines', icon: <Palette size={16} /> },
  { id: 'audit-log', title: 'Audit Log', description: 'Review recent activity', icon: <FileText size={16} /> },
];

// --- Highlight helper ---

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? <mark key={i}>{part}</mark> : part
  );
}

// --- Filter helper ---

function filterResults(results: GlobalSearchResultData[], query: string): GlobalSearchResultData[] {
  if (!query.trim()) return results;
  const lower = query.toLowerCase();
  return results.filter((r) => {
    const title = typeof r.title === 'string' ? r.title : '';
    return title.toLowerCase().includes(lower);
  });
}

export default function GlobalSearchDemo() {
  // Basic
  const [basicQuery, setBasicQuery] = useState('');
  const basicFiltered = useMemo(() => filterResults(basicResults, basicQuery), [basicQuery]);
  const basicHighlighted = useMemo(
    () => basicFiltered.map((r) => ({ ...r, title: highlightMatch(r.title as string, basicQuery) })),
    [basicFiltered, basicQuery],
  );

  // With icons
  const [iconQuery, setIconQuery] = useState('');
  const iconFiltered = useMemo(() => filterResults(resultsWithIcons, iconQuery), [iconQuery]);
  const iconHighlighted = useMemo(
    () => iconFiltered.map((r) => ({
      ...r,
      title: highlightMatch(r.title as string, iconQuery),
      description: typeof r.description === 'string' ? highlightMatch(r.description, iconQuery) : r.description,
    })),
    [iconFiltered, iconQuery],
  );

  // Loading
  const [loadingQuery, setLoadingQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Custom render
  const [customQuery, setCustomQuery] = useState('');
  const customFiltered = useMemo(() => filterResults(resultsWithIcons, customQuery), [customQuery]);

  // TopNav
  const [topNavQuery, setTopNavQuery] = useState('');
  const topNavFiltered = useMemo(() => filterResults(resultsWithIcons, topNavQuery), [topNavQuery]);
  const topNavHighlighted = useMemo(
    () => topNavFiltered.map((r) => ({
      ...r,
      title: highlightMatch(r.title as string, topNavQuery),
    })),
    [topNavFiltered, topNavQuery],
  );

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <DemoSection
      title="GlobalSearch"
      description="A searchable command-palette-style input with result dropdown. Supports icons, descriptions, custom rendering, loading states, and keyboard shortcut activation."
    >
      <DemoShowcase code={`import { GlobalSearch } from 'admin-ui';

const [query, setQuery] = useState('');
const results = useMemo(() =>
  allResults.filter(r =>
    r.title.toLowerCase().includes(query.toLowerCase())
  ), [query]);

<GlobalSearch
  query={query}
  onQueryChange={setQuery}
  results={results}
  onSelect={(id) => console.log('Selected:', id)}
  placeholder="Search pages..."
/>`}>
        <div style={{ width: '360px' }}>
          <GlobalSearch
            query={basicQuery}
            onQueryChange={setBasicQuery}
            results={basicHighlighted}
            onSelect={(id) => setSelected(id)}
            placeholder="Search pages..."
          />
        </div>
        {selected && (
          <p style={{ margin: 0, fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-subtle)' }}>
            Selected: <strong style={{ color: 'var(--admin-text-primary)' }}>{selected}</strong>
          </p>
        )}
      </DemoShowcase>
      <PropsTable props={GlobalSearchProps} />

      <DemoSubsection label="With icons">
        <div style={{ width: '400px' }}>
          <GlobalSearch
            query={iconQuery}
            onQueryChange={setIconQuery}
            results={iconHighlighted}
            onSelect={(id) => setSelected(id)}
            placeholder="Search with icons..."
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Loading state">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)', width: '360px' }}>
          <Toggle
            label="Simulate loading"
            checked={isLoading}
            onChange={setIsLoading}
          />
          <GlobalSearch
            query={loadingQuery}
            onQueryChange={setLoadingQuery}
            results={[]}
            onSelect={() => {}}
            loading={isLoading}
            placeholder="Search (loading)..."
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Custom render">
        <div style={{ width: '400px' }}>
          <GlobalSearch
            query={customQuery}
            onQueryChange={setCustomQuery}
            results={customFiltered}
            onSelect={(id) => setSelected(id)}
            placeholder="Search with custom layout..."
            renderResult={(result) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--admin-space-s)', padding: 'var(--admin-space-xs) 0' }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--admin-radius-sm)',
                  background: 'var(--admin-surface-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--admin-text-subtle)',
                  flexShrink: 0,
                }}>
                  {result.icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-primary)', fontWeight: 'var(--admin-font-weight-emphasis)' }}>
                    {highlightMatch(result.title as string, customQuery)}
                  </div>
                  {result.description && (
                    <div style={{ fontSize: 'var(--admin-font-size-xs)', color: 'var(--admin-text-subtle)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {result.description}
                    </div>
                  )}
                </div>
              </div>
            )}
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="In TopNav (search prop)">
        <div style={{ border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius-md)', overflow: 'visible' }}>
          <TopNav
            tabs={[
              { id: 'overview', label: 'Overview' },
              { id: 'members', label: 'Members' },
              { id: 'settings', label: 'Settings' },
            ]}
            activeTabId="overview"
            search={
              <GlobalSearch
                query={topNavQuery}
                onQueryChange={setTopNavQuery}
                results={topNavHighlighted}
                onSelect={(id) => setSelected(id)}
                placeholder="Search..."
                shortcut
              />
            }
          />
        </div>
        <p style={{ margin: 0, fontSize: 'var(--admin-font-size-s)', color: 'var(--admin-text-subtle)' }}>
          GlobalSearch centered in TopNav via the <code>search</code> prop.
        </p>
      </DemoSubsection>
    </DemoSection>
  );
}
