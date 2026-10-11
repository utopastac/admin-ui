import React from 'react';
import styles from './Spinner.module.css';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'inverted';
  label?: string;
  className?: string;
}

export default function Spinner({
  size = 'md',
  variant = 'default',
  label = 'Loading',
  className,
}: SpinnerProps) {
  return (
    <div
      className={`${styles.root} ${styles[size]} ${styles[variant]}${className ? ` ${className}` : ''}`}
      role="status"
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles.svg}>
        <circle cx="12" cy="12" r="10" strokeWidth="2.5" className={styles.track} />
        <circle cx="12" cy="12" r="10" strokeWidth="2.5" strokeDasharray="32 63" strokeLinecap="round" className={styles.arc} />
      </svg>
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
}
