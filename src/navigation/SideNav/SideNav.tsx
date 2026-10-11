import React, { useState, useMemo, useRef, useEffect } from 'react';
import SideNavCollapseToggle from './SideNavCollapseToggle';
import SideNavFlatView from './SideNavFlatView';
import SideNavGlobalSearchView from './SideNavGlobalSearchView';
import SideNavSearch from './SideNavSearch';
import SideNavTabbedView from './SideNavTabbedView';
import type { SideNavSectionData } from './SideNavSection';
import type { SideNavTopLevelSectionData } from './SideNavTopLevelSection';
import type { SideNavTabData } from './SideNavTabStrip';
import { SideNavContext } from './SideNavContext';
import { filterItemsByQuery } from './filterItemsByQuery';
import { resolveEffectiveConfig } from './resolveEffectiveConfig';
import { useKeyboardNav } from './useKeyboardNav';
import { useScrollActiveIntoView } from './useScrollActiveIntoView';
import styles from './SideNav.module.css';

export interface SideNavTabConfig extends SideNavTabData {
  /** Navigation sections shown when this tab is active. */
  sections: SideNavSectionData[];
  /** Optional top-level accordion sections shown when this tab is active. */
  topLevelSections?: SideNavTopLevelSectionData[];
  /** Show a search input for this tab's items. */
  searchable?: boolean;
  /** Placeholder text for the search input. */
  searchPlaceholder?: string;
  /** Icon style for the search input. */
  searchIconType?: 'search' | 'filter';
}

interface SideNavProps {
  /**
   * Grouped navigation items. Each section has an optional label and a list
   * of items. Sections render in array order.
   */
  sections: SideNavSectionData[];
  /**
   * Optional top-level accordion sections that sit above the nav content.
   * When provided, these render as collapsible groups; each contains
   * sections. When absent or empty, only `sections` are shown.
   */
  topLevelSections?: SideNavTopLevelSectionData[];
  /** The id of the currently active/selected item. */
  activeId?: string;
  /** Called when any navigation item is clicked. Receives the item's id. */
  onSelect: (id: string) => void;
  /** Show a search input to filter items. */
  searchable?: boolean;
  /** Placeholder text for the search input. */
  searchPlaceholder?: string;
  /** Icon style for the search input. 'search' shows a magnifying glass, 'filter' shows a filter funnel. */
  searchIconType?: 'search' | 'filter';
  /** Optional content fixed to the bottom of the side nav, outside the tab context. */
  footer?: React.ReactNode;
  /** Extra pixels to scroll past the active item when scrolling into view. Defaults to 40. */
  scrollOffset?: number;
  /** High-contrast selected state: black background with white text. */
  highContrast?: boolean;
  /** When true, nav items stretch to the full width of the nav. Defaults to false. */
  fullWidth?: boolean;
  className?: string;
  /**
   * When provided, renders a vertical tab strip to the left of the nav.
   * Each tab owns its own sections, search config, and optional top-level sections.
   * The active tab is controlled externally via `activeTabId` and `onTabSelect`.
   */
  tabs?: SideNavTabConfig[];
  /** The id of the currently active tab. Defaults to the first tab. */
  activeTabId?: string;
  /** Called when a tab is clicked. Receives the tab's id. */
  onTabSelect?: (id: string) => void;
  /**
   * When true, shows a toggle button to collapse and expand the sidebar.
   * The SideNav manages its own collapsed state internally. Defaults to true.
   * Note: the consumer's layout must allow the SideNav to shrink when collapsed
   * (avoid fixed widths on the SideNav container).
   */
  collapsible?: boolean;
  /** Initial collapsed state. Defaults to false. */
  defaultCollapsed?: boolean;
  /** Called whenever the collapsed state changes. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /**
   * When true (and in tabbed mode), renders a search bar above the tab strip
   * that filters items across all tabs simultaneously. Per-tab `searchable`
   * fields are ignored when this is set.
   */
  globalSearchable?: boolean;
  /** Placeholder text for the global search input. Defaults to 'Search all…'. */
  globalSearchPlaceholder?: string;
  /** Icon style for the global search input. */
  globalSearchIconType?: 'search' | 'filter';
}

