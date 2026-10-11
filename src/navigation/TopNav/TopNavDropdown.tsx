import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { LucideIcon } from 'lucide-react';
import styles from './TopNavDropdown.module.css';

export interface TopNavDropdownItem {
  /** Unique identifier for the item. */
  id: string;
  /** Display label shown in the item. */
  label: string;
  /** Optional icon rendered before the label. */
  icon?: LucideIcon;
  /** Called when the item is clicked. */
  onClick?: () => void;
  /** When true, the item is non-interactive. */
  disabled?: boolean;
}

export interface TopNavDropdownGroup {
  /** Optional heading rendered above the group's items. */
  header?: string;
  /** The items in this group. */
  items: TopNavDropdownItem[];
}

interface TopNavDropdownProps {
  groups: TopNavDropdownGroup[];
  anchorRef: React.RefObject<HTMLElement | null>;
  /** When true, focuses the first item on mount (keyboard-triggered open). */
  autoFocus?: boolean;
  /** Called when the dropdown should close and focus should return to the trigger. */
  onClose?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

type Row =
  | { kind: 'divider'; key: string }
  | { kind: 'header'; key: string; text: string }
  | { kind: 'item'; key: string; item: TopNavDropdownItem; flatIndex: number };

const TopNavDropdown: React.FC<TopNavDropdownProps> = ({
  groups,
  anchorRef,
  autoFocus = false,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<React.CSSProperties>({ top: -9999, left: -9999 });

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    const panel = panelRef.current;
    if (!anchor || !panel) return;

    const anchorRect = anchor.getBoundingClientRect();
    const panelWidth = panel.offsetWidth;
    const viewportWidth = window.innerWidth;
    const gap = 4;
    let left = anchorRect.left;

    if (left + panelWidth > viewportWidth - gap) {
      left = Math.max(gap, viewportWidth - panelWidth - gap);
    }

    setPosition({
      top: `${anchorRect.bottom + 2}px`,
      left: `${left}px`,
    });
  }, [anchorRef]);

  // Build a flat row list so keyboard navigation can index into items cleanly.
  const rows: Row[] = [];
  let fi = 0;
  groups.forEach((group, gi) => {
    if (gi > 0) rows.push({ kind: 'divider', key: `divider-${gi}` });
    if (group.header) rows.push({ kind: 'header', key: `header-${gi}`, text: group.header });
    group.items.forEach((item) => {
      rows.push({ kind: 'item', key: item.id, item, flatIndex: fi++ });
    });
  });

  const itemCount = fi;

  useEffect(() => {
    if (autoFocus && itemRefs.current[0]) {
      itemRefs.current[0].focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    requestAnimationFrame(updatePosition);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [updatePosition]);

  const handleItemKeyDown = (e: React.KeyboardEvent, flatIndex: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      itemRefs.current[Math.min(flatIndex + 1, itemCount - 1)]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      itemRefs.current[Math.max(flatIndex - 1, 0)]?.focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose?.();
    }
  };

  const activateItem = (item: TopNavDropdownItem) => {
    if (item.disabled) return;
    item.onClick?.();
    onClose?.();
  };

  return createPortal(
    <div
      ref={panelRef}
      className={styles.panel}
      style={position}
      role="menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {rows.map((row) => {
        if (row.kind === 'divider') {
          return <div key={row.key} className={styles.divider} role="separator" />;
        }
        if (row.kind === 'header') {
          return (
            <div key={row.key} className={styles.groupHeader} role="presentation">
              {row.text}
            </div>
          );
        }
        const { item, flatIndex } = row;
        return (
          <div
            key={row.key}
            ref={(el) => { itemRefs.current[flatIndex] = el; }}
            className={`${styles.item} ${item.disabled ? styles.disabled : ''}`}
            role="menuitem"
            tabIndex={item.disabled ? -1 : 0}
            aria-disabled={item.disabled}
            onClick={() => activateItem(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateItem(item);
              } else {
                handleItemKeyDown(e, flatIndex);
              }
            }}
          >
            {item.icon && <item.icon size={14} className={styles.icon} />}
            <span className={styles.label}>{item.label}</span>
          </div>
        );
      })}
    </div>
    ,
    document.body,
  );
};

export default TopNavDropdown;
