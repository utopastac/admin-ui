import React from 'react';
import SideNavTabStrip from './SideNavTabStrip';
import type { SideNavTabConfig } from './SideNav';
import styles from './SideNav.module.css';

interface SideNavTabbedViewProps {
  tabs: SideNavTabConfig[];
  activeTabId?: string;
  onTabSelect: (id: string) => void;
  highContrast: boolean;
  /** When true, the tab strip is hidden (used while a global search query is active). */
  hideTabStrip: boolean;
  /** The content rendered to the right of the tab strip (e.g. nav content or cross-tab results). */
  children: React.ReactNode;
}

/**
 * Renders the vertical tab strip alongside the active tab's nav content.
 * When `hideTabStrip` is true (during a global search), the tab strip is
 * suppressed so the global results take the full width. Internal SideNav subcomponent.
 */
const SideNavTabbedView: React.FC<SideNavTabbedViewProps> = ({
  tabs,
  activeTabId,
  onTabSelect,
  highContrast,
  hideTabStrip,
  children,
}) => (
  <div className={styles.tabbedRow}>
    {!hideTabStrip && (
      <SideNavTabStrip
        tabs={tabs}
        activeTabId={activeTabId}
        onTabSelect={onTabSelect}
        highContrast={highContrast}
      />
    )}
    <div className={styles.tabContent}>{children}</div>
  </div>
);

export default SideNavTabbedView;
