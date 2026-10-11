import React, { useId, useRef, useCallback } from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  size?: 'sm' | 'md';
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeId,
  onChange,
  size = 'md',
  className = '',
}) => {
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const getTabId = (tabId: string) => `tab-${baseId}-${tabId}`;
  const getPanelId = (tabId: string) => `panel-${baseId}-${tabId}`;

  const focusTab = useCallback((index: number) => {
    tabRefs.current[index]?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = tabs.findIndex((t) => t.id === activeId);
      let nextIndex: number | null = null;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = (currentIndex + 1) % tabs.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          nextIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      if (nextIndex !== null) {
        onChange(tabs[nextIndex].id);
        focusTab(nextIndex);
      }
    },
    [tabs, activeId, onChange, focusTab]
  );

  return (
    <div
      role="tablist"
      className={`${styles.tabList} ${styles[size]} ${className}`}
      onKeyDown={handleKeyDown}
    >
      {tabs.map((tab, index) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            ref={(el) => { tabRefs.current[index] = el; }}
            id={getTabId(tab.id)}
            role="tab"
            aria-selected={isActive}
            aria-controls={getPanelId(tab.id)}
            tabIndex={isActive ? 0 : -1}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
