import React, { useEffect, useRef, useState } from 'react';
import styles from './EditableText.module.css';
import { resolveSize } from '../../utils/resolveSize';

export interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  size?: 's' | 'sm' | 'small' | 'm' | 'md' | 'medium' | 'l' | 'lg' | 'large';
  disabled?: boolean;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  onEditStart?: () => void;
  onEditEnd?: (reason: 'commit' | 'cancel') => void;
  onCancel?: () => void;
}

type ResolvedSize = 'sm' | 'md' | 'lg';

const sizeClassMap: Record<ResolvedSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

/**
 * EditableText renders a label that swaps to an input on double-click or Enter.
 *
 * The display `<span>` and edit `<input>` share a single `.field` class so
 * typography, padding, border, and height stay identical across the swap.
 *
 * ```tsx
 * <EditableText value={name} onChange={setName} size="md" />
 * ```
 */
const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  size,
  disabled = false,
  placeholder,
  ariaLabel,
  className = '',
  onEditStart,
  onEditEnd,
  onCancel,
}) => {
  const resolved = resolveSize<ResolvedSize>(size as ResolvedSize | undefined, 'md');
  const sizeClass = sizeClassMap[resolved];

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [measuredWidth, setMeasuredWidth] = useState<number | null>(null);

  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const enterEditMode = () => {
    if (disabled) return;
    if (spanRef.current) {
      setMeasuredWidth(spanRef.current.offsetWidth);
    }
    setDraft(value);
    setIsEditing(true);
    onEditStart?.();
  };

  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed === '') {
      cancel();
      return;
    }
    if (trimmed !== value) {
      onChange(draft);
    }
    setIsEditing(false);
    onEditEnd?.('commit');
  };

  const cancel = () => {
    setIsEditing(false);
    onCancel?.();
    onEditEnd?.('cancel');
  };

  const handleSpanKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      enterEditMode();
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
    }
  };

  if (isEditing) {
    const inputClassNames = [styles.field, sizeClass, styles.editing, className]
      .filter(Boolean)
      .join(' ');

    return (
      <input
        ref={inputRef}
        type="text"
        className={inputClassNames}
        value={draft}
        placeholder={placeholder}
        aria-label={ariaLabel ?? value}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleInputKeyDown}
        onBlur={commit}
        style={measuredWidth !== null ? { width: measuredWidth } : undefined}
      />
    );
  }

  const displayText = value === '' ? placeholder ?? '' : value;
  const isPlaceholder = value === '';

  const spanClassNames = [
    styles.field,
    sizeClass,
    !disabled ? styles.editable : '',
    disabled ? styles.disabled : '',
    isPlaceholder ? styles.placeholder : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (disabled) {
    return (
      <span ref={spanRef} className={spanClassNames}>
        {displayText}
      </span>
    );
  }

  return (
    <span
      ref={spanRef}
      className={spanClassNames}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel ?? value}
      onDoubleClick={enterEditMode}
      onKeyDown={handleSpanKeyDown}
    >
      {displayText}
    </span>
  );
};

export default EditableText;
