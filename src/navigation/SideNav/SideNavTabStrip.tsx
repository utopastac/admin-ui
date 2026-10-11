import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './SideNavTabStrip.module.css';

export interface SideNavTabData {
  /** Unique identifier for the tab. */
  id: string;
  /** Display label shown in the tab button. */
  label: string;
  /** Optional Lucide icon shown before the label. */
  icon?: LucideIcon;
  /** When true, renders a horizontal separator line above this tab. */
  separator?: boolean;
}

interface SideNavTabStripProps {
  tabs: SideNavTabData[];
  activeTabId?: string;
  onTabSelect: (id: string) => void;
  highContrast?: boolean;
}

const SideNavTabStrip: React.FC<SideNavTabStripProps> = ({
  tabs,
  activeTabId,
  onTabSelect,
  highContrast = false,
}) => {
  return (
    <nav className={styles.tabStrip} aria-label="Tab navigation">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <React.Fragment key={tab.id}>
            {tab.separator && <hr className={styles.separator} />}
            <button
              type="button"
              className={`${styles.tab} ${isActive ? styles.active : ''} ${isActive && highContrast ? styles.highContrast : ''}`}
              onClick={() => onTabSelect(tab.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.icon && <tab.icon size={14} className={styles.tabIcon} />}
              {tab.label}
            </button>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default SideNavTabStrip;
