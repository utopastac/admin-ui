import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toggle from './Toggle';

describe('Toggle', () => {
  const defaultProps = {
    checked: false,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a switch role element', () => {
    render(<Toggle {...defaultProps} />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('reflects the unchecked state via aria-checked', () => {
    render(<Toggle {...defaultProps} checked={false} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('reflects the checked state via aria-checked', () => {
    render(<Toggle {...defaultProps} checked={true} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange with true when clicked while unchecked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange with false when clicked while checked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle checked={true} onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('renders a label when provided', () => {
    render(<Toggle {...defaultProps} label="Dark mode" />);
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
  });

  it('does not render a label when not provided', () => {
    const { container } = render(<Toggle {...defaultProps} />);
    expect(container.querySelector('.label')).toBeNull();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Toggle {...defaultProps} disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('does not call onChange when disabled and clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} disabled />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies the disabled class to the wrapper when disabled', () => {
    const { container } = render(<Toggle {...defaultProps} disabled />);
    expect(container.firstElementChild?.className).toContain('disabled');
  });

  it('defaults to md size', () => {
    render(<Toggle {...defaultProps} />);
    const toggle = screen.getByRole('switch');
    expect(toggle.className).toContain('md');
  });

  it('applies sm size class', () => {
    render(<Toggle {...defaultProps} size="sm" />);
    const toggle = screen.getByRole('switch');
    expect(toggle.className).toContain('sm');
  });

  it('applies the checked class when checked', () => {
    render(<Toggle {...defaultProps} checked={true} />);
    const toggle = screen.getByRole('switch');
    expect(toggle.className).toContain('checked');
  });

  it('sets the id attribute on the button', () => {
    render(<Toggle {...defaultProps} id="my-toggle" />);
    expect(screen.getByRole('switch')).toHaveAttribute('id', 'my-toggle');
  });

  it('applies additional className to the wrapper', () => {
    const { container } = render(<Toggle {...defaultProps} className="custom" />);
    expect(container.firstElementChild?.className).toContain('custom');
  });
});
