import { render, screen } from '@testing-library/react';
import Divider from './Divider';

describe('Divider', () => {
  it('renders without crashing', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('defaults to horizontal orientation (renders as hr)', () => {
    render(<Divider />);
    const el = screen.getByRole('separator');
    expect(el.tagName).toBe('HR');
  });

  it('renders a div with role="separator" when orientation is vertical', () => {
    render(<Divider orientation="vertical" />);
    const el = screen.getByRole('separator');
    expect(el.tagName).toBe('DIV');
  });

  it('applies sm size class', () => {
    render(<Divider size="sm" />);
    expect(screen.getByRole('separator')).toHaveClass('sm');
  });

  it('applies md size class by default', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toHaveClass('md');
  });

  it('applies lg size class', () => {
    render(<Divider size="lg" />);
    expect(screen.getByRole('separator')).toHaveClass('lg');
  });

  it('horizontal element has role="separator"', () => {
    render(<Divider orientation="horizontal" />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('vertical element has aria-orientation="vertical"', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('forwards className prop to root element', () => {
    render(<Divider className="custom-class" />);
    expect(screen.getByRole('separator')).toHaveClass('custom-class');
  });
});
