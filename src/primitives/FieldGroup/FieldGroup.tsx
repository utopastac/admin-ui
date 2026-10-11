import React from 'react';
import styles from './FieldGroup.module.css';

export interface FieldGroupProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  errorId?: string;
  helperId?: string;
}

const FieldGroup: React.FC<FieldGroupProps> = ({
  label,
  htmlFor,
  error,
  helperText,
  disabled = false,
  children,
  className = '',
  errorId,
  helperId,
}) => {
  return (
    <div className={`${styles.fieldGroup} ${disabled ? styles.disabled : ''} ${className}`.trim()}>
      {label && (
        <label htmlFor={htmlFor} className={styles.label}>
          {label}
        </label>
      )}
      {children}
      {error && <p id={errorId} className={styles.errorText}>{error}</p>}
      {helperText && !error && (
        <p id={helperId} className={styles.helperText}>{helperText}</p>
      )}
    </div>
  );
};

export default FieldGroup;
