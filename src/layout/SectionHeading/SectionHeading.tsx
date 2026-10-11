import React from 'react';
import { resolveSize, SizeSmMdLg } from '@/utils/resolveSize';
import styles from './SectionHeading.module.css';

export type SectionHeadingSize = SizeSmMdLg;

interface SectionHeadingProps {
  title: string;
  description?: string;
  size?: SectionHeadingSize;
  actions?: React.ReactNode;
  className?: string;
}

type CanonicalSize = 'lg' | 'md' | 'sm';

const headingTag: Record<CanonicalSize, 'h2' | 'h3' | 'h4'> = {
  lg: 'h2',
  md: 'h3',
  sm: 'h4',
};

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  description,
  size = 'md',
  actions,
  className = '',
}) => {
  const resolved = resolveSize(size, 'md') as CanonicalSize;
  const Tag = headingTag[resolved];

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.row}>
        <div className={styles.content}>
          <Tag className={`${styles.title} ${styles[resolved]}`}>{title}</Tag>
          {description && (
            <p className={styles.description}>{description}</p>
          )}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>
  );
};

export default SectionHeading;
