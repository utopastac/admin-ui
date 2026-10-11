import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a text input by default', () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders with a custom type', () => {
    render(<Input {...defaultProps} type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('renders the label when provided', () => {
    render(<Input {...defaultProps} label="Email" id="email-input" />);
    const label = screen.getByText('Email');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'email-input');
  });

  it('does not render a label when not provided', () => {
    render(<Input {...defaultProps} />);
    expect(screen.queryByRole('textbox')?.closest('div')?.querySelector('label')).toBeNull();
  });

  it('displays the current value', () => {
    render(<Input {...defaultProps} value="hello" />);
    expect(screen.getByRole('textbox')).toHaveValue('hello');
  });

  it('calls onChange with the new value when typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input value="" onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'a');
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('renders error text when error is provided', () => {
    render(<Input {...defaultProps} error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('renders helper text when provided and no error', () => {
    render(<Input {...defaultProps} helperText="Enter your email" />);
    expect(screen.getByText('Enter your email')).toBeInTheDocument();
  });

  it('shows error text instead of helper text when both are provided', () => {
    render(<Input {...defaultProps} error="Invalid" helperText="Enter your email" />);
    expect(screen.getByText('Invalid')).toBeInTheDocument();
    expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
  });

  it('passes min and max attributes for number inputs', () => {
    render(<Input {...defaultProps} type="number" min={0} max={100} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
  });

  it('passes step attribute for number inputs', () => {
    render(<Input {...defaultProps} type="number" step={0.5} />);
    expect(screen.getByRole('spinbutton')).toHaveAttribute('step', '0.5');
  });

  it('sets the id attribute on the input element', () => {
    render(<Input {...defaultProps} id="my-input" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-input');
  });

  it('renders a prefix when provided', () => {
    render(<Input {...defaultProps} prefix="$" />);
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('renders prefixSlot instead of prefix text when both provided', () => {
    render(<Input {...defaultProps} prefix="$" prefixSlot={<span data-testid="icon" />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.queryByText('$')).not.toBeInTheDocument();
  });

  it('calls onBlur when the input loses focus', async () => {
    const user = userEvent.setup();
    const onBlur = vi.fn();
    render(<Input value="" onChange={vi.fn()} onBlur={onBlur} />);
    await user.click(screen.getByRole('textbox'));
    await user.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
