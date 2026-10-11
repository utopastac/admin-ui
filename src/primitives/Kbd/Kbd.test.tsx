import { render, screen } from '@testing-library/react';
import Kbd from './Kbd';

describe('Kbd', () => {
  it('renders a kbd element', () => {
    render(<Kbd>Enter</Kbd>);
    const el = screen.getByText('Enter');
    expect(el.tagName).toBe('KBD');
  });

  it('renders text content', () => {
    render(<Kbd>Ctrl</Kbd>);
    expect(screen.getByText('Ctrl')).toBeInTheDocument();
  });

  it('accepts an extra className', () => {
    render(<Kbd className="custom-key">Shift</Kbd>);
    const el = screen.getByText('Shift');
    expect(el.className).toContain('custom-key');
  });

  it('passes through aria-label', () => {
    render(<Kbd aria-label="escape key">Esc</Kbd>);
    expect(screen.getByLabelText('escape key')).toBeInTheDocument();
  });

  it('passes through arbitrary HTML attributes', () => {
    render(<Kbd data-testid="kbd-element">Tab</Kbd>);
    expect(screen.getByTestId('kbd-element')).toBeInTheDocument();
  });

  it('renders complex children (nested elements)', () => {
    render(
      <Kbd>
        <span>⌘</span>K
      </Kbd>,
    );
    expect(screen.getByText('⌘')).toBeInTheDocument();
    expect(screen.getByText('K', { exact: false })).toBeInTheDocument();
  });

  it('renders without extra className when className is not provided', () => {
    render(<Kbd>Space</Kbd>);
    const el = screen.getByText('Space');
    // Should still have its module class, just not an undefined/null literal
    expect(el.className).not.toContain('undefined');
    expect(el.className).not.toContain('null');
  });
});
