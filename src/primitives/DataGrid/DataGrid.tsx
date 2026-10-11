import React, { useState } from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import Checkbox from '../Checkbox';
import styles from './DataGrid.module.css';

export interface DataGridColumn<T> {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface DataGridProps<T extends Record<string, unknown>> {
  columns: DataGridColumn<T>[];
  data: T[];
  rowKey: string | ((row: T) => string);
  selectable?: boolean;
  selectedRows?: string[];
  onSelectionChange?: (keys: string[]) => void;
  onRowClick?: (row: T) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSortChange?: (column: string, direction: 'asc' | 'desc') => void;
  striped?: boolean;
  compact?: boolean;
  emptyMessage?: string;
  className?: string;
  caption?: string;
}

function getRowKey<T extends Record<string, unknown>>(
  row: T,
  rowKey: string | ((row: T) => string),
  index: number
): string {
  if (typeof rowKey === 'function') return rowKey(row);
  return String(row[rowKey] ?? index);
}

function DataGrid<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  selectable = false,
  selectedRows: controlledSelectedRows,
  onSelectionChange,
  onRowClick,
  sortColumn: controlledSortColumn,
  sortDirection: controlledSortDirection,
  onSortChange,
  striped = false,
  compact = false,
  emptyMessage = 'No data',
  className = '',
  caption,
}: DataGridProps<T>) {
  const [internalSelectedRows, setInternalSelectedRows] = useState<string[]>([]);
  const [internalSortColumn, setInternalSortColumn] = useState<string | undefined>(undefined);
  const [internalSortDirection, setInternalSortDirection] = useState<'asc' | 'desc'>('asc');

  const isControlledSelection = controlledSelectedRows !== undefined;
  const selectedKeys = isControlledSelection ? controlledSelectedRows : internalSelectedRows;

  const isControlledSort = onSortChange !== undefined;
  const activeSortColumn = isControlledSort ? controlledSortColumn : internalSortColumn;
  const activeSortDirection = isControlledSort ? (controlledSortDirection ?? 'asc') : internalSortDirection;

  const handleSortClick = (colKey: string) => {
    let nextDirection: 'asc' | 'desc' = 'asc';
    if (activeSortColumn === colKey) {
      nextDirection = activeSortDirection === 'asc' ? 'desc' : 'asc';
    }
    if (isControlledSort) {
      onSortChange(colKey, nextDirection);
    } else {
      setInternalSortColumn(colKey);
      setInternalSortDirection(nextDirection);
    }
  };

  const handleRowCheck = (key: string, checked: boolean) => {
    const next = checked ? [...selectedKeys, key] : selectedKeys.filter((k) => k !== key);
    if (isControlledSelection) {
      onSelectionChange?.(next);
    } else {
      setInternalSelectedRows(next);
      onSelectionChange?.(next);
    }
  };

  const allRowKeys = React.useMemo(
    () => data.map((row, i) => getRowKey(row, rowKey, i)),
    [data, rowKey],
  );

  const selectedKeysSet = React.useMemo(() => new Set(selectedKeys), [selectedKeys]);

  const allSelected = allRowKeys.length > 0 && allRowKeys.every((k) => selectedKeysSet.has(k));
  const someSelected = !allSelected && allRowKeys.some((k) => selectedKeysSet.has(k));

  const handleSelectAll = (checked: boolean) => {
    const next = checked ? allRowKeys : [];
    if (isControlledSelection) {
      onSelectionChange?.(next);
    } else {
      setInternalSelectedRows(next);
      onSelectionChange?.(next);
    }
  };

  const sortedData = React.useMemo(() => {
    if (!activeSortColumn || isControlledSort) return data;
    return [...data].sort((a, b) => {
      const aVal = a[activeSortColumn];
      const bVal = b[activeSortColumn];
      const aStr = String(aVal ?? '');
      const bStr = String(bVal ?? '');
      const cmp = aStr.localeCompare(bStr, undefined, { numeric: true });
      return activeSortDirection === 'asc' ? cmp : -cmp;
    });
  }, [data, activeSortColumn, activeSortDirection, isControlledSort]);

  const totalCols = columns.length + (selectable ? 1 : 0);

  const tableClass = [
    styles.table,
    striped ? styles.striped : '',
    compact ? styles.compact : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <table className={tableClass}>
        {caption && <caption>{caption}</caption>}
        <colgroup>
          {selectable && <col className={styles.checkboxCol} />}
          {columns.map((col) => (
            <col key={col.key} style={col.width ? { width: col.width } : undefined} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {selectable && (
              <th scope="col" className={`${styles.headerCell} ${styles.checkboxCell}`}>
                <Checkbox
                  checked={allSelected || someSelected}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            {columns.map((col) => {
              const isSorted = activeSortColumn === col.key;
              const ariaSortValue = col.sortable
                ? isSorted
                  ? activeSortDirection === 'asc'
                    ? ('ascending' as const)
                    : ('descending' as const)
                  : ('none' as const)
                : undefined;
              return (
                <th
                  key={col.key}
                  scope="col"
                  className={`${styles.headerCell}${isSorted ? ` ${styles.sorted}` : ''}`}
                  aria-sort={ariaSortValue}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      className={styles.sortButton}
                      onClick={() => handleSortClick(col.key)}
                      aria-label={`Sort by ${col.header}`}
                    >
                      {col.header}
                      <span className={styles.sortIcon} aria-hidden="true">
                        {isSorted ? (
                          activeSortDirection === 'asc' ? (
                            <ArrowUp size={14} />
                          ) : (
                            <ArrowDown size={14} />
                          )
                        ) : (
                          <ArrowUpDown size={14} />
                        )}
                      </span>
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={totalCols} className={styles.emptyCell}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, index) => {
              const key = getRowKey(row, rowKey, index);
              const isSelected = selectedKeysSet.has(key);
              const rowClass = [
                styles.row,
                onRowClick ? styles.clickable : '',
                isSelected ? styles.selected : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <tr
                  key={key}
                  className={rowClass}
                  tabIndex={onRowClick ? 0 : undefined}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  onKeyDown={
                    onRowClick
                      ? (e: React.KeyboardEvent<HTMLTableRowElement>) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onRowClick(row);
                          }
                        }
                      : undefined
                  }
                >
                  {selectable && (
                    <td
                      className={`${styles.cell} ${styles.checkboxCell}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        checked={isSelected}
                        onChange={(checked) => handleRowCheck(key, checked)}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`${styles.cell}${activeSortColumn === col.key ? ` ${styles.sortedCell}` : ''}`}
                    >
                      {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataGrid;
