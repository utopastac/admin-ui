import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

// ToolbarButton uses a lucide icon, so we mock it to simplify testing
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
  children: <p>Modal content</p>,
};

describe('Modal', () => {
  it('renders nothing when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('renders children when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('renders the title when provided', () => {
    render(<Modal {...defaultProps} title="Edit Record" />);
    expect(screen.getByText('Edit Record')).toBeInTheDocument();
    expect(screen.getByText('Edit Record').tagName).toBe('H2');
  });

  it('renders without a title', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders a close button', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);

    await user.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} title="Test" />);

    // The backdrop is the outer div; click it directly
    const backdrop = screen.getByText('Modal content').closest('[class]')!.parentElement!.parentElement!;
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside the modal', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);

    await user.click(screen.getByText('Modal content'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders footer content when provided', () => {
    render(
      <Modal {...defaultProps} footer={<button>Save</button>} />,
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('does not render footer when not provided', () => {
    const { container } = render(<Modal {...defaultProps} />);
    // The footer div should not exist
    const footerElements = container.querySelectorAll('[class*="footer"]');
    expect(footerElements).toHaveLength(0);
  });

  it('applies maxWidth sm class', () => {
    const { container } = render(<Modal {...defaultProps} maxWidth="sm" />);
    const modal = container.querySelector('[class*="modal"]');
    expect(modal?.className).toContain('sm');
  });

  it('applies maxWidth lg class', () => {
    const { container } = render(<Modal {...defaultProps} maxWidth="lg" />);
    const modal = container.querySelector('[class*="modal"]');
    expect(modal?.className).toContain('lg');
  });

  it('defaults to md maxWidth', () => {
    const { container } = render(<Modal {...defaultProps} />);
    const modal = container.querySelector('[class*="modal"]');
    expect(modal?.className).toContain('md');
  });
});
