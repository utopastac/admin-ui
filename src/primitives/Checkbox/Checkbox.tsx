import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  inputPosition?: 'left' | 'right';
  className?: string;
  id?: string;
  /** Use when there is no visible label text */
  'aria-label'?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  inputPosition = 'left',
  className = '',
  id,
  'aria-label': ariaLabel,
}) => {
  return (
    <label
      className={`${styles.wrapper} ${disabled ? styles.disabled : ''} ${inputPosition === 'right' ? styles.reverse : ''} ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className={styles.visuallyHidden}
        aria-label={ariaLabel}
      />
      <span className={`${styles.box} ${checked ? styles.checked : ''}`} />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export default Checkbox;
