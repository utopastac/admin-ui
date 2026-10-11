import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders as a div element', () => {
    const { container } = render(<Card>Test</Card>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('applies hoverable class by default', () => {
    const { container } = render(<Card>Test</Card>);
    expect(container.firstChild).toHaveClass('hoverable');
  });

  it('does not apply hoverable class when hoverable is false', () => {
    const { container } = render(<Card hoverable={false}>Test</Card>);
    expect(container.firstChild).not.toHaveClass('hoverable');
  });

  it('does not apply active class by default', () => {
    const { container } = render(<Card>Test</Card>);
    expect(container.firstChild).not.toHaveClass('active');
  });

  it('applies active class when active is true', () => {
    const { container } = render(<Card active>Test</Card>);
    expect(container.firstChild).toHaveClass('active');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Clickable</Card>);
    await user.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom">Test</Card>);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('renders React node children', () => {
    render(
      <Card>
        <h2>Title</h2>
        <p>Description</p>
      </Card>
    );
    expect(screen.getByText('Title').tagName).toBe('H2');
    expect(screen.getByText('Description').tagName).toBe('P');
  });
});
