import { useState, useEffect, useMemo } from 'react';
import type { CSSProperties } from 'react';
import { TopNav, SideNav } from '@/navigation';
import { AppLayout } from '@/layout';
import { ToolbarButton, Select, GlobalSearch, CommandDialog } from '@/primitives';
import type { SelectOption, GlobalSearchResultData, CommandGroup } from '@/primitives';
import { useMediaQuery, ADMIN_MOBILE_QUERY } from '@/hooks';
import { useHashRoute, navigate } from './router';
import { aboutSections, systemSections, componentTabs, buildNavTabs } from './data/navigation';
import type { MainTab } from './data/navigation';
import { demos } from './demos';
import { AsteriskSquare, Sun, Moon, Github, Menu, Search } from 'lucide-react';
import styles from './App.module.css';

interface ThemeSwatchData {
  bg: string;
  surface: string;
  accent: string;
  border: string;
}

const themeSwatches = {
  '': {
    bg: '#ffffff',
    surface: '#f3f4f6',
    accent: '#0a66c2',
    border: '#d7dce2',
  },
  ocean: {
    bg: '#f0f9ff',
    surface: '#dbeafe',
    accent: '#0369a1',
    border: '#7dd3fc',
  },
  ember: {
    bg: '#fff7ed',
    surface: '#ffedd5',
    accent: '#c2410c',
    border: '#fdba74',
  },
  forest: {
    bg: '#f0fdf4',
    surface: '#dcfce7',
    accent: '#15803d',
    border: '#86efac',
  },
  violet: {
    bg: '#f5f3ff',
    surface: '#ede9fe',
    accent: '#6d28d9',
    border: '#c4b5fd',
  },
  rose: {
    bg: '#fff1f2',
    surface: '#ffe4e6',
    accent: '#be123c',
    border: '#fda4af',
  },
  slate: {
    bg: '#111827',
    surface: '#1f2937',
    accent: '#93c5fd',
    border: '#475569',
  },
  voltage: {
    bg: '#080a0f',
    surface: '#172231',
    accent: '#d7ff36',
    border: '#12f7d6',
  },
  zine: {
    bg: '#fff1e5',
    surface: '#f6dfcf',
    accent: '#990f3d',
    border: '#caa792',
  },
  studio: {
    bg: '#f4f4f1',
    surface: '#e5e4df',
    accent: '#4f6fbd',
    border: '#c7c4ba',
  },
  luma: {
    bg: '#f7fbff',
    surface: '#ffffff',
    accent: '#0071e3',
    border: '#d2d2d7',
  },
  terminal: {
    bg: '#050806',
    surface: '#102719',
    accent: '#39ff88',
    border: '#ffd166',
  },
  ledger: {
    bg: '#f7f6ee',
    surface: '#e1e5d6',
    accent: '#0f6b4f',
    border: '#bfc8ad',
  },
  blueprint: {
    bg: '#eef7ff',
    surface: '#d5e8f7',
    accent: '#146ca8',
    border: '#9fc4df',
  },
  aurora: {
    bg: '#eef9ff',
    surface: '#dcf1ef',
    accent: '#1aa982',
    border: '#ff7b69',
  },
  stark: {
    bg: '#ffffff',
    surface: '#ffffff',
    accent: '#111111',
    border: '#111111',
  },
} satisfies Record<string, ThemeSwatchData>;

function ThemeSwatch({ swatch }: { swatch: ThemeSwatchData }) {
  return (
    <span
      className={styles.themeSwatch}
      style={{
        '--theme-swatch-bg': swatch.bg,
        '--theme-swatch-surface': swatch.surface,
        '--theme-swatch-accent': swatch.accent,
        '--theme-swatch-border': swatch.border,
      } as CSSProperties}
    >
      <span className={styles.themeSwatchSurface} />
      <span className={styles.themeSwatchAccent} />
    </span>
  );
}

function createThemeOption(value: keyof typeof themeSwatches, label: string): SelectOption {
  return {
    value,
    label,
    start: <ThemeSwatch swatch={themeSwatches[value]} />,
  };
}

const themeOptions: SelectOption[] = [
  createThemeOption('', 'Default'),
  createThemeOption('ocean', 'Ocean'),
  createThemeOption('ember', 'Ember'),
  createThemeOption('forest', 'Forest'),
  createThemeOption('violet', 'Violet'),
  createThemeOption('rose', 'Rose'),
  createThemeOption('slate', 'Slate'),
  createThemeOption('voltage', 'Voltage'),
  createThemeOption('zine', 'Zine'),
  createThemeOption('studio', 'Studio'),
  createThemeOption('luma', 'Luma'),
  createThemeOption('terminal', 'Terminal'),
  createThemeOption('ledger', 'Ledger'),
  createThemeOption('blueprint', 'Blueprint'),
  createThemeOption('aurora', 'Aurora'),
  createThemeOption('stark', 'Stark'),
];

interface SearchEntry {
  id: string;
  label: string;
  section: string;
  tab: MainTab;
}

const searchIndex: SearchEntry[] = [
  ...systemSections.flatMap((s) =>
    s.items.map((item) => ({ id: item.id, label: item.label, section: 'System', tab: 'system' as MainTab }))
  ),
  ...componentTabs.flatMap((t) =>
    t.sections.flatMap((s) =>
      s.items.map((item) => ({ id: item.id, label: item.label, section: t.label, tab: 'components' as MainTab }))
    )
  ),
];

