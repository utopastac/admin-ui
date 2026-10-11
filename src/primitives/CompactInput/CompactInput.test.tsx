import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CompactInput from './CompactInput';

describe('CompactInput', () => {
  it('renders an input element', () => {
    render(<CompactInput prefix="Name" value="" onChange={() => {}} id="name" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the prefix', () => {
    render(<CompactInput prefix="Email" value="" onChange={() => {}} id="email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Email').tagName).toBe('SPAN');
  });

  it('sets the id on the input', () => {
    render(<CompactInput prefix="Email" value="" onChange={() => {}} id="email-input" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'email-input');
  });

  it('displays the current value', () => {
    render(<CompactInput prefix="Name" value="John" onChange={() => {}} />);
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
  });

  it('calls onChange with new value on input', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<CompactInput prefix="Name" value="" onChange={handleChange} id="name" />);

    await user.type(screen.getByRole('textbox'), 'A');
    expect(handleChange).toHaveBeenCalledWith('A');
  });

  it('defaults to type="text"', () => {
    render(<CompactInput prefix="Name" value="" onChange={() => {}} id="name" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('accepts a custom type', () => {
    const { container } = render(
      <CompactInput prefix="Count" type="number" value="5" onChange={() => {}} id="count" />
    );
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('applies min and max attributes', () => {
    const { container } = render(
      <CompactInput prefix="Age" type="number" value="25" onChange={() => {}} min={0} max={120} id="age" />
    );
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '120');
  });

  it('applies error class when error is true', () => {
    const { container } = render(
      <CompactInput prefix="Name" value="" onChange={() => {}} error />
    );
    expect(container.firstChild).toHaveClass('error');
  });

  it('does not apply error class by default', () => {
    const { container } = render(
      <CompactInput prefix="Name" value="" onChange={() => {}} />
    );
    expect(container.firstChild).not.toHaveClass('error');
  });

  it('applies custom className', () => {
    const { container } = render(
      <CompactInput prefix="Name" value="" onChange={() => {}} className="custom" />
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('renders label above input by default', () => {
    render(
      <CompactInput prefix="W" label="Size" value="100" onChange={() => {}} id="size" />
    );
    const label = screen.getByText('Size');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'size');
    expect(label.parentElement).toHaveClass('fieldTop');
  });

  it('renders label to the left when labelPosition is left', () => {
    render(
      <CompactInput prefix="W" label="Size" labelPosition="left" value="100" onChange={() => {}} id="size" />
    );
    expect(screen.getByText('Size').parentElement).toHaveClass('fieldLeft');
  });

  it('does not render field wrapper when no label provided', () => {
    const { container } = render(
      <CompactInput prefix="W" value="100" onChange={() => {}} />
    );
    expect(container.firstChild).toHaveClass('wrapper');
  });

  it('applies scrub cursor class when scrub is true', () => {
    render(
      <CompactInput prefix="X" value="10" onChange={() => {}} scrub id="scrub-test" />
    );
    expect(screen.getByText('X')).toHaveClass('scrub');
  });

  it('does not apply scrub class by default', () => {
    render(
      <CompactInput prefix="X" value="10" onChange={() => {}} id="no-scrub" />
    );
    expect(screen.getByText('X')).not.toHaveClass('scrub');
  });

  it('updates value on horizontal drag when scrub is enabled', () => {
    const onChange = vi.fn();
    render(
      <CompactInput prefix="px" value="10" onChange={onChange} scrub min={0} max={100} />
    );
    const prefix = screen.getByText('px');
    fireEvent.mouseDown(prefix, { clientX: 100 });
    fireEvent.mouseMove(document, { clientX: 110 });
    expect(onChange).toHaveBeenCalled();
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0];
    expect(Number(lastCall)).toBeGreaterThan(10);
    fireEvent.mouseUp(document);
  });

  it('clamps scrub value to min/max', () => {
    const onChange = vi.fn();
    render(
      <CompactInput prefix="px" value="5" onChange={onChange} scrub min={0} max={10} />
    );
    const prefix = screen.getByText('px');
    fireEvent.mouseDown(prefix, { clientX: 100 });
    // Drag far right — should clamp to max
    fireEvent.mouseMove(document, { clientX: 300 });
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0];
    expect(Number(lastCall)).toBeLessThanOrEqual(10);
    fireEvent.mouseUp(document);
  });
});
