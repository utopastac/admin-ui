import React from 'react';
import styles from './PageFooter.module.css';

interface PageFooterProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  border?: boolean;
  className?: string;
}

const alignMap: Record<string, string> = {
  left: styles.alignLeft,
  center: styles.alignCenter,
  right: styles.alignRight,
};

const PageFooter: React.FC<PageFooterProps> = ({
  children,
  align = 'right',
  border = true,
  className = '',
}) => {
  const footerClass = [
    styles.footer,
    alignMap[align],
    border && styles.border,
    className,
  ].filter(Boolean).join(' ');

  return (
    <footer className={footerClass}>
      {children}
    </footer>
  );
};

export default PageFooter;
