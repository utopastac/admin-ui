import React, { useState, useRef, useEffect } from 'react';
import TopNavTab from './TopNavTab';
import TopNavActions from './TopNavActions';
import type { TopNavTabData } from './TopNavTab';
import styles from './TopNav.module.css';
import { resolveSize } from '@/utils/resolveSize';

export type TopNavSize = 'sm' | 'lg' | 's' | 'l' | 'small' | 'large';

interface TopNavProps {
  /** Optional content rendered before the brand (e.g. a mobile menu button). */
  leading?: React.ReactNode;
  /** Optional branding element rendered at the far left, before tabs. Clicking navigates home. */
  brand?: React.ReactNode;
  /** Called when the brand element is clicked. */
  onBrandClick?: () => void;
  /** The tabs to render on the left side of the bar. */
  tabs: TopNavTabData[];
  /** The id of the currently active tab. */
  activeTabId?: string;
  /** Called when a tab is clicked. Receives the tab's id. */
  onTabSelect?: (id: string) => void;
  /**
   * Optional content rendered on the right side of the bar.
   * Typically ToolbarButtons or other small action elements.
   */
  actions?: React.ReactNode;
  /** Optional content rendered on the right, directly before the actions slot. */
  search?: React.ReactNode;
  /** Size variant. `sm` (default) is compact; `lg` is taller with larger typography. */
  size?: TopNavSize;
  className?: string;
}

/**
 * A generic top navigation bar with tabbed navigation and an actions slot.
 *
 * Renders a fixed-height horizontal bar. Tabs appear on the left with an
 * underline indicator for the active tab. The optional `actions` slot sits
 * on the right for toolbar buttons, menus, or other controls.
 *
 * This component is fully controlled — active state and click handling
 * are managed by the consumer via props.
 *
 * @example
 * ```tsx
 * <TopNav
 *   tabs={[
 *     { id: 'flows', label: 'Flows' },
 *     { id: 'settings', label: 'Settings' },
 *   ]}
 *   activeTabId="flows"
 *   onTabSelect={(id) => setActiveTab(id)}
 *   actions={<ToolbarButton icon={Settings} onClick={openSettings} />}
 * />
 * ```
 */
const TopNav: React.FC<TopNavProps> = ({
  leading,
  brand,
  onBrandClick,
  tabs,
  activeTabId,
  onTabSelect,
  actions,
  search,
  size = 'sm',
  className = '',
}) => {
  const resolvedSize = resolveSize(size, 'sm');

  // Shared dropdown state — only one tab's dropdown can be open at a time.
  // A single timer lives here so mousing from one dropdown tab to another
  // cancels the pending close immediately rather than producing overlap.
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const openDropdown = (id: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpenDropdownId(id);
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpenDropdownId(null), 150);
  };

  const closeDropdown = () => {
    setOpenDropdownId(null);
  };

  return (
    <nav aria-label="Main navigation" className={`${styles.topNav} ${styles[resolvedSize]} ${className}`} data-testid="top-nav">
      <div className={styles.left}>
        {leading && <div className={styles.leading}>{leading}</div>}
        {brand && (
          <button
            type="button"
            className={styles.brand}
            onClick={onBrandClick}
          >
            {brand}
          </button>
        )}
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <React.Fragment key={tab.id}>
              {tab.separator && <div className={styles.separator} role="separator" />}
              <TopNavTab
                tab={tab}
                isActive={tab.id === activeTabId}
                onSelect={onTabSelect}
                size={resolvedSize as 'sm' | 'lg'}
                isDropdownOpen={openDropdownId === tab.id}
                onDropdownOpen={() => openDropdown(tab.id)}
                onDropdownClose={closeDropdown}
                onDropdownScheduleClose={scheduleClose}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
      {(search || actions) && (
        <div className={styles.right}>
          {search}
          {actions && <TopNavActions>{actions}</TopNavActions>}
        </div>
      )}
    </nav>
  );
};

export default TopNav;
