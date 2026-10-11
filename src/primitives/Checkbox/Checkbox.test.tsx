import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('renders a checkbox input', () => {
    render(<Checkbox checked={false} onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders label text when provided', () => {
    render(<Checkbox checked={false} onChange={() => {}} label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('does not render label text when not provided', () => {
    const { container } = render(<Checkbox checked={false} onChange={() => {}} />);
    const spans = container.querySelectorAll('span');
    // Only the box span, no label span
    expect(spans).toHaveLength(1);
  });

  it('reflects checked state', () => {
    render(<Checkbox checked={true} onChange={() => {}} label="Option" />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('reflects unchecked state', () => {
    render(<Checkbox checked={false} onChange={() => {}} label="Option" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls onChange with new checked value on click', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox checked={false} onChange={handleChange} label="Toggle" />);
    await user.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox checked={false} onChange={() => {}} disabled label="Disabled" />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox checked={false} onChange={handleChange} disabled label="Disabled" />);
    await user.click(screen.getByRole('checkbox'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies the id attribute', () => {
    render(<Checkbox checked={false} onChange={() => {}} id="my-checkbox" label="Test" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'my-checkbox');
  });

  it('applies custom className to the wrapper', () => {
    const { container } = render(
      <Checkbox checked={false} onChange={() => {}} className="custom" />
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('applies disabled class to wrapper when disabled', () => {
    const { container } = render(
      <Checkbox checked={false} onChange={() => {}} disabled />
    );
    expect(container.firstChild).toHaveClass('disabled');
  });
});
