import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './Button.module.css';
import { resolveSize, SizeSmMdLg } from '@/utils/resolveSize';
import Tooltip, { TooltipProps } from '@/overlays/Tooltip';

type TooltipConfig = string | Omit<TooltipProps, 'children'>;
type IconComponent = LucideIcon | React.ComponentType<{ size?: number }>;


interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: SizeSmMdLg;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
  tooltip?: TooltipConfig;
  startIcon?: IconComponent;
  endIcon?: IconComponent;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
  type = 'button',
  className = '',
  'aria-label': ariaLabel,
  tooltip,
  startIcon: StartIcon,
  endIcon: EndIcon,
}) => {
  const resolvedSize = resolveSize(size, 'md');
  const iconSize = resolvedSize === 'sm' ? 14 : resolvedSize === 'lg' ? 20 : 16;
  const button = (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[resolvedSize]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
    >
      {StartIcon && <StartIcon size={iconSize} aria-hidden />}
      {children}
      {EndIcon && <EndIcon size={iconSize} aria-hidden />}
    </button>
  );

  if (!tooltip) return button;
  const tooltipProps = typeof tooltip === 'string' ? { content: tooltip } : tooltip;
  return <Tooltip {...tooltipProps}>{button}</Tooltip>;
};

export default Button;
