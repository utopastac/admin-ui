import React from 'react';
import styles from './Badge.module.css';
import { resolveSize, SizeSmMd } from '@/utils/resolveSize';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'info';
  size?: SizeSmMd;
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className = '',
}) => {
  const resolvedSize = resolveSize(size, 'md');
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[resolvedSize]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
