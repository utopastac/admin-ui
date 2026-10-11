import { render, screen } from '@testing-library/react';
import ProgressCircular from './ProgressCircular';

describe('ProgressCircular', () => {
  it('renders without crashing with required props', () => {
    render(<ProgressCircular value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('has role="progressbar"', () => {
    render(<ProgressCircular value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('sets aria-valuenow to the value prop', () => {
    render(<ProgressCircular value={42} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '42');
  });

  it('sets aria-valuemin=0', () => {
    render(<ProgressCircular value={50} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0');
  });

  it('sets aria-valuemax=100', () => {
    render(<ProgressCircular value={50} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100');
  });

  it('sets aria-label from label prop', () => {
    render(<ProgressCircular value={50} label="Loading data" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Loading data');
  });

  it('clamps values above 100 — passing 150 results in aria-valuenow=100', () => {
    render(<ProgressCircular value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('clamps negative values — passing -10 results in aria-valuenow=0', () => {
    render(<ProgressCircular value={-10} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('renders percentage text when showValue=true', () => {
    render(<ProgressCircular value={65} showValue />);
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('does not render percentage text when showValue is false (default)', () => {
    render(<ProgressCircular value={65} />);
    expect(screen.queryByText('65%')).not.toBeInTheDocument();
  });

  it('applies sm class to root element when size="sm"', () => {
    const { container } = render(<ProgressCircular value={50} size="sm" />);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('sm');
  });

  it('applies lg class to root element when size="lg"', () => {
    const { container } = render(<ProgressCircular value={50} size="lg" />);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('lg');
  });

  it('applies success class to progress circle when variant="success"', () => {
    const { container } = render(<ProgressCircular value={50} variant="success" />);
    const circles = container.querySelectorAll('circle');
    const progressCircle = circles[1] as unknown as HTMLElement;
    expect(progressCircle).toHaveClass('success');
  });

  it('applies error class to progress circle when variant="error"', () => {
    const { container } = render(<ProgressCircular value={50} variant="error" />);
    const circles = container.querySelectorAll('circle');
    const progressCircle = circles[1] as unknown as HTMLElement;
    expect(progressCircle).toHaveClass('error');
  });
});
