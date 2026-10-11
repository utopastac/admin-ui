import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from './Select';
import type { SelectOption } from './Select';

const options: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', description: 'A red fruit' },
  { value: 'durian', label: 'Durian', disabled: true },
];

describe('Select', () => {
  const defaultProps = {
    options,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with the default placeholder', () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByRole('button', { name: /select\.\.\./i })).toBeInTheDocument();
  });

  it('renders with a custom placeholder', () => {
    render(<Select {...defaultProps} placeholder="Pick a fruit" />);
    expect(screen.getByRole('button', { name: /pick a fruit/i })).toBeInTheDocument();
  });

  it('displays the selected option label when value is set', () => {
    render(<Select {...defaultProps} value="banana" />);
    expect(screen.getByRole('button')).toHaveTextContent('Banana');
  });

  it('opens the dropdown on click', async () => {
    const user = userEvent.setup();
    render(<Select {...defaultProps} />);
    await user.click(screen.getByRole('button', { name: /select\.\.\./i }));
    // All option buttons should now be visible
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<Select {...defaultProps} disabled />);
    await user.click(screen.getByRole('button'));
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('calls onChange and closes dropdown when an option is selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: /select\.\.\./i }));
    await user.click(screen.getByText('Banana'));
    expect(onChange).toHaveBeenCalledWith('banana');
    // Dropdown should be closed
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('does not call onChange when clicking a disabled option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: /select\.\.\./i }));
    await user.click(screen.getByText('Durian'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders option descriptions when provided', async () => {
    const user = userEvent.setup();
    render(<Select {...defaultProps} />);
    await user.click(screen.getByRole('button', { name: /select\.\.\./i }));
    expect(screen.getByText('A red fruit')).toBeInTheDocument();
  });

  it('closes the dropdown on Escape key', async () => {
    const user = userEvent.setup();
    render(<Select {...defaultProps} />);
    await user.click(screen.getByRole('button', { name: /select\.\.\./i }));
    expect(screen.getByText('Apple')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('closes the dropdown on outside click', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <span data-testid="outside">Outside</span>
        <Select {...defaultProps} />
      </div>,
    );
    await user.click(screen.getByRole('button', { name: /select\.\.\./i }));
    expect(screen.getByText('Apple')).toBeInTheDocument();
    await user.click(screen.getByTestId('outside'));
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('toggles the dropdown open and closed', async () => {
    const user = userEvent.setup();
    render(<Select {...defaultProps} />);
    const trigger = screen.getByRole('button', { name: /select\.\.\./i });
    await user.click(trigger);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    await user.click(trigger);
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('applies additional className to the container', () => {
    const { container } = render(<Select {...defaultProps} className="custom" />);
    const innerContainer = container.querySelector('[class*="container"]');
    expect(innerContainer?.className).toContain('custom');
  });

  it('renders label when provided', () => {
    render(<Select {...defaultProps} label="Fruit" id="fruit-select" />);
    const label = screen.getByText('Fruit');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'fruit-select');
  });

  it('renders error text when error provided', () => {
    render(<Select {...defaultProps} error="Selection required" />);
    expect(screen.getByText('Selection required')).toBeInTheDocument();
  });

  it('renders helper text when helperText provided', () => {
    render(<Select {...defaultProps} helperText="Choose your favorite fruit" />);
    expect(screen.getByText('Choose your favorite fruit')).toBeInTheDocument();
  });

  it('shows error text instead of helper text when both provided', () => {
    render(<Select {...defaultProps} error="Invalid selection" helperText="Choose a fruit" />);
    expect(screen.getByText('Invalid selection')).toBeInTheDocument();
    expect(screen.queryByText('Choose a fruit')).not.toBeInTheDocument();
  });
});
