import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GlobalSearch from './GlobalSearch';

const sampleResults = [
  { id: '1', title: 'Dashboard', description: 'Main overview' },
  { id: '2', title: 'Settings', description: 'App configuration' },
  { id: '3', title: 'Users', description: 'Manage accounts' },
];

const defaultProps = {
  query: '',
  onQueryChange: vi.fn(),
  results: sampleResults,
  onSelect: vi.fn(),
};

describe('GlobalSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input with placeholder', () => {
    render(<GlobalSearch {...defaultProps} placeholder="Search everything..." />);
    expect(screen.getByPlaceholderText('Search everything...')).toBeInTheDocument();
  });

  it('shows dropdown with results when query is non-empty and input is focused', async () => {
    const user = userEvent.setup();
    render(<GlobalSearch {...defaultProps} query="dash" />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  it('does not show dropdown when query is empty', async () => {
    const user = userEvent.setup();
    render(<GlobalSearch {...defaultProps} query="" />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('shows default empty message when query present but results empty', async () => {
    const user = userEvent.setup();
    render(<GlobalSearch {...defaultProps} query="xyz" results={[]} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('No matches')).toBeInTheDocument();
  });

  it('shows custom emptyMessage when query present but results empty', async () => {
    const user = userEvent.setup();
    render(
      <GlobalSearch
        {...defaultProps}
        query="xyz"
        results={[]}
        emptyMessage="Nothing found"
      />,
    );
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('shows loading state when loading=true with no results', async () => {
    const user = userEvent.setup();
    render(<GlobalSearch {...defaultProps} query="dash" results={[]} loading />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Searching...')).toBeInTheDocument();
  });

  it('calls onQueryChange when typing in input', async () => {
    const user = userEvent.setup();
    const onQueryChange = vi.fn();
    render(<GlobalSearch {...defaultProps} onQueryChange={onQueryChange} />);
    const input = screen.getByRole('combobox');
    await user.type(input, 'test');
    expect(onQueryChange).toHaveBeenCalled();
  });

  it('calls onSelect when clicking a result', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<GlobalSearch {...defaultProps} query="dash" onSelect={onSelect} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Dashboard'));
    expect(onSelect).toHaveBeenCalledWith('1');
  });

  it('arrow down/up navigates results and changes active class', async () => {
    const user = userEvent.setup();
    render(<GlobalSearch {...defaultProps} query="dash" />);
    const input = screen.getByRole('combobox');
    await user.click(input);

    // Press ArrowDown to activate first result
    await user.keyboard('{ArrowDown}');
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
    expect(options[1]).toHaveAttribute('aria-selected', 'false');

    // Press ArrowDown again to move to second result
    await user.keyboard('{ArrowDown}');
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
    expect(options[1]).toHaveAttribute('aria-selected', 'true');

    // Press ArrowUp to go back to first
    await user.keyboard('{ArrowUp}');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
    expect(options[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('Enter selects the active result', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<GlobalSearch {...defaultProps} query="dash" onSelect={onSelect} />);
    const input = screen.getByRole('combobox');
    await user.click(input);

    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledWith('2');
  });

  it('Escape closes dropdown', async () => {
    const user = userEvent.setup();
    render(<GlobalSearch {...defaultProps} query="dash" />);
    const input = screen.getByRole('combobox');
    await user.click(input);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('Cmd+K focuses the input', () => {
    render(<GlobalSearch {...defaultProps} />);
    const input = screen.getByRole('combobox');
    expect(document.activeElement).not.toBe(input);

    fireEvent.keyDown(document, { key: 'k', metaKey: true });
    expect(document.activeElement).toBe(input);
  });

  it('shortcut={false} disables Cmd+K', () => {
    render(<GlobalSearch {...defaultProps} shortcut={false} />);
    const input = screen.getByRole('combobox');

    fireEvent.keyDown(document, { key: 'k', metaKey: true });
    expect(document.activeElement).not.toBe(input);
  });

  it('click outside closes dropdown', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <button>Outside</button>
        <GlobalSearch {...defaultProps} query="dash" />
      </div>,
    );
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByText('Outside'));
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('renders custom renderResult when provided', async () => {
    const user = userEvent.setup();
    render(
      <GlobalSearch
        {...defaultProps}
        query="dash"
        renderResult={(result) => (
          <span data-testid={`custom-${result.id}`}>Custom: {result.title}</span>
        )}
      />,
    );
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByTestId('custom-1')).toBeInTheDocument();
    expect(screen.getByText('Custom: Dashboard')).toBeInTheDocument();
  });

  it('renders result with icon, title, and description', async () => {
    const user = userEvent.setup();
    const resultsWithIcon = [
      {
        id: '1',
        title: 'Dashboard',
        description: 'Main overview',
        icon: <span data-testid="result-icon">icon</span>,
      },
    ];
    render(<GlobalSearch {...defaultProps} query="dash" results={resultsWithIcon} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByTestId('result-icon')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Main overview')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <GlobalSearch {...defaultProps} className="custom-search" />,
    );
    expect(container.firstElementChild).toHaveClass('custom-search');
  });
});
