import React from 'react';
import styles from './ProgressCircular.module.css';

export interface ProgressCircularProps {
  value: number;
  variant?: 'default' | 'success' | 'error' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showValue?: boolean;
  className?: string;
}

const SIZE_CONFIG = {
  sm: { diameter: 32, stroke: 3 },
  md: { diameter: 48, stroke: 4 },
  lg: { diameter: 64, stroke: 5 },
} as const;

const ProgressCircular: React.FC<ProgressCircularProps> = ({
  value,
  variant = 'default',
  size = 'md',
  label,
  showValue = false,
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, value));
  const { diameter, stroke } = SIZE_CONFIG[size];
  const radius = (diameter - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - clamped / 100);
  const center = diameter / 2;

  return (
    <div className={`${styles.root} ${styles[size]} ${className}`}>
      <svg
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className={styles.svg}
      >
        {/* Track circle */}
        <circle
          className={styles.track}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={stroke}
          fill="none"
        />
        {/* Progress arc */}
        <circle
          className={`${styles.progress} ${styles[variant]}`}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>
      {showValue && (
        <span className={styles.valueLabel} aria-hidden="true">
          {clamped}%
        </span>
      )}
    </div>
  );
};

export default ProgressCircular;
