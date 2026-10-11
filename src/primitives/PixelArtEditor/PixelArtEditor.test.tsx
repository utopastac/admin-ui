import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PixelArtEditor from './PixelArtEditor';

// ── Mocks ──────────────────────────────────────────────────────────────────────

// ToolbarButton renders real icon components which aren't needed for behaviour
// tests. Replace with a plain button that exposes aria-label and title.
vi.mock('../ToolbarButton/ToolbarButton', () => ({
  default: ({ onClick, 'aria-label': ariaLabel, title, disabled }: any) => (
    <button onClick={onClick} aria-label={ariaLabel} title={title} disabled={disabled}>
      {ariaLabel}
    </button>
  ),
}));

// ColorPicker is not exercised here — stub it out.
vi.mock('../ColorPicker/ColorPicker', () => ({
  default: ({ value, onChange }: any) => (
    <input
      data-testid="color-picker"
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

// Popover: render children only when isOpen is true (mirrors real behaviour for
// the inline colour-picker popover), and render a sentinel for the pixel-art
// editor popover in popover mode.
vi.mock('../Popover/Popover', () => ({
  default: ({ isOpen, children, 'aria-label': ariaLabel }: any) =>
    isOpen ? (
      <div data-testid="popover" aria-label={ariaLabel}>
        {children}
      </div>
    ) : null,
}));

// ── Helpers ────────────────────────────────────────────────────────────────────

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 4" width="4" height="4">
  <rect x="0" y="0" width="1" height="1" fill="#ff0000"/>
  <rect x="1" y="1" width="1" height="1" fill="#0000ff"/>
</svg>`;

const PALETTE = ['#000000', '#ffffff', '#ff0000', '#00ff00'];

// ── Tests ──────────────────────────────────────────────────────────────────────

describe('PixelArtEditor', () => {
  // 1. Renders without crashing — inline mode
  it('renders without crashing in inline mode', () => {
    const { container } = render(<PixelArtEditor width={8} height={8} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  // 2. Renders without crashing — popover mode
  it('renders without crashing in popover mode', () => {
    const { container } = render(<PixelArtEditor width={8} height={8} popover />);
    expect(container.firstChild).toBeInTheDocument();
  });

  // 3. Popover trigger button is visible in popover mode
  it('shows the popover trigger button in popover mode', () => {
    render(<PixelArtEditor width={8} height={8} popover />);
    expect(screen.getByRole('button', { name: /open pixel art editor/i })).toBeInTheDocument();
  });

  // 4. Clicking the trigger opens the editor popover
  it('opens the editor when the trigger is clicked in popover mode', async () => {
    const user = userEvent.setup();
    render(<PixelArtEditor width={8} height={8} popover />);

    expect(screen.queryByTestId('popover')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /open pixel art editor/i }));
    expect(screen.getByTestId('popover')).toBeInTheDocument();
  });

  // 5. Tool buttons are rendered in the toolbar
  it('renders all tool buttons', () => {
    render(<PixelArtEditor width={8} height={8} />);
    expect(screen.getByRole('button', { name: /paint/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /eraser/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /fill/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /eyedropper/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^line$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^shapes$/i })).toBeInTheDocument();
  });

  // 6. Palette swatches render when `palette` prop is provided
  it('renders palette swatches for each colour in the palette prop', () => {
    render(<PixelArtEditor width={8} height={8} palette={PALETTE} />);
    for (const color of PALETTE) {
      expect(screen.getByLabelText(`Select color ${color}`)).toBeInTheDocument();
    }
  });

  // 7. Custom colour swatch button exists
  it('renders the custom colour swatch button', () => {
    render(<PixelArtEditor width={8} height={8} />);
    expect(screen.getByRole('button', { name: /custom color/i })).toBeInTheDocument();
  });

  // 8. onChange is called when a cell is painted (mousedown on the canvas)
  it('calls onChange when the canvas receives a mousedown event', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <PixelArtEditor width={4} height={4} onChange={handleChange} />,
    );

    // The committed canvas is the first canvas element (the interactive one).
    const canvas = container.querySelector('canvas')!;
    fireEvent.mouseDown(canvas, { clientX: 5, clientY: 5, button: 0 });

    expect(handleChange).toHaveBeenCalledTimes(1);
    // The output should be an SVG string
    const svg: string = handleChange.mock.calls[0][0];
    expect(svg).toContain('<svg');
    expect(svg).toContain('viewBox="0 0 4 4"');
  });

  // 9. onChange is NOT called when disabled and canvas receives mousedown
  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <PixelArtEditor width={4} height={4} onChange={handleChange} disabled />,
    );
    const canvas = container.querySelector('canvas')!;
    fireEvent.mouseDown(canvas, { clientX: 5, clientY: 5, button: 0 });
    expect(handleChange).not.toHaveBeenCalled();
  });

  // 10. Parses initial SVG value without crashing
  it('renders without crashing when given an initial SVG value', () => {
    const { container } = render(
      <PixelArtEditor width={4} height={4} value={SAMPLE_SVG} />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  // 11. Disabled trigger button in popover mode
  it('disables the trigger button when disabled in popover mode', () => {
    render(<PixelArtEditor width={8} height={8} popover disabled />);
    const trigger = screen.getByRole('button', { name: /open pixel art editor/i });
    expect(trigger).toBeDisabled();
  });

  // 12. Clicking a palette swatch activates that colour and next paint uses it.
  it('switches active colour when a palette swatch is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const { container } = render(
      <PixelArtEditor
        width={4}
        height={4}
        palette={PALETTE}
        onChange={handleChange}
      />,
    );

    // Click the green swatch to switch colour, then paint
    await user.click(screen.getByLabelText('Select color #00ff00'));
    const canvas = container.querySelector('canvas')!;
    fireEvent.mouseDown(canvas, { clientX: 2, clientY: 2, button: 0 });

    expect(handleChange).toHaveBeenCalled();
    const svg: string = handleChange.mock.calls[0][0];
    expect(svg).toContain('#00ff00');
  });

  // 13. SVG output from onChange is well-formed
  it('produces well-formed SVG strings from onChange', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <PixelArtEditor width={8} height={8} onChange={handleChange} />,
    );
    const canvas = container.querySelector('canvas')!;
    fireEvent.mouseDown(canvas, { clientX: 10, clientY: 10, button: 0 });

    const svg: string = handleChange.mock.calls[0]?.[0] ?? '';
    expect(svg).toMatch(/^<svg /);
    expect(svg).toContain('</svg>');
    expect(svg).toContain('width="8"');
    expect(svg).toContain('height="8"');
  });

  // 14. Clicking the custom colour button opens the colour picker popover
  it('opens the colour picker popover when the custom colour button is clicked', async () => {
    const user = userEvent.setup();
    render(<PixelArtEditor width={8} height={8} />);

    expect(screen.queryByLabelText(/color picker/i)).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /custom color/i }));
    expect(screen.getByLabelText(/color picker/i)).toBeInTheDocument();
  });

  // 15. Toolbar contains canvas container in inline mode
  it('renders both toolbar and canvas container in inline mode', () => {
    const { container } = render(<PixelArtEditor width={8} height={8} />);
    expect(screen.getByRole('toolbar', { name: /pixel art tools/i })).toBeInTheDocument();
    // Two canvases: committed + preview
    expect(container.querySelectorAll('canvas').length).toBeGreaterThanOrEqual(2);
  });

  // 16. Undo and redo buttons are rendered and initially disabled
  it('renders undo and redo buttons, both initially disabled', () => {
    render(<PixelArtEditor width={4} height={4} />);
    expect(screen.getByRole('button', { name: /^undo$/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /^redo$/i })).toBeDisabled();
  });

  // 17. Undo restores canvas after a paint
  it('undo restores canvas after a paint action', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <PixelArtEditor width={4} height={4} onChange={handleChange} />
    );
    const canvas = container.querySelector('canvas')!;

    fireEvent.mouseDown(canvas, { clientX: 5, clientY: 5, button: 0 });
    expect(handleChange).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /^undo$/i }));
    expect(handleChange).toHaveBeenCalledTimes(2);

    const svgAfterUndo: string = handleChange.mock.calls[1][0];
    expect(svgAfterUndo).not.toContain('<rect');
  });

  // 18. Undo enables redo
  it('redo button is enabled after an undo', () => {
    const { container } = render(<PixelArtEditor width={4} height={4} onChange={vi.fn()} />);
    const canvas = container.querySelector('canvas')!;
    fireEvent.mouseDown(canvas, { clientX: 5, clientY: 5, button: 0 });

    expect(screen.getByRole('button', { name: /^redo$/i })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /^undo$/i }));
    expect(screen.getByRole('button', { name: /^redo$/i })).not.toBeDisabled();
  });

  // 19. Short press on shapes button activates last shape without opening popover
  it('short press on shapes button activates last shape without opening popover', () => {
    render(<PixelArtEditor width={8} height={8} />);

    // Switch away from shape tool first
    fireEvent.click(screen.getByRole('button', { name: /^fill$/i }));

    // Short press on shapes
    const shapesBtn = screen.getByRole('button', { name: /^shapes$/i });
    fireEvent.mouseDown(shapesBtn.parentElement!);
    fireEvent.mouseUp(shapesBtn.parentElement!);

    // Popover should NOT be open
    expect(screen.queryByLabelText(/shape picker/i)).not.toBeInTheDocument();
  });

  // 20. Long press on shapes button opens the shape picker popover
  it('long press on shapes button opens the shape picker popover', () => {
    vi.useFakeTimers();
    render(<PixelArtEditor width={8} height={8} />);

    const shapesBtn = screen.getByRole('button', { name: /^shapes$/i });

    expect(screen.queryByLabelText(/shape picker/i)).not.toBeInTheDocument();

    fireEvent.mouseDown(shapesBtn.parentElement!);
    act(() => { vi.advanceTimersByTime(400); });

    expect(screen.getByLabelText(/shape picker/i)).toBeInTheDocument();

    vi.useRealTimers();
  });
});
