import React from 'react';
import { Copy, Check } from 'lucide-react';
import styles from './CopyButton.module.css';

export function CopyButton({ value, size = 12, background = false }: { value: string; size?: number; background?: boolean }) {
  const [copied, setCopied] = React.useState(false);

  function handleClick() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  const Icon = copied ? Check : Copy;

  return (
    <button
      onClick={handleClick}
      title={copied ? 'Copied!' : `Copy ${value}`}
      className={[styles.button, background ? styles.withBackground : '', copied ? styles.copied : ''].filter(Boolean).join(' ')}
    >
      <Icon size={size} />
    </button>
  );
}
