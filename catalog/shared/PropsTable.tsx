import React from 'react';
import styles from './PropsTable.module.css';

export interface PropRow {
  prop: string;
  type: string;
  default?: string;
  description?: string;
  options?: string[];
}

interface PropsTableProps {
  props: PropRow[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (!props.length) return null;
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.th}>Prop</th>
            <th className={styles.th}>Type</th>
            <th className={styles.th}>Default</th>
            <th className={styles.th}>Description</th>
            <th className={styles.th}>Options</th>
          </tr>
        </thead>
        <tbody>
          {props.map((row) => (
            <tr key={row.prop} className={styles.row}>
              <td className={styles.tdProp}>
                <code className={styles.propName}>{row.prop}</code>
              </td>
              <td className={styles.td}>
                <code className={styles.type}>{row.type}</code>
              </td>
              <td className={styles.td}>
                {row.default != null
                  ? <code className={styles.defaultVal}>{row.default}</code>
                  : <span className={styles.dash}>—</span>}
              </td>
              <td className={styles.tdDesc}>{row.description ?? <span className={styles.dash}>—</span>}</td>
              <td className={styles.td}>
                {row.options?.length
                  ? <span className={styles.options}>{row.options.join(', ')}</span>
                  : <span className={styles.dash}>—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
