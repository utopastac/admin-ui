import React from 'react';
import styles from './Toggle.module.css';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  labelPosition?: 'top' | 'left';
  labelWidth?: number | string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  id?: string;
  /**
   * Accessible label for the switch button.
   * Required when no visible label is provided.
   */
  'aria-label'?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  labelPosition = 'left',
  labelWidth,
  disabled = false,
  size = 'md',
  className = '',
  id: idProp,
  'aria-label': ariaLabel,
}) => {
  const id = idProp;

  if (label) {
    return (
      <label
        className={`${styles.labelRow} ${labelPosition === 'left' ? styles.labelRowLeft : styles.labelRowTop} ${disabled ? styles.disabled : ''} ${className}`}
      >
        <span
          className={styles.labelText}
          style={labelWidth ? { width: labelWidth, flexShrink: 0 } : undefined}
        >
          {label}
        </span>
        <div className={styles.wrapper}>
          <button
            id={id}
            role="switch"
            type="button"
            aria-checked={checked}
            aria-label={ariaLabel}
            disabled={disabled}
            className={`${styles.track} ${styles[size]} ${checked ? styles.checked : ''}`}
            onClick={() => onChange(!checked)}
          >
            <span className={styles.thumb} />
          </button>
        </div>
      </label>
    );
  }

  return (
    <div className={`${styles.wrapper} ${disabled ? styles.disabled : ''} ${className}`}>
      <button
        id={id}
        role="switch"
        type="button"
        aria-checked={checked}
        aria-label={ariaLabel}
        disabled={disabled}
        className={`${styles.track} ${styles[size]} ${checked ? styles.checked : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className={styles.thumb} />
      </button>
    </div>
  );
};

export default Toggle;
