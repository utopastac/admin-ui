import React from 'react';
import type { SpaceScale } from '../Stack/Stack';
import styles from './Columns.module.css';

export interface ColumnsProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: 2 | 3 | 4;
  gap?: SpaceScale;
}

export default function Columns({
  count = 2,
  gap = 'm',
  className,
  style,
  children,
  ...rest
}: ColumnsProps) {
  const countClass = {
    2: styles.cols2,
    3: styles.cols3,
    4: styles.cols4,
  }[count];

  return (
    <div
      className={[styles.root, countClass, className].filter(Boolean).join(' ')}
      style={{ '--columns-gap': `var(--admin-space-${gap})`, ...style } as React.CSSProperties}
      {...rest}
    >
      {children}
    </div>
  );
}
