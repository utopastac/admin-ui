import React, { useState, useEffect, useCallback, useRef, useId } from 'react';
import { X } from 'lucide-react';
import ToolbarButton from '@/primitives/ToolbarButton/ToolbarButton';
import styles from './Modal.module.css';
import { resolveSize } from '@/utils/resolveSize';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  headerBorder?: boolean;
  footerBorder?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'full' | 's' | 'm' | 'l' | 'small' | 'medium' | 'large';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  footer,
  headerBorder = true,
  footerBorder = true,
  maxWidth = 'md',
}) => {
  const resolvedMaxWidth = resolveSize(maxWidth, 'md');
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);

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

  // Focus trap: save previous focus, move focus into modal, trap Tab/Shift+Tab, restore on close
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Move focus to first focusable element inside modal
    const focusFirst = () => {
      const el = modalRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      el?.focus();
    };
    // Use rAF so the modal is painted before we attempt focus
    const raf = requestAnimationFrame(focusFirst);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;
      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
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

  // Both backdrop and modal animate at 0.2s — listen on backdrop
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
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={`${styles.modal} ${styles[resolvedMaxWidth]}${closing ? ` ${styles.closing}` : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${styles.header} ${headerBorder ? styles.headerBorder : ''}`}>
          {title ? <h2 id={titleId} className={styles.title}>{title}</h2> : <span />}
          <ToolbarButton
            icon={X}
            onClick={onClose}
            aria-label="Close"
            title="Close"
          />
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={`${styles.footer} ${footerBorder ? styles.footerBorder : ''}`}>{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
