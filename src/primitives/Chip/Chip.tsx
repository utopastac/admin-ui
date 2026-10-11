import React from 'react';
import { X } from 'lucide-react';
import styles from './Chip.module.css';
import Avatar from '../Avatar';

export interface ChipProps {
  variant?: 'default' | 'success' | 'warning' | 'info' | 'error';
  icon?: React.ReactNode;
  avatar?: { src?: string; name: string };
  onRemove?: () => void;
  selected?: boolean;
  onSelect?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({
  variant = 'default',
  icon,
  avatar,
  onRemove,
  selected = false,
  onSelect,
  children,
  className = '',
}) => {
  const leading = avatar ? (
    <Avatar src={avatar.src} name={avatar.name} size="xs" className={styles.avatar} />
  ) : icon ? (
    <span className={styles.icon} aria-hidden="true">{icon}</span>
  ) : null;

  const removeButton = onRemove ? (
    <button
      type="button"
      className={styles.removeButton}
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      aria-label={`Remove ${String(children)}`}
    >
      <X size={12} />
    </button>
  ) : null;

  const classNames = [
    styles.chip,
    styles[variant],
    avatar ? styles.hasAvatar : '',
    selected ? styles.selected : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (onSelect) {
    return (
      <button
        type="button"
        className={classNames}
        onClick={onSelect}
        aria-pressed={selected}
      >
        {leading}
        <span>{children}</span>
        {removeButton}
      </button>
    );
  }

  return (
    <span className={classNames}>
      {leading}
      <span>{children}</span>
      {removeButton}
    </span>
  );
};

export default Chip;
