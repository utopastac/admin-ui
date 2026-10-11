import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './AlertDialog.module.css';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface AlertDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'destructive';
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  description,
  confirmLabel = 'Continue',
  cancelLabel = 'Cancel',
  variant = 'default',
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(isOpen);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setClosing(false);
    } else {
      setClosing(true);
    }
  }, [isOpen]);

  // Focus trap: save previous focus, move focus to first focusable element (cancel button),
  // trap Tab/Shift+Tab within dialog, restore focus on close.
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusFirst = () => {
      const el = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      el?.focus();
    };
    const raf = requestAnimationFrame(focusFirst);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  const handleBackdropAnimationEnd = useCallback((e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closing && !isOpen) {
      setMounted(false);
      setClosing(false);
    }
  }, [closing, isOpen]);

  if (!mounted) return null;

  return (
    <div
      className={`${styles.backdrop}${closing ? ` ${styles.closing}` : ''}`}
      onAnimationEnd={handleBackdropAnimationEnd}
      onClick={onCancel}
    >
      <div
        ref={dialogRef}
        className={`${styles.dialog}${closing ? ` ${styles.closing}` : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <h2 id="alert-dialog-title" className={styles.title}>
          {title}
        </h2>
        <p id="alert-dialog-description" className={styles.description}>
          {description}
        </p>
        <div className={styles.footer}>
          <button
            className={styles.cancelButton}
            onClick={onCancel}
            type="button"
          >
            {cancelLabel}
          </button>
          <button
            className={`${styles.confirmButton} ${styles[variant]}`}
            onClick={onConfirm}
            type="button"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
