import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Clock } from 'lucide-react';
import FieldGroup from '../FieldGroup';
import styles from './TimePicker.module.css';

export interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  format?: '12h' | '24h';
  interval?: number;
  min?: string;
  max?: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  id?: string;
}

function generateTimeSlots(interval: number): string[] {
  const slots: string[] = [];
  const totalMinutes = 24 * 60;
  for (let m = 0; m < totalMinutes; m += interval) {
    const hours = Math.floor(m / 60);
    const mins = m % 60;
    slots.push(
      `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`,
    );
  }
  return slots;
}

function formatTime(time: string, format: '12h' | '24h'): string {
  if (!time) return '';
  const [hoursStr, minsStr] = time.split(':');
  const hours = parseInt(hoursStr, 10);
  const mins = minsStr;

  if (format === '24h') {
    return `${String(hours).padStart(2, '0')}:${mins}`;
  }

  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${mins} ${period}`;
}

function parseTimeInput(input: string, format: '12h' | '24h'): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (format === '24h') {
    const match = trimmed.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;
    const hours = parseInt(match[1], 10);
    const mins = parseInt(match[2], 10);
    if (hours < 0 || hours > 23 || mins < 0 || mins > 59) return null;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  }

  // 12h format: "9:00 AM", "12:30 PM", etc.
  const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)$/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const mins = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (hours < 1 || hours > 12 || mins < 0 || mins > 59) return null;

  if (period === 'AM') {
    if (hours === 12) hours = 0;
  } else {
    if (hours !== 12) hours += 12;
  }

  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  format = '24h',
  interval = 30,
  min,
  max,
  label,
  error,
  helperText,
  disabled = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(() => formatTime(value, format));
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync inputValue when value or format changes externally
  useEffect(() => {
    setInputValue(formatTime(value, format));
  }, [value, format]);

  const slots = generateTimeSlots(interval);

  const isSlotDisabled = (slot: string): boolean => {
    if (min && slot < min) return true;
    if (max && slot > max) return true;
    return false;
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const parsed = parseTimeInput(inputValue, format);
    if (parsed) {
      if (!isSlotDisabled(parsed)) {
        onChange(parsed);
      } else {
        // Revert to current value if out of range
        setInputValue(formatTime(value, format));
      }
    } else if (inputValue.trim() === '') {
      onChange('');
    } else {
      // Invalid input — revert
      setInputValue(formatTime(value, format));
    }
  };

  const handleSlotSelect = (slot: string) => {
    onChange(slot);
    setIsOpen(false);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Scroll selected slot into view when dropdown opens
  useEffect(() => {
    if (isOpen && dropdownRef.current && value) {
      const selectedEl = dropdownRef.current.querySelector(
        `.${styles.selected}`,
      );
      if (selectedEl && typeof selectedEl.scrollIntoView === 'function') {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [isOpen, value]);

  return (
    <FieldGroup label={label} htmlFor={id} error={error} helperText={helperText} disabled={disabled}>
      <div ref={containerRef} className={styles.timePicker}>
        <div className={styles.inputWrapper}>
          <input
            id={id}
            type="text"
            className={`${styles.input} ${isOpen ? styles.open : ''} ${error ? styles.error : ''}`}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onClick={handleInputClick}
            disabled={disabled}
            placeholder={format === '12h' ? '12:00 AM' : '00:00'}
            autoComplete="off"
          />
          <Clock size={16} className={styles.clockIcon} />
        </div>

        {isOpen && (
          <div ref={dropdownRef} className={styles.dropdown} role="listbox">
            {slots.map((slot) => {
              const isDisabled = isSlotDisabled(slot);
              const isSelected = slot === value;
              return (
                <button
                  key={slot}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`${styles.slot} ${isSelected ? styles.selected : ''} ${isDisabled ? styles.slotDisabled : ''}`}
                  onClick={() => {
                    if (!isDisabled) {
                      handleSlotSelect(slot);
                    }
                  }}
                  disabled={isDisabled}
                >
                  {formatTime(slot, format)}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </FieldGroup>
  );
};

export default TimePicker;
