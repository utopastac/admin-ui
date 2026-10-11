import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SidePanel from './SidePanel';

vi.mock('@/primitives/ToolbarButton/ToolbarButton', () => ({
  default: ({ onClick, 'aria-label': ariaLabel, title }: any) => (
    <button onClick={onClick} aria-label={ariaLabel} title={title}>
      {ariaLabel}
    </button>
  ),
}));

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  children: <p>Panel content</p>,
};

describe('SidePanel', () => {
  it('renders nothing when isOpen is false', () => {
    render(<SidePanel {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Panel content')).not.toBeInTheDocument();
  });

  it('renders children when isOpen is true', () => {
    render(<SidePanel {...defaultProps} />);
    expect(screen.getByText('Panel content')).toBeInTheDocument();
  });

  it('renders the title when provided', () => {
    render(<SidePanel {...defaultProps} title="Details" />);
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Details').tagName).toBe('H2');
  });

  it('renders without a title', () => {
    render(<SidePanel {...defaultProps} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders a close button', () => {
    render(<SidePanel {...defaultProps} />);
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<SidePanel {...defaultProps} onClose={onClose} />);

    await user.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<SidePanel {...defaultProps} onClose={onClose} title="Test" />);

    const backdrop = screen.getByText('Panel content').closest('[class]')!.parentElement!.parentElement!;
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside the panel', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<SidePanel {...defaultProps} onClose={onClose} />);

    await user.click(screen.getByText('Panel content'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders footer content when provided', () => {
    render(
      <SidePanel {...defaultProps} footer={<button>Apply</button>} />,
    );
    expect(screen.getByText('Apply')).toBeInTheDocument();
  });

  it('does not render footer when not provided', () => {
    const { container } = render(<SidePanel {...defaultProps} />);
    const footerElements = container.querySelectorAll('[class*="footer"]');
    expect(footerElements).toHaveLength(0);
  });

  it('applies width sm class', () => {
    const { container } = render(<SidePanel {...defaultProps} width="sm" />);
    const panel = container.querySelector('[class*="panel"]');
    expect(panel?.className).toContain('sm');
  });

  it('applies width lg class', () => {
    const { container } = render(<SidePanel {...defaultProps} width="lg" />);
    const panel = container.querySelector('[class*="panel"]');
    expect(panel?.className).toContain('lg');
  });

  it('defaults to md width', () => {
    const { container } = render(<SidePanel {...defaultProps} />);
    const panel = container.querySelector('[class*="panel"]');
    expect(panel?.className).toContain('md');
  });

  describe('push mode', () => {
    it('renders panel content in push mode', () => {
      render(<SidePanel {...defaultProps} mode="push" />);
      expect(screen.getByText('Panel content')).toBeInTheDocument();
    });

    it('does not render a backdrop in push mode', () => {
      const { container } = render(<SidePanel {...defaultProps} mode="push" />);
      const backdrop = container.querySelector('[class*="backdrop"]');
      expect(backdrop).not.toBeInTheDocument();
    });

    it('renders nothing when isOpen is false in push mode', () => {
      render(<SidePanel {...defaultProps} isOpen={false} mode="push" />);
      expect(screen.queryByText('Panel content')).not.toBeInTheDocument();
    });
  });

  describe('overlay mode (smoke test)', () => {
    it('renders panel content in overlay mode', () => {
      render(<SidePanel {...defaultProps} mode="overlay" />);
      expect(screen.getByText('Panel content')).toBeInTheDocument();
    });
  });
});
