import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColorPicker from './ColorPicker';

// Mock canvas context since jsdom doesn't support canvas
const mockGetContext = vi.fn(() => ({
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  stroke: vi.fn(),
  fill: vi.fn(),
  fillRect: vi.fn(),
  createImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4) })),
  createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  putImageData: vi.fn(),
  strokeRect: vi.fn(),
  scale: vi.fn(),
  set lineWidth(_v: number) {},
  set strokeStyle(_v: string) {},
  set fillStyle(_v: string | CanvasGradient) {},
}));

HTMLCanvasElement.prototype.getContext = mockGetContext as unknown as typeof HTMLCanvasElement.prototype.getContext;

describe('ColorPicker', () => {
  const defaultProps = {
    value: '#3b82f6',
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing with required props', () => {
    render(<ColorPicker {...defaultProps} />);
    expect(screen.getByDisplayValue('3b82f6')).toBeInTheDocument();
  });

  it('shows label when provided', () => {
    render(<ColorPicker {...defaultProps} label="Color" id="color-input" />);
    const label = screen.getByText('Color');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'color-input');
  });

  it('displays swatch with current color', () => {
    render(<ColorPicker {...defaultProps} />);
    const swatch = screen.getByTestId('color-swatch');
    expect(swatch).toBeInTheDocument();
    expect(swatch).toHaveStyle({ backgroundColor: '#3b82f6' });
  });

  it('shows hex value in input', () => {
    render(<ColorPicker {...defaultProps} />);
    expect(screen.getByDisplayValue('3b82f6')).toBeInTheDocument();
  });

  it('opens popup on swatch click', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByTestId('color-swatch'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes popup on Escape key', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} />);
    await user.click(screen.getByTestId('color-swatch'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes popup on click outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <button>Outside</button>
        <ColorPicker {...defaultProps} />
      </div>,
    );
    await user.click(screen.getByTestId('color-swatch'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByText('Outside'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onChange with valid hex when hex input changes', () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#000000" onChange={onChange} />);

    const input = screen.getByDisplayValue('000000');
    fireEvent.change(input, { target: { value: 'ff0000' } });
    expect(onChange).toHaveBeenCalledWith('#ff0000');
  });

  it('does not call onChange with invalid hex input', () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#000000" onChange={onChange} />);

    const input = screen.getByDisplayValue('000000');
    fireEvent.change(input, { target: { value: 'gggggg' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows error text when error prop provided', () => {
    render(<ColorPicker {...defaultProps} error="Invalid color" />);
    expect(screen.getByText('Invalid color')).toBeInTheDocument();
  });

  it('shows helper text when helperText prop provided', () => {
    render(<ColorPicker {...defaultProps} helperText="Pick a brand color" />);
    expect(screen.getByText('Pick a brand color')).toBeInTheDocument();
  });

  it('shows error text instead of helper text when both are provided', () => {
    render(
      <ColorPicker
        {...defaultProps}
        error="Invalid"
        helperText="Pick a brand color"
      />,
    );
    expect(screen.getByText('Invalid')).toBeInTheDocument();
    expect(screen.queryByText('Pick a brand color')).not.toBeInTheDocument();
  });

  it('disabled state prevents opening popup', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} disabled />);
    await user.click(screen.getByTestId('color-swatch'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('accessible: label linked to input', () => {
    render(<ColorPicker {...defaultProps} label="Theme Color" id="theme-color" />);
    const label = screen.getByText('Theme Color');
    const input = screen.getByDisplayValue('3b82f6');
    expect(label).toHaveAttribute('for', 'theme-color');
    expect(input).toHaveAttribute('id', 'theme-color');
  });

  it('sets the id attribute on the input element', () => {
    render(<ColorPicker {...defaultProps} id="my-color" />);
    expect(screen.getByDisplayValue('3b82f6')).toHaveAttribute('id', 'my-color');
  });

  it('renders swatch buttons when swatches prop provided', async () => {
    const user = userEvent.setup();
    render(
      <ColorPicker
        {...defaultProps}
        swatches={['#ef4444', '#22c55e', '#3b82f6']}
      />,
    );
    await user.click(screen.getByTestId('color-swatch'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('Select color #ef4444')).toBeInTheDocument();
    expect(screen.getByLabelText('Select color #22c55e')).toBeInTheDocument();
    expect(screen.getByLabelText('Select color #3b82f6')).toBeInTheDocument();
  });

  it('does not render swatches when prop not provided', async () => {
    const user = userEvent.setup();
    render(<ColorPicker {...defaultProps} />);
    await user.click(screen.getByTestId('color-swatch'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.queryByLabelText(/Select color/)).not.toBeInTheDocument();
  });

  it('clicking a swatch calls onChange with the swatch color', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ColorPicker
        value="#000000"
        onChange={onChange}
        swatches={['#ef4444', '#22c55e']}
      />,
    );
    await user.click(screen.getByTestId('color-swatch'));
    await user.click(screen.getByLabelText('Select color #ef4444'));
    expect(onChange).toHaveBeenCalledWith('#ef4444');
  });

  it('selected swatch has selected class', async () => {
    const user = userEvent.setup();
    render(
      <ColorPicker
        {...defaultProps}
        swatches={['#ef4444', '#3b82f6']}
      />,
    );
    await user.click(screen.getByTestId('color-swatch'));
    const selectedSwatch = screen.getByLabelText('Select color #3b82f6');
    expect(selectedSwatch.className).toContain('swatchSelected');
    const unselectedSwatch = screen.getByLabelText('Select color #ef4444');
    expect(unselectedSwatch.className).not.toContain('swatchSelected');
  });
});
