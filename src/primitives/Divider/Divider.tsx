import React from 'react';
import styles from './Divider.module.css';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  size = 'md',
  className = '',
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`${styles.divider} ${styles.vertical} ${styles[size]} ${className}`}
      />
    );
  }

  return (
    <hr
      className={`${styles.divider} ${styles.horizontal} ${styles[size]} ${className}`}
    />
  );
};

export default Divider;
