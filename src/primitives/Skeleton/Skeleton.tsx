import React from 'react';
import styles from './Skeleton.module.css';

export interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect';
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  width,
  height,
  lines = 1,
  className = '',
}) => {
  if (variant === 'text' && lines > 1) {
    return (
      <div className={`${styles.textGroup} ${className}`}>
        {Array.from({ length: lines }).map((_, i) => {
          const isLast = i === lines - 1;
          return (
            <div
              key={i}
              className={`${styles.skeleton} ${styles.text}`}
              style={{
                width: isLast ? '60%' : width ?? '100%',
                height: height,
              }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
