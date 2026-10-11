import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chip from './Chip';

describe('Chip', () => {
  it('renders children', () => {
    render(<Chip>Label</Chip>);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('shows remove button when onRemove is provided', () => {
    render(<Chip onRemove={() => {}}>Label</Chip>);
    expect(screen.getByRole('button', { name: 'Remove Label' })).toBeInTheDocument();
  });

  it('fires onRemove callback when remove button is clicked', async () => {
    const onRemove = vi.fn();
    render(<Chip onRemove={onRemove}>Label</Chip>);
    await userEvent.click(screen.getByRole('button', { name: 'Remove Label' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('does not show remove button when onRemove is not provided', () => {
    render(<Chip>Label</Chip>);
    expect(screen.queryByRole('button', { name: 'Remove Label' })).not.toBeInTheDocument();
  });

  it('fires onSelect when chip is clicked', async () => {
    const onSelect = vi.fn();
    render(<Chip onSelect={onSelect}>Label</Chip>);
    await userEvent.click(screen.getByRole('button', { name: /label/i }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('renders as a span when neither onSelect nor onRemove is provided', () => {
    const { container } = render(<Chip>Label</Chip>);
    expect(container.querySelector('span.chip')).toBeInTheDocument();
    expect(container.querySelector('button')).not.toBeInTheDocument();
  });

  it('applies selected class when selected is true', () => {
    const { container } = render(
      <Chip onSelect={() => {}} selected>
        Label
      </Chip>
    );
    expect(container.firstChild).toHaveClass('selected');
  });

  it('does not apply selected class when selected is false', () => {
    const { container } = render(
      <Chip onSelect={() => {}} selected={false}>
        Label
      </Chip>
    );
    expect(container.firstChild).not.toHaveClass('selected');
  });

  it('renders avatar when avatar prop is provided', () => {
    render(<Chip avatar={{ name: 'Jane Doe' }}>Label</Chip>);
    // Avatar renders with title attribute set to the name
    expect(screen.getByTitle('Jane Doe')).toBeInTheDocument();
  });

  it('avatar takes precedence over icon when both are provided', () => {
    render(
      <Chip avatar={{ name: 'Jane Doe' }} icon={<svg data-testid="icon" />}>
        Label
      </Chip>
    );
    expect(screen.getByTitle('Jane Doe')).toBeInTheDocument();
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('renders icon when icon prop is provided without avatar', () => {
    render(<Chip icon={<svg data-testid="icon" />}>Label</Chip>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies the default variant class', () => {
    const { container } = render(<Chip>Label</Chip>);
    expect(container.firstChild).toHaveClass('default');
  });

  it('applies variant class for success', () => {
    const { container } = render(<Chip variant="success">Label</Chip>);
    expect(container.firstChild).toHaveClass('success');
  });

  it('applies variant class for warning', () => {
    const { container } = render(<Chip variant="warning">Label</Chip>);
    expect(container.firstChild).toHaveClass('warning');
  });

  it('applies variant class for info', () => {
    const { container } = render(<Chip variant="info">Label</Chip>);
    expect(container.firstChild).toHaveClass('info');
  });

  it('applies variant class for error', () => {
    const { container } = render(<Chip variant="error">Label</Chip>);
    expect(container.firstChild).toHaveClass('error');
  });

  it('applies custom className', () => {
    const { container } = render(<Chip className="custom">Label</Chip>);
    expect(container.firstChild).toHaveClass('custom');
  });
});
