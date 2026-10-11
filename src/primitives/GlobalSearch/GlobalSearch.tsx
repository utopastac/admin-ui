import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import GlobalSearchResult from './GlobalSearchResult';
import styles from './GlobalSearch.module.css';

export interface GlobalSearchResultData {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

export interface GlobalSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  results: GlobalSearchResultData[];
  onSelect: (id: string) => void;
  loading?: boolean;
  placeholder?: string;
  emptyMessage?: string;
  renderResult?: (result: GlobalSearchResultData) => React.ReactNode;
  shortcut?: boolean;
  className?: string;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({
  query,
  onQueryChange,
  results,
  onSelect,
  loading = false,
  placeholder = 'Search...',
  emptyMessage = 'No matches',
  renderResult,
  shortcut = true,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showDropdown = open && (query.length > 0 || loading);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

  // Click outside to close
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  // Cmd/Ctrl+K shortcut
  useEffect(() => {
    if (!shortcut) return;
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcut]);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    if (scrollTimerRef.current !== null) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      scrollTimerRef.current = null;
      if (!listRef.current) return;
      const items = listRef.current.querySelectorAll('[data-result-index]');
      const activeItem = items[activeIndex] as HTMLElement | undefined;
      activeItem?.scrollIntoView?.({ block: 'nearest' });
    }, 50);
    return () => {
      if (scrollTimerRef.current !== null) {
        clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = null;
      }
    };
  }, [activeIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showDropdown) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : results.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < results.length) {
            onSelect(results[activeIndex].id);
            setOpen(false);
            inputRef.current?.blur();
          }
          break;
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          inputRef.current?.blur();
          break;
      }
    },
    [showDropdown, results, activeIndex, onSelect]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
    setOpen(true);
  };

  const handleFocus = () => {
    if (query.length > 0 || loading) {
      setOpen(true);
    }
  };

  const handleResultClick = (id: string) => {
    onSelect(id);
    setOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper}${className ? ` ${className}` : ''}`}
    >
      <div className={styles.inputWrapper}>
        <Search size={14} className={styles.searchIcon} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={styles.input}
          role="combobox"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-label="Search"
        />
      </div>

      {showDropdown && (
        <div ref={listRef} className={styles.dropdown} role="listbox">
          {loading && results.length === 0 ? (
            <div className={styles.statusMessage}>Searching...</div>
          ) : results.length === 0 ? (
            <div className={styles.statusMessage}>{emptyMessage}</div>
          ) : (
            results.map((result, index) => (
              <div
                key={result.id}
                data-result-index={index}
                role="option"
                aria-selected={index === activeIndex}
                onClick={() => handleResultClick(result.id)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {renderResult ? (
                  renderResult(result)
                ) : (
                  <GlobalSearchResult
                    result={result}
                    active={index === activeIndex}
                  />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
