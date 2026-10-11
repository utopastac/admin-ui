import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import styles from './Banner.module.css';

export interface BannerProps {
  variant: 'default' | 'info' | 'success' | 'warning' | 'error';
  message: string;
  title?: string;
  icon?: LucideIcon;
  dismissible?: boolean;
  onDismiss?: () => void;
  layout?: 'inline' | 'full';
  className?: string;
}

export default function Banner({
  variant,
  message,
  title,
  icon: Icon,
  dismissible = false,
  onDismiss,
  layout = 'inline',
  className = '',
}: BannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const bannerClass = [
    styles.banner,
    styles[variant],
    styles[layout],
    className,
  ].filter(Boolean).join(' ');

  function handleDismiss() {
    setVisible(false);
    onDismiss?.();
  }

  return (
    <div role="alert" className={bannerClass}>
      {Icon && (
        <span className={styles.icon}>
          <Icon size={18} />
        </span>
      )}
      <div className={styles.content}>
        {title && <strong className={styles.title}>{title}</strong>}
        <p className={styles.message}>{message}</p>
      </div>
      {dismissible && (
        <button
          type="button"
          className={styles.dismiss}
          aria-label="Dismiss"
          onClick={handleDismiss}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
