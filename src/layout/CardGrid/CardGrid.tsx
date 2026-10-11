import React from 'react';
import styles from './CardGrid.module.css';
import type { SpaceScale } from '../Stack/Stack';

export interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Space between cards. Defaults to `m`. */
  gap?: SpaceScale;
}

/**
 * A responsive auto-fill card grid.
 *
 * Arranges children in as many columns as fit at ≥ 260 px each,
 * collapsing to fewer columns on narrower containers.
 */
export default function CardGrid({ gap = 'm', className, style, children, ...rest }: CardGridProps) {
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={{ '--card-grid-gap': `var(--admin-space-${gap})`, ...style } as React.CSSProperties}
      {...rest}
    >
      {children}
    </div>
  );
}
