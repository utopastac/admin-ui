import React, { useState, useCallback } from 'react';
import styles from './SelectionList.module.css';

export interface SelectionListItem {
  value: string;
  label: string;
  description?: string;
}

interface SelectionListProps {
  items: SelectionListItem[];
  value?: string;
  onChange?: (value: string) => void;
  columns?: 1 | 2 | 3;
  className?: string;
  'aria-label'?: string;
}

const SelectionList: React.FC<SelectionListProps> = ({
  items,
  value,
  onChange,
  columns = 1,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const selectedIndex = items.findIndex((item) => item.value === value);
  const [focusedIndex, setFocusedIndex] = useState<number>(
    selectedIndex >= 0 ? selectedIndex : 0
  );

  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const focusItem = useCallback((index: number) => {
    itemRefs.current[index]?.focus();
    setFocusedIndex(index);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          const next = (focusedIndex + 1) % items.length;
          focusItem(next);
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          const prev = (focusedIndex - 1 + items.length) % items.length;
          focusItem(prev);
          break;
        }
        case 'Home': {
          e.preventDefault();
          focusItem(0);
          break;
        }
        case 'End': {
          e.preventDefault();
          focusItem(items.length - 1);
          break;
        }
        case 'Enter':
        case ' ': {
          e.preventDefault();
          if (items[focusedIndex]) {
            onChange?.(items[focusedIndex].value);
          }
          break;
        }
        default:
          return;
      }
    },
    [focusedIndex, items, onChange, focusItem]
  );

  return (
    <div
      role="listbox"
      aria-label={ariaLabel}
      className={`${styles.list} ${styles[`columns${columns}`]} ${className}`}
      onKeyDown={handleKeyDown}
    >
      {items.map((item, index) => {
        const selected = item.value === value;
        const isFocusable = index === focusedIndex;
        return (
          <button
            key={item.value}
            ref={(el) => { itemRefs.current[index] = el; }}
            type="button"
            role="option"
            aria-selected={selected}
            tabIndex={isFocusable ? 0 : -1}
            className={`${styles.item} ${selected ? styles.selected : ''}`}
            onClick={() => {
              setFocusedIndex(index);
              onChange?.(item.value);
            }}
          >
            <span className={styles.label}>{item.label}</span>
            {item.description && (
              <span className={styles.description}>{item.description}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default SelectionList;