export default function App() {
  const { tab, page, setTab, setPage } = useHashRoute();
  const [dark, setDark] = useState(false);
  const [theme, setTheme] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeComponentTabId, setActiveComponentTabId] = useState('primitives');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [catalogSearchOpen, setCatalogSearchOpen] = useState(false);
  const isMobile = useMediaQuery(ADMIN_MOBILE_QUERY);

  useEffect(() => {
    if (tab !== 'components') return;
    const found = componentTabs.find((t) =>
      t.sections.some((s) => s.items.some((item) => item.id === page))
    );
    if (found) setActiveComponentTabId(found.id);
  }, [tab, page]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-admin-theme', theme);
    } else {
      document.documentElement.removeAttribute('data-admin-theme');
    }
  }, [theme]);

  useEffect(() => {
    if (!isMobile) setMobileNavOpen(false);
  }, [isMobile]);

  const searchResults = useMemo((): GlobalSearchResultData[] => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return searchIndex
      .filter((entry) => entry.label.toLowerCase().includes(q))
      .map((entry) => ({
        id: `${entry.tab}/${entry.id}`,
        title: entry.label,
        description: entry.section,
      }));
  }, [searchQuery]);

  const handleSearchSelect = (resultId: string) => {
    const [selectedTab, selectedPage] = resultId.split('/') as [MainTab, string];
    navigate(selectedTab, selectedPage);
    setSearchQuery('');
  };

  const navTabs = useMemo(() => buildNavTabs(navigate), []);

  const catalogCommandGroups = useMemo((): CommandGroup[] => [
    {
      searchOnly: true,
      items: searchIndex.map((entry) => ({
        id: `${entry.tab}/${entry.id}`,
        label: entry.label,
        onSelect: () => {
          navigate(entry.tab, entry.id);
          setCatalogSearchOpen(false);
        },
      })),
    },
  ], []);

  const closeMobileNav = () => setMobileNavOpen(false);

  const handleComponentTabSelect = (tabId: string) => {
    setActiveComponentTabId(tabId);
    const selectedTab = componentTabs.find((t) => t.id === tabId);
    if (selectedTab) navigate('components', selectedTab.sections[0].items[0].id);
    if (isMobile) closeMobileNav();
  };

  const handleSideNavSelect = (id: string) => {
    setPage(id);
    if (isMobile) closeMobileNav();
  };

  const handleTopNavTabSelect = (id: string) => {
    setTab(id);
    if (isMobile) closeMobileNav();
  };

  const showSidebar = tab === 'about' || tab === 'system' || tab === 'components';
  const sideNavSections = tab === 'about' ? aboutSections : systemSections;
  const ActiveDemo = demos[page];

  const topNav = (
    <TopNav
      leading={
        isMobile && showSidebar ? (
          <ToolbarButton
            icon={Menu}
            aria-label="Open navigation"
            onClick={() => setMobileNavOpen(true)}
          />
        ) : undefined
      }
      brand={
        <span className={styles.brand}>
          <AsteriskSquare size={16} aria-hidden="true" />
          Admin UI
        </span>
      }
      onBrandClick={() => navigate('home', 'home')}
      tabs={navTabs}
      activeTabId={tab === 'home' ? '' : tab}
      onTabSelect={handleTopNavTabSelect}
      search={
        isMobile ? (
          <ToolbarButton
            icon={Search}
            aria-label="Search catalog"
            title="Search catalog"
            onClick={() => setCatalogSearchOpen(true)}
          />
        ) : (
          <GlobalSearch
            query={searchQuery}
            onQueryChange={setSearchQuery}
            results={searchResults}
            onSelect={handleSearchSelect}
            placeholder="Search the catalog…"
            emptyMessage="No matches"
          />
        )
      }
      actions={
        <>
          <Select
            options={themeOptions}
            value={theme}
            onChange={setTheme}
            placeholder="Theme"
            size="sm"
          />
          <ToolbarButton
            icon={dark ? Sun : Moon}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setDark(!dark)}
          />
        </>
      }
    />
  );

  const githubFooter = (
    <a
      href="https://github.com/utopastac/admin-ui"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: 'var(--admin-font-size-xs)',
        color: 'var(--admin-text-subtle)',
        textDecoration: 'none',
      }}
    >
      <Github size={14} />
      View on GitHub
    </a>
  );

  const sideNav = showSidebar ? (
    tab === 'components' ? (
      <SideNav
        sections={[]}
        tabs={componentTabs}
        activeTabId={activeComponentTabId}
        onTabSelect={handleComponentTabSelect}
        activeId={page}
        onSelect={handleSideNavSelect}
        collapsible={false}
        globalSearchable
        globalSearchPlaceholder="Search components…"
        footer={githubFooter}
      />
    ) : (
      <SideNav
        sections={sideNavSections}
        activeId={page}
        onSelect={handleSideNavSelect}
        collapsible={false}
        footer={githubFooter}
      />
    )
  ) : undefined;

  return (
    <>
      <AppLayout
        topNav={topNav}
        sideNav={sideNav}
        sideNavWidth={360}
        mobileNavOpen={mobileNavOpen}
        onMobileNavOpenChange={setMobileNavOpen}
      >
        <div className={tab === 'home' ? undefined : styles.content}>
          {ActiveDemo && <ActiveDemo />}
        </div>
      </AppLayout>
      {isMobile && (
        <CommandDialog
          open={catalogSearchOpen}
          onClose={() => setCatalogSearchOpen(false)}
          onOpen={() => setCatalogSearchOpen(true)}
          groups={catalogCommandGroups}
          placeholder="Search the catalog…"
          emptyMessage="No matches"
        />
      )}
    </>
  );
}
