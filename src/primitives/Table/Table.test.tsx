import { render, screen, fireEvent } from '@testing-library/react';
import Table from './Table';
import type { TableColumn } from './Table';

interface TestRow {
  id: string;
  name: string;
  age: number;
  [key: string]: unknown;
}

const columns: TableColumn<TestRow>[] = [
  { key: 'name', header: 'Name' },
  { key: 'age', header: 'Age' },
];

const data: TestRow[] = [
  { id: '1', name: 'Alice', age: 30 },
  { id: '2', name: 'Bob', age: 25 },
  { id: '3', name: 'Charlie', age: 35 },
];

describe('Table', () => {
  it('renders a table element', () => {
    render(<Table columns={columns} data={data} rowKey="id" />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<Table columns={columns} data={data} rowKey="id" />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders data rows', () => {
    render(<Table columns={columns} data={data} rowKey="id" />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('uses rowKey string to generate keys from row data', () => {
    render(<Table columns={columns} data={data} rowKey="id" />);
    const rows = screen.getAllByRole('row');
    // 1 header row + 3 data rows
    expect(rows).toHaveLength(4);
  });

  it('supports rowKey as a function', () => {
    render(<Table columns={columns} data={data} rowKey={(row) => `row-${row.id}`} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(4);
  });

  it('renders custom cell content via render function', () => {
    const customColumns: TableColumn<TestRow>[] = [
      { key: 'name', header: 'Name', render: (value) => <strong>{String(value)}</strong> },
      { key: 'age', header: 'Age' },
    ];
    render(<Table columns={customColumns} data={data} rowKey="id" />);
    const strongElements = document.querySelectorAll('strong');
    expect(strongElements).toHaveLength(3);
    expect(strongElements[0]).toHaveTextContent('Alice');
  });

  it('applies column width when specified', () => {
    const columnsWithWidth: TableColumn<TestRow>[] = [
      { key: 'name', header: 'Name', width: '200px' },
      { key: 'age', header: 'Age' },
    ];
    render(<Table columns={columnsWithWidth} data={data} rowKey="id" />);
    const headers = screen.getAllByRole('columnheader');
    expect(headers[0]).toHaveStyle({ width: '200px' });
    expect(headers[1]).not.toHaveStyle({ width: '200px' });
  });

  it('applies striped class when striped prop is true', () => {
    render(<Table columns={columns} data={data} rowKey="id" striped />);
    const table = screen.getByRole('table');
    expect(table.className).toContain('striped');
  });

  it('applies compact class when compact prop is true', () => {
    render(<Table columns={columns} data={data} rowKey="id" compact />);
    const table = screen.getByRole('table');
    expect(table.className).toContain('compact');
  });

  it('does not apply striped or compact classes by default', () => {
    render(<Table columns={columns} data={data} rowKey="id" />);
    const table = screen.getByRole('table');
    expect(table.className).not.toContain('striped');
    expect(table.className).not.toContain('compact');
  });

  it('applies additional className to the wrapper', () => {
    const { container } = render(
      <Table columns={columns} data={data} rowKey="id" className="custom" />,
    );
    expect(container.firstElementChild?.className).toContain('custom');
  });

  it('renders empty tbody when data is empty', () => {
    render(<Table columns={columns} data={[]} rowKey="id" />);
    const rows = screen.getAllByRole('row');
    // Only the header row
    expect(rows).toHaveLength(1);
  });

  describe('row click interaction', () => {
    it('calls onRowClick when a row is clicked', () => {
      const onRowClick = vi.fn();
      render(<Table columns={columns} data={data} rowKey="id" onRowClick={onRowClick} />);
      fireEvent.click(screen.getByText('Alice'));
      expect(onRowClick).toHaveBeenCalledWith(data[0]);
    });

    it('applies clickable class when onRowClick is provided', () => {
      render(<Table columns={columns} data={data} rowKey="id" onRowClick={vi.fn()} />);
      const rows = screen.getAllByRole('button');
      expect(rows.length).toBeGreaterThan(0);
    });

    it('calls onRowClick on Enter keydown', () => {
      const onRowClick = vi.fn();
      render(<Table columns={columns} data={data} rowKey="id" onRowClick={onRowClick} />);
      const rows = screen.getAllByRole('button');
      fireEvent.keyDown(rows[0], { key: 'Enter' });
      expect(onRowClick).toHaveBeenCalledWith(data[0]);
    });

    it('calls onRowClick on Space keydown', () => {
      const onRowClick = vi.fn();
      render(<Table columns={columns} data={data} rowKey="id" onRowClick={onRowClick} />);
      const rows = screen.getAllByRole('button');
      fireEvent.keyDown(rows[0], { key: ' ' });
      expect(onRowClick).toHaveBeenCalledWith(data[0]);
    });

    it('does not call onRowClick for other keys', () => {
      const onRowClick = vi.fn();
      render(<Table columns={columns} data={data} rowKey="id" onRowClick={onRowClick} />);
      const rows = screen.getAllByRole('button');
      fireEvent.keyDown(rows[0], { key: 'Tab' });
      expect(onRowClick).not.toHaveBeenCalled();
    });

    it('does not render rows as buttons without onRowClick', () => {
      render(<Table columns={columns} data={data} rowKey="id" />);
      expect(screen.queryAllByRole('button')).toHaveLength(0);
    });
  });
});
