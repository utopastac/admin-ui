import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Badge, Chip, DataGrid } from '@/primitives';
import type { DataGridColumn } from '@/primitives';

const DataGridProps: PropRow[] = [
  { prop: 'columns', type: 'DataGridColumn<T>[]', description: 'Column definitions including key, header, optional width, sortable flag, and render function.' },
  { prop: 'data', type: 'T[]', description: 'Array of row data objects.' },
  { prop: 'rowKey', type: 'string | ((row: T) => string)', description: 'Key field name or function to derive a unique key for each row.' },
  { prop: 'selectable', type: 'boolean', default: 'false', description: 'Whether rows can be selected via checkboxes.' },
  { prop: 'selectedRows', type: 'string[]', description: 'Controlled array of selected row keys.' },
  { prop: 'onSelectionChange', type: '(keys: string[]) => void', description: 'Called when the selection changes.' },
  { prop: 'onRowClick', type: '(row: T) => void', description: 'Called when a row is clicked.' },
  { prop: 'sortColumn', type: 'string', description: 'Controlled sort column key.' },
  { prop: 'sortDirection', type: 'string', options: ['asc', 'desc'], description: 'Controlled sort direction.' },
  { prop: 'onSortChange', type: '(column: string, direction: "asc" | "desc") => void', description: 'Called when the sort column or direction changes.' },
  { prop: 'striped', type: 'boolean', default: 'false', description: 'Whether to render alternating row shading.' },
  { prop: 'compact', type: 'boolean', default: 'false', description: 'Whether to use reduced row padding.' },
  { prop: 'emptyMessage', type: 'string', default: "'No data'", description: 'Message shown when data is empty.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional class names.' },
];
import { sampleAvatars } from '../../data/avatars';

interface DemoUser extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const demoColumns: DataGridColumn<DemoUser>[] = [
  { key: 'name', header: 'Name', width: '25%', sortable: true },
  { key: 'email', header: 'Email', width: '30%', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (v) => (
      <Badge variant={v === 'Active' ? 'success' : 'warning'} size="sm">
        {String(v)}
      </Badge>
    ),
  },
];

const demoData: DemoUser[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: '3', name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer', status: 'Pending' },
  { id: '4', name: 'Dan Brown', email: 'dan@example.com', role: 'Editor', status: 'Active' },
  { id: '5', name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Pending' },
];

interface DemoAssignment extends Record<string, unknown> {
  id: string;
  avatarIndex: number;
  role: string;
  project: string;
  status: string;
}

const assignmentData: DemoAssignment[] = [
  { id: '1', avatarIndex: 0, role: sampleAvatars[0].role, project: 'Design System', status: 'Active' },
  { id: '2', avatarIndex: 1, role: sampleAvatars[1].role, project: 'API Refactor', status: 'Active' },
  { id: '3', avatarIndex: 2, role: sampleAvatars[2].role, project: 'User Research', status: 'Pending' },
  { id: '4', avatarIndex: 3, role: sampleAvatars[3].role, project: 'Mobile App', status: 'Active' },
  { id: '5', avatarIndex: 4, role: sampleAvatars[4].role, project: 'Analytics', status: 'Pending' },
];

const assignmentColumns: DataGridColumn<DemoAssignment>[] = [
  {
    key: 'avatarIndex',
    header: 'Assignee',
    width: '35%',
    render: (_, row) => {
      const av = sampleAvatars[row.avatarIndex as number];
      return <Chip avatar={{ src: av.src, name: av.name }}>{av.name}</Chip>;
    },
  },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'project', header: 'Project', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (v) => (
      <Badge variant={v === 'Active' ? 'success' : 'warning'} size="sm">
        {String(v)}
      </Badge>
    ),
  },
];

function SortableExample() {
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSortChange = (col: string, dir: 'asc' | 'desc') => {
    setSortColumn(col);
    setSortDirection(dir);
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return demoData;
    return [...demoData].sort((a, b) => {
      const aVal = String(a[sortColumn as keyof DemoUser] ?? '');
      const bVal = String(b[sortColumn as keyof DemoUser] ?? '');
      const cmp = aVal.localeCompare(bVal, undefined, { numeric: true });
      return sortDirection === 'asc' ? cmp : -cmp;
    });
  }, [sortColumn, sortDirection]);

  return (
    <DataGrid
      columns={demoColumns}
      data={sortedData}
      rowKey="id"
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      onSortChange={handleSortChange}
    />
  );
}

function SelectableExample() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  return (
    <div>
      <DataGrid
        columns={demoColumns}
        data={demoData}
        rowKey="id"
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
      />
      <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--admin-text-secondary)' }}>
        {selectedRows.length === 0
          ? 'No rows selected'
          : `Selected: ${selectedRows.join(', ')}`}
      </p>
    </div>
  );
}

export default function DataGridDemo() {
  return (
    <DemoSection
      title="DataGrid"
      description="Enhanced data table with sortable columns, row selection, striped and compact variants, and empty state handling."
    >
      <DemoShowcase
        code={`import DataGrid from 'admin-ui/primitives/DataGrid';

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role' },
];

<DataGrid
  columns={columns}
  data={data}
  rowKey="id"
  selectable
  selectedRows={selectedRows}
  onSelectionChange={setSelectedRows}
  sortColumn={sortColumn}
  sortDirection={sortDirection}
  onSortChange={handleSortChange}
/>`}
      >
        <div style={{ width: '100%' }}>
          <SortableExample />
        </div>
      </DemoShowcase>
      <PropsTable props={DataGridProps} />

      <DemoSubsection label="Avatar chips in first column">
        <DataGrid columns={assignmentColumns} data={assignmentData} rowKey="id" />
      </DemoSubsection>

      <DemoSubsection label="Compact with avatar chips">
        <DataGrid columns={assignmentColumns} data={assignmentData} rowKey="id" compact striped />
      </DemoSubsection>

      <DemoSubsection label="Sortable columns (controlled)">
        <SortableExample />
      </DemoSubsection>

      <DemoSubsection label="Selectable rows (controlled)">
        <SelectableExample />
      </DemoSubsection>

      <DemoSubsection label="Internal sort (uncontrolled)">
        <DataGrid columns={demoColumns} data={demoData} rowKey="id" />
      </DemoSubsection>

      <DemoSubsection label="Striped">
        <DataGrid columns={demoColumns} data={demoData} rowKey="id" striped />
      </DemoSubsection>

      <DemoSubsection label="Compact + Striped">
        <DataGrid columns={demoColumns} data={demoData} rowKey="id" striped compact />
      </DemoSubsection>

      <DemoSubsection label="Empty state">
        <DataGrid
          columns={demoColumns}
          data={[]}
          rowKey="id"
          emptyMessage="No users found"
        />
      </DemoSubsection>
    </DemoSection>
  );
}
