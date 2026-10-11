import { render, screen } from '@testing-library/react';
import Blockquote from './Blockquote';

describe('Blockquote', () => {
  it('renders a blockquote element', () => {
    const { container } = render(<Blockquote>Quote text</Blockquote>);
    expect(container.querySelector('blockquote')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<Blockquote>To be or not to be</Blockquote>);
    expect(screen.getByText('To be or not to be')).toBeInTheDocument();
  });

  it('renders a citation when cite is provided', () => {
    render(<Blockquote cite="Shakespeare">To be or not to be</Blockquote>);
    const footer = screen.getByText(/Shakespeare/);
    expect(footer).toBeInTheDocument();
    expect(footer.tagName).toBe('FOOTER');
  });

  it('does not render a footer when cite is not provided', () => {
    const { container } = render(<Blockquote>Quote</Blockquote>);
    expect(container.querySelector('footer')).not.toBeInTheDocument();
  });

  it('renders React node children', () => {
    render(<Blockquote><em>Emphasis</em></Blockquote>);
    expect(screen.getByText('Emphasis').tagName).toBe('EM');
  });

  it('applies custom className', () => {
    const { container } = render(<Blockquote className="custom">Test</Blockquote>);
    expect(container.querySelector('blockquote')).toHaveClass('custom');
  });
});
