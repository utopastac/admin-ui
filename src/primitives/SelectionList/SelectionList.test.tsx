import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectionList from './SelectionList';
import type { SelectionListItem } from './SelectionList';

const items: SelectionListItem[] = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2', description: 'Second option' },
  { value: 'opt3', label: 'Option 3' },
];

describe('SelectionList', () => {
  const defaultProps = {
    items,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a listbox', () => {
    render(<SelectionList {...defaultProps} />);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('renders all items as option buttons', () => {
    render(<SelectionList {...defaultProps} />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('Option 1');
    expect(options[1]).toHaveTextContent('Option 2');
    expect(options[2]).toHaveTextContent('Option 3');
  });

  it('marks the selected item with aria-selected', () => {
    render(<SelectionList {...defaultProps} value="opt2" />);
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
    expect(options[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange when an item is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SelectionList items={items} onChange={onChange} />);
    await user.click(screen.getAllByRole('option')[1]);
    expect(onChange).toHaveBeenCalledWith('opt2');
  });

  it('renders descriptions when provided', () => {
    render(<SelectionList {...defaultProps} />);
    expect(screen.getByText('Second option')).toBeInTheDocument();
  });

  it('sets aria-label on the listbox', () => {
    render(<SelectionList {...defaultProps} aria-label="Choose an option" />);
    expect(screen.getByRole('listbox')).toHaveAttribute('aria-label', 'Choose an option');
  });

  it('defaults to 1 column layout', () => {
    const { container } = render(<SelectionList {...defaultProps} />);
    const listbox = container.querySelector('[role="listbox"]');
    expect(listbox?.className).toContain('columns1');
  });

  it('applies the specified columns class', () => {
    const { container } = render(<SelectionList {...defaultProps} columns={3} />);
    const listbox = container.querySelector('[role="listbox"]');
    expect(listbox?.className).toContain('columns3');
  });

  it('applies additional className', () => {
    const { container } = render(<SelectionList {...defaultProps} className="extra" />);
    const listbox = container.querySelector('[role="listbox"]');
    expect(listbox?.className).toContain('extra');
  });

  it('does not throw when onChange is not provided', async () => {
    const user = userEvent.setup();
    render(<SelectionList items={items} />);
    // Should not throw
    await user.click(screen.getAllByRole('option')[0]);
  });

  it('has no selected item when value is not provided', () => {
    render(<SelectionList {...defaultProps} />);
    const options = screen.getAllByRole('option');
    options.forEach((option) => {
      expect(option).toHaveAttribute('aria-selected', 'false');
    });
  });
});
