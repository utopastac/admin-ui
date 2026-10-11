import React, {
  useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle,
} from 'react';
import { createPortal } from 'react-dom';
import { Search } from 'lucide-react';
import Kbd from '../Kbd';
import styles from './Command.module.css';

export interface CommandItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ size?: number }>;
  shortcut?: string;
  onSelect: () => void;
  disabled?: boolean;
}

export interface CommandGroup {
  label?: string;
  items: CommandItem[];
  /** When true, items in this group are hidden when the search query is empty. */
  searchOnly?: boolean;
}

interface CommandHandle {
  focus: () => void;
}

interface CommandProps {
  groups: CommandGroup[];
  placeholder?: string;
  emptyMessage?: string;
  onClose?: () => void;
  className?: string;
  /** Optional content rendered between the search input and the results list. */
  header?: React.ReactNode;
}

const Command = forwardRef<CommandHandle, CommandProps>(function Command(
  {
    groups,
    placeholder = 'Search…',
    emptyMessage = 'No results.',
    onClose,
    className,
    header,
  },
  ref,
) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  const filteredGroups = groups
    .map((g) => ({
      ...g,
      items: (g.searchOnly && !query)
        ? []
        : g.items.filter((item) =>
            item.label.toLowerCase().includes(query.toLowerCase()),
          ),
    }))
    .filter((g) => g.items.length > 0);

  const flatItems = filteredGroups.flatMap((g) => g.items);
  const isEmpty = flatItems.length === 0;

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    const items = listRef.current?.querySelectorAll('[data-command-item]');
    const active = items?.[activeIndex] as HTMLElement | undefined;
    active?.scrollIntoView?.({ block: 'nearest' });
  }, [activeIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => (i < flatItems.length - 1 ? i + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => (i > 0 ? i - 1 : flatItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = flatItems[activeIndex];
        if (item && !item.disabled) {
          item.onSelect();
          onClose?.();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
      }
    },
    [flatItems, activeIndex, onClose],
  );

  let flatIdx = 0;

  return (
    <div className={[styles.panel, className].filter(Boolean).join(' ')}>
      <div className={styles.inputRow}>
        <Search size={16} className={styles.searchIcon} aria-hidden="true" />
        <input
          ref={inputRef}
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          aria-label="Search commands"
        />
      </div>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.list} ref={listRef}>
        {isEmpty ? (
          <div className={styles.empty}>{emptyMessage}</div>
        ) : (
          filteredGroups.map((group, gi) => (
            <div key={gi} className={styles.group}>
              {group.label && (
                <div className={styles.groupLabel}>{group.label}</div>
              )}
              {group.items.map((item) => {
                const idx = flatIdx++;
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-command-item
                    data-active={isActive || undefined}
                    className={styles.item}
                    disabled={item.disabled}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => {
                      item.onSelect();
                      onClose?.();
                    }}
                  >
                    {item.icon && (
                      <item.icon size={16} />
                    )}
                    <span className={styles.itemLabel}>{item.label}</span>
                    {item.shortcut && (
                      <Kbd>{item.shortcut}</Kbd>
                    )}
                  </button>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
});

export default Command;

// ── CommandDialog ─────────────────────────────────────────────────────────────

export interface CommandDialogProps {
  open: boolean;
  onClose: () => void;
  onOpen?: () => void;
  shortcut?: string;
  groups: CommandGroup[];
  placeholder?: string;
  emptyMessage?: string;
  header?: React.ReactNode;
}

export function CommandDialog({
  open,
  onClose,
  onOpen,
  shortcut = 'k',
  groups,
  placeholder,
  emptyMessage,
  header,
}: CommandDialogProps) {
  const commandRef = useRef<CommandHandle>(null);

  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
    } else {
      setClosing(true);
    }
  }, [open]);

  const handleDialogAnimationEnd = useCallback((e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closing && !open) {
      setMounted(false);
      setClosing(false);
    }
  }, [closing, open]);

  // Register ⌘K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === shortcut) {
        e.preventDefault();
        onOpen?.();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcut, onOpen]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        commandRef.current?.focus();
      });
    }
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        className={`${styles.backdrop}${closing ? ` ${styles.closing}` : ''}`}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className={`${styles.dialog}${closing ? ` ${styles.closing}` : ''}`}
        onAnimationEnd={handleDialogAnimationEnd}
      >
        <Command
          ref={commandRef}
          groups={groups}
          placeholder={placeholder}
          emptyMessage={emptyMessage}
          onClose={onClose}
          header={header}
        />
      </div>
    </>,
    document.body,
  );
}
