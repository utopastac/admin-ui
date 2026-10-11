import React from 'react';
import styles from './Radio.module.css';

export interface RadioProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  inputPosition?: 'left' | 'right';
  className?: string;
  id?: string;
  name?: string;
  value?: string;
  /** Use when there is no visible label text */
  'aria-label'?: string;
}

const Radio: React.FC<RadioProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  inputPosition = 'left',
  className = '',
  id,
  name,
  value,
  'aria-label': ariaLabel,
}) => {
  return (
    <label
      className={`${styles.wrapper} ${disabled ? styles.disabled : ''} ${inputPosition === 'right' ? styles.reverse : ''} ${className}`}
    >
      <input
        id={id}
        type="radio"
        checked={checked}
        onChange={() => onChange(!checked)}
        disabled={disabled}
        className={styles.visuallyHidden}
        name={name}
        value={value}
        aria-label={ariaLabel}
      />
      <span className={`${styles.circle} ${checked ? styles.checked : ''}`} />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export default Radio;
