import { render, screen } from '@testing-library/react';
import EmptyState from './EmptyState';

describe('EmptyState', () => {
  it('renders the title', () => {
    render(<EmptyState title="No results" />);
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('renders illustration when provided', () => {
    render(<EmptyState title="No results" illustration={<span data-testid="icon" />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('does not render illustration container when omitted', () => {
    const { container } = render(<EmptyState title="No results" />);
    expect(container.querySelector('[class*="illustration"]')).toBeNull();
  });

  it('renders description when provided', () => {
    render(<EmptyState title="No results" description="Try adjusting your filters." />);
    expect(screen.getByText('Try adjusting your filters.')).toBeInTheDocument();
  });

  it('does not render description when omitted', () => {
    render(<EmptyState title="No results" />);
    expect(screen.queryByText(/filters/)).not.toBeInTheDocument();
  });

  it('renders children', () => {
    render(<EmptyState title="No results"><button>Clear filters</button></EmptyState>);
    expect(screen.getByRole('button', { name: 'Clear filters' })).toBeInTheDocument();
  });
});
