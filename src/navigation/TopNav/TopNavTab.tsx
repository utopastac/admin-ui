import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './TopNavTab.module.css';
import TopNavDropdown from './TopNavDropdown';
import type { TopNavDropdownGroup } from './TopNavDropdown';

export type { TopNavDropdownGroup, TopNavDropdownItem } from './TopNavDropdown';

export interface TopNavTabData {
  /** Unique identifier for the tab. */
  id: string;
  /** Display label shown in the tab. */
  label: string;
  /** When true, renders a vertical separator bar before this tab. */
  separator?: boolean;
  /**
   * When provided, the tab also renders a hover-triggered dropdown menu.
   * Clicking the tab itself still calls onSelect and shows an active indicator.
   */
  dropdownGroups?: TopNavDropdownGroup[];
}

interface TopNavTabProps {
  /** The tab data to render. */
  tab: TopNavTabData;
  /** Whether this tab is currently active. Ignored when the tab has dropdownGroups. */
  isActive?: boolean;
  /** Called when a plain tab (without dropdown) is clicked. */
  onSelect?: (id: string) => void;
  /** Size variant, passed from parent TopNav. */
  size?: 'sm' | 'lg';
  className?: string;
  // Dropdown coordination — managed by TopNav so only one panel is open at a time.
  /** Whether this tab's dropdown is currently open. */
  isDropdownOpen?: boolean;
  /** Tell TopNav to open this tab's dropdown. */
  onDropdownOpen?: () => void;
  /** Tell TopNav to close the dropdown immediately (Escape / item click). */
  onDropdownClose?: () => void;
  /** Tell TopNav to start the close timer (mouse leave). */
  onDropdownScheduleClose?: () => void;
}

/**
 * A single tab button within the TopNav bar.
 *
 * When `tab.dropdownGroups` is provided the tab renders as a hover-triggered
 * dropdown menu instead of a selectable tab. Clicking items in the dropdown
 * calls each item's own `onClick` handler.
 *
 * Without `dropdownGroups` the tab behaves as before: a button with an
 * underline indicator when active.
 */
const TopNavTab: React.FC<TopNavTabProps> = ({
  tab,
  isActive = false,
  onSelect,
  size = 'sm',
  className = '',
  isDropdownOpen = false,
  onDropdownOpen,
  onDropdownClose,
  onDropdownScheduleClose,
}) => {
  const hasDropdown = Boolean(tab.dropdownGroups?.length);
  // autoFocusFirst is local: it tracks whether the *current* open was keyboard-triggered.
  const [autoFocusFirst, setAutoFocusFirst] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    setAutoFocusFirst(false);
    onDropdownOpen?.();
  };

  const handleKeyOpen = () => {
    setAutoFocusFirst(true);
    onDropdownOpen?.();
  };

  const closeAndRefocus = () => {
    onDropdownClose?.();
    triggerRef.current?.focus();
  };

  // Plain tab — original behaviour.
  if (!hasDropdown) {
    return (
      <button
        type="button"
        className={`${styles.tab} ${styles[size]} ${isActive ? styles.active : ''} ${className}`}
        onClick={() => onSelect?.(tab.id)}
        aria-current={isActive ? 'page' : undefined}
      >
        {tab.label}
      </button>
    );
  }

  // Dropdown tab — hover opens a menu panel; clicking navigates like a plain tab.
  return (
    <div
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onDropdownScheduleClose}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.tab} ${styles[size]} ${styles.hasDropdown} ${isActive ? styles.active : ''} ${className}`}
        aria-haspopup="menu"
        aria-expanded={isDropdownOpen}
        onClick={() => onSelect?.(tab.id)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'Enter') {
            e.preventDefault();
            handleKeyOpen();
          } else if (e.key === 'Escape') {
            onDropdownClose?.();
          }
        }}
      >
        {tab.label}
        <ChevronDown
          size={14}
          className={`${styles.chevron} ${isDropdownOpen ? styles.chevronOpen : ''}`}
          aria-hidden="true"
        />
      </button>
      {isDropdownOpen && (
        <TopNavDropdown
          groups={tab.dropdownGroups!}
          anchorRef={triggerRef}
          autoFocus={autoFocusFirst}
          onClose={closeAndRefocus}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={onDropdownScheduleClose}
        />
      )}
    </div>
  );
};

export default TopNavTab;
