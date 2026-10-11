import React, { useEffect, useState } from 'react';
import { X, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import styles from './Toast.module.css';

export interface ToastProps {
  id: string;
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  autoDismiss?: number;
  onDismiss?: (id: string) => void;
  className?: string;
}

const variantIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const FADE_OUT_DURATION = 300;

export default function Toast({
  id,
  message,
  variant = 'info',
  autoDismiss,
  onDismiss,
  className = '',
}: ToastProps) {
  const [exiting, setExiting] = useState(false);
  const Icon = variantIcons[variant];

  const dismiss = () => {
    setExiting(true);
    setTimeout(() => onDismiss?.(id), FADE_OUT_DURATION);
  };

  useEffect(() => {
    if (!autoDismiss) return;
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onDismiss?.(id), FADE_OUT_DURATION);
    }, autoDismiss);
    return () => clearTimeout(timer);
  }, [autoDismiss, id, onDismiss]);

  const toastClass = [
    styles.toast,
    styles[variant],
    exiting ? styles.exiting : '',
    className,
  ].filter(Boolean).join(' ');

  const isUrgent = variant === 'error' || variant === 'warning';
  const role = isUrgent ? 'alert' : 'status';
  const ariaLive = isUrgent ? undefined : 'polite' as const;

  return (
    <div role={role} aria-live={ariaLive} aria-atomic="true" className={toastClass}>
      <span className={styles.icon} aria-hidden="true"><Icon size={16} /></span>
      <p className={styles.message}>{message}</p>
      {onDismiss && (
        <button
          type="button"
          className={styles.dismiss}
          aria-label="Dismiss"
          onClick={dismiss}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

export { Toast };

export interface ToastStackProps {
  toasts: Array<{ id: string; message: string; variant?: 'info' | 'success' | 'warning' | 'error'; autoDismiss?: number }>;
  onDismiss?: (id: string) => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}

const positionClassMap: Record<NonNullable<ToastStackProps['position']>, string> = {
  'bottom-right': styles.bottomRight,
  'bottom-left': styles.bottomLeft,
  'top-right': styles.topRight,
  'top-left': styles.topLeft,
};

export function ToastStack({
  toasts,
  onDismiss,
  position = 'bottom-right',
  className = '',
}: ToastStackProps) {
  const stackClass = [
    styles.stack,
    positionClassMap[position],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={stackClass}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          variant={toast.variant}
          autoDismiss={toast.autoDismiss}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}
