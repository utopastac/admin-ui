import { render, screen } from '@testing-library/react';
import CardGrid from './CardGrid';

describe('CardGrid', () => {
  it('renders children', () => {
    render(
      <CardGrid>
        <div>Card A</div>
        <div>Card B</div>
      </CardGrid>,
    );
    expect(screen.getByText('Card A')).toBeInTheDocument();
    expect(screen.getByText('Card B')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(<CardGrid className="custom" />);
    expect(container.firstElementChild).toHaveClass('custom');
  });

  it('sets the gap CSS custom property', () => {
    const { container } = render(<CardGrid gap="l" />);
    expect((container.firstElementChild as HTMLElement).style.getPropertyValue('--card-grid-gap')).toBe(
      'var(--admin-space-l)',
    );
  });

  it('passes through HTML attributes', () => {
    render(<CardGrid data-testid="grid" />);
    expect(screen.getByTestId('grid')).toBeInTheDocument();
  });
});
