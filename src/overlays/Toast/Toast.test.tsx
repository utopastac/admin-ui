import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toast, { ToastStack } from './Toast';

describe('Toast', () => {
  it('renders the message text', () => {
    render(<Toast id="1" message="Something happened" />);
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('renders with default info variant', () => {
    render(<Toast id="1" message="Info toast" />);
    expect(screen.getByRole('status')).toHaveClass('info');
  });

  it('applies correct class for success variant', () => {
    render(<Toast id="1" message="Success" variant="success" />);
    expect(screen.getByRole('status')).toHaveClass('success');
  });

  it('applies correct class for warning variant', () => {
    render(<Toast id="1" message="Warning" variant="warning" />);
    expect(screen.getByRole('alert')).toHaveClass('warning');
  });

  it('applies correct class for error variant', () => {
    render(<Toast id="1" message="Error" variant="error" />);
    expect(screen.getByRole('alert')).toHaveClass('error');
  });

  it('calls onDismiss with the correct id when dismiss button clicked', async () => {
    const user = userEvent.setup();
    const handleDismiss = vi.fn();
    render(<Toast id="toast-42" message="Dismiss me" onDismiss={handleDismiss} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    await waitFor(() => expect(handleDismiss).toHaveBeenCalledTimes(1), { timeout: 500 });
    expect(handleDismiss).toHaveBeenCalledWith('toast-42');
  });

  it('renders without onDismiss without error', () => {
    render(<Toast id="1" message="No dismiss" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('has role="status" for non-urgent variants (info/success)', () => {
    render(<Toast id="1" message="Accessible toast" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has role="alert" for urgent variants (error/warning)', () => {
    render(<Toast id="1" message="Error toast" variant="error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});

describe('ToastStack', () => {
  it('renders multiple toasts', () => {
    const toasts = [
      { id: '1', message: 'First toast' },
      { id: '2', message: 'Second toast' },
      { id: '3', message: 'Third toast' },
    ];
    render(<ToastStack toasts={toasts} />);
    expect(screen.getByText('First toast')).toBeInTheDocument();
    expect(screen.getByText('Second toast')).toBeInTheDocument();
    expect(screen.getByText('Third toast')).toBeInTheDocument();
    expect(screen.getAllByRole('status')).toHaveLength(3);
  });

  it('applies bottom-right position class by default', () => {
    const { container } = render(<ToastStack toasts={[]} />);
    expect(container.firstChild).toHaveClass('bottomRight');
  });

  it('applies bottom-left position class', () => {
    const { container } = render(<ToastStack toasts={[]} position="bottom-left" />);
    expect(container.firstChild).toHaveClass('bottomLeft');
  });

  it('applies top-right position class', () => {
    const { container } = render(<ToastStack toasts={[]} position="top-right" />);
    expect(container.firstChild).toHaveClass('topRight');
  });

  it('applies top-left position class', () => {
    const { container } = render(<ToastStack toasts={[]} position="top-left" />);
    expect(container.firstChild).toHaveClass('topLeft');
  });
});
