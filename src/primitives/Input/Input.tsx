import React, { useId } from 'react';
import FieldGroup from '../FieldGroup';
import styles from './Input.module.css';

interface InputProps {
  type?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  helperText?: string;
  min?: number;
  max?: number;
  step?: number;
  id?: string;
  placeholder?: string;
  /** Short label rendered inside the input's leading edge (e.g. "$", "https://"). */
  prefix?: string;
  /** Replaces the prefix text with a custom node (e.g. an icon). */
  prefixSlot?: React.ReactNode;
  onBlur?: () => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  label,
  error,
  helperText,
  min,
  max,
  step,
  id,
  placeholder,
  prefix,
  prefixSlot,
  onBlur,
  className = '',
}) => {
  const generatedErrorId = useId();
  const generatedHelperId = useId();
  const errorId = error ? generatedErrorId : undefined;
  const helperId = helperText && !error ? generatedHelperId : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  const hasPrefix = !!(prefix || prefixSlot);

  const inputEl = (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className={hasPrefix ? styles.prefixInput : `${styles.input} ${error ? styles.error : ''}`.trim()}
      min={min}
      max={max}
      step={step}
      placeholder={placeholder}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy}
    />
  );

  return (
    <FieldGroup label={label} htmlFor={id} error={error} helperText={helperText} errorId={errorId} helperId={helperId} className={className}>
      {hasPrefix ? (
        <div className={`${styles.prefixWrapper} ${error ? styles.error : ''}`.trim()}>
          <span className={styles.prefix}>{prefixSlot ?? prefix}</span>
          {inputEl}
        </div>
      ) : inputEl}
    </FieldGroup>
  );
};

export default Input;
