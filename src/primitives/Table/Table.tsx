import React from 'react';
import styles from './Table.module.css';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  width?: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: string | ((row: T) => string);
  striped?: boolean;
  compact?: boolean;
  className?: string;
  onRowClick?: (row: T) => void;
}

function Table<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  striped = false,
  compact = false,
  className = '',
  onRowClick,
}: TableProps<T>) {
  const getRowKey = (row: T, index: number): string => {
    if (typeof rowKey === 'function') return rowKey(row);
    return String(row[rowKey] ?? index);
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <table
        className={`${styles.table} ${striped ? styles.striped : ''} ${compact ? styles.compact : ''}`}
      >
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={styles.headerCell}
                style={column.width ? { width: column.width } : undefined}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={getRowKey(row, index)}
              className={`${styles.row}${onRowClick ? ` ${styles.clickable}` : ''}`}
              {...(onRowClick
                ? {
                    onClick: () => onRowClick(row),
                    role: 'button' as const,
                    tabIndex: 0,
                    onKeyDown: (e: React.KeyboardEvent<HTMLTableRowElement>) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onRowClick(row);
                      }
                    },
                  }
                : {})}
            >
              {columns.map((column) => (
                <td key={column.key} className={styles.cell}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : (String(row[column.key] ?? ''))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
