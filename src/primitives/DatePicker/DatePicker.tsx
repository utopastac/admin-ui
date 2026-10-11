import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import FieldGroup from '../FieldGroup';
import Calendar from './Calendar';
import styles from './DatePicker.module.css';

export interface DatePickerProps {
  mode?: 'single' | 'range';
  value: string | [string, string];
  onChange: (value: string | [string, string]) => void;
  min?: string;
  max?: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  id?: string;
  /** When true, the picker closes automatically after a selection is made. Default: false. */
  autoClose?: boolean;
}

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const year = parseInt(parts[0], 10);
  return `${MONTH_SHORT[month]} ${day}, ${year}`;
}

function formatRange(start: string, end: string): string {
  if (!start && !end) return '';
  if (start && !end) return formatDate(start);
  if (!start && end) return formatDate(end);

  const startParts = start.split('-');
  const endParts = end.split('-');
  const startMonth = parseInt(startParts[1], 10) - 1;
  const startDay = parseInt(startParts[2], 10);
  const startYear = parseInt(startParts[0], 10);
  const endMonth = parseInt(endParts[1], 10) - 1;
  const endDay = parseInt(endParts[2], 10);
  const endYear = parseInt(endParts[0], 10);

  if (startYear === endYear) {
    return `${MONTH_SHORT[startMonth]} ${startDay} \u2013 ${MONTH_SHORT[endMonth]} ${endDay}, ${endYear}`;
  }
  return `${formatDate(start)} \u2013 ${formatDate(end)}`;
}

const DatePicker: React.FC<DatePickerProps> = ({
  mode = 'single',
  value,
  onChange,
  min,
  max,
  label,
  error,
  helperText,
  disabled = false,
  id,
  autoClose = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rangeStart, setRangeStart] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  const singleValue = typeof value === 'string' ? value : '';
  const rangeValue: [string, string] = Array.isArray(value) ? value : ['', ''];

  const displayText =
    mode === 'single'
      ? formatDate(singleValue)
      : formatRange(rangeValue[0], rangeValue[1]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
      // Reset partial range selection when opening
      if (!isOpen) {
        setRangeStart('');
      }
    }
  };

  const handleSelectDate = (dateStr: string) => {
    if (mode === 'single') {
      onChange(dateStr);
      setIsOpen(false);
    } else {
      // Range mode
      if (!rangeStart) {
        // First click — set start
        setRangeStart(dateStr);
      } else {
        // Second click — set end, swap if needed
        let start = rangeStart;
        let end = dateStr;
        if (end < start) {
          [start, end] = [end, start];
        }
        onChange([start, end]);
        setRangeStart('');
        if (autoClose) setIsOpen(false);
      }
    }
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

  // For the calendar, determine what to show as selected
  const calendarSelectedDate =
    mode === 'single' ? singleValue : (rangeStart || rangeValue[0]);
  const calendarSelectedEndDate =
    mode === 'range' && !rangeStart ? rangeValue[1] : undefined;

  const inputClassNames = [
    styles.input,
    isOpen && styles.inputOpen,
    error && styles.inputError,
    disabled && styles.inputDisabled,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <FieldGroup label={label} htmlFor={id} error={error} helperText={helperText} disabled={disabled}>
      <div ref={containerRef} className={styles.datePicker}>
        <div className={styles.inputRow} onClick={handleToggle}>
          <input
            id={id}
            type="text"
            readOnly
            value={displayText}
            className={inputClassNames}
            placeholder={mode === 'range' ? 'Select date range' : 'Select date'}
            disabled={disabled}
          />
          <span className={styles.calendarIcon}>
            <CalendarIcon size={16} />
          </span>
        </div>
        {isOpen && (
          <div className={styles.dropdown}>
            <Calendar
              mode={mode}
              selectedDate={calendarSelectedDate}
              selectedEndDate={calendarSelectedEndDate}
              onSelectDate={handleSelectDate}
              min={min}
              max={max}
            />
          </div>
        )}
      </div>
    </FieldGroup>
  );
};

export default DatePicker;
