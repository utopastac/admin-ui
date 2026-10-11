import { render, screen, fireEvent } from '@testing-library/react';
import RadioGroup from './RadioGroup';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

describe('RadioGroup', () => {
  it('renders all option labels', () => {
    render(<RadioGroup value="apple" onChange={vi.fn()} options={options} />);
    expect(screen.getByText('Apple')).toBeTruthy();
    expect(screen.getByText('Banana')).toBeTruthy();
    expect(screen.getByText('Cherry')).toBeTruthy();
  });

  it('renders a radiogroup element', () => {
    render(<RadioGroup value="apple" onChange={vi.fn()} options={options} />);
    expect(screen.getByRole('radiogroup')).toBeTruthy();
  });

  it('selected option radio is checked', () => {
    render(<RadioGroup value="banana" onChange={vi.fn()} options={options} />);
    const radios = screen.getAllByRole('radio');
    const bananaRadio = radios.find((r) => (r as HTMLInputElement).value === 'banana');
    expect((bananaRadio as HTMLInputElement).checked).toBe(true);
  });

  it('non-selected options are not checked', () => {
    render(<RadioGroup value="banana" onChange={vi.fn()} options={options} />);
    const radios = screen.getAllByRole('radio');
    const appleRadio = radios.find((r) => (r as HTMLInputElement).value === 'apple');
    expect((appleRadio as HTMLInputElement).checked).toBe(false);
  });

  it('calls onChange with option value when radio clicked', () => {
    const onChange = vi.fn();
    render(<RadioGroup value="apple" onChange={onChange} options={options} />);
    const radios = screen.getAllByRole('radio');
    const bananaRadio = radios.find((r) => (r as HTMLInputElement).value === 'banana')!;
    fireEvent.click(bananaRadio);
    expect(onChange).toHaveBeenCalledWith('banana');
  });

  it('disabled group: all radios are disabled', () => {
    render(<RadioGroup value="apple" onChange={vi.fn()} options={options} disabled />);
    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => {
      expect((radio as HTMLInputElement).disabled).toBe(true);
    });
  });

  it('individual option disabled: that radio is disabled, others are not', () => {
    const mixedOptions = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana', disabled: true },
      { value: 'cherry', label: 'Cherry' },
    ];
    render(<RadioGroup value="apple" onChange={vi.fn()} options={mixedOptions} />);
    const radios = screen.getAllByRole('radio');
    const appleRadio = radios.find((r) => (r as HTMLInputElement).value === 'apple')!;
    const bananaRadio = radios.find((r) => (r as HTMLInputElement).value === 'banana')!;
    const cherryRadio = radios.find((r) => (r as HTMLInputElement).value === 'cherry')!;
    expect((appleRadio as HTMLInputElement).disabled).toBe(false);
    expect((bananaRadio as HTMLInputElement).disabled).toBe(true);
    expect((cherryRadio as HTMLInputElement).disabled).toBe(false);
  });

  it('renders with direction="horizontal" without crash', () => {
    render(<RadioGroup value="apple" onChange={vi.fn()} options={options} direction="horizontal" />);
    expect(screen.getByRole('radiogroup')).toBeTruthy();
  });

  it('renders the correct number of radio inputs', () => {
    render(<RadioGroup value="apple" onChange={vi.fn()} options={options} />);
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });
});
