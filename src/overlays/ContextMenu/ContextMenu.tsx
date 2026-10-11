import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import type { LucideIcon } from 'lucide-react';
import styles from './ContextMenu.module.css';

export interface ContextMenuItem {
  label: string;
  onClick?: () => void;
  shortcut?: string;
  icon?: LucideIcon;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
  separator?: boolean;
}

interface ContextMenuProps {
  /** Wrap children to intercept right-click. Omit to use controlled mode. */
  children?: React.ReactNode;
  items: ContextMenuItem[];
  className?: string;
  /** Controlled mode: whether the menu is open. */
  open?: boolean;
  /** Controlled mode: position of the menu. */
  position?: { x: number; y: number };
  /** Controlled mode: called when the menu should close. */
  onClose?: () => void;
}

interface MenuPosition {
  x: number;
  y: number;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  items,
  className = '',
  open: controlledOpen,
  position: controlledPosition,
  onClose,
}) => {
  const isControlled = controlledOpen !== undefined;
  const [internalVisible, setInternalVisible] = useState(false);
  const [internalPosition, setInternalPosition] = useState<MenuPosition>({ x: 0, y: 0 });
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const visible = isControlled ? controlledOpen : internalVisible;
  const position = isControlled ? (controlledPosition ?? internalPosition) : internalPosition;

  // Actionable (non-separator, non-disabled) item indices for keyboard navigation
  const navigableIndices = items
    .map((item, idx) => ({ item, idx }))
    .filter(({ item }) => !item.separator && !item.disabled)
    .map(({ idx }) => idx);

  const closeMenu = useCallback(() => {
    if (isControlled) {
      onClose?.();
    } else {
      setInternalVisible(false);
    }
    setFocusedIndex(-1);
    // Return focus to the element that triggered the menu
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isControlled, onClose]);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // Remember the element the right-click originated from
      triggerRef.current = e.target instanceof HTMLElement ? e.target : null;
      setInternalPosition({ x: e.clientX, y: e.clientY });
      setInternalVisible(true);
    },
    []
  );

  const handleItemClick = useCallback(
    (item: ContextMenuItem) => {
      if (item.disabled) return;
      closeMenu();
      item.onClick?.();
    },
    [closeMenu]
  );

  // Focus the first navigable item when the menu opens
  useEffect(() => {
    if (visible && navigableIndices.length > 0) {
      setFocusedIndex(navigableIndices[0]);
    }
  // Only run when visibility changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // Move DOM focus to the focused item button
  useEffect(() => {
    if (visible && focusedIndex >= 0 && menuRef.current) {
      const target = menuRef.current.querySelector<HTMLButtonElement>(
        `[data-item-index="${focusedIndex}"]`
      );
      target?.focus();
    }
  }, [visible, focusedIndex]);

  // Adjust position to keep menu within viewport
  useEffect(() => {
    if (visible && menuRef.current) {
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = position.x;
      let adjustedY = position.y;

      if (position.x + rect.width > viewportWidth) {
        adjustedX = position.x - rect.width;
      }

      if (position.y + rect.height > viewportHeight) {
        adjustedY = position.y - rect.height;
      }

      if (!isControlled && (adjustedX !== position.x || adjustedY !== position.y)) {
        setInternalPosition({ x: adjustedX, y: adjustedY });
      }
    }
  }, [visible, position, isControlled]);

  // Close on outside click or Escape key; arrow-key navigation
  useEffect(() => {
    if (!visible) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentPosInNav = navigableIndices.indexOf(focusedIndex);

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          const nextPos = currentPosInNav < navigableIndices.length - 1
            ? currentPosInNav + 1
            : 0;
          setFocusedIndex(navigableIndices[nextPos]);
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          const prevPos = currentPosInNav > 0
            ? currentPosInNav - 1
            : navigableIndices.length - 1;
          setFocusedIndex(navigableIndices[prevPos]);
          break;
        }
        case 'Home': {
          e.preventDefault();
          setFocusedIndex(navigableIndices[0]);
          break;
        }
        case 'End': {
          e.preventDefault();
          setFocusedIndex(navigableIndices[navigableIndices.length - 1]);
          break;
        }
        case 'Escape': {
          closeMenu();
          break;
        }
        case 'Tab': {
          // Don't trap focus — Tab closes the menu
          closeMenu();
          break;
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, closeMenu, focusedIndex, navigableIndices]);

  const menu = visible
    ? ReactDOM.createPortal(
        <div
          ref={menuRef}
          className={styles.menu}
          style={{
            left: position.x,
            top: position.y,
          }}
          role="menu"
          data-admin-popover
        >
          {items.map((item, index) => {
            if (item.separator) {
              return <div key={index} className={styles.separator} role="separator" />;
            }

            const itemClass = [
              styles.item,
              item.variant === 'destructive' && styles.destructive,
              item.disabled && styles.disabled,
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <button
                key={index}
                type="button"
                className={itemClass}
                onClick={() => handleItemClick(item)}
                role="menuitem"
                aria-disabled={item.disabled}
                disabled={item.disabled}
                tabIndex={index === focusedIndex ? 0 : -1}
                data-item-index={index}
              >
                {item.icon && <item.icon size={14} className={styles.icon} aria-hidden="true" />}
                <span className={styles.label}>{item.label}</span>
                {item.shortcut && (
                  <span className={styles.shortcut}>{item.shortcut}</span>
                )}
              </button>
            );
          })}
        </div>,
        document.body
      )
    : null;

  if (isControlled) {
    return <>{menu}</>;
  }

  return (
    <div className={className} onContextMenu={handleContextMenu}>
      {children}
      {menu}
    </div>
  );
};

export default ContextMenu;
