import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { Badge, Table } from '@/primitives';
import type { TableColumn } from '@/primitives';

const TableProps: PropRow[] = [
  { prop: 'columns', type: 'TableColumn<T>[]', description: 'Column definitions including key, header, optional width, and optional render function.' },
  { prop: 'data', type: 'T[]', description: 'Array of row data objects.' },
  { prop: 'rowKey', type: 'string | ((row: T) => string)', description: 'Key field name or function used to derive a unique key for each row.' },
  { prop: 'striped', type: 'boolean', default: 'false', description: 'Alternates row background colors.' },
  { prop: 'compact', type: 'boolean', default: 'false', description: 'Reduces cell padding for a denser layout.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class for the wrapper element.' },
  { prop: 'onRowClick', type: '(row: T) => void', description: 'Click handler for rows. Makes rows keyboard-accessible and visually clickable.' },
];

const demoTableColumns: TableColumn<Record<string, unknown>>[] = [
  { key: 'name', header: 'Name', width: '30%' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status', render: (v) => <Badge variant={v === 'Active' ? 'success' : 'warning'} size="sm">{String(v)}</Badge> },
  { key: 'email', header: 'Email' },
];

const demoTableData = [
  { id: '1', name: 'Alice Johnson', role: 'Admin', status: 'Active', email: 'alice@example.com' },
  { id: '2', name: 'Bob Smith', role: 'Editor', status: 'Active', email: 'bob@example.com' },
  { id: '3', name: 'Carol Williams', role: 'Viewer', status: 'Pending', email: 'carol@example.com' },
  { id: '4', name: 'Dan Brown', role: 'Editor', status: 'Active', email: 'dan@example.com' },
  { id: '5', name: 'Eve Davis', role: 'Admin', status: 'Pending', email: 'eve@example.com' },
];

export default function TableDemo() {
  return (
    <DemoSection
      title="Table"
      description="Data table with typed columns, optional striping, compact mode, and custom cell renderers."
    >
      <DemoShowcase code={`import { Table } from 'admin-ui';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
];
const data = [
  { id: '1', name: 'Alice', role: 'Admin' },
  { id: '2', name: 'Bob', role: 'Editor' },
];

<Table columns={columns} data={data} rowKey="id" />`}>
        <div style={{ width: '100%' }}>
          <Table columns={demoTableColumns} data={demoTableData} rowKey="id" />
        </div>
      </DemoShowcase>
      <PropsTable props={TableProps} />

      <DemoSubsection label="Default">
        <Table columns={demoTableColumns} data={demoTableData} rowKey="id" />
      </DemoSubsection>

      <DemoSubsection label="Striped">
        <Table columns={demoTableColumns} data={demoTableData} rowKey="id" striped />
      </DemoSubsection>

      <DemoSubsection label="Compact + Striped">
        <Table columns={demoTableColumns} data={demoTableData} rowKey="id" striped compact />
      </DemoSubsection>
    </DemoSection>
  );
}
