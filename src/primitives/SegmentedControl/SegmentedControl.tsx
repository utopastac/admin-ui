import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './SegmentedControl.module.css';
import Tooltip, { TooltipProps } from '@/overlays/Tooltip';

type TooltipConfig = string | Omit<TooltipProps, 'children'>;

export interface SegmentedControlOption<T extends string | number = string> {
  value: T;
  label?: React.ReactNode;
  icon?: LucideIcon;
  ariaLabel?: string;
  disabled?: boolean;
  pin?: 'left' | 'right';
  tooltip?: TooltipConfig;
}

export interface SegmentedControlProps<T extends string | number = string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
}

function SegmentedControl<T extends string | number = string>({
  options,
  value,
  onChange,
  size = 'md',
  disabled = false,
  className = '',
}: SegmentedControlProps<T>): JSX.Element {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const iconSize = size === 'sm' ? 14 : 16;

  const leftPinned = options.filter((o) => o.pin === 'left');
  const rightPinned = options.filter((o) => o.pin === 'right');
  const unpinned = options.filter((o) => !o.pin);

  const [shadowLeft, setShadowLeft] = React.useState(false);
  const [shadowRight, setShadowRight] = React.useState(false);

  const updateShadows = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const atLeft = el.scrollLeft <= 0;
    const atRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    setShadowLeft(!atLeft && leftPinned.length > 0);
    setShadowRight(!atRight && rightPinned.length > 0);
  }, [leftPinned.length, rightPinned.length]);

  React.useEffect(() => {
    updateShadows();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateShadows);
    return () => el.removeEventListener('scroll', updateShadows);
  }, [updateShadows, options]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

    e.preventDefault();

    const enabledIndices = options
      .map((opt, i) => (!opt.disabled ? i : -1))
      .filter((i) => i !== -1);

    if (enabledIndices.length === 0) return;

    const currentIndex = options.findIndex((opt) => opt.value === value);
    const currentEnabledPos = enabledIndices.indexOf(currentIndex);

    let nextEnabledPos: number;
    if (currentEnabledPos === -1) {
      nextEnabledPos = 0;
    } else if (e.key === 'ArrowRight') {
      nextEnabledPos = (currentEnabledPos + 1) % enabledIndices.length;
    } else {
      nextEnabledPos =
        (currentEnabledPos - 1 + enabledIndices.length) % enabledIndices.length;
    }

    const nextIndex = enabledIndices[nextEnabledPos];
    const nextOption = options[nextIndex];

    onChange(nextOption.value);

    const buttons = wrapperRef.current?.querySelectorAll<HTMLButtonElement>(
      'button[role="radio"]'
    );
    buttons?.[nextIndex]?.focus();
  };

  const renderSegment = (option: SegmentedControlOption<T>) => {
    const isSelected = option.value === value;
    const isDisabled = disabled || option.disabled;

    // aria-label resolution:
    // - explicit ariaLabel always wins (so icon-with-label segments remain addressable)
    // - otherwise fall back to value stringification only when no visible label is present
    //   (avoids double-labeling for screen readers when the label itself is readable text).
    const ariaLabel = option.ariaLabel ?? (!option.label ? String(option.value) : undefined);

    const button = (
      <button
        key={String(option.value)}
        role="radio"
        aria-checked={isSelected}
        disabled={isDisabled}
        tabIndex={isSelected ? 0 : -1}
        className={`${styles.segment} ${isSelected ? styles.selected : ''} ${isDisabled ? styles.segmentDisabled : ''}`}
        data-selected={isSelected}
        data-value={String(option.value)}
        aria-label={ariaLabel}
        onClick={() => onChange(option.value)}
        onKeyDown={handleKeyDown}
      >
        <span className={styles.segmentInner}>
          {option.icon && <option.icon size={iconSize} />}
          {option.label && <span>{option.label}</span>}
        </span>
      </button>
    );

    if (!option.tooltip) return button;
    const tooltipProps = typeof option.tooltip === 'string' ? { content: option.tooltip } : option.tooltip;
    return <Tooltip key={String(option.value)} {...tooltipProps} className={styles.tooltipWrapper}>{button}</Tooltip>;
  };

  return (
    <div
      ref={wrapperRef}
      role="radiogroup"
      className={`${styles.control} ${styles[size]} ${disabled ? styles.disabled : ''} ${className}`}
      data-testid="segmented-control"
    >
      {leftPinned.length > 0 && (
        <div className={`${styles.pinnedLeft} ${shadowLeft ? styles.shadowLeft : ''}`}>
          {leftPinned.map(renderSegment)}
        </div>
      )}
      <div ref={scrollRef} className={styles.scroll}>
        {unpinned.map(renderSegment)}
      </div>
      {rightPinned.length > 0 && (
        <div className={`${styles.pinnedRight} ${shadowRight ? styles.shadowRight : ''}`}>
          {rightPinned.map(renderSegment)}
        </div>
      )}
    </div>
  );
}

export default SegmentedControl;
