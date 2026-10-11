import { render, screen, fireEvent } from '@testing-library/react';
import Avatar from './Avatar';

describe('Avatar', () => {
  it('renders with initials when no src is provided', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders a single initial for a single-word name', () => {
    render(<Avatar name="Alice" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('uses first and last initials for multi-word names', () => {
    render(<Avatar name="Mary Jane Watson" />);
    expect(screen.getByText('MW')).toBeInTheDocument();
  });

  it('renders an image when src is provided', () => {
    render(<Avatar name="John Doe" src="/avatar.png" />);
    const img = screen.getByRole('img', { name: 'John Doe' });
    expect(img).toHaveAttribute('src', '/avatar.png');
  });

  it('falls back to initials when image fails to load', () => {
    render(<Avatar name="John Doe" src="/broken.png" />);
    const img = screen.getByRole('img', { name: 'John Doe' });
    fireEvent.error(img);
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('applies the title attribute with the name', () => {
    render(<Avatar name="Jane Smith" />);
    expect(screen.getByTitle('Jane Smith')).toBeInTheDocument();
  });

  it('defaults to md size', () => {
    const { container } = render(<Avatar name="Test" />);
    expect(container.firstChild).toHaveClass('md');
  });

  it('applies sm size class', () => {
    const { container } = render(<Avatar name="Test" size="sm" />);
    expect(container.firstChild).toHaveClass('sm');
  });

  it('applies lg size class', () => {
    const { container } = render(<Avatar name="Test" size="lg" />);
    expect(container.firstChild).toHaveClass('lg');
  });

  it('applies custom className', () => {
    const { container } = render(<Avatar name="Test" className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });
});
