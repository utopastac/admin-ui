import React from 'react';
import styles from './Kbd.module.css';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export default function Kbd({ children, className, ...rest }: KbdProps) {
  return (
    <kbd className={[styles.kbd, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </kbd>
  );
}
