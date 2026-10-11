import React from 'react';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  illustration?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ illustration, title, description, className = '', children }) => (
  <div className={`${styles.root} ${className}`}>
    {illustration && <div className={styles.illustration}>{illustration}</div>}
    <p className={styles.title}>{title}</p>
    {description && <p className={styles.description}>{description}</p>}
    {children && <div className={styles.actions}>{children}</div>}
  </div>
);

export default EmptyState;
