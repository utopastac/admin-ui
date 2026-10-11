import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './DatePicker.module.css';

interface CalendarProps {
  mode: 'single' | 'range';
  selectedDate: string;
  selectedEndDate?: string;
  onSelectDate: (date: string) => void;
  min?: string;
  max?: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function toDateString(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

function getTodayString(): string {
  const now = new Date();
  return toDateString(now.getFullYear(), now.getMonth(), now.getDate());
}

function parseDate(dateStr: string): { year: number; month: number; day: number } | null {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  return {
    year: parseInt(parts[0], 10),
    month: parseInt(parts[1], 10) - 1,
    day: parseInt(parts[2], 10),
  };
}

const Calendar: React.FC<CalendarProps> = ({
  mode,
  selectedDate,
  selectedEndDate,
  onSelectDate,
  min,
  max,
}) => {
  const parsed = parseDate(selectedDate);
  const today = new Date();

  const [viewYear, setViewYear] = useState(parsed ? parsed.year : today.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed ? parsed.month : today.getMonth());

  const todayString = getTodayString();
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const isDisabled = (dateStr: string): boolean => {
    if (min && dateStr < min) return true;
    if (max && dateStr > max) return true;
    return false;
  };

  const isInRange = (dateStr: string): boolean => {
    if (mode !== 'range' || !selectedDate || !selectedEndDate) return false;
    return dateStr > selectedDate && dateStr < selectedEndDate;
  };

  const isRangeStart = (dateStr: string): boolean => {
    if (mode !== 'range' || !selectedDate) return false;
    return dateStr === selectedDate;
  };

  const isRangeEnd = (dateStr: string): boolean => {
    if (mode !== 'range' || !selectedEndDate) return false;
    return dateStr === selectedEndDate;
  };

  const days: React.ReactNode[] = [];

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className={styles.emptyDay} />);
  }

  // Day buttons
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = toDateString(viewYear, viewMonth, day);
    const disabled = isDisabled(dateStr);
    const isSelected = mode === 'single' && dateStr === selectedDate;
    const rangeStart = isRangeStart(dateStr);
    const rangeEnd = isRangeEnd(dateStr);
    const inRange = isInRange(dateStr);
    const isToday = dateStr === todayString;

    const classNames = [
      styles.day,
      isToday && styles.today,
      isSelected && styles.selected,
      rangeStart && styles.rangeStart,
      rangeEnd && styles.rangeEnd,
      inRange && styles.inRange,
      disabled && styles.disabled,
    ]
      .filter(Boolean)
      .join(' ');

    days.push(
      <button
        key={dateStr}
        type="button"
        className={classNames}
        onClick={() => onSelectDate(dateStr)}
        disabled={disabled}
        aria-label={dateStr}
      >
        {day}
      </button>,
    );
  }

  return (
    <div role="grid" aria-label="Calendar">
      <div className={styles.calendarHeader}>
        <button
          type="button"
          className={styles.navButton}
          onClick={handlePrevMonth}
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <span className={styles.monthYear}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          className={styles.navButton}
          onClick={handleNextMonth}
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className={styles.weekHeader}>
        {WEEKDAYS.map((wd) => (
          <span key={wd} className={styles.weekDay}>
            {wd}
          </span>
        ))}
      </div>
      <div className={styles.dayGrid}>{days}</div>
    </div>
  );
};

export default Calendar;
