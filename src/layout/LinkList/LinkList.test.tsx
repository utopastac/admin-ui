import { render, screen, fireEvent } from '@testing-library/react';
import LinkList from './LinkList';
import type { LinkListSection } from './LinkList';

const sections: LinkListSection[] = [
  {
    header: 'Primitives',
    description: 'Core interactive elements.',
    items: [
      { id: 'button', label: 'Button', onClick: vi.fn() },
      { id: 'input', label: 'Input', onClick: vi.fn() },
    ],
  },
  {
    header: 'Layout',
    items: [
      { id: 'stack', label: 'Stack', onClick: vi.fn() },
    ],
  },
];

describe('LinkList', () => {
  it('renders all section headers', () => {
    render(<LinkList sections={sections} />);
    expect(screen.getByText('Primitives')).toBeInTheDocument();
    expect(screen.getByText('Layout')).toBeInTheDocument();
  });

  it('renders the section description when provided', () => {
    render(<LinkList sections={sections} />);
    expect(screen.getByText('Core interactive elements.')).toBeInTheDocument();
  });

  it('renders all item labels', () => {
    render(<LinkList sections={sections} />);
    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByText('Input')).toBeInTheDocument();
    expect(screen.getByText('Stack')).toBeInTheDocument();
  });

  it('calls onClick when an item is clicked', () => {
    const onClick = vi.fn();
    render(<LinkList sections={[{ items: [{ id: 'a', label: 'Alpha', onClick }] }]} />);
    fireEvent.click(screen.getByText('Alpha'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders separators between items within a section', () => {
    render(<LinkList sections={sections} />);
    const separators = screen.getAllByText('/');
    // One separator between 2 items in the first section; none in the second (single item).
    expect(separators).toHaveLength(1);
  });

  it('does not render a separator after the last item', () => {
    render(<LinkList sections={[{ items: [{ id: 'x', label: 'X' }] }]} />);
    expect(screen.queryByText('/')).not.toBeInTheDocument();
  });

  it('renders without a header when header is omitted', () => {
    render(<LinkList sections={[{ items: [{ id: 'a', label: 'A' }] }]} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(<LinkList sections={[]} className="custom" />);
    expect(container.firstElementChild).toHaveClass('custom');
  });

  it('passes through HTML attributes', () => {
    render(<LinkList sections={[]} data-testid="list" />);
    expect(screen.getByTestId('list')).toBeInTheDocument();
  });
});
