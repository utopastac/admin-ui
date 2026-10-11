import React, { useRef, useCallback, useMemo } from 'react';
import styles from './Slider.module.css';

export interface SliderProps {
  value: number | [number, number];
  onChange: (value: number | [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  labels?: { start?: string; end?: string };
  stepLabels?: (string | number)[];
  showTooltip?: boolean;
  tooltipFormat?: (value: number) => string;
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
  id?: string;
  /** Accessible label for the thumb(s). For single-thumb sliders. Ignored for range sliders, which use "Minimum" / "Maximum". */
  'aria-label'?: string;
}

function clamp(val: number, lo: number, hi: number): number {
  return Math.min(Math.max(val, lo), hi);
}

function snap(val: number, step: number | undefined, min: number, max: number): number {
  if (step !== undefined) {
    val = Math.round((val - min) / step) * step + min;
  }
  return clamp(val, min, max);
}

function pct(val: number, min: number, max: number): number {
  if (max === min) return 0;
  return ((val - min) / (max - min)) * 100;
}

const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step,
  labels,
  stepLabels,
  showTooltip = false,
  tooltipFormat,
  size = 'md',
  disabled = false,
  className = '',
  id,
  'aria-label': ariaLabel,
}) => {
  const isRange = Array.isArray(value);
  const values = useMemo<[number, number]>(
    () => isRange ? (value as [number, number]) : [value as number, value as number],
    [isRange, value],
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const draggingThumb = useRef<number | null>(null);
  const [activeThumb, setActiveThumb] = React.useState<number | null>(null);

  const valueFromPointer = useCallback(
    (clientX: number): number => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return min;
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      return snap(min + ratio * (max - min), step, min, max);
    },
    [min, max, step],
  );

  const emitChange = useCallback(
    (thumbIndex: number, newVal: number) => {
      if (isRange) {
        const next: [number, number] = [...values] as [number, number];
        next[thumbIndex] = newVal;
        // Keep thumbs from crossing
        if (thumbIndex === 0 && newVal > next[1]) next[0] = next[1];
        if (thumbIndex === 1 && newVal < next[0]) next[1] = next[0];
        onChange(next);
      } else {
        onChange(newVal);
      }
    },
    [isRange, values, onChange],
  );

  const handlePointerDown = useCallback(
    (thumbIndex: number) => (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.preventDefault();
      (e.target as HTMLDivElement).setPointerCapture(e.pointerId);
      draggingThumb.current = thumbIndex;
      setActiveThumb(thumbIndex);
    },
    [disabled],
  );

  const handlePointerMove = useCallback(
    (thumbIndex: number) => (e: React.PointerEvent<HTMLDivElement>) => {
      if (draggingThumb.current !== thumbIndex) return;
      const newVal = valueFromPointer(e.clientX);
      emitChange(thumbIndex, newVal);
    },
    [valueFromPointer, emitChange],
  );

  const handlePointerUp = useCallback(
    (thumbIndex: number) => (e: React.PointerEvent<HTMLDivElement>) => {
      if (draggingThumb.current !== thumbIndex) return;
      (e.target as HTMLDivElement).releasePointerCapture(e.pointerId);
      draggingThumb.current = null;
      setActiveThumb(null);
    },
    [],
  );

  const handleKeyDown = useCallback(
    (thumbIndex: number) => (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      const stepSize = step || (max - min) / 100;
      let newVal: number | null = null;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          newVal = snap(values[thumbIndex] + stepSize, step, min, max);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          newVal = snap(values[thumbIndex] - stepSize, step, min, max);
          break;
        case 'Home':
          newVal = min;
          break;
        case 'End':
          newVal = max;
          break;
        default:
          return;
      }

      e.preventDefault();
      emitChange(thumbIndex, newVal);
    },
    [disabled, step, min, max, values, emitChange],
  );

  const handleTrackClick = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      // Only handle clicks directly on the track area, not on thumbs
      if ((e.target as HTMLElement).getAttribute('role') === 'slider') return;

      const newVal = valueFromPointer(e.clientX);

      if (isRange) {
        // Move nearest thumb
        const dist0 = Math.abs(values[0] - newVal);
        const dist1 = Math.abs(values[1] - newVal);
        emitChange(dist0 <= dist1 ? 0 : 1, newVal);
      } else {
        onChange(newVal);
      }
    },
    [disabled, valueFromPointer, isRange, values, emitChange, onChange],
  );

  const formatTooltip = (val: number): string =>
    tooltipFormat ? tooltipFormat(val) : String(val);

  const renderThumb = (thumbIndex: number, val: number) => {
    const left = pct(val, min, max);
    const isActive = activeThumb === thumbIndex;
    const thumbAriaLabel = isRange
      ? (thumbIndex === 0 ? 'Minimum' : 'Maximum')
      : (ariaLabel ?? 'Value');
    const thumbAriaValueText = tooltipFormat ? tooltipFormat(val) : undefined;

    return (
      <div
        key={thumbIndex}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={val}
        aria-orientation="horizontal"
        aria-disabled={disabled || undefined}
        aria-label={thumbAriaLabel}
        aria-valuetext={thumbAriaValueText}
        className={styles.thumb}
        style={{ left: `${left}%` }}
        onPointerDown={handlePointerDown(thumbIndex)}
        onPointerMove={handlePointerMove(thumbIndex)}
        onPointerUp={handlePointerUp(thumbIndex)}
        onKeyDown={handleKeyDown(thumbIndex)}
      >
        {showTooltip && (
          <span
            className={`${styles.tooltip} ${isActive ? styles.tooltipVisible : ''}`}
          >
            {formatTooltip(val)}
          </span>
        )}
      </div>
    );
  };

  const fillLeft = isRange ? pct(values[0], min, max) : 0;
  const fillWidth = isRange
    ? pct(values[1], min, max) - pct(values[0], min, max)
    : pct(values[0], min, max);

  return (
    <div
      id={id}
      className={`${styles.slider} ${styles[size]} ${disabled ? styles.disabled : ''} ${className}`}
    >
      <div
        className={styles.trackArea}
        ref={trackRef}
        onPointerDown={handleTrackClick}
      >
        <div className={styles.track}>
          <div
            className={styles.fill}
            style={{ left: `${fillLeft}%`, width: `${fillWidth}%` }}
          />
        </div>
        {isRange
          ? [renderThumb(0, values[0]), renderThumb(1, values[1])]
          : renderThumb(0, values[0])}
      </div>

      {labels && (
        <div className={styles.labels}>
          {labels.start && <span className={styles.label}>{labels.start}</span>}
          {labels.end && <span className={styles.label}>{labels.end}</span>}
        </div>
      )}

      {stepLabels && (
        <div className={styles.stepLabels}>
          {stepLabels.map((lbl, i) => (
            <span key={i} className={styles.stepLabel}>
              {lbl}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
