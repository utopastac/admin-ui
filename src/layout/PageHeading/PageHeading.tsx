import React from 'react';
import styles from './PageHeading.module.css';

interface PageHeadingProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({
  title,
  description,
  actions,
  className = '',
}) => {
  return (
    <div className={`${styles.root} ${className}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
};

export default PageHeading;
