import React, { useState, useEffect, useCallback, useRef, useId } from 'react';
import { X } from 'lucide-react';
import ToolbarButton from '@/primitives/ToolbarButton/ToolbarButton';
import styles from './SidePanel.module.css';
import { resolveSize } from '@/utils/resolveSize';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  actions?: React.ReactNode;
  width?: 'sm' | 'md' | 'lg' | 'xl' | 's' | 'm' | 'l' | 'small' | 'medium' | 'large' | number;
  mode?: 'overlay' | 'push';
  /** Which edge the overlay panel slides from. Defaults to `right`. Ignored in push mode. */
  side?: 'left' | 'right';
  'data-testid'?: string;
}

const presetWidths: Record<string, number> = {
  sm: 280,
  md: 320,
  lg: 400,
  xl: 540,
};

const SidePanel: React.FC<SidePanelProps> = ({
  isOpen,
  onClose,
  children,
  title,
  footer,
  actions,
  width = 'md',
  mode = 'overlay',
  side = 'right',
  'data-testid': dataTestId,
}) => {
  const resolvedWidth = typeof width === 'string' ? resolveSize(width, 'md') : width;
  const isPreset = typeof resolvedWidth === 'string';
  const targetWidth = isPreset ? presetWidths[resolvedWidth] : resolvedWidth;
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const sideClass = side === 'left' ? styles.left : styles.right;

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

  // Focus trap for overlay mode only: save previous focus, move focus into panel,
  // trap Tab/Shift+Tab, restore on close.
  useEffect(() => {
    if (!isOpen || mode !== 'overlay') return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusFirst = () => {
      const el = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      el?.focus();
    };
    const raf = requestAnimationFrame(focusFirst);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
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
  }, [isOpen, mode]);

  // Panel has the longer animation (0.3s) — wait for it before unmounting
  const handlePanelAnimationEnd = useCallback((e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closing && !isOpen) {
      setMounted(false);
      setClosing(false);
    }
  }, [closing, isOpen]);

  // Title element: string titles get an h2; React node titles are rendered as-is.
  // We only wire up aria-labelledby when the title is a string (we own the id).
  const hasStringTitle = typeof title === 'string';

  const panelInner = (
    <>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          {hasStringTitle ? <h2 id={titleId} className={styles.title}>{title}</h2> : title}
        </div>
        <div className={styles.headerRight}>
          {actions}
          <ToolbarButton
            icon={X}
            onClick={onClose}
            aria-label="Close"
            title="Close"
            size="sm"
          />
        </div>
      </div>
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </>
  );

  if (!mounted) return null;

  if (mode === 'push') {
    return (
      <div
        className={`${styles.pushPanel}${closing ? ` ${styles.closing}` : ''}`}
        data-testid={dataTestId}
        style={{ '--panel-target-width': `${targetWidth}px` } as React.CSSProperties}
        onAnimationEnd={handlePanelAnimationEnd}
      >
        <div className={styles.pushPanelInner} style={{ width: targetWidth }}>
          {panelInner}
        </div>
      </div>
    );
  }

  // overlay mode (default)
  const panelStyle = isPreset
    ? undefined
    : { width: `min(${resolvedWidth as number}px, 100vw)` };

  return (
    <div
      className={`${styles.backdrop}${closing ? ` ${styles.closing}` : ''}`}
      data-testid={dataTestId}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={hasStringTitle ? titleId : undefined}
        className={`${styles.panel} ${sideClass} ${isPreset ? styles[resolvedWidth as string] : ''}${closing ? ` ${styles.closing}` : ''}`}
        style={panelStyle}
        onAnimationEnd={handlePanelAnimationEnd}
        onClick={(e) => e.stopPropagation()}
      >
        {panelInner}
      </div>
    </div>
  );
};

export default SidePanel;
