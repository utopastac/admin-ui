import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AlertCircle } from 'lucide-react';
import Banner from './Banner';

describe('Banner', () => {
  it('renders with role="alert"', () => {
    render(<Banner variant="info" message="Hello" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders the message text', () => {
    render(<Banner variant="info" message="Something happened" />);
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('renders a title when provided', () => {
    render(<Banner variant="info" message="Details" title="Heads up" />);
    expect(screen.getByText('Heads up')).toBeInTheDocument();
  });

  it('does not render a title when not provided', () => {
    render(<Banner variant="info" message="Details" />);
    expect(screen.queryByText('strong')).not.toBeInTheDocument();
  });

  it('applies variant class', () => {
    render(<Banner variant="error" message="Error occurred" />);
    expect(screen.getByRole('alert')).toHaveClass('error');
  });

  it('applies layout class defaulting to inline', () => {
    render(<Banner variant="info" message="Test" />);
    expect(screen.getByRole('alert')).toHaveClass('inline');
  });

  it('applies full layout class', () => {
    render(<Banner variant="info" message="Test" layout="full" />);
    expect(screen.getByRole('alert')).toHaveClass('full');
  });

  it('renders an icon when provided', () => {
    render(<Banner variant="warning" message="Watch out" icon={AlertCircle} />);
    // The icon renders an SVG inside a span
    const alert = screen.getByRole('alert');
    expect(alert.querySelector('svg')).toBeInTheDocument();
  });

  it('does not show a dismiss button by default', () => {
    render(<Banner variant="info" message="Test" />);
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
  });

  it('shows a dismiss button when dismissible', () => {
    render(<Banner variant="info" message="Test" dismissible />);
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('hides the banner and calls onDismiss when dismissed', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Banner variant="info" message="Test" dismissible onDismiss={onDismiss} />);

    await user.click(screen.getByRole('button', { name: 'Dismiss' }));

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('hides the banner on dismiss even without onDismiss callback', async () => {
    const user = userEvent.setup();
    render(<Banner variant="info" message="Goodbye" dismissible />);

    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Banner variant="info" message="Test" className="custom" />);
    expect(screen.getByRole('alert')).toHaveClass('custom');
  });
});
