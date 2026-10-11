import React from 'react';
import { CopyButton } from './CopyButton';
import styles from './SystemTokenList.module.css';

export interface SystemTokenRow {
  preview: React.ReactNode;
  label: string;
  value?: string;
  description?: string;
  token?: string;
}

export function SystemTokenList({ rows, labelWidth, previewWidth }: { rows: SystemTokenRow[]; labelWidth?: string; previewWidth?: string }) {
  const style = (labelWidth || previewWidth) ? {
    ...(labelWidth && { '--token-list-label-width': labelWidth }),
    ...(previewWidth && { '--token-list-preview-width': previewWidth }),
  } as React.CSSProperties : undefined;
  return (
    <div className={styles.list} style={style}>
      {rows.map(({ preview, label, value, description, token }, i) => (
        <div key={token ?? i} className={styles.row}>
          <div className={styles.previewCell}>{preview}</div>
          <span className={styles.label}>{label}</span>
          {value && <span className={styles.value}>{value}</span>}
          {description && <span className={styles.desc}>{description}</span>}
          {token && (
            <div className={styles.tokenCell}>
              <code className={styles.token}>{token}</code>
              <CopyButton value={token} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
