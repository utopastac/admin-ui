import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Bold, Italic } from 'lucide-react';
import ToolbarButton from './ToolbarButton';

describe('ToolbarButton', () => {
  it('renders a button element', () => {
    render(<ToolbarButton icon={Bold} aria-label="Bold" />);
    expect(screen.getByRole('button', { name: 'Bold' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<ToolbarButton icon={Bold} onClick={onClick} aria-label="Bold" />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('sets aria-label on the button', () => {
    render(<ToolbarButton icon={Bold} aria-label="Toggle bold" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Toggle bold');
  });

  it('sets the title attribute', () => {
    render(<ToolbarButton icon={Bold} title="Bold text" aria-label="Bold" />);
    expect(screen.getByRole('button')).toHaveAttribute('title', 'Bold text');
  });

  it('does not set aria-pressed when pressed prop is undefined', () => {
    render(<ToolbarButton icon={Bold} aria-label="Bold" />);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-pressed');
  });

  it('sets aria-pressed="true" when pressed is true', () => {
    render(<ToolbarButton icon={Bold} pressed={true} aria-label="Bold" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('sets aria-pressed="false" when pressed is false', () => {
    render(<ToolbarButton icon={Bold} pressed={false} aria-label="Bold" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('applies the pressed class when pressed is true', () => {
    render(<ToolbarButton icon={Bold} pressed={true} aria-label="Bold" />);
    expect(screen.getByRole('button').className).toContain('pressed');
  });

  it('does not apply the pressed class when pressed is false', () => {
    render(<ToolbarButton icon={Bold} pressed={false} aria-label="Bold" />);
    expect(screen.getByRole('button').className).not.toContain('pressed');
  });

  it('defaults to md size', () => {
    render(<ToolbarButton icon={Bold} aria-label="Bold" />);
    expect(screen.getByRole('button').className).toContain('md');
  });

  it('applies sm size class', () => {
    render(<ToolbarButton icon={Bold} aria-label="Bold" size="sm" />);
    expect(screen.getByRole('button').className).toContain('sm');
  });

  it('applies additional className', () => {
    render(<ToolbarButton icon={Bold} aria-label="Bold" className="extra" />);
    expect(screen.getByRole('button').className).toContain('extra');
  });

  it('renders with different icons', () => {
    const { rerender } = render(<ToolbarButton icon={Bold} aria-label="Bold" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    rerender(<ToolbarButton icon={Italic} aria-label="Italic" />);
    expect(screen.getByRole('button', { name: 'Italic' })).toBeInTheDocument();
  });

  it('has type="button" to prevent form submission', () => {
    render(<ToolbarButton icon={Bold} aria-label="Bold" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('forwards data-* attributes onto the underlying button', () => {
    render(
      <ToolbarButton
        icon={Bold}
        aria-label="Bold"
        data-role="reset"
        data-testid="reset-theme"
      />,
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('data-role', 'reset');
    expect(btn).toHaveAttribute('data-testid', 'reset-theme');
  });
});
