import React from 'react';
import styles from './FieldLabel.module.css';

export interface FieldLabelProps {
  label: string;
  size?: 'sm' | 'lg';
  labelPosition?: 'top' | 'left';
  labelWidth?: number | string;
  htmlFor?: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const FieldLabel: React.FC<FieldLabelProps> = ({
  label,
  size = 'sm',
  labelPosition = 'top',
  labelWidth,
  htmlFor,
  disabled = false,
  children,
  className = '',
}) => {
  return (
    <div className={`${styles.field} ${labelPosition === 'left' ? styles.fieldLeft : styles.fieldTop} ${disabled ? styles.disabled : ''} ${className}`}>
      <label htmlFor={htmlFor} className={`${styles.label} ${styles[size]}`} style={labelWidth ? { width: labelWidth, flexShrink: 0 } : undefined}>{label}</label>
      {children}
    </div>
  );
};

export default FieldLabel;
