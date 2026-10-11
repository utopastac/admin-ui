import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './ToolbarButton.module.css';
import { resolveSize, SizeSmMd } from '@/utils/resolveSize';
import Tooltip, { TooltipProps } from '@/overlays/Tooltip';

type TooltipConfig = string | Omit<TooltipProps, 'children'>;

interface ToolbarButtonProps {
  icon: LucideIcon | React.ComponentType<{ size?: number }>;
  onClick?: () => void;
  size?: SizeSmMd;
  pressed?: boolean;
  inUse?: boolean;
  selected?: boolean;
  'aria-label'?: string;
  title?: string;
  tooltip?: TooltipConfig;
  className?: string;
  disabled?: boolean;
  /** Arbitrary data-* attributes to forward onto the underlying button — lets callers attach stable test hooks. */
  [key: `data-${string}`]: string | number | boolean | undefined;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon: Icon,
  onClick,
  size = 'md',
  pressed,
  inUse,
  selected,
  'aria-label': ariaLabel,
  title,
  tooltip,
  className = '',
  disabled,
  ...rest
}) => {
  const resolvedSize = resolveSize(size, 'md');
  const iconSize = resolvedSize === 'sm' ? 16 : 20;
  const isToggle = pressed !== undefined;

  // Only forward data-* attrs from the rest props — nothing else should slip through.
  const dataAttrs = Object.fromEntries(
    Object.entries(rest).filter(([k]) => k.startsWith('data-')),
  );

  const button = (
    <button
      type="button"
      className={`${styles.toolbarButton} ${styles[resolvedSize]} ${pressed ? styles.pressed : ''} ${inUse ? styles.inUse : ''} ${selected ? styles.selected : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={isToggle ? pressed : undefined}
      title={title}
      {...dataAttrs}
    >
      <Icon size={iconSize} />
    </button>
  );

  if (!tooltip) return button;
  const tooltipProps = typeof tooltip === 'string' ? { content: tooltip } : tooltip;
  return <Tooltip {...tooltipProps}>{button}</Tooltip>;
};

export default ToolbarButton;
