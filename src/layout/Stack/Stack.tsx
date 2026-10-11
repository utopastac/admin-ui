import React from 'react';
import styles from './Stack.module.css';

export type SpaceScale = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'column' | 'row';
  gap?: SpaceScale;
  align?: 'start' | 'center' | 'end' | 'stretch';
  wrap?: boolean;
}

export default function Stack({
  direction = 'column',
  gap = 'm',
  align = 'stretch',
  wrap = false,
  className,
  style,
  children,
  ...rest
}: StackProps) {
  const alignClass = {
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
    stretch: styles.alignStretch,
  }[align];

  return (
    <div
      className={[
        styles.root,
        direction === 'row' ? styles.row : styles.column,
        alignClass,
        wrap && styles.wrap,
        className,
      ].filter(Boolean).join(' ')}
      style={{ '--stack-gap': `var(--admin-space-${gap})`, ...style } as React.CSSProperties}
      {...rest}
    >
      {children}
    </div>
  );
}
