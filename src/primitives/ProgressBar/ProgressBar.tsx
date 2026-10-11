import React from 'react';
import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
  value: number;
  variant?: 'default' | 'success' | 'error' | 'warning';
  size?: 'xs' | 'sm' | 'md';
  label?: string;
  showValue?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  variant = 'default',
  size = 'md',
  label,
  showValue = false,
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`${styles.root} ${styles[size]} ${className}`}>
      {showValue && <span className={styles.valueLabel}>{clamped}%</span>}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={`${styles.fill} ${styles[variant]}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
