import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Plus, ChevronDown } from 'lucide-react';
import Button from './Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('defaults to type="button"', () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('accepts type="submit"', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('applies primary variant by default', () => {
    render(<Button>Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('primary');
  });

  it('applies secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('secondary');
  });

  it('applies ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('ghost');
  });

  it('defaults to md size', () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('md');
  });

  it('applies sm size', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('sm');
  });

  it('applies lg size', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('lg');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies aria-label when provided', () => {
    render(<Button aria-label="Close dialog">X</Button>);
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="custom">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom');
  });

  describe('icons', () => {
    it('renders startIcon before children', () => {
      render(<Button startIcon={Plus}>Add</Button>);
      const button = screen.getByRole('button', { name: 'Add' });
      expect(button.firstElementChild?.tagName).toBe('svg');
    });

    it('renders endIcon after children', () => {
      render(<Button endIcon={ChevronDown}>Actions</Button>);
      const button = screen.getByRole('button', { name: 'Actions' });
      expect(button.lastElementChild?.tagName).toBe('svg');
    });

    it('renders both startIcon and endIcon', () => {
      render(<Button startIcon={Plus} endIcon={ChevronDown}>Add</Button>);
      const button = screen.getByRole('button', { name: 'Add' });
      const svgs = button.querySelectorAll('svg');
      expect(svgs).toHaveLength(2);
      expect(button.firstElementChild?.tagName).toBe('svg');
      expect(button.lastElementChild?.tagName).toBe('svg');
    });

    it('renders without icons when neither prop is set', () => {
      render(<Button>No icons</Button>);
      const button = screen.getByRole('button', { name: 'No icons' });
      expect(button.querySelectorAll('svg')).toHaveLength(0);
    });

    it('marks icons as aria-hidden', () => {
      render(<Button startIcon={Plus} endIcon={ChevronDown}>Add</Button>);
      const button = screen.getByRole('button', { name: 'Add' });
      button.querySelectorAll('svg').forEach((svg) => {
        expect(svg).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });
});
