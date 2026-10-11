import React, { useState, useRef, useId, useCallback, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import LabeledField from '../LabeledField';
import Popover from '../Popover';
import styles from './Select.module.css';
import { resolveSize } from '@/utils/resolveSize';
import type { SizeSmMd } from '@/utils/resolveSize';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  start?: React.ReactNode;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: SizeSmMd;
  className?: string;
  label?: string;
  labelPosition?: 'top' | 'left';
  labelWidth?: number | string;
  error?: string;
  helperText?: string;
  id?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  disabled = false,
  size = 'md',
  className = '',
  label,
  labelPosition,
  labelWidth,
  error,
  helperText,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const resolvedSize = resolveSize(size, 'md');
  const listboxId = useId();

  const selectedOption = options.find((opt) => opt.value === value);

  const getOptionId = (optionValue: string) => `${listboxId}-option-${optionValue}`;

  const openMenu = useCallback(() => {
    if (disabled) return;
    const selectedIndex = options.findIndex((opt) => opt.value === value && !opt.disabled);
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : options.findIndex((opt) => !opt.disabled));
    setIsOpen(true);
  }, [disabled, options, value]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  const handleToggle = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const handleSelect = useCallback((optionValue: string) => {
    onChange(optionValue);
    closeMenu();
    triggerRef.current?.focus();
  }, [onChange, closeMenu]);

  // Move focus to highlighted option whenever highlightedIndex changes and menu is open
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listboxRef.current) {
      const optionEl = listboxRef.current.querySelector<HTMLElement>(
        `[id="${getOptionId(options[highlightedIndex]?.value)}"]`
      );
      optionEl?.focus();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, highlightedIndex]);

  const handleListboxKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const enabledIndices = options
        .map((opt, idx) => ({ opt, idx }))
        .filter(({ opt }) => !opt.disabled)
        .map(({ idx }) => idx);

      if (enabledIndices.length === 0) return;

      const currentPositionInEnabled = enabledIndices.indexOf(highlightedIndex);

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          const nextPos = currentPositionInEnabled < enabledIndices.length - 1
            ? currentPositionInEnabled + 1
            : 0;
          setHighlightedIndex(enabledIndices[nextPos]);
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          const prevPos = currentPositionInEnabled > 0
            ? currentPositionInEnabled - 1
            : enabledIndices.length - 1;
          setHighlightedIndex(enabledIndices[prevPos]);
          break;
        }
        case 'Home': {
          e.preventDefault();
          setHighlightedIndex(enabledIndices[0]);
          break;
        }
        case 'End': {
          e.preventDefault();
          setHighlightedIndex(enabledIndices[enabledIndices.length - 1]);
          break;
        }
        case 'Enter':
        case ' ': {
          e.preventDefault();
          if (highlightedIndex >= 0 && !options[highlightedIndex]?.disabled) {
            handleSelect(options[highlightedIndex].value);
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          closeMenu();
          triggerRef.current?.focus();
          break;
        }
        case 'Tab': {
          closeMenu();
          break;
        }
      }
    },
    [options, highlightedIndex, closeMenu, handleSelect]
  );

  const iconSize = resolvedSize === 'sm' ? 14 : 16;

  const selectContent = (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${styles[resolvedSize]} ${isOpen ? styles.open : ''}`}
        onClick={handleToggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        id={id}
      >
        <span className={styles.triggerContent}>
          {selectedOption?.start && (
            <span className={styles.accessory} aria-hidden="true">{selectedOption.start}</span>
          )}
          <span className={selectedOption ? styles.selectedText : styles.placeholder}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>
        <span aria-hidden="true">
          <ChevronDown
            size={iconSize}
            className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          />
        </span>
      </button>

      <Popover
        isOpen={isOpen}
        onClose={closeMenu}
        anchorRef={containerRef}
        className={styles.dropdown}
        matchWidth
        role="listbox"
        aria-label={label ?? placeholder}
      >
        <div
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          aria-label={label ?? placeholder}
          onKeyDown={handleListboxKeyDown}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              id={getOptionId(option.value)}
              type="button"
              role="option"
              aria-selected={option.value === value}
              className={`${styles.option} ${styles[resolvedSize]} ${option.value === value ? styles.optionSelected : ''} ${option.disabled ? styles.optionDisabled : ''}`}
              onClick={() => {
                if (!option.disabled) {
                  handleSelect(option.value);
                }
              }}
              disabled={option.disabled}
              tabIndex={index === highlightedIndex ? 0 : -1}
            >
              {option.start && (
                <span className={styles.accessory} aria-hidden="true">{option.start}</span>
              )}
              <span className={styles.optionLabel}>
                {option.label}
                {option.description && (
                  <span className={styles.optionDescription}>{option.description}</span>
                )}
              </span>
              {option.value === value && (
                <span aria-hidden="true">
                  <Check size={iconSize} className={styles.checkIcon} />
                </span>
              )}
            </button>
          ))}
        </div>
      </Popover>
    </div>
  );

  return (
    <LabeledField label={label} labelPosition={labelPosition} labelWidth={labelWidth} htmlFor={id} disabled={disabled} error={error} helperText={helperText}>
      {selectContent}
    </LabeledField>
  );
};

export default Select;
