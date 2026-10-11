import React, { useRef, useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Popover.module.css';

export interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  className?: string;
  matchWidth?: boolean;
  overlap?: boolean;
  offsetX?: number;
  offsetY?: number;
  role?: string;
  'aria-label'?: string;
}

const GAP = 4;

function getScrollParent(el: HTMLElement | null): HTMLElement | Window {
  if (!el) return window;
  let node: HTMLElement | null = el.parentElement;
  while (node) {
    const { overflow, overflowY, overflowX } = window.getComputedStyle(node);
    if (/auto|scroll/.test(overflow + overflowY + overflowX)) {
      return node;
    }
    node = node.parentElement;
  }
  return window;
}

const Popover: React.FC<PopoverProps> = ({
  isOpen,
  onClose,
  anchorRef,
  children,
  className,
  matchWidth = false,
  overlap = false,
  offsetX = 0,
  offsetY = 0,
  role,
  'aria-label': ariaLabel,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<React.CSSProperties | null>(null);

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    const content = contentRef.current;
    if (!anchor || !content) return;

    const anchorRect = anchor.getBoundingClientRect();
    const contentHeight = content.offsetHeight;
    const viewportHeight = window.innerHeight;

    let top: number;
    if (overlap) {
      // Align content top to anchor top, fall back upward if it clips the viewport
      const spaceBelow = viewportHeight - anchorRect.top - GAP;
      if (spaceBelow >= contentHeight) {
        top = anchorRect.top;
      } else {
        top = Math.max(GAP, viewportHeight - contentHeight - GAP);
      }
    } else {
      const spaceBelow = viewportHeight - anchorRect.bottom - GAP;
      const spaceAbove = anchorRect.top - GAP;
      if (spaceBelow >= contentHeight) {
        top = anchorRect.bottom + GAP;
      } else if (spaceAbove >= contentHeight) {
        top = anchorRect.top - contentHeight - GAP;
      } else {
        top = Math.max(GAP, viewportHeight - contentHeight - GAP);
      }
    }

    top += offsetY;

    // Clamp horizontal position so the popover stays within the viewport
    const contentWidth = content.offsetWidth;
    const viewportWidth = window.innerWidth;
    let left = anchorRect.left + offsetX;
    if (left + contentWidth > viewportWidth - GAP) {
      left = Math.max(GAP, viewportWidth - contentWidth - GAP);
    }

    setPosition({
      top: `${top}px`,
      left: `${left}px`,
      ...(matchWidth ? { width: `${anchorRect.width}px` } : {}),
      maxHeight: `${viewportHeight - GAP * 2}px`,
    });
  }, [anchorRef, matchWidth, overlap, offsetX, offsetY]);

  useEffect(() => {
    if (!isOpen) {
      setPosition(null);
      return;
    }

    // When matchWidth is true, pre-apply the anchor width so the content
    // lays out at the correct width before we measure its height.
    if (matchWidth && anchorRef.current && contentRef.current) {
      const anchorWidth = anchorRef.current.getBoundingClientRect().width;
      contentRef.current.style.width = `${anchorWidth}px`;
    }

    // Double-rAF: first frame lets the DOM render and lay out the content,
    // second frame measures the actual dimensions and positions correctly.
    requestAnimationFrame(() => {
      requestAnimationFrame(updatePosition);
    });

    // Reposition on scroll (nearest scroll ancestor only), window resize, and content resize
    const handleReposition = () => updatePosition();

    // Scoped scroll listener — only fires for this popover's scroll ancestor
    const scrollParent = getScrollParent(anchorRef.current);
    scrollParent.addEventListener('scroll', handleReposition);
    window.addEventListener('resize', handleReposition);

    // Throttled ResizeObserver — at most one measurement per animation frame
    let rafId: number | null = null;
    const resizeObserver = new ResizeObserver(() => {
      if (rafId !== null) return; // already queued
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updatePosition();
      });
    });
    if (contentRef.current) resizeObserver.observe(contentRef.current);

    return () => {
      scrollParent.removeEventListener('scroll', handleReposition);
      window.removeEventListener('resize', handleReposition);
      resizeObserver.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isOpen, updatePosition, matchWidth, anchorRef]);

  // Focus management: move focus into the popover when it opens and restore on close
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Focus first focusable element inside the popover after positioning
    const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const content = contentRef.current;
        if (!content) return;
        const firstFocusable = content.querySelector<HTMLElement>(focusableSelector);
        firstFocusable?.focus();
      });
    });

    return () => {
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        anchorRef.current?.contains(target) ||
        contentRef.current?.contains(target)
      ) {
        return;
      }
      // Don't close if the click landed inside any other Popover portal
      // (handles nested popovers, e.g. ColorPicker inside ShadowEditor)
      if (target instanceof Element && target.closest('[data-admin-popover]')) {
        return;
      }
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={contentRef}
      className={`${styles.popover} ${className || ''}`}
      style={position ?? { top: -9999, left: -9999 }}
      role={role}
      aria-label={ariaLabel}
      data-admin-popover
    >
      {children}
    </div>,
    document.body,
  );
};

export default Popover;
