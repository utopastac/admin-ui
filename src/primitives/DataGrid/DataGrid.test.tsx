import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataGrid from './DataGrid';
import type { DataGridColumn } from './DataGrid';

interface User {
  id: string;
  name: string;
  role: string;
  status: string;
}

const columns: DataGridColumn<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'status', header: 'Status' },
];

const data: User[] = [
  { id: '1', name: 'Alice', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Bob', role: 'Editor', status: 'Pending' },
  { id: '3', name: 'Carol', role: 'Viewer', status: 'Active' },
];

describe('DataGrid', () => {
  it('renders without crashing with data', () => {
    render(<DataGrid columns={columns} data={data} rowKey="id" />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<DataGrid columns={columns} data={data} rowKey="id" />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders row data', () => {
    render(<DataGrid columns={columns} data={data} rowKey="id" />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Carol')).toBeInTheDocument();
  });

  it('shows empty message when data is empty', () => {
    render(<DataGrid columns={columns} data={[]} rowKey="id" />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('shows custom empty message when data is empty', () => {
    render(<DataGrid columns={columns} data={[]} rowKey="id" emptyMessage="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('calls onRowClick when a row is clicked', async () => {
    const user = userEvent.setup();
    const handleRowClick = vi.fn();
    render(<DataGrid columns={columns} data={data} rowKey="id" onRowClick={handleRowClick} />);
    await user.click(screen.getByText('Alice'));
    expect(handleRowClick).toHaveBeenCalledWith(data[0]);
  });

  it('calls onSortChange with correct args when a sortable header is clicked', async () => {
    const user = userEvent.setup();
    const handleSortChange = vi.fn();
    render(
      <DataGrid
        columns={columns}
        data={data}
        rowKey="id"
        onSortChange={handleSortChange}
        sortColumn={undefined}
        sortDirection="asc"
      />
    );
    await user.click(screen.getByRole('button', { name: 'Sort by Name' }));
    expect(handleSortChange).toHaveBeenCalledWith('name', 'asc');
  });

  it('toggles sort direction when clicking same column twice via onSortChange', async () => {
    const user = userEvent.setup();
    const handleSortChange = vi.fn();
    render(
      <DataGrid
        columns={columns}
        data={data}
        rowKey="id"
        onSortChange={handleSortChange}
        sortColumn="name"
        sortDirection="asc"
      />
    );
    await user.click(screen.getByRole('button', { name: 'Sort by Name' }));
    expect(handleSortChange).toHaveBeenCalledWith('name', 'desc');
  });

  it('sorts data internally when no onSortChange is provided', async () => {
    const user = userEvent.setup();
    render(<DataGrid columns={columns} data={data} rowKey="id" />);
    const nameButton = screen.getByRole('button', { name: 'Sort by Name' });
    await user.click(nameButton);
    const cells = screen.getAllByRole('cell');
    // First data cell in first row should be Alice (asc sort)
    expect(cells[0].textContent).toBe('Alice');
  });

  it('sorts data desc on second click when using internal sort', async () => {
    const user = userEvent.setup();
    render(<DataGrid columns={columns} data={data} rowKey="id" />);
    const nameButton = screen.getByRole('button', { name: 'Sort by Name' });
    await user.click(nameButton); // asc
    await user.click(nameButton); // desc
    const cells = screen.getAllByRole('cell');
    // First row should be Carol (last alphabetically)
    expect(cells[0].textContent).toBe('Carol');
  });

  it('renders checkboxes when selectable is true', () => {
    render(<DataGrid columns={columns} data={data} rowKey="id" selectable />);
    const checkboxes = screen.getAllByRole('checkbox');
    // One header checkbox + one per row
    expect(checkboxes).toHaveLength(data.length + 1);
  });

  it('calls onSelectionChange when a row checkbox is checked', async () => {
    const user = userEvent.setup();
    const handleSelectionChange = vi.fn();
    render(
      <DataGrid
        columns={columns}
        data={data}
        rowKey="id"
        selectable
        selectedRows={[]}
        onSelectionChange={handleSelectionChange}
      />
    );
    const checkboxes = screen.getAllByRole('checkbox');
    // checkboxes[0] is header, checkboxes[1] is first row
    await user.click(checkboxes[1]);
    expect(handleSelectionChange).toHaveBeenCalledWith(['1']);
  });

  it('selects all rows when header checkbox is clicked', async () => {
    const user = userEvent.setup();
    const handleSelectionChange = vi.fn();
    render(
      <DataGrid
        columns={columns}
        data={data}
        rowKey="id"
        selectable
        selectedRows={[]}
        onSelectionChange={handleSelectionChange}
      />
    );
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);
    expect(handleSelectionChange).toHaveBeenCalledWith(['1', '2', '3']);
  });

  it('applies striped class when striped prop is set', () => {
    render(<DataGrid columns={columns} data={data} rowKey="id" striped />);
    expect(screen.getByRole('table')).toHaveClass('striped');
  });

  it('applies compact class when compact prop is set', () => {
    render(<DataGrid columns={columns} data={data} rowKey="id" compact />);
    expect(screen.getByRole('table')).toHaveClass('compact');
  });
});
