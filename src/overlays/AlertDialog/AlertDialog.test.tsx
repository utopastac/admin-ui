import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AlertDialog from './AlertDialog';

const defaultProps = {
  isOpen: true,
  onConfirm: vi.fn(),
  onCancel: vi.fn(),
  title: 'Delete item?',
  description: 'This action cannot be undone.',
};

describe('AlertDialog', () => {
  it('renders nothing when isOpen is false', () => {
    render(<AlertDialog {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('renders the dialog when isOpen is true', () => {
    render(<AlertDialog {...defaultProps} />);
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('displays the title and description', () => {
    render(<AlertDialog {...defaultProps} />);
    expect(screen.getByText('Delete item?')).toBeInTheDocument();
    expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();
  });

  it('renders default button labels', () => {
    render(<AlertDialog {...defaultProps} />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('renders custom button labels', () => {
    render(
      <AlertDialog
        {...defaultProps}
        confirmLabel="Yes, delete"
        cancelLabel="No, keep"
      />,
    );
    expect(screen.getByText('Yes, delete')).toBeInTheDocument();
    expect(screen.getByText('No, keep')).toBeInTheDocument();
  });

  it('calls onConfirm when the confirm button is clicked', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<AlertDialog {...defaultProps} onConfirm={onConfirm} />);

    await user.click(screen.getByText('Continue'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when the cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(<AlertDialog {...defaultProps} onCancel={onCancel} />);

    await user.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when the backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(<AlertDialog {...defaultProps} onCancel={onCancel} />);

    // The backdrop is the outer div wrapping the dialog
    const backdrop = screen.getByRole('alertdialog').parentElement!;
    await user.click(backdrop);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('does not call onCancel when clicking inside the dialog', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(<AlertDialog {...defaultProps} onCancel={onCancel} />);

    await user.click(screen.getByText('Delete item?'));
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('has correct aria attributes', () => {
    render(<AlertDialog {...defaultProps} />);
    const dialog = screen.getByRole('alertdialog');

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'alert-dialog-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'alert-dialog-description');
  });

  it('applies the destructive variant class to the confirm button', () => {
    render(<AlertDialog {...defaultProps} variant="destructive" />);
    const confirmButton = screen.getByText('Continue');
    expect(confirmButton.className).toContain('destructive');
  });

  it('applies the default variant class to the confirm button', () => {
    render(<AlertDialog {...defaultProps} variant="default" />);
    const confirmButton = screen.getByText('Continue');
    expect(confirmButton.className).toContain('default');
  });
});
