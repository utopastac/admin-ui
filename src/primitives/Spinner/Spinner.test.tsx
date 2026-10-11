import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('renders without crashing', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has role="status"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('aria-label defaults to "Loading"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('aria-label reflects the label prop', () => {
    render(<Spinner label="Saving changes" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Saving changes');
  });

  it('applies sm class on root when size="sm"', () => {
    render(<Spinner size="sm" />);
    expect(screen.getByRole('status')).toHaveClass('sm');
  });

  it('applies md class by default', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveClass('md');
  });

  it('applies lg class on root when size="lg"', () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('lg');
  });

  it('applies inverted class when variant="inverted"', () => {
    render(<Spinner variant="inverted" />);
    expect(screen.getByRole('status')).toHaveClass('inverted');
  });

  it('SVG has aria-hidden="true"', () => {
    render(<Spinner />);
    const svg = screen.getByRole('status').querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('forwards className prop to root', () => {
    render(<Spinner className="custom-spinner" />);
    expect(screen.getByRole('status')).toHaveClass('custom-spinner');
  });

  it('renders a visually-hidden text element with the label for screen readers', () => {
    render(<Spinner label="Saving" />);
    // The sr-only span should be present in the DOM even if visually hidden
    const status = screen.getByRole('status');
    expect(status.querySelector('span')).toHaveTextContent('Saving');
  });

  it('visually-hidden text defaults to "Loading"', () => {
    render(<Spinner />);
    const status = screen.getByRole('status');
    expect(status.querySelector('span')).toHaveTextContent('Loading');
  });
});