const SideNav: React.FC<SideNavProps> = ({
  sections,
  topLevelSections,
  activeId,
  onSelect,
  searchable = false,
  searchPlaceholder = 'Search…',
  searchIconType = 'search',
  footer,
  scrollOffset = 40,
  highContrast = false,
  fullWidth = false,
  className = '',
  tabs,
  activeTabId,
  onTabSelect,
  collapsible = true,
  defaultCollapsed = false,
  onCollapsedChange,
  globalSearchable = false,
  globalSearchPlaceholder = 'Search all…',
  globalSearchIconType = 'search',
}) => {
  const [query, setQuery] = useState('');
  const [globalQuery, setGlobalQuery] = useState('');
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const navRef = useRef<HTMLDivElement>(null);

  const isTabbedMode = !!tabs && tabs.length > 0;

  const activeTab = isTabbedMode
    ? (tabs!.find((t) => t.id === activeTabId) ?? tabs![0])
    : null;

  // Reset search when active tab changes.
  // isTabbedMode is derived from `tabs` and cannot vary independently of activeTabId
  // in a way that would affect this effect — intentional omission.
  useEffect(() => {
    if (isTabbedMode) setQuery('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabId]);

  // Resolve the effective nav config (tabbed vs flat)
  const {
    effectiveSections,
    effectiveTopLevelSections,
    effectiveSearchable,
    effectiveSearchPlaceholder,
    effectiveSearchIconType,
  } = resolveEffectiveConfig({
    activeTab,
    sections,
    topLevelSections,
    searchable,
    searchPlaceholder,
    searchIconType,
    globalSearchable,
  });

  // Scroll the active item into view when activeId or sections change
  useScrollActiveIntoView(navRef, activeId, scrollOffset, [effectiveSections]);

  const filteredSections = useMemo(
    () => filterItemsByQuery(effectiveSections, query),
    [effectiveSections, query],
  );

  const filteredTopLevelSections = useMemo(() => {
    if (!effectiveTopLevelSections) return [];
    if (!query) return effectiveTopLevelSections;
    return effectiveTopLevelSections
      .map((t) => ({ ...t, sections: filterItemsByQuery(t.sections, query) }))
      .filter((t) => t.sections.length > 0);
  }, [effectiveTopLevelSections, query]);

  const crossTabResults = useMemo(() => {
    if (!isTabbedMode || !globalQuery || !tabs) return [];
    return tabs
      .map((tab) => ({ tab, sections: filterItemsByQuery(tab.sections, globalQuery) }))
      .filter((group) => group.sections.length > 0);
  }, [isTabbedMode, globalQuery, tabs]);

  const contextValue = useMemo(
    () => ({ onSelect, highContrast, fullWidth, activeId }),
    [onSelect, highContrast, fullWidth, activeId],
  );

  const handleTabSelect = (id: string) => {
    setGlobalQuery('');
    onTabSelect?.(id);
  };

  const handleToggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    onCollapsedChange?.(next);
  };

  const { handleKeyDown, containerRef: keyboardNavRef } = useKeyboardNav({
    onEscape: () => {
      if (globalQuery) setGlobalQuery('');
      else if (query) setQuery('');
    },
  });

  const navContent = (
    <>
      {effectiveSearchable && (
        <SideNavSearch
          value={query}
          onChange={setQuery}
          placeholder={effectiveSearchPlaceholder}
          icon={effectiveSearchIconType}
        />
      )}
      <div ref={navRef} className={styles.navWrapper}>
        <nav className={styles.nav} aria-label="Primary navigation">
          <SideNavFlatView
            sections={filteredSections}
            topLevelSections={filteredTopLevelSections}
            searchActive={!!effectiveSearchable && !!query}
          />
        </nav>
      </div>
    </>
  );

  const showGlobalResults = globalSearchable && !!globalQuery;

  return (
    <SideNavContext.Provider value={contextValue}>
      <div
        ref={keyboardNavRef}
        className={`${styles.sideNav} ${collapsed ? styles.collapsed : ''} ${className}`}
        onKeyDown={handleKeyDown}
      >
        {collapsible && (
          <SideNavCollapseToggle collapsed={collapsed} onToggle={handleToggle} />
        )}
        {!collapsed && (
          <>
            {isTabbedMode ? (
              <>
                {globalSearchable && (
                  <SideNavSearch
                    value={globalQuery}
                    onChange={setGlobalQuery}
                    placeholder={globalSearchPlaceholder}
                    icon={globalSearchIconType}
                    variant="global"
                  />
                )}
                <SideNavTabbedView
                  tabs={tabs!}
                  activeTabId={activeTab?.id}
                  onTabSelect={handleTabSelect}
                  highContrast={highContrast}
                  hideTabStrip={!!globalQuery}
                >
                  {showGlobalResults ? (
                    <SideNavGlobalSearchView ref={navRef} results={crossTabResults} />
                  ) : (
                    navContent
                  )}
                </SideNavTabbedView>
              </>
            ) : (
              navContent
            )}
            {footer && <div className={styles.footer}>{footer}</div>}
          </>
        )}
      </div>
    </SideNavContext.Provider>
  );
};

export default SideNav;
