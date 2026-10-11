import React, { useState, useRef, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  children: React.ReactElement;
  className?: string;
}

const GAP = 6;

function computePosition(rect: DOMRect, placement: string): { top: number; left: number; transform: string } {
  switch (placement) {
    case 'bottom':
      return { top: rect.bottom + GAP, left: rect.left + rect.width / 2, transform: 'translateX(-50%)' };
    case 'left':
      return { top: rect.top + rect.height / 2, left: rect.left - GAP, transform: 'translate(-100%, -50%)' };
    case 'right':
      return { top: rect.top + rect.height / 2, left: rect.right + GAP, transform: 'translateY(-50%)' };
    default: // top
      return { top: rect.top - GAP, left: rect.left + rect.width / 2, transform: 'translate(-50%, -100%)' };
  }
}

export default function Tooltip({
  content,
  placement = 'top',
  delay = 0,
  children,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, transform: '' });
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipId = useId();

  const show = useCallback(() => {
    const update = () => {
      // Prefer the first rendered child's rect. The wrapper span is inline with no
      // size of its own, so absolutely-positioned or transformed children would
      // otherwise yield a 0×0 wrapper rect that doesn't match where the child is painted.
      const target = (wrapperRef.current?.firstElementChild as HTMLElement | null) ?? wrapperRef.current;
      if (target) {
        const rect = target.getBoundingClientRect();
        setPos(computePosition(rect, placement));
      }
      setVisible(true);
    };
    if (delay > 0) {
      timeoutRef.current = setTimeout(update, delay);
    } else {
      update();
    }
  }, [delay, placement]);

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  return (
    <>
      <span
        ref={wrapperRef}
        className={`${styles.wrapper}${className ? ` ${className}` : ''}`}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {React.cloneElement(children, visible ? { 'aria-describedby': tooltipId } : {})}
      </span>
      {visible &&
        createPortal(
          <span
            id={tooltipId}
            role="tooltip"
            className={`${styles.tooltip} ${styles[placement]}`}
            style={{ top: pos.top, left: pos.left, transform: pos.transform }}
          >
            {content}
          </span>,
          document.body,
        )}
    </>
  );
}
