import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge', () => {
  it('renders children text', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders as a span element', () => {
    const { container } = render(<Badge>Test</Badge>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('applies default variant class', () => {
    const { container } = render(<Badge>Default</Badge>);
    expect(container.firstChild).toHaveClass('default');
  });

  it('applies success variant class', () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    expect(container.firstChild).toHaveClass('success');
  });

  it('applies warning variant class', () => {
    const { container } = render(<Badge variant="warning">Warning</Badge>);
    expect(container.firstChild).toHaveClass('warning');
  });

  it('applies info variant class', () => {
    const { container } = render(<Badge variant="info">Info</Badge>);
    expect(container.firstChild).toHaveClass('info');
  });

  it('defaults to md size', () => {
    const { container } = render(<Badge>Test</Badge>);
    expect(container.firstChild).toHaveClass('md');
  });

  it('applies sm size class', () => {
    const { container } = render(<Badge size="sm">Small</Badge>);
    expect(container.firstChild).toHaveClass('sm');
  });

  it('applies custom className', () => {
    const { container } = render(<Badge className="custom">Test</Badge>);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('renders React node children', () => {
    render(<Badge><strong>Bold</strong></Badge>);
    expect(screen.getByText('Bold').tagName).toBe('STRONG');
  });
});
