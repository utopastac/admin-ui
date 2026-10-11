import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PageFooter from './PageFooter';

describe('PageFooter', () => {
  it('renders children', () => {
    render(<PageFooter><button>Save</button></PageFooter>);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('renders as a footer element', () => {
    render(<PageFooter>Content</PageFooter>);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('applies right alignment by default', () => {
    const { container } = render(<PageFooter>Content</PageFooter>);
    const footer = container.querySelector('footer')!;
    expect(footer.className).toContain('alignRight');
  });

  it('applies left alignment', () => {
    const { container } = render(<PageFooter align="left">Content</PageFooter>);
    const footer = container.querySelector('footer')!;
    expect(footer.className).toContain('alignLeft');
  });

  it('applies center alignment', () => {
    const { container } = render(<PageFooter align="center">Content</PageFooter>);
    const footer = container.querySelector('footer')!;
    expect(footer.className).toContain('alignCenter');
  });

  it('applies border class by default', () => {
    const { container } = render(<PageFooter>Content</PageFooter>);
    const footer = container.querySelector('footer')!;
    expect(footer.className).toContain('border');
  });

  it('does not apply border class when border is false', () => {
    const { container } = render(<PageFooter border={false}>Content</PageFooter>);
    const footer = container.querySelector('footer')!;
    // Should have 'footer' class but not a standalone 'border' class
    // Using a regex to check for the word 'border' as its own class segment
    expect(footer.className).not.toMatch(/\bborder\b/);
  });

  it('applies custom className', () => {
    const { container } = render(<PageFooter className="my-footer">Content</PageFooter>);
    const footer = container.querySelector('footer')!;
    expect(footer).toHaveClass('my-footer');
  });

  it('renders multiple children', () => {
    render(
      <PageFooter>
        <button>Cancel</button>
        <button>Save</button>
      </PageFooter>,
    );
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});
