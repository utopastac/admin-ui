import React from 'react';
import { useSideNavContext } from './SideNavContext';
import styles from './SideNavItem.module.css';

export interface SideNavItemData {
  /** Unique identifier for the item, used for active state and onSelect callback. */
  id: string;
  /** Display label shown in the sidebar. */
  label: string;
  /** Optional right-aligned detail text (e.g. a date). When present, the item stretches to full width. */
  detail?: string;
  /** Optional nested children rendered as an indented sub-list. */
  children?: SideNavItemData[];
  /** When true, renders a small colored dot after the label to indicate new or recently updated content. */
  badge?: boolean;
  /** Optional fixed-width index number rendered before the label (intended for child items). */
  index?: number;
  /** Called when the item is right-clicked. Receives the item's id and the mouse event. */
  onContextMenu?: (id: string, e: React.MouseEvent) => void;
}

interface SideNavItemProps {
  /** The item data to render. */
  item: SideNavItemData;
  className?: string;
  child?: boolean;
}

/**
 * A single clickable item within a SideNav section.
 *
 * Renders as a button with hover and active states. Reads the current
 * active id (and other display flags) from SideNavContext; the parent
 * SideNavSection composes a list of these items within a `<ul>`.
 */
const SideNavItem: React.FC<SideNavItemProps> = React.memo(function SideNavItem({
  item,
  className = '',
  child = false,
}) {
  const { onSelect, highContrast, fullWidth, activeId } = useSideNavContext();
  const isActive = item.id === activeId;
  const hc = highContrast ? styles.highContrast : '';
  const fw = fullWidth ? styles.fullWidth : '';
  const groupClass = styles['button--group'];
  const hasChildren = !!item.children && item.children.length > 0;
  const hasDetail = !!item.detail;

  // Shared so a parent item renders its index, badge, and detail just like a
  // leaf. Previously the parent branch rendered only the label, which silently
  // dropped those three props whenever an item gained children.
  const content = (
    <>
      {item.index !== undefined && <span className={styles.index}>{item.index}</span>}
      <span className={styles.label}>{item.label}</span>
      {item.badge && <span className={styles.badge} />}
      {item.detail && <span className={styles.detail}>{item.detail}</span>}
    </>
  );

  const buttonClassName = [
    hasChildren ? groupClass : styles.button,
    isActive ? styles.active : '',
    hc,
    fw,
    className,
    child ? styles.child : '',
    hasDetail ? styles.hasDetail : '',
  ]
    .filter(Boolean)
    .join(' ');

  const button = (
    <button
      type="button"
      className={buttonClassName}
      data-nav-id={item.id}
      data-nav-child={child ? 'true' : undefined}
      data-sidenav-item=""
      aria-current={isActive ? 'page' : undefined}
      onClick={() => onSelect(item.id)}
      onContextMenu={(e) => item.onContextMenu?.(item.id, e)}
    >
      {content}
    </button>
  );

  if (hasChildren) {
    return (
      <li>
        {button}
        <ul className={styles.nestedList}>
          {item.children!.map((nested) => (
            <SideNavItem child={true} key={nested.id} item={nested} />
          ))}
        </ul>
      </li>
    );
  }

  return <li>{button}</li>;
});

export default SideNavItem;
