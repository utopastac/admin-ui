import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Radio from './Radio';
import RadioGroup from './RadioGroup';

describe('Radio', () => {
  it('renders a radio input', () => {
    render(<Radio checked={false} onChange={() => {}} />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders label text when provided', () => {
    render(<Radio checked={false} onChange={() => {}} label="Option A" />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('does not render label when not provided', () => {
    const { container } = render(<Radio checked={false} onChange={() => {}} />);
    const spans = container.querySelectorAll('span');
    expect(spans).toHaveLength(1); // Only the circle span
  });

  it('reflects checked state', () => {
    render(<Radio checked={true} onChange={() => {}} label="Option" />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('reflects unchecked state', () => {
    render(<Radio checked={false} onChange={() => {}} label="Option" />);
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Radio checked={false} onChange={handleChange} label="Option" />);
    await user.click(screen.getByRole('radio'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Radio checked={false} onChange={() => {}} disabled label="Disabled" />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Radio checked={false} onChange={handleChange} disabled label="Disabled" />);
    await user.click(screen.getByRole('radio'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies the id attribute', () => {
    render(<Radio checked={false} onChange={() => {}} id="my-radio" />);
    expect(screen.getByRole('radio')).toHaveAttribute('id', 'my-radio');
  });

  it('applies the name attribute', () => {
    render(<Radio checked={false} onChange={() => {}} name="group1" />);
    expect(screen.getByRole('radio')).toHaveAttribute('name', 'group1');
  });

  it('applies custom className to the wrapper', () => {
    const { container } = render(
      <Radio checked={false} onChange={() => {}} className="custom" />
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('applies disabled class to wrapper when disabled', () => {
    const { container } = render(
      <Radio checked={false} onChange={() => {}} disabled />
    );
    expect(container.firstChild).toHaveClass('disabled');
  });
});

describe('RadioGroup', () => {
  const options = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ];

  it('renders a radiogroup role', () => {
    render(<RadioGroup value="a" onChange={() => {}} options={options} />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<RadioGroup value="a" onChange={() => {}} options={options} />);
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('checks the selected option', () => {
    render(<RadioGroup value="b" onChange={() => {}} options={options} />);
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
    expect(radios[2]).not.toBeChecked();
  });

  it('calls onChange with the selected value', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<RadioGroup value="a" onChange={handleChange} options={options} />);
    await user.click(screen.getByText('Option C'));
    expect(handleChange).toHaveBeenCalledWith('c');
  });

  it('disables all options when disabled', () => {
    render(<RadioGroup value="a" onChange={() => {}} options={options} disabled />);
    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it('disables individual options', () => {
    const opts = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B', disabled: true },
    ];
    render(<RadioGroup value="a" onChange={() => {}} options={opts} />);
    expect(screen.getAllByRole('radio')[0]).not.toBeDisabled();
    expect(screen.getAllByRole('radio')[1]).toBeDisabled();
  });

  it('applies vertical direction by default', () => {
    const { container } = render(
      <RadioGroup value="a" onChange={() => {}} options={options} />
    );
    expect(container.firstChild).toHaveClass('vertical');
  });

  it('applies horizontal direction', () => {
    const { container } = render(
      <RadioGroup value="a" onChange={() => {}} options={options} direction="horizontal" />
    );
    expect(container.firstChild).toHaveClass('horizontal');
  });

  it('applies custom className', () => {
    const { container } = render(
      <RadioGroup value="a" onChange={() => {}} options={options} className="custom" />
    );
    expect(container.firstChild).toHaveClass('custom');
  });
});
