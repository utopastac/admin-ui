import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  it('renders without crashing with value=50', () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('has role="progressbar"', () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('sets aria-valuenow to the value prop', () => {
    render(<ProgressBar value={42} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '42');
  });

  it('sets aria-valuemin=0', () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0');
  });

  it('sets aria-valuemax=100', () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100');
  });

  it('sets aria-label from label prop', () => {
    render(<ProgressBar value={50} label="Loading progress" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Loading progress');
  });

  it('sets fill width style correctly for value=75', () => {
    const { container } = render(<ProgressBar value={75} />);
    const fill = container.querySelector('[class*="fill"]') as HTMLElement;
    expect(fill.style.width).toBe('75%');
  });

  it('clamps negative values to 0%', () => {
    const { container } = render(<ProgressBar value={-10} />);
    const fill = container.querySelector('[class*="fill"]') as HTMLElement;
    expect(fill.style.width).toBe('0%');
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('clamps values above 100 to 100%', () => {
    const { container } = render(<ProgressBar value={110} />);
    const fill = container.querySelector('[class*="fill"]') as HTMLElement;
    expect(fill.style.width).toBe('100%');
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('applies success class to fill when variant="success"', () => {
    const { container } = render(<ProgressBar value={50} variant="success" />);
    const fill = container.querySelector('[class*="fill"]') as HTMLElement;
    expect(fill.className).toMatch(/success/);
  });

  it('applies sm class to root when size="sm"', () => {
    const { container } = render(<ProgressBar value={50} size="sm" />);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/sm/);
  });

  it('renders percentage text when showValue=true', () => {
    render(<ProgressBar value={65} showValue />);
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('does not render percentage text when showValue is false', () => {
    render(<ProgressBar value={65} />);
    expect(screen.queryByText('65%')).not.toBeInTheDocument();
  });
});
